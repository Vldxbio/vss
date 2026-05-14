"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { useCatalogFilters } from "@/lib/hooks/useCatalogFilters";
import { Asterisk, CornerBrackets } from "@/components/ui/Decorations";

export function EmptyState() {
  const { locale } = useLocale();
  const { clearFilters } = useCatalogFilters();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="col-span-full py-24 flex flex-col items-center justify-center text-center"
    >
      <div className="relative bg-vss-graphite border border-vss-smoke p-10 max-w-md">
        <CornerBrackets className="text-vss-fog/40" />

        <div className="text-[10px] font-mono tracking-[0.4em] text-vss-fog uppercase mb-4 flex items-center justify-center gap-2">
          <Asterisk className="w-3 h-3" />
          NULL RESULT
          <Asterisk className="w-3 h-3" />
        </div>

        <div className="text-display text-7xl font-bold tracking-tightest text-vss-paper mb-2 glow-text">
          0
        </div>
        <div className="text-[10px] font-mono tracking-widest text-vss-fog uppercase mb-6">
          {locale === "uk" ? "ТОВАРІВ ЗНАЙДЕНО" : "ТОВАРОВ НАЙДЕНО"}
        </div>

        <p className="text-sm text-vss-bone leading-relaxed mb-6">
          {locale === "uk"
            ? "За цими фільтрами нічого немає. Спробуй інші параметри або очисть всі фільтри."
            : "По этим фильтрам ничего нет. Попробуй другие параметры или очисть все фильтры."}
        </p>

        <button
          onClick={clearFilters}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-vss-paper text-vss-void text-[11px] font-bold tracking-widest uppercase hover:bg-vss-glow transition-colors"
        >
          {locale === "uk" ? "Очистити фільтри" : "Очистить фильтры"} →
        </button>
      </div>
    </motion.div>
  );
}