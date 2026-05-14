"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { Button } from "@/components/ui/Button";
import { SafeImage } from "@/components/ui/SafeImage";
import { WorkSchedule } from "@/components/ui/WorkSchedule";
import { Price } from "@/components/ui/Price";
import { PromoSlider } from "@/components/home/PromoSlider";
import {
  Barcode,
  Crosshair,
  CornerBrackets,
  RotatingStamp,
  Asterisk,
  TechGrid,
  PlusMarker,
  CareSymbols,
  SpecLine,
} from "@/components/ui/Decorations";
import { brandImages } from "@/lib/utils/images";

export function Hero() {
  const { locale } = useLocale();

  return (
    <section className="relative min-h-[100vh] flex flex-col overflow-hidden bg-vss-void">
      {/* BG layers */}
      <TechGrid />
      <div className="absolute inset-0 bg-radial-glow-strong opacity-40" />
      <div className="absolute right-0 top-0 bottom-0 w-2/3 bg-radial-glow opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-vss-void/20 to-vss-obsidian pointer-events-none" />

      {/* PROMO SLIDER — pill сверху */}
      <div className="relative z-30 pt-6 md:pt-8 pb-2">
        <div className="container-vss">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <PromoSlider />
          </motion.div>
        </div>
      </div>

      {/* TOP DETAILS */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="absolute top-32 md:top-36 left-6 md:left-12 z-10 hidden md:block"
      >
        <Barcode />
        <div className="text-[8px] font-mono tracking-widest text-vss-fog mt-2">
          BATCH: NTH-001 / 2026
        </div>
        <div className="mt-3">
          <CareSymbols className="text-vss-bone/60" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.7 }}
        className="absolute top-32 md:top-36 right-6 md:right-12 z-10 hidden md:block"
      >
        <WorkSchedule variant="compact" />
        <div className="text-[9px] font-mono tracking-widest text-vss-fog mt-2 text-right">
          {locale === "uk" ? "ХАРКІВ / УКРАЇНА" : "ХАРЬКОВ / УКРАИНА"}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 1.7 }}
        className="absolute top-[50%] right-[8%] w-20 h-20 text-vss-paper/40 hidden xl:block"
      >
        <RotatingStamp text="AUTHENTIC · VSS · ORIGINAL · " />
        <div className="absolute inset-0 flex items-center justify-center">
          <Asterisk className="w-3 h-3 text-vss-paper/60" />
        </div>
      </motion.div>

      <div className="absolute top-1/2 left-2 -translate-y-1/2 text-[10px] font-mono tracking-widest text-vss-fog/50 rotate-90 origin-center hidden xl:block whitespace-nowrap">
        VSS / NOTHING / DROP_001 / SS26
      </div>
      <div className="absolute top-1/2 right-2 -translate-y-1/2 text-[10px] font-mono tracking-widest text-vss-fog/50 -rotate-90 origin-center hidden xl:block whitespace-nowrap">
        ALL BLACK · NO COMPROMISE
      </div>

      {/* MAIN CONTENT */}
      <div className="container-vss relative z-10 w-full flex-1 flex items-center pt-6 md:pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center w-full">
          {/* LEFT */}
          <div className="lg:col-span-6 xl:col-span-5 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="h-px w-10 bg-vss-paper" />
              <Asterisk className="w-3 h-3 text-vss-paper" />
              <p className="text-[10px] md:text-xs tracking-[0.4em] text-vss-paper font-mono font-bold uppercase">
                VISION · STYLE · STATUS
              </p>
            </motion.div>

            <div className="relative inline-block">
              <div className="absolute -top-5 left-0 text-[10px] font-mono tracking-widest text-vss-fog hidden md:flex items-center gap-1.5">
                <PlusMarker className="w-2 h-2" />
                EST. 2026
              </div>

              <motion.h1
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.4, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="text-display text-[28vw] md:text-[18vw] lg:text-[14vw] xl:text-[12vw] leading-[0.8] font-bold tracking-tightest text-vss-paper glow-text-strong"
              >
                VSS
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.08 }}
                transition={{ duration: 2, delay: 1.2 }}
                className="absolute inset-0 text-display text-[28vw] md:text-[18vw] lg:text-[14vw] xl:text-[12vw] leading-[0.8] font-bold tracking-tightest text-stroke-thick pointer-events-none"
                style={{ transform: "translate(8px, 8px)" }}
              >
                VSS
              </motion.div>

              <div className="absolute -bottom-5 left-0 text-[10px] font-mono tracking-widest text-vss-fog hidden md:flex items-center gap-1.5">
                <PlusMarker className="w-2 h-2" />
                001 / KH / UA
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.1 }}
              className="mt-8 mb-3 max-w-md"
            >
              <p className="text-lg md:text-xl lg:text-2xl text-vss-paper font-bold leading-snug glow-text">
                {locale === "uk" ? "Перший дроп — NOTHING." : "Первый дроп — NOTHING."}
              </p>
              <p className="text-sm md:text-base text-vss-mist mt-2 leading-relaxed">
                {locale === "uk" ? "13 речей. All-black. Щільні тканини. Обмежена партія." : "13 вещей. All-black. Плотные ткани. Ограниченная партия."}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-7"
            >
              <Link href="/catalog" className="flex-1 sm:flex-initial">
                <Button variant="primary" size="lg" fullWidth arrow>
                  {locale === "uk" ? "КАТАЛОГ" : "КАТАЛОГ"}
                </Button>
              </Link>
              <Link href="/catalog?drop=nothing" className="flex-1 sm:flex-initial">
                <Button variant="outline" size="lg" fullWidth arrow>
                  {locale === "uk" ? "ДРОП" : "ДРОП"}
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.5 }}
              className="grid grid-cols-3 gap-px bg-vss-smoke mt-7 max-w-sm"
            >
              {[
                { num: "13", label: { uk: "РЕЧЕЙ", ru: "ВЕЩЕЙ" } },
                { num: "24h", label: { uk: "ВІДПРАВКА", ru: "ОТПРАВКА" } },
                { num: "1500₴", label: { uk: "FREE SHIP", ru: "FREE SHIP" } },
              ].map((stat, i) => (
                <div key={i} className="bg-vss-obsidian/80 backdrop-blur-md p-3 md:p-4 relative group">
                  <CornerBrackets className="text-vss-fog/40 group-hover:text-vss-paper transition-colors" />
                  <div className="text-display text-lg md:text-xl font-bold text-vss-paper">{stat.num}</div>
                  <div className="text-[8px] tracking-widest font-mono uppercase text-vss-mist mt-0.5">
                    {stat.label[locale]}
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.7 }}
              className="mt-6 md:hidden"
            >
              <WorkSchedule variant="inline" />
            </motion.div>
          </div>

          {/* RIGHT: HOODIE */}
          <div className="lg:col-span-6 xl:col-span-7 relative flex items-center justify-center pointer-events-none">
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.6, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[600px] xl:max-w-[700px] aspect-square"
            >
              <motion.div
                animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.05, 1] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-[-20%] rounded-full bg-radial-glow-strong blur-3xl pointer-events-none"
              />
              <motion.div
                animate={{ opacity: [0.15, 0.35, 0.15] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute inset-[-10%] rounded-full bg-gradient-radial from-vss-paper/10 to-transparent blur-2xl pointer-events-none"
              />

              <motion.div
                animate={{
                  y: [0, -18, -5, -22, 0],
                  rotate: [0, -1.5, 0.8, -0.5, 0],
                  scale: [1, 1.01, 0.99, 1.015, 1],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", times: [0, 0.25, 0.5, 0.75, 1] }}
                className="relative w-full h-full"
              >
                <motion.div
                  animate={{ scaleX: [1, 1.1, 0.95, 1.05, 1], opacity: [0.3, 0.2, 0.35, 0.15, 0.3] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-[-5%] left-[15%] right-[15%] h-[15%] bg-radial-glow blur-2xl pointer-events-none"
                />
                <SafeImage
                  src={brandImages.heroHoodie}
                  alt="VSS Shadow Hoodie"
                  fill
                  priority
                  className="object-contain drop-shadow-[0_40px_100px_rgba(0,0,0,0.9)]"
                  sizes="(max-width: 1024px) 90vw, 50vw"
                />
              </motion.div>

              {/* TAG left */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 1.6 }}
                className="absolute top-[10%] left-[-5%] hidden lg:block z-20 pointer-events-auto"
              >
                <div className="relative">
                  <div className="absolute -top-4 left-6 w-px h-4 bg-vss-fog/60" />
                  <div className="absolute -top-1 left-5 w-2.5 h-2.5 rounded-full border border-vss-fog/60 bg-vss-void" />
                  <div className="bg-vss-void/90 backdrop-blur-xl border border-vss-smoke p-4 min-w-[180px]">
                    <CornerBrackets className="text-vss-fog/40" />
                    <div className="text-[8px] font-mono tracking-widest text-vss-fog mb-1">DROP / NOTHING</div>
                    <div className="text-vss-paper font-bold text-base tracking-wider">SHADOW HOODIE</div>
                    <div className="w-full h-px bg-vss-smoke my-2" />
                    <Price amount={1199} size="md" variant="highlight" />
                  </div>
                </div>
              </motion.div>

              {/* SPECS right */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 1.8 }}
                className="absolute top-[20%] right-[-3%] hidden lg:block z-20 pointer-events-auto"
              >
                <div className="bg-vss-void/90 backdrop-blur-xl border border-vss-smoke p-4 w-[170px]">
                  <CornerBrackets className="text-vss-fog/40" />
                  <div className="flex items-center gap-1.5 mb-3">
                    <Crosshair size={10} className="text-vss-paper" />
                    <span className="text-[9px] font-mono tracking-widest text-vss-paper font-bold">SPECS</span>
                  </div>
                  <div className="space-y-2">
                    <SpecLine label="Weight" value="420 g/m²" />
                    <SpecLine label="Cotton" value="100%" />
                    <SpecLine label="Fit" value="Oversize" />
                    <SpecLine label="Drop" value="Shoulder" />
                  </div>
                </div>
              </motion.div>

              {/* SIZES */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 2 }}
                className="absolute bottom-[15%] left-[0%] hidden lg:block z-20 pointer-events-auto"
              >
                <div className="bg-vss-void/90 backdrop-blur-xl border border-vss-smoke p-3">
                  <div className="text-[8px] font-mono tracking-widest text-vss-fog mb-2">
                    {locale === "uk" ? "РОЗМІРИ" : "РАЗМЕРЫ"}
                  </div>
                  <div className="flex gap-1">
                    {["S", "M", "L", "XL", "XXL"].map((s, i) => (
                      <div
                        key={s}
                        className={`w-7 h-7 flex items-center justify-center text-[10px] font-mono font-bold border ${
                          i === 2 ? "bg-vss-paper text-vss-void border-vss-paper" : "text-vss-bone border-vss-smoke hover:border-vss-paper"
                        } transition-colors cursor-pointer`}
                      >
                        {s}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 2.2 }}
                className="absolute bottom-[5%] right-[5%] z-20 pointer-events-auto"
              >
                <Link
                  href="/product/shadow-hoodie-void"
                  className="group inline-flex items-center gap-3 px-6 py-3 bg-vss-paper text-vss-void text-[11px] font-bold tracking-widest uppercase hover:bg-vss-glow transition-all whitespace-nowrap shadow-[0_8px_40px_rgba(0,0,0,0.6)]"
                >
                  {locale === "uk" ? "ЗАМОВИТИ" : "ЗАКАЗАТЬ"}
                  <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ duration: 1, delay: 2.4 }}
                className="absolute top-[30%] left-[35%] hidden lg:block pointer-events-none"
              >
                <Crosshair size={18} className="text-vss-paper/40" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ duration: 1, delay: 2.6 }}
                className="absolute top-[55%] right-[30%] hidden lg:block pointer-events-none"
              >
                <Crosshair size={18} className="text-vss-paper/40" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 2.7 }}
                className="absolute bottom-[8%] left-[40%] hidden xl:block z-10"
              >
                <CareSymbols className="text-vss-bone/30" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom marquee */}
      <div className="relative z-10 border-t border-vss-smoke bg-vss-void/90 backdrop-blur-md py-2.5 overflow-hidden">
        <div className="flex animate-marquee-fast whitespace-nowrap text-[10px] font-mono tracking-widest text-vss-paper font-bold">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-6 mx-6">
              <Asterisk className="w-2.5 h-2.5 shrink-0" />
              <span>NOTHING DROP</span>
              <span className="text-vss-fog">/</span>
              <span>FREE SHIPPING 1500₴+</span>
              <span className="text-vss-fog">/</span>
              <span>USDT ACCEPTED</span>
              <span className="text-vss-fog">/</span>
              <span>ПН ВТ ЧТ ПТ 11:00–18:00</span>
              <span className="text-vss-fog">/</span>
              <span>NOVA POSHTA 1-3 DAYS</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}