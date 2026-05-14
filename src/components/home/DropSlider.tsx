"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { SafeImage } from "@/components/ui/SafeImage";
import { Button } from "@/components/ui/Button";
import { Price } from "@/components/ui/Price";
import { CornerBrackets, Asterisk, PlusMarker } from "@/components/ui/Decorations";

const slides = [
  {
    id: 1,
    tag: { uk: "НОВИЙ ДРОП", ru: "НОВЫЙ ДРОП" },
    title: { uk: "NOTHING", ru: "NOTHING" },
    subtitle: { uk: "COLLECTION", ru: "COLLECTION" },
    text: {
      uk: "13 речей у all-black естетиці. Преміум тканини, лімітована партія.",
      ru: "13 вещей в all-black эстетике. Премиум ткани, лимитированная партия.",
    },
    fromPrice: 449,
    fromPriceUSD: 11,
    cta: { uk: "Дивитись дроп", ru: "Смотреть дроп" },
    href: "/catalog",
    image: "/images/products/hoodie-shadow-1.png",
    accent: "13 ITEMS",
  },
  {
    id: 2,
    tag: { uk: "БЕСТСЕЛЕР", ru: "БЕСТСЕЛЛЕР" },
    title: { uk: "SHADOW", ru: "SHADOW" },
    subtitle: { uk: "HOODIE", ru: "HOODIE" },
    text: {
      uk: "Оверсайз-худі 420 г/м². Дроп-плечі, прихована кишеня.",
      ru: "Оверсайз-худи 420 г/м². Дроп-плечи, скрытый карман.",
    },
    fromPrice: 1199,
    fromPriceUSD: 29,
    cta: { uk: "Замовити", ru: "Заказать" },
    href: "/product/shadow-hoodie-void",
    image: "/images/products/hoodie-shadow-1.png",
    accent: "420 G/M²",
  },
  {
    id: 3,
    tag: { uk: "БАЗОВА ЛІНІЯ", ru: "БАЗОВАЯ ЛИНИЯ" },
    title: { uk: "CORE", ru: "CORE" },
    subtitle: { uk: "TEE", ru: "TEE" },
    text: {
      uk: "Оверсайз-футболка 240 г/м². Без принтів. Чиста форма.",
      ru: "Оверсайз-футболка 240 г/м². Без принтов. Чистая форма.",
    },
    fromPrice: 699,
    fromPriceUSD: 17,
    cta: { uk: "Дивитись", ru: "Смотреть" },
    href: "/product/shadow-tee-void",
    image: "/images/products/tee-shadow-1.png",
    accent: "OVERSIZE FIT",
  },
];

export function DropSlider() {
  const { locale } = useLocale();
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((index: number) => {
    setDirection(index > active ? 1 : -1);
    setActive(index);
  }, [active]);

  const goNext = useCallback(() => {
    setDirection(1);
    setActive((p) => (p + 1) % slides.length);
  }, []);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setActive((p) => (p - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(goNext, 3500);
    return () => clearInterval(t);
  }, [paused, goNext, active]);

  const slide = slides[active];

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0.4,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? "-100%" : "100%",
      opacity: 0.4,
    }),
  };

  return (
    <section className="pt-8 md:pt-10 pb-4 bg-vss-obsidian">
      <div className="container-vss">
        <div className="flex items-center gap-3 mb-5">
          <span className="h-px w-8 bg-vss-paper" />
          <Asterisk className="w-3 h-3 text-vss-paper" />
          <span className="text-[10px] tracking-[0.4em] text-vss-paper font-mono font-bold uppercase">
            {locale === "uk" ? "АКТИВНА КОЛЕКЦІЯ" : "АКТИВНАЯ КОЛЛЕКЦИЯ"}
          </span>
        </div>

        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="relative overflow-hidden bg-vss-graphite border border-vss-smoke"
        >
          <div className="relative" style={{ minHeight: "440px" }}>
            <AnimatePresence mode="sync" custom={direction} initial={false}>
              <motion.div
                key={slide.id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { duration: 0.7, ease: [0.32, 0.72, 0, 1] },
                  opacity: { duration: 0.4, ease: "easeInOut" },
                }}
                className="absolute inset-0 grid lg:grid-cols-2"
              >
                <div className="relative p-7 md:p-10 lg:p-12 flex flex-col justify-center">
                  <CornerBrackets className="text-vss-fog/30" />

                  <div className="inline-flex items-center gap-2 mb-5">
                    <PlusMarker className="text-vss-paper w-2.5 h-2.5" />
                    <span className="text-[10px] tracking-[0.4em] text-vss-paper font-mono font-bold uppercase">
                      {slide.tag[locale]}
                    </span>
                  </div>

                  <h2 className="text-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tightest text-vss-paper leading-[0.9] mb-1 glow-text">
                    {slide.title[locale]}
                  </h2>
                  <h3 className="text-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tightest text-stroke leading-[0.9] mb-4">
                    {slide.subtitle[locale]}
                  </h3>

                  <p className="text-sm md:text-base text-vss-bone leading-relaxed max-w-md mb-5">
                    {slide.text[locale]}
                  </p>

                  <div className="flex items-center gap-3 mb-7">
                    <div className="text-[10px] font-mono tracking-widest text-vss-mist uppercase">
                      {locale === "uk" ? "від" : "от"}
                    </div>
                    <Price
                      amount={slide.fromPrice}
                      amountUSD={slide.fromPriceUSD}
                      size="lg"
                      variant="highlight"
                      showUSD
                    />
                    <span className="px-2 py-0.5 border border-vss-smoke text-[9px] font-mono tracking-widest text-vss-mist">
                      {slide.accent}
                    </span>
                  </div>

                  <Link href={slide.href}>
                    <Button variant="primary" size="md" arrow>
                      {slide.cta[locale]}
                    </Button>
                  </Link>
                </div>

                <div className="relative bg-vss-void overflow-hidden hidden lg:block">
                  <div className="absolute inset-0 bg-radial-glow opacity-40" />
                  <SafeImage
                    src={slide.image}
                    alt={slide.title[locale]}
                    fill
                    className="object-cover"
                    sizes="50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-vss-graphite/60 via-transparent to-transparent" />
                  <div className="absolute bottom-6 right-6 text-display text-6xl font-bold text-vss-paper/10 tracking-tightest">
                    0{slide.id}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Pagination */}
          <div className="absolute bottom-5 left-7 md:left-10 lg:left-12 flex items-center gap-4 z-20">
            <div className="flex items-center gap-1.5">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className="group relative h-[3px] transition-all"
                  style={{ width: i === active ? 32 : 12 }}
                  aria-label={`Slide ${i + 1}`}
                >
                  <span className="absolute inset-0 bg-vss-fog/40" />
                  {i === active && (
                    <motion.span
                      className="absolute inset-0 bg-vss-paper origin-left"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: paused ? 0 : 1 }}
                      transition={{ duration: paused ? 0 : 3.5, ease: "linear" }}
                      key={`progress-${active}`}
                    />
                  )}
                </button>
              ))}
            </div>
            <span className="text-[10px] font-mono text-vss-mist tracking-widest tabular-nums">
              0{active + 1} / 0{slides.length}
            </span>
          </div>

          {/* Arrows */}
          <div className="absolute top-5 right-5 flex gap-1.5 z-20">
            <button
              onClick={goPrev}
              className="w-9 h-9 border border-vss-smoke hover:border-vss-paper bg-vss-void/60 backdrop-blur-md text-vss-bone hover:text-vss-paper flex items-center justify-center transition-all"
              aria-label="Previous"
            >
              <ChevronLeft size={16} strokeWidth={1.5} />
            </button>
            <button
              onClick={goNext}
              className="w-9 h-9 border border-vss-smoke hover:border-vss-paper bg-vss-void/60 backdrop-blur-md text-vss-bone hover:text-vss-paper flex items-center justify-center transition-all"
              aria-label="Next"
            >
              <ChevronRight size={16} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
