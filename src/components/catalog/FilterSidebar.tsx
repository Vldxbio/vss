"use client";

import { motion } from "framer-motion";
import { X, Check } from "lucide-react";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { useCatalogFilters } from "@/lib/hooks/useCatalogFilters";
import { Asterisk, CornerBrackets, PlusMarker } from "@/components/ui/Decorations";
import type { Category, Size, ProductBadge } from "@/types";
import { cn } from "@/lib/utils/cn";

const categories: { key: Category; label: { uk: string; ru: string } }[] = [
  { key: "hoodie", label: { uk: "Худі", ru: "Худи" } },
  { key: "tee", label: { uk: "Футболки", ru: "Футболки" } },
  { key: "jeans", label: { uk: "Джинси", ru: "Джинсы" } },
  { key: "shorts", label: { uk: "Шорти", ru: "Шорты" } },
  { key: "socks", label: { uk: "Шкарпетки", ru: "Носки" } },
];

const sizes: Size[] = ["XS", "S", "M", "L", "XL", "XXL"];

const badges: { key: ProductBadge; label: { uk: string; ru: string } }[] = [
  { key: "new", label: { uk: "Нове", ru: "Новое" } },
  { key: "limited", label: { uk: "Ліміт", ru: "Лимит" } },
  { key: "drop", label: { uk: "Дроп", ru: "Дроп" } },
];

const priceRanges = [
  { min: 0, max: 500, label: "до 500 ₴" },
  { min: 500, max: 800, label: "500 — 800 ₴" },
  { min: 800, max: 1200, label: "800 — 1200 ₴" },
  { min: 1200, max: 9999, label: "від 1200 ₴" },
];

interface FilterSidebarProps {
  totalCount: number;
  filteredCount: number;
}

