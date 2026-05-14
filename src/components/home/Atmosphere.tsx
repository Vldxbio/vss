"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Asterisk, RotatingStamp, MarqueeDivider, SpecLine, PlusMarker, CareSymbols } from "@/components/ui/Decorations";
import { useLocale } from "@/lib/i18n/LocaleProvider";

export function FloatingDetails() {
  return (
    <section className="relative py-0 overflow-hidden pointer-events-none select-none">
      {/* Large floating text */}
      <div className="absolute -left-[5%] top-[-20vh] text-display text-[50vw] font-bold tracking-tightest text-vss-paper/[0.015] leading-none whitespace-nowrap">
        VSS
      </div>
      <div className="absolute -right-[10%] bottom-[-30vh] text-display text-[40vw] font-bold tracking-tightest text-vss-paper/[0.012] leading-none whitespace-nowrap rotate-12">
        NOTHING
      </div>
    </section>
  );
}

export function SectionDivider({ text = "VSS", number = "001" }: { text?: string; number?: string }) {
  return (
    <div className="py-10 md:py-14 bg-vss-obsidian overflow-hidden">
      <div className="container-vss">
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-vss-smoke to-transparent" />
          <div className="flex items-center gap-3">
            <Asterisk className="w-3 h-3 text-vss-fog" />
            <span className="text-[10px] font-mono tracking-[0.5em] text-vss-fog uppercase">
              {text}
            </span>
            <span className="text-[10px] font-mono tracking-widest text-vss-fog/50">
              / {number}
            </span>
            <Asterisk className="w-3 h-3 text-vss-fog" />
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-vss-smoke to-transparent" />
        </div>
      </div>
    </div>
  );
}

