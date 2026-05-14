"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ProductCard } from "@/components/product/ProductCard";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { products } from "@/lib/data/products";
import { Asterisk, MarqueeDivider, PlusMarker, RotatingStamp, Crosshair, Barcode, CornerBrackets } from "@/components/ui/Decorations";

export function NewDrop() {
  const { locale } = useLocale();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const bgY2 = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  const dropProducts = products.filter((p) => p.badges.includes("new") || p.badges.includes("drop")).slice(0, 8);

  if (dropProducts.length < 4) return null;

  return (
    <section ref={ref} className="relative py-20 md:py-28 bg-vss-obsidian overflow-hidden">
      {/* === BACKGROUND LAYERS === */}

      {/* Tech grid */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Diagonal lines */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 80px, rgba(255,255,255,0.5) 80px, rgba(255,255,255,0.5) 81px)`,
        }}
      />

      {/* Radial glow centers */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-radial-glow opacity-20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-radial-glow opacity-15 blur-3xl pointer-events-none" />

      {/* Parallax HUGE text */}
      <motion.div
        style={{ y: bgY }}
        className="absolute top-0 left-0 right-0 pointer-events-none select-none overflow-hidden"
      >
        <div className="text-display text-[28vw] font-bold leading-none tracking-tightest text-vss-paper/[0.018] whitespace-nowrap animate-marquee">
          NOTHING NOTHING NOTHING NOTHING
        </div>
      </motion.div>

      <motion.div
        style={{ y: bgY2 }}
        className="absolute bottom-0 left-0 right-0 pointer-events-none select-none overflow-hidden"
      >
        <div className="text-display text-[20vw] font-bold leading-none tracking-tightest text-vss-paper/[0.012] whitespace-nowrap animate-marquee-reverse">
          DROP 001 · DROP 001 · DROP 001
        </div>
      </motion.div>

      {/* Side rotating stamps */}
      <div className="absolute top-32 right-6 w-20 h-20 text-vss-fog/40 hidden xl:block pointer-events-none">
        <RotatingStamp text="NOTHING · DROP 001 · " />
        <div className="absolute inset-0 flex items-center justify-center">
          <Asterisk className="w-3 h-3 text-vss-fog/40" />
        </div>
      </div>

      <div className="absolute bottom-32 left-6 w-16 h-16 text-vss-fog/40 hidden xl:block pointer-events-none">
        <RotatingStamp text="VSS · 2026 · KH · " />
      </div>

      {/* Floating asterisks */}
      <div className="absolute top-1/3 left-[8%] hidden lg:block pointer-events-none animate-float-1">
        <Asterisk className="w-4 h-4 text-vss-fog/30" />
      </div>
      <div className="absolute top-2/3 right-[10%] hidden lg:block pointer-events-none animate-float-2">
        <Asterisk className="w-3 h-3 text-vss-fog/30" />
      </div>
      <div className="absolute top-[40%] left-[12%] hidden lg:block pointer-events-none animate-float-3">
        <Crosshair size={20} className="text-vss-fog/20" />
      </div>
      <div className="absolute top-[60%] right-[6%] hidden lg:block pointer-events-none animate-float-1">
        <Crosshair size={24} className="text-vss-fog/20" />
      </div>

      {/* Side vertical labels */}
      <div className="absolute top-1/2 left-2 -translate-y-1/2 text-[9px] font-mono tracking-widest text-vss-fog/40 rotate-90 origin-center hidden xl:block whitespace-nowrap pointer-events-none">
        NOTHING / DROP 001 / 13 PIECES / SS26
      </div>
      <div className="absolute top-1/2 right-2 -translate-y-1/2 text-[9px] font-mono tracking-widest text-vss-fog/40 -rotate-90 origin-center hidden xl:block whitespace-nowrap pointer-events-none">
        VSS · ORIGINAL · NO RESTOCK · KH UA
      </div>

      {/* Top right barcode */}
      <div className="absolute top-12 left-12 hidden xl:block opacity-30 pointer-events-none">
        <Barcode />
      </div>

      {/* === CONTENT === */}
      <div className="container-vss relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10 md:mb-14">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-5 flex-wrap"
            >
              <span className="h-px w-8 bg-vss-paper" />
              <Asterisk className="w-3 h-3 text-vss-paper" />
              <span className="text-[10px] md:text-xs tracking-[0.4em] text-vss-paper font-mono font-bold uppercase">
                NOTHING DROP / 001
              </span>
              <div className="px-2 py-0.5 bg-vss-paper text-vss-void text-[9px] font-mono font-bold tracking-widest">
                LIVE
              </div>
              <div className="hidden md:flex items-center gap-1.5 text-[9px] font-mono tracking-widest text-vss-mist">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-vss-paper opacity-60" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-vss-paper" />
                </span>
                {locale === "uk" ? "ОНОВЛЕНО СЬОГОДНІ" : "ОБНОВЛЕНО СЕГОДНЯ"}
              </div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tightest text-vss-paper leading-[0.9] glow-text"
            >
              NEW <span className="text-stroke">PIECES</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-sm text-vss-mist mt-4 max-w-md leading-relaxed"
            >
              {locale === "uk"
                ? "Тринадцять речей. Тільки чорне. Без принтів. Без шуму. Тільки текстура, форма і вага тканини."
                : "Тринадцать вещей. Только чёрное. Без принтов. Без шума. Только текстура, форма и вес ткани."}
            </motion.p>
          </div>

          <div className="flex items-end gap-5">
            {/* Drop counter */}
            <div className="hidden md:block bg-vss-graphite/60 backdrop-blur-md border border-vss-smoke p-4 relative">
              <CornerBrackets className="text-vss-fog/40" />
              <div className="text-[9px] font-mono tracking-widest text-vss-fog mb-1">
                / DROP STATUS
              </div>
              <div className="text-display text-2xl font-bold text-vss-paper">
                {dropProducts.length} / 13
              </div>
              <div className="mt-2 h-px w-full bg-vss-smoke">
                <div
                  className="h-full bg-vss-paper"
                  style={{ width: `${(dropProducts.length / 13) * 100}%` }}
                />
              </div>
            </div>

            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 px-5 h-11 border border-vss-paper text-vss-paper hover:bg-vss-paper hover:text-vss-void text-xs tracking-widest uppercase font-bold transition-all group"
            >
              {locale === "uk" ? "ВЕСЬ КАТАЛОГ" : "ВЕСЬ КАТАЛОГ"} ({products.length})
              <ArrowRight size={14} strokeWidth={2} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        <MarqueeDivider text="DROP 001 / NOTHING / LIMITED" />

        {/* Products grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-12 md:gap-y-16 mt-12">
          {dropProducts.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>

        {/* Bottom info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-vss-smoke"
        >
          <div className="flex items-center gap-2">
            <PlusMarker className="w-2.5 h-2.5 text-vss-fog" />
            <span className="text-[10px] tracking-widest font-mono text-vss-fog uppercase">
              {locale === "uk" ? "Restock не планується" : "Restock не планируется"}
            </span>
          </div>

          <div className="flex items-center gap-4 text-[10px] font-mono tracking-widest text-vss-fog">
            <span>VSS · NTH · 001</span>
            <span className="text-vss-fog/40">·</span>
            <span>SS26 SEASON</span>
            <span className="text-vss-fog/40">·</span>
            <span>KHARKIV / UA</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}