export function FilterSidebar({ totalCount, filteredCount }: FilterSidebarProps) {
  const { locale } = useLocale();
  const { filters, updateFilter, toggleArrayFilter, clearFilters, activeCount } = useCatalogFilters();

  return (
    <aside className="w-full">
      <div className="sticky top-24 space-y-px bg-vss-smoke">
        {/* Header */}
        <div className="bg-vss-graphite p-5 relative">
          <CornerBrackets className="text-vss-fog/40" />
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Asterisk className="w-3 h-3 text-vss-paper" />
              <span className="text-[10px] font-mono tracking-[0.4em] text-vss-paper font-bold uppercase">
                {locale === "uk" ? "ФІЛЬТРИ" : "ФИЛЬТРЫ"}
              </span>
            </div>
            {activeCount > 0 && (
              <span className="px-2 py-0.5 bg-vss-paper text-vss-void text-[9px] font-mono font-bold tracking-widest tabular-nums">
                {activeCount}
              </span>
            )}
          </div>
          <div className="text-[10px] font-mono text-vss-mist">
            {locale === "uk" ? "Знайдено" : "Найдено"}:{" "}
            <span className="text-vss-paper font-bold tabular-nums">{filteredCount}</span>
            <span className="text-vss-fog"> / {totalCount}</span>
          </div>
          {activeCount > 0 && (
            <button
              onClick={clearFilters}
              className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-mono tracking-widest text-vss-mist hover:text-vss-paper transition-colors uppercase"
            >
              <X size={11} strokeWidth={2} />
              {locale === "uk" ? "Очистити все" : "Очистить всё"}
            </button>
          )}
        </div>

        {/* Categories */}
        <FilterGroup title={locale === "uk" ? "КАТЕГОРІЯ" : "КАТЕГОРИЯ"} number="01">
          <div className="space-y-1">
            <button
              onClick={() => updateFilter("category", null)}
              className={cn(
                "w-full flex items-center justify-between py-1.5 px-2 text-xs font-medium transition-colors text-left",
                !filters.category ? "bg-vss-paper text-vss-void" : "text-vss-bone hover:text-vss-paper"
              )}
            >
              <span>{locale === "uk" ? "Усі" : "Все"}</span>
              {!filters.category && <Check size={11} strokeWidth={2.5} />}
            </button>
            {categories.map((c) => (
              <button
                key={c.key}
                onClick={() => updateFilter("category", filters.category === c.key ? null : c.key)}
                className={cn(
                  "w-full flex items-center justify-between py-1.5 px-2 text-xs font-medium transition-colors text-left",
                  filters.category === c.key ? "bg-vss-paper text-vss-void" : "text-vss-bone hover:text-vss-paper"
                )}
              >
                <span>{c.label[locale]}</span>
                {filters.category === c.key && <Check size={11} strokeWidth={2.5} />}
              </button>
            ))}
          </div>
        </FilterGroup>

        {/* Sizes */}
        <FilterGroup title={locale === "uk" ? "РОЗМІР" : "РАЗМЕР"} number="02">
          <div className="grid grid-cols-3 gap-1.5">
            {sizes.map((s) => {
              const active = filters.sizes.includes(s);
              return (
                <button
                  key={s}
                  onClick={() => toggleArrayFilter("sizes", s)}
                  className={cn(
                    "h-9 text-[11px] font-mono font-bold border transition-all",
                    active
                      ? "bg-vss-paper text-vss-void border-vss-paper"
                      : "text-vss-bone border-vss-smoke hover:border-vss-paper"
                  )}
                >
                  {s}
                </button>
              );
            })}
          </div>
        </FilterGroup>

        {/* Badges */}
        <FilterGroup title={locale === "uk" ? "ТИП" : "ТИП"} number="03">
          <div className="flex flex-wrap gap-1.5">
            {badges.map((b) => {
              const active = filters.badges.includes(b.key);
              return (
                <button
                  key={b.key}
                  onClick={() => toggleArrayFilter("badges", b.key)}
                  className={cn(
                    "px-3 h-8 text-[10px] font-mono font-bold tracking-widest uppercase border transition-all",
                    active
                      ? "bg-vss-paper text-vss-void border-vss-paper"
                      : "text-vss-bone border-vss-smoke hover:border-vss-paper"
                  )}
                >
                  {b.label[locale]}
                </button>
              );
            })}
          </div>
        </FilterGroup>

        {/* Price */}
        <FilterGroup title={locale === "uk" ? "ЦІНА" : "ЦЕНА"} number="04">
          <div className="space-y-1">
            {priceRanges.map((r) => {
              const active = filters.priceMin === r.min && filters.priceMax === r.max;
              return (
                <button
                  key={r.label}
                  onClick={() => {
                    if (active) {
                      updateFilter("priceMin", undefined);
                      updateFilter("priceMax", undefined);
                    } else {
                      updateFilter("priceMin", r.min);
                      updateFilter("priceMax", r.max);
                    }
                  }}
                  className={cn(
                    "w-full flex items-center justify-between py-1.5 px-2 text-xs font-medium transition-colors text-left",
                    active ? "bg-vss-paper text-vss-void" : "text-vss-bone hover:text-vss-paper"
                  )}
                >
                  <span className="font-mono">{r.label}</span>
                  {active && <Check size={11} strokeWidth={2.5} />}
                </button>
              );
            })}
          </div>
        </FilterGroup>

        {/* In stock */}
        <FilterGroup title={locale === "uk" ? "НАЯВНІСТЬ" : "НАЛИЧИЕ"} number="05">
          <button
            onClick={() => updateFilter("inStock", !filters.inStock)}
            className="w-full flex items-center gap-2.5 py-2 px-2 text-xs font-medium transition-colors text-left group"
          >
            <div className={cn(
              "w-4 h-4 border flex items-center justify-center transition-all",
              filters.inStock ? "bg-vss-paper border-vss-paper" : "border-vss-smoke group-hover:border-vss-paper"
            )}>
              {filters.inStock && <Check size={10} strokeWidth={3} className="text-vss-void" />}
            </div>
            <span className={filters.inStock ? "text-vss-paper" : "text-vss-bone"}>
              {locale === "uk" ? "Тільки в наявності" : "Только в наличии"}
            </span>
          </button>
        </FilterGroup>
      </div>
    </aside>
  );
}

function FilterGroup({ title, number, children }: { title: string; number: string; children: React.ReactNode }) {
  return (
    <div className="bg-vss-graphite p-5 relative">
      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-center gap-2">
          <PlusMarker className="w-2 h-2 text-vss-fog" />
          <span className="text-[10px] font-mono tracking-[0.3em] text-vss-paper font-bold uppercase">
            {title}
          </span>
        </div>
        <span className="text-[9px] font-mono text-vss-fog tracking-widest">/ {number}</span>
      </div>
      {children}
    </div>
  );
}