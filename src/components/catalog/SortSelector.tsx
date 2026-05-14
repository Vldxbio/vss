"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, ArrowDownUp } from "lucide-react";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { useCatalogFilters, SortOption } from "@/lib/hooks/useCatalogFilters";
import { cn } from "@/lib/utils/cn";

const sortOptions: { value: SortOption; label: { uk: string; ru: string } }[] = [
  { value: "newest", label: { uk: "Новинки", ru: "Новинки" } },
  { value: "popular", label: { uk: "Популярні", ru: "Популярные" } },
  { value: "price-asc", label: { uk: "Дешевше", ru: "Дешевле" } },
  { value: "price-desc", label: { uk: "Дорожче", ru: "Дороже" } },
  { value: "limited", label: { uk: "Лімітовані", ru: "Лимитированные" } },
];

export function SortSelector() {
  const { locale } = useLocale();
  const { filters, updateFilter } = useCatalogFilters();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const currentLabel = sortOptions.find((s) => s.value === filters.sort)?.label[locale] || "";

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-2 px-4 h-10 border border-vss-smoke hover:border-vss-paper bg-vss-graphite text-xs font-mono tracking-widest text-vss-paper transition-colors"
      >
        <ArrowDownUp size={12} strokeWidth={1.8} />
        <span className="hidden sm:inline">{locale === "uk" ? "СОРТ:" : "СОРТ:"}</span>
        <span className="font-bold uppercase">{currentLabel}</span>
        <ChevronDown size={12} strokeWidth={2} className={cn("transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-1 w-56 bg-vss-graphite border border-vss-smoke shadow-2xl z-20">
          {sortOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                updateFilter("sort", opt.value);
                setOpen(false);
              }}
              className={cn(
                "w-full text-left px-4 py-2.5 text-xs font-medium transition-colors",
                filters.sort === opt.value
                  ? "bg-vss-paper text-vss-void"
                  : "text-vss-bone hover:bg-vss-ash hover:text-vss-paper"
              )}
            >
              {opt.label[locale]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}