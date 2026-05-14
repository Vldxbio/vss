"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { CornerBrackets, Asterisk } from "@/components/ui/Decorations";

export function WhyVSS() {
  const { t, locale } = useLocale();

  return (
    <section className="py-20 md:py-32 bg-vss-obsidian relative">
      <div className="container-vss">
        <div className="mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-5"
          >
            <span className="h-px w-8 bg-vss-paper" />
            <Asterisk className="w-3 h-3 text-vss-paper" />
            <span className="text-[10px] md:text-xs tracking-[0.4em] text-vss-paper font-mono font-bold uppercase">
              WHY VSS / 005
            </span>
          </motion.div>
          <h2 className="text-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tightest text-vss-paper leading-[0.9] glow-text">
            {t.why.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-vss-smoke">
          {t.why.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-vss-obsidian p-8 md:p-10 hover:bg-vss-graphite transition-colors duration-500 group relative"
            >
              <CornerBrackets className="text-vss-smoke group-hover:text-vss-paper transition-colors" />

              <div className="flex items-start justify-between mb-6">
                <div className="text-[10px] tracking-widest font-mono text-vss-fog">
                  / 0{i + 1}
                </div>
                <div className="text-[8px] tracking-widest font-mono text-vss-fog">
                  VSS · 24
                </div>
              </div>

              <h3 className="text-display text-xl md:text-2xl font-bold text-vss-paper mb-4 tracking-tight glow-text">
                {item.title}
              </h3>
              <p className="text-sm text-vss-bone leading-relaxed">{item.text}</p>

              <div className="absolute bottom-4 right-4 opacity-20 group-hover:opacity-60 transition-opacity">
                <Asterisk className="w-3 h-3 text-vss-paper" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}