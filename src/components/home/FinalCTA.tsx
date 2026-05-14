"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { Asterisk, RotatingStamp, TechGrid, PlusMarker } from "@/components/ui/Decorations";

export function FinalCTA() {
  const { locale } = useLocale();

  return (
    <section className="py-32 md:py-48 bg-vss-void relative overflow-hidden">
      <TechGrid />
      <div className="absolute inset-0 bg-radial-glow opacity-50 animate-glow-pulse" />

      <div className="absolute top-20 left-10 w-24 h-24 text-vss-fog hidden lg:block opacity-50">
        <RotatingStamp text="LAST CHANCE · NOTHING LASTS · " />
      </div>
      <div className="absolute bottom-20 right-10 w-24 h-24 text-vss-fog hidden lg:block opacity-50">
        <RotatingStamp text="VSS · ARCHIVE · 001 · " />
      </div>

      <div className="container-vss relative z-10 text-center max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-3 mb-10"
        >
          <span className="h-px w-12 bg-vss-paper" />
          <Asterisk className="w-3 h-3 text-vss-paper" />
          <p className="text-[10px] md:text-xs tracking-[0.5em] text-vss-paper font-mono font-bold uppercase glow-text">
            LIMITED · DROP · ARCHIVE
          </p>
          <Asterisk className="w-3 h-3 text-vss-paper" />
          <span className="h-px w-12 bg-vss-paper" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="text-display text-[16vw] md:text-[12vw] leading-[0.85] font-bold tracking-tightest text-vss-paper glow-text-strong mb-4"
        >
          NOTHING<br />
          <span className="text-stroke-thick">LASTS</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="max-w-md mx-auto mt-10 mb-10"
        >
          <p className="text-base md:text-lg text-vss-paper font-medium mb-2 glow-text">
            {locale === "uk" ? "Restock не гарантовано." : "Restock не гарантирован."}
          </p>
          <p className="text-sm text-vss-mist">
            {locale === "uk" ? "Бери, поки є. Архів закривається." : "Бери, пока есть. Архив закрывается."}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="grid grid-cols-3 gap-px bg-vss-smoke max-w-2xl mx-auto mb-10"
        >
          {[
            { num: "13", label: { uk: "РЕЧЕЙ", ru: "ВЕЩЕЙ" } },
            { num: "001", label: { uk: "DROP", ru: "DROP" } },
            { num: "0", label: { uk: "RESTOCK", ru: "RESTOCK" } },
          ].map((s, i) => (
            <div key={i} className="bg-vss-void/80 backdrop-blur-md py-6 relative">
              <div className="text-display text-3xl md:text-4xl font-bold text-vss-paper glow-text">{s.num}</div>
              <div className="text-[9px] tracking-widest font-mono text-vss-mist uppercase mt-1">
                {s.label[locale]}
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/catalog">
            <Button variant="primary" size="lg" arrow>
              {locale === "uk" ? "Обери свій дроп" : "Выбери свой дроп"}
            </Button>
          </Link>
          <a href="https://t.me/vss_kh" target="_blank" rel="noreferrer">
            <Button variant="outline" size="lg" arrow>
              Telegram
            </Button>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-6 text-[10px] font-mono tracking-widest text-vss-fog"
        >
          <div className="flex items-center gap-1.5">
            <PlusMarker className="w-2 h-2" />
            <span>FREE SHIPPING 1500₴+</span>
          </div>
          <div className="flex items-center gap-1.5">
            <PlusMarker className="w-2 h-2" />
            <span>USDT ACCEPTED</span>
          </div>
          <div className="flex items-center gap-1.5">
            <PlusMarker className="w-2 h-2" />
            <span>NOVA POSHTA 1-3 DAYS</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}