"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { SafeImage } from "@/components/ui/SafeImage";
import { WorkSchedule } from "@/components/ui/WorkSchedule";
import { CornerBrackets, Asterisk, PlusMarker, MarqueeDivider, SpecLine, CareSymbols } from "@/components/ui/Decorations";
import { productImages } from "@/lib/utils/images";

export function BrandStory() {
  const { t, locale } = useLocale();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  return (
    <section ref={ref} className="py-24 md:py-36 bg-vss-void relative overflow-hidden">
      {/* Parallax bg text */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none select-none"
      >
        <div className="text-display text-[25vw] font-bold leading-none tracking-tightest text-vss-paper/[0.02] text-center whitespace-nowrap">
          PHILOSOPHY
        </div>
      </motion.div>

      <div className="absolute inset-0 bg-radial-glow opacity-20" />

      <div className="container-vss relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-12">
          <span className="h-px w-8 bg-vss-paper" />
          <Asterisk className="w-3 h-3 text-vss-paper" />
          <span className="text-[10px] tracking-[0.4em] text-vss-paper font-mono font-bold uppercase">
            MANIFEST / 003
          </span>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* LEFT: Images stack */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative"
            >
              {/* Main image */}
              <div className="relative aspect-[3/4] bg-vss-graphite overflow-hidden border border-vss-smoke">
                <CornerBrackets className="text-vss-fog/30 z-10" />
                <SafeImage
                  src={productImages.hoodie}
                  alt="VSS Philosophy"
                  fill
                  className="object-cover"
                  sizes="40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-vss-void/60 to-transparent" />

                {/* Overlay text on image */}
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="text-[9px] font-mono tracking-widest text-vss-paper/80 mb-1">
                    NOTHING / DROP 001
                  </div>
                  <div className="text-display text-2xl font-bold text-vss-paper glow-text">
                    ALL BLACK
                  </div>
                </div>
              </div>

              {/* Second image offset */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
                className="absolute -bottom-8 -right-6 w-[45%] aspect-square bg-vss-graphite overflow-hidden border border-vss-smoke hidden md:block z-10"
              >
                <SafeImage
                  src={productImages.tee}
                  alt="VSS Tee"
                  fill
                  className="object-cover"
                  sizes="20vw"
                />
              </motion.div>

              {/* Care label decoration */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute -bottom-4 -left-4 hidden lg:block"
              >
                <div className="bg-vss-void border border-vss-smoke p-3">
                  <div className="text-[8px] font-mono tracking-widest text-vss-fog mb-1.5">
                    VSS / CARE
                  </div>
                  <CareSymbols className="text-vss-bone/60" />
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* RIGHT: Text content */}
          <div className="lg:col-span-7">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="text-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-vss-paper leading-[1.1] mb-6 glow-text"
            >
              {t.brand.storyTitle}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-base md:text-lg text-vss-bone leading-relaxed mb-6"
            >
              {t.brand.storyText}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-sm text-vss-mist leading-relaxed mb-8"
            >
              {locale === "uk"
                ? "VSS народився в Харкові. Бренд для тих, хто не чекає дозволу. Ми робимо одяг, який говорить без слів — текстурою, формою, вагою тканини. Кожна річ — це не про тренд. Це про тебе."
                : "VSS родился в Харькове. Бренд для тех, кто не ждёт разрешения. Мы делаем одежду, которая говорит без слов — текстурой, формой, весом ткани. Каждая вещь — это не про тренд. Это про тебя."}
            </motion.p>

            {/* Specs block */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
              className="bg-vss-graphite border border-vss-smoke p-6 mb-8 relative"
            >
              <CornerBrackets className="text-vss-fog/30" />
              <div className="text-[9px] font-mono tracking-widest text-vss-paper font-bold mb-4 flex items-center gap-2">
                <PlusMarker className="w-2.5 h-2.5" />
                {locale === "uk" ? "ПРО БРЕНД" : "О БРЕНДЕ"}
              </div>
              <div className="space-y-2.5 max-w-md">
                <SpecLine label={locale === "uk" ? "Місто" : "Город"} value={locale === "uk" ? "Харків" : "Харьков"} />
                <SpecLine label={locale === "uk" ? "Заснування" : "Основание"} value="2026" />
                <SpecLine label={locale === "uk" ? "Естетика" : "Эстетика"} value="All-black" />
                <SpecLine label={locale === "uk" ? "Тканини" : "Ткани"} value="220–420 g/m²" />
                <SpecLine label={locale === "uk" ? "Принт" : "Принт"} value={locale === "uk" ? "Без принтів" : "Без принтов"} />
                <SpecLine label={locale === "uk" ? "Restock" : "Restock"} value={locale === "uk" ? "Не гарантовано" : "Не гарантирован"} />
              </div>
            </motion.div>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              className="flex flex-wrap gap-2 mb-8"
            >
              {["#allblack", "#nothing", "#shadow", "#oversize", "#streetwear", "#kharkiv"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 border border-vss-smoke text-xs font-mono text-vss-mist hover:border-vss-paper hover:text-vss-paper transition-colors cursor-default"
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* Schedule */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <WorkSchedule variant="full" />
            </motion.div>
          </div>
        </div>

        <div className="mt-16">
          <MarqueeDivider text="VISION · STYLE · STATUS" />
        </div>
      </div>
    </section>
  );
}