export function DoubleMarquee() {
  return (
    <div className="py-8 md:py-10 bg-vss-void border-y border-vss-smoke overflow-hidden space-y-3">
      {/* Forward */}
      <div className="flex animate-marquee whitespace-nowrap">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center shrink-0">
            <span className="text-display text-5xl md:text-7xl font-bold tracking-tightest text-vss-paper mx-6">VSS</span>
            <Asterisk className="w-4 h-4 text-vss-fog mx-3" />
            <span className="text-display text-5xl md:text-7xl font-bold tracking-tightest text-stroke mx-6">NOTHING</span>
            <Asterisk className="w-4 h-4 text-vss-fog mx-3" />
            <span className="text-display text-5xl md:text-7xl font-bold tracking-tightest text-vss-paper mx-6">SHADOW</span>
            <Asterisk className="w-4 h-4 text-vss-fog mx-3" />
            <span className="text-display text-5xl md:text-7xl font-bold tracking-tightest text-stroke mx-6">2026</span>
            <Asterisk className="w-4 h-4 text-vss-fog mx-3" />
          </div>
        ))}
      </div>
      {/* Reverse */}
      <div className="flex animate-marquee-reverse whitespace-nowrap">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center shrink-0">
            <span className="text-[10px] font-mono tracking-[0.4em] text-vss-fog mx-8">ALL BLACK</span>
            <span className="text-vss-fog/30 mx-2">·</span>
            <span className="text-[10px] font-mono tracking-[0.4em] text-vss-fog mx-8">DROP 001</span>
            <span className="text-vss-fog/30 mx-2">·</span>
            <span className="text-[10px] font-mono tracking-[0.4em] text-vss-fog mx-8">KHARKIV UA</span>
            <span className="text-vss-fog/30 mx-2">·</span>
            <span className="text-[10px] font-mono tracking-[0.4em] text-vss-fog mx-8">EST 2026</span>
            <span className="text-vss-fog/30 mx-2">·</span>
            <span className="text-[10px] font-mono tracking-[0.4em] text-vss-fog mx-8">OVERSIZE</span>
            <span className="text-vss-fog/30 mx-2">·</span>
            <span className="text-[10px] font-mono tracking-[0.4em] text-vss-fog mx-8">NO RESTOCK</span>
            <span className="text-vss-fog/30 mx-2">·</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ParallaxQuote() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const { locale } = useLocale();

  return (
    <section ref={ref} className="py-20 md:py-32 bg-vss-void relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-glow opacity-20" />

      {/* Moving text */}
      <motion.div style={{ x }} className="absolute top-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none select-none">
        <span className="text-display text-[20vw] font-bold tracking-tightest text-vss-paper/[0.025] leading-none">
          VISION STYLE STATUS VISION STYLE STATUS
        </span>
      </motion.div>

      <div className="container-vss relative z-10 max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <Asterisk className="w-5 h-5 text-vss-paper mx-auto mb-8" />
          <p className="text-display text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight text-vss-paper leading-[1.15] glow-text">
            {locale === "uk"
              ? "Ми не робимо одяг для всіх. Ми робимо одяг для тих, хто знає."
              : "Мы не делаем одежду для всех. Мы делаем одежду для тех, кто знает."}
          </p>
          <div className="flex items-center justify-center gap-3 mt-8">
            <div className="h-px w-12 bg-vss-fog" />
            <span className="text-[10px] font-mono tracking-widest text-vss-fog uppercase">
              VSS / 2026 / KH
            </span>
            <div className="h-px w-12 bg-vss-fog" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function StatsBlock() {
  const { locale } = useLocale();

  const stats = [
    { num: "420", unit: "g/m²", label: { uk: "Макс. щільність", ru: "Макс. плотность" } },
    { num: "13", unit: "", label: { uk: "Речей у дропі", ru: "Вещей в дропе" } },
    { num: "5", unit: "", label: { uk: "Категорій", ru: "Категорий" } },
    { num: "0", unit: "", label: { uk: "Restock", ru: "Restock" } },
    { num: "24", unit: "h", label: { uk: "Відправка", ru: "Отправка" } },
    { num: "1500", unit: "₴", label: { uk: "Free shipping від", ru: "Free shipping от" } },
  ];

  return (
    <section className="py-16 md:py-20 bg-vss-obsidian">
      <div className="container-vss">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-vss-smoke">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="bg-vss-obsidian p-5 md:p-6 text-center group hover:bg-vss-graphite transition-colors duration-500"
            >
              <div className="flex items-baseline justify-center gap-0.5">
                <span className="text-display text-3xl md:text-4xl font-bold text-vss-paper tabular-nums">
                  {s.num}
                </span>
                {s.unit && (
                  <span className="text-sm font-mono text-vss-mist font-bold">
                    {s.unit}
                  </span>
                )}
              </div>
              <div className="text-[9px] font-mono tracking-widest text-vss-fog uppercase mt-1.5">
                {s.label[locale]}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BottomCTA() {
  const { locale } = useLocale();

  return (
    <section className="py-24 md:py-32 bg-vss-void relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-glow opacity-40" />

      {/* Rotating stamps */}
      <div className="absolute top-16 left-8 w-20 h-20 text-vss-fog hidden lg:block opacity-40">
        <RotatingStamp text="VSS · ARCHIVE · 001 · " />
      </div>
      <div className="absolute bottom-16 right-8 w-20 h-20 text-vss-fog hidden lg:block opacity-40">
        <RotatingStamp text="NOTHING · LASTS · " />
      </div>

      <div className="container-vss relative z-10 text-center max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="h-px w-10 bg-vss-paper" />
            <Asterisk className="w-3 h-3 text-vss-paper" />
            <span className="text-[10px] font-mono tracking-[0.4em] text-vss-paper font-bold uppercase">
              ARCHIVE
            </span>
            <Asterisk className="w-3 h-3 text-vss-paper" />
            <span className="h-px w-10 bg-vss-paper" />
          </div>

          <h2 className="text-display text-[14vw] md:text-[10vw] leading-[0.85] font-bold tracking-tightest text-vss-paper glow-text-strong mb-2">
            NOTHING
          </h2>
          <h2 className="text-display text-[14vw] md:text-[10vw] leading-[0.85] font-bold tracking-tightest text-stroke-thick mb-8">
            LASTS
          </h2>

          <p className="text-sm md:text-base text-vss-mist max-w-md mx-auto mb-10">
            {locale === "uk"
              ? "Restock не гарантовано. Кожна річ — обмежена партія."
              : "Restock не гарантирован. Каждая вещь — ограниченная партия."}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="/catalog" className="group inline-flex items-center gap-2 px-8 py-4 bg-vss-paper text-vss-void text-xs font-bold tracking-widest uppercase hover:bg-vss-glow transition-all">
              {locale === "uk" ? "КАТАЛОГ" : "КАТАЛОГ"}
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
            <a href="https://t.me/vss_kh" target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2 px-8 py-4 border border-vss-paper text-vss-paper text-xs font-bold tracking-widest uppercase hover:bg-vss-paper hover:text-vss-void transition-all">
              TELEGRAM
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-[10px] font-mono tracking-widest text-vss-fog">
            <span className="flex items-center gap-1.5"><PlusMarker className="w-2 h-2" /> FREE SHIPPING 1500₴+</span>
            <span className="flex items-center gap-1.5"><PlusMarker className="w-2 h-2" /> <span className="text-vss-lime font-bold">USDT</span> ACCEPTED</span>
            <span className="flex items-center gap-1.5"><PlusMarker className="w-2 h-2" /> NOVA POSHTA 1-3 DAYS</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}