"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { SafeImage } from "@/components/ui/SafeImage";
import { Asterisk, CornerBrackets, PlusMarker, MarqueeDivider, SpecLine, RotatingStamp } from "@/components/ui/Decorations";
import { Button } from "@/components/ui/Button";
import { productImages } from "@/lib/utils/images";

export default function AboutPage() {
  const { locale } = useLocale();

  return (
    <div className="bg-vss-obsidian min-h-screen relative">
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="absolute top-32 right-8 w-16 h-16 text-vss-fog/40 hidden xl:block pointer-events-none">
        <RotatingStamp text="VSS · ABOUT · 2026 · " />
      </div>

      <div className="container-vss py-10 md:py-14 relative">
        <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-vss-fog uppercase mb-8">
          <Link href="/" className="hover:text-vss-paper transition-colors">VSS</Link>
          <ChevronRight size={10} strokeWidth={2} />
          <span className="text-vss-paper font-bold">{locale === "uk" ? "ПРО БРЕНД" : "О БРЕНДЕ"}</span>
        </div>

        <div className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-8 bg-vss-paper" />
            <Asterisk className="w-3 h-3 text-vss-paper" />
            <span className="text-[10px] tracking-[0.4em] text-vss-paper font-mono font-bold uppercase">
              MANIFEST / 001
            </span>
          </div>
          <h1 className="text-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tightest text-vss-paper leading-[0.85] glow-text">
            VISION.<br />
            <span className="text-stroke">STYLE.</span><br />
            STATUS.
          </h1>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            <div className="relative aspect-[3/4] bg-vss-graphite overflow-hidden border border-vss-smoke">
              <CornerBrackets className="text-vss-fog/40 z-10" />
              <SafeImage src={productImages.hoodie} alt="" fill className="object-cover" sizes="40vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-vss-void/60 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <div className="text-[9px] font-mono tracking-widest text-vss-paper/80 mb-1">NOTHING / DROP 001</div>
                <div className="text-display text-2xl font-bold text-vss-paper glow-text">ALL BLACK</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-7"
          >
            <h2 className="text-display text-3xl md:text-4xl font-bold tracking-tight text-vss-paper leading-[1.1] mb-6 glow-text">
              {locale === "uk" ? "Не масмаркет. Не випадковість." : "Не массмаркет. Не случайность."}
            </h2>
            <div className="space-y-4 text-base text-vss-bone leading-relaxed">
              <p>
                {locale === "uk"
                  ? "VSS — це форма присутності. Бренд із Харкова. Заснований у 2026 році для тих, хто збирає свій образ як позицію — без галасу, без понтів, без зайвого."
                  : "VSS — это форма присутствия. Бренд из Харькова. Основан в 2026 году для тех, кто собирает свой образ как позицию — без шума, без понтов, без лишнего."}
              </p>
              <p>
                {locale === "uk"
                  ? "Ми не робимо одяг для всіх. Ми робимо одяг для тих, хто знає, навіщо одягається. Кожна річ — лімітована партія, преміум тканина, чесний крій."
                  : "Мы не делаем одежду для всех. Мы делаем одежду для тех, кто знает, зачем одевается. Каждая вещь — лимитированная партия, премиум ткань, честный крой."}
              </p>
              <p className="text-vss-paper font-medium">
                {locale === "uk"
                  ? "Тінь — це теж форма. Форма присутності."
                  : "Тень — это тоже форма. Форма присутствия."}
              </p>
            </div>
          </motion.div>
        </div>

        <MarqueeDivider text="VSS · 2026 · KHARKIV / UA" />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          {[
            { label: { uk: "ЗАСНОВАНО", ru: "ОСНОВАНО" }, value: "2026" },
            { label: { uk: "МІСТО", ru: "ГОРОД" }, value: { uk: "Харків", ru: "Харьков" } },
            { label: { uk: "КАТЕГОРІЙ", ru: "КАТЕГОРИЙ" }, value: "5" },
            { label: { uk: "ДРОПІВ", ru: "ДРОПОВ" }, value: "001" },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-vss-graphite border border-vss-smoke p-5 relative"
            >
              <CornerBrackets className="text-vss-fog/30" />
              <div className="text-[9px] font-mono tracking-widest text-vss-fog uppercase mb-2">
                / 0{i + 1}
              </div>
              <div className="text-display text-3xl font-bold text-vss-paper">
                {typeof s.value === "string" ? s.value : s.value[locale]}
              </div>
              <div className="text-[10px] font-mono tracking-widest text-vss-mist uppercase mt-1">
                {s.label[locale]}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link href="/catalog">
            <Button variant="primary" size="lg" arrow>
              {locale === "uk" ? "ДО КАТАЛОГУ" : "К КАТАЛОГУ"}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}