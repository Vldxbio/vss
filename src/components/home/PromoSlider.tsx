"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Zap, Tag, Flame, Clock } from "lucide-react";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { SafeImage } from "@/components/ui/SafeImage";
import { Price } from "@/components/ui/Price";
import { PlusMarker } from "@/components/ui/Decorations";
import { productImages } from "@/lib/utils/images";

const slides = [
  {
    id: 1,
    type: "flash" as const,
    icon: Zap,
    badge: { uk: "FLASH SALE", ru: "FLASH SALE" },
    timer: "23:59:42",
    title: { uk: "Shadow Hoodie", ru: "Shadow Hoodie" },
    text: { uk: "Тільки сьогодні −15% на бестселер", ru: "Только сегодня −15% на бестселлер" },
    price: 1019,
    oldPrice: 1199,
    priceUSD: 25,
    discount: 15,
    cta: { uk: "Забрати", ru: "Забрать" },
    href: "/product/shadow-hoodie-void",
    image: productImages.hoodie,
    stock: "12 LEFT",
  },
  {
    id: 2,
    type: "promo" as const,
    icon: Tag,
    badge: { uk: "НАБІР −20%", ru: "НАБОР −20%" },
    title: { uk: "Core Tee × 3", ru: "Core Tee × 3" },
    text: { uk: "3 базові футболки — мінус 20% автоматично", ru: "3 базовые футболки — минус 20% автоматически" },
    price: 1679,
    oldPrice: 2097,
    priceUSD: 41,
    discount: 20,
    cta: { uk: "Зібрати сет", ru: "Собрать сет" },
    href: "/catalog?category=tee",
    image: productImages.tee,
    stock: "PACK ×3",
  },
  {
    id: 3,
    type: "drop" as const,
    icon: Flame,
    badge: { uk: "NOTHING DROP", ru: "NOTHING DROP" },
    title: { uk: "13 речей", ru: "13 вещей" },
    text: { uk: "Перший дроп VSS. All-black. Без restock", ru: "Первый дроп VSS. All-black. Без restock" },
    price: 449,
    priceUSD: 11,
    cta: { uk: "Дроп", ru: "Дроп" },
    href: "/catalog",
    image: productImages.jeans,
    stock: "LIVE",
  },
];

export function PromoSlider() {
  const { locale } = useLocale();
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);

  const goNext = useCallback(() => {
    setDir(1);
    setActive((p) => (p + 1) % slides.length);
  }, []);

  const goPrev = useCallback(() => {
    setDir(-1);
    setActive((p) => (p - 1 + slides.length) % slides.length);
  }, []);

  const goTo = useCallback((i: number) => {
    setDir(i > active ? 1 : -1);
    setActive(i);
  }, [active]);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(goNext, 6500);
    return () => clearInterval(t);
  }, [paused, goNext, active]);

  const slide = slides[active];
  const Icon = slide.icon;

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative overflow-hidden rounded-[40px] md:rounded-full border border-vss-smoke bg-vss-graphite/80 backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,0.4)]"
    >
      {/* Subtle glow on flash */}
      {slide.type === "flash" && (
        <motion.div
          animate={{ opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute inset-0 bg-gradient-to-r from-vss-paper/8 via-transparent to-vss-paper/5 pointer-events-none rounded-[40px] md:rounded-full"
        />
      )}

      <div className="relative" style={{ minHeight: "92px" }}>
        <AnimatePresence mode="sync" custom={dir} initial={false}>
          <motion.div
            key={slide.id}
            custom={dir}
            initial={(d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 })}
            animate={{ x: 0, opacity: 1 }}
            exit={(d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0 })}
            transition={{
              x: { duration: 0.8, ease: [0.32, 0.72, 0, 1] },
              opacity: { duration: 0.5 },
            }}
            className="absolute inset-0 flex items-center gap-4 md:gap-5 px-4 md:px-5 py-3"
          >
            {/* Image circle */}
            <div className="relative w-[68px] h-[68px] md:w-[72px] md:h-[72px] rounded-full overflow-hidden bg-vss-void border border-vss-smoke shrink-0">
              <SafeImage src={slide.image} alt="" fill className="object-cover" sizes="72px" />
              {slide.discount && (
                <div className="absolute inset-0 flex items-center justify-center bg-vss-void/60 backdrop-blur-[1px]">
                  <span className="text-vss-paper font-mono font-bold text-sm tracking-tight">
                    −{slide.discount}%
                  </span>
                </div>
              )}
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-vss-void border border-vss-paper rounded-full">
                  <Icon size={9} strokeWidth={2.5} className="text-vss-paper" />
                  <span className="text-[8px] font-mono tracking-widest text-vss-paper font-bold uppercase">
                    {slide.badge[locale]}
                  </span>
                </div>
                {slide.timer && (
                  <div className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 bg-vss-paper text-vss-void rounded-full">
                    <Clock size={9} strokeWidth={2.5} />
                    <span className="text-[8px] font-mono tracking-widest font-bold tabular-nums">
                      {slide.timer}
                    </span>
                  </div>
                )}
                <span className="text-[8px] font-mono tracking-widest text-vss-fog uppercase hidden sm:inline">
                  · {slide.stock}
                </span>
              </div>
              <div className="flex items-baseline gap-3">
                <h3 className="text-display text-base md:text-lg font-bold tracking-tight text-vss-paper leading-none truncate">
                  {slide.title[locale]}
                </h3>
                <span className="text-[10px] text-vss-mist hidden md:block truncate">
                  {slide.text[locale]}
                </span>
              </div>
            </div>

            {/* Price + CTA */}
            <div className="flex items-center gap-3 shrink-0">
              <Price
                amount={slide.price}
                oldPrice={slide.oldPrice}
                amountUSD={slide.priceUSD}
                size="md"
                variant="highlight"
                className="hidden md:inline-flex"
              />
              <Link
                href={slide.href}
                className="group inline-flex items-center gap-1.5 px-4 md:px-5 py-2 bg-vss-paper text-vss-void text-[10px] font-bold tracking-widest uppercase rounded-full hover:bg-vss-glow transition-all whitespace-nowrap"
              >
                {slide.cta[locale]}
                <span className="group-hover:translate-x-0.5 transition-transform duration-300">→</span>
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom dots — внутри pill */}
      <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="relative h-[3px] transition-all rounded-full overflow-hidden"
            style={{ width: i === active ? 24 : 8 }}
            aria-label={`Slide ${i + 1}`}
          >
            <span className="absolute inset-0 bg-vss-fog/40 rounded-full" />
            {i === active && (
              <motion.span
                className="absolute inset-0 bg-vss-paper origin-left rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: paused ? 0 : 1 }}
                transition={{ duration: paused ? 0 : 6.5, ease: "linear" }}
                key={`bar-${active}`}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}