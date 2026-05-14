"use client";

import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { useCatalogFilters } from "@/lib/hooks/useCatalogFilters";

const categoryLabels: Record<string, { uk: string; ru: string }> = {
  hoodie: { uk: "Худі", ru: "Худи" },
  tee: { uk: "Футболки", ru: "Футболки" },
  jeans: { uk: "Джинси", ru: "Джинсы" },
  shorts: { uk: "Шорти", ru: "Шорты" },
  socks: { uk: "Шкарпетки", ru: "Носки" },
};

const badgeLabels: Record<string, { uk: string; ru: string }> = {
  new: { uk: "Нове", ru: "Новое" },
  limited: { uk: "Ліміт", ru: "Лимит" },
  drop: { uk: "Дроп", ru: "Дроп" },
};

export function ActiveFilters() {
  const { filters, updateFilter, toggleArrayFilter, clearFilters, activeCount } = useCatalogFilters();
  const { locale } = useLocale();

  if (activeCount === 0) return null;

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-[10px] font-mono tracking-widest text-vss-fog uppercase">
        {locale === "uk" ? "АКТИВНО:" : "АКТИВНО:"}
      </span>

      <AnimatePresence>
        {filters.category && (
          <Chip key="cat" onRemove={() => updateFilter("category", null)}>
            {categoryLabels[filters.category][locale]}
          </Chip>
        )}
        {filters.sizes.map((s) => (
          <Chip key={`s-${s}`} onRemove={() => toggleArrayFilter("sizes", s)}>
            {s}
          </Chip>
        ))}
        {filters.badges.map((b) => (
          <Chip key={`b-${b}`} onRemove={() => toggleArrayFilter("badges", b)}>
            {badgeLabels[b][locale]}
          </Chip>
        ))}
        {filters.inStock && (
          <Chip key="stock" onRemove={() => updateFilter("inStock", false)}>
            {locale === "uk" ? "В наявності" : "В наличии"}
          </Chip>
        )}
        {(filters.priceMin || filters.priceMax) && (
          <Chip
            key="price"
            onRemove={() => {
              updateFilter("priceMin", undefined);
              updateFilter("priceMax", undefined);
            }}
          >
            {filters.priceMin || 0}–{filters.priceMax || "∞"} ₴
          </Chip>
        )}
      </AnimatePresence>

      <button
        onClick={clearFilters}
        className="text-[10px] font-mono tracking-widest text-vss-mist hover:text-vss-paper underline underline-offset-2 uppercase ml-1"
      >
        {locale === "uk" ? "Очистити" : "Очистить"}
      </button>
    </div>
  );
}

function Chip({ children, onRemove }: { children: React.ReactNode; onRemove: () => void }) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.2 }}
      onClick={onRemove}
      className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-vss-paper text-vss-void text-[10px] font-mono font-bold tracking-widest uppercase hover:bg-vss-glow transition-colors"
    >
      {children}
      <X size={10} strokeWidth={2.5} />
    </motion.button>
  );
}