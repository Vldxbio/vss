"use client";

import { useMemo, Suspense } from "react";
import { motion } from "framer-motion";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { useCatalogFilters } from "@/lib/hooks/useCatalogFilters";
import { filterProducts } from "@/lib/utils/filterProducts";
import { products } from "@/lib/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { FilterSidebar } from "@/components/catalog/FilterSidebar";
import { MobileFilterDrawer } from "@/components/catalog/MobileFilterDrawer";
import { SortSelector } from "@/components/catalog/SortSelector";
import { ActiveFilters } from "@/components/catalog/ActiveFilters";
import { EmptyState } from "@/components/catalog/EmptyState";
import { Asterisk, CornerBrackets, PlusMarker, Crosshair, RotatingStamp } from "@/components/ui/Decorations";
import Link from "next/link";

function CatalogPageInner() {
  const { locale } = useLocale();
  const { filters } = useCatalogFilters();

  const filtered = useMemo(() => filterProducts(products, filters), [filters]);

  const categoryName: Record<string, { uk: string; ru: string }> = {
    hoodie: { uk: "Худі", ru: "Худи" },
    tee: { uk: "Футболки", ru: "Футболки" },
    jeans: { uk: "Джинси", ru: "Джинсы" },
    shorts: { uk: "Шорти", ru: "Шорты" },
    socks: { uk: "Шкарпетки", ru: "Носки" },
  };

  const pageTitle = filters.category ? categoryName[filters.category][locale] : (locale === "uk" ? "Весь каталог" : "Весь каталог");

  return (
    <div className="relative bg-vss-obsidian min-h-screen">
      {/* BG decorations */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-radial-glow opacity-15 blur-3xl pointer-events-none" />
      <div className="absolute top-3/4 left-0 w-[400px] h-[400px] bg-radial-glow opacity-10 blur-3xl pointer-events-none" />

      <div className="absolute top-32 right-8 w-16 h-16 text-vss-fog/40 hidden xl:block pointer-events-none">
        <RotatingStamp text="VSS · CATALOG · " />
      </div>

      {/* Top section: breadcrumbs + title */}
      <div className="relative border-b border-vss-smoke">
        <div className="container-vss py-10 md:py-14">
          {/* Breadcrumbs */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-vss-fog uppercase mb-6"
          >
            <Link href="/" className="hover:text-vss-paper transition-colors">VSS</Link>
            <span>/</span>
            <Link href="/catalog" className="hover:text-vss-paper transition-colors">
              {locale === "uk" ? "КАТАЛОГ" : "КАТАЛОГ"}
            </Link>
            {filters.category && (
              <>
                <span>/</span>
                <span className="text-vss-paper font-bold">{categoryName[filters.category][locale].toUpperCase()}</span>
              </>
            )}
          </motion.div>

          {/* Header */}
          <div className="flex items-end justify-between flex-wrap gap-6">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 mb-4"
              >
                <span className="h-px w-8 bg-vss-paper" />
                <Asterisk className="w-3 h-3 text-vss-paper" />
                <span className="text-[10px] tracking-[0.4em] text-vss-paper font-mono font-bold uppercase">
                  {locale === "uk" ? "КАТАЛОГ" : "КАТАЛОГ"} / 001
                </span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-display text-5xl md:text-7xl font-bold tracking-tightest text-vss-paper leading-[0.9] glow-text"
              >
                {pageTitle.toUpperCase()}
              </motion.h1>

              <div className="mt-4 flex items-center gap-4 text-[10px] font-mono tracking-widest text-vss-mist uppercase">
                <div className="flex items-center gap-1.5">
                  <Crosshair size={11} className="text-vss-paper" />
                  <span className="text-vss-paper font-bold tabular-nums">{filtered.length}</span>
                  <span>{locale === "uk" ? "ТОВАРІВ" : "ТОВАРОВ"}</span>
                </div>
                <span className="text-vss-fog">·</span>
                <div className="flex items-center gap-1.5">
                  <PlusMarker className="w-2 h-2" />
                  <span>{locale === "uk" ? "ВСЬОГО" : "ВСЕГО"}: {products.length}</span>
                </div>
              </div>
            </div>

            {/* Right: stats */}
            <div className="hidden md:flex items-center gap-px bg-vss-smoke">
              {[
                { num: products.filter(p => p.stock > 0).length, label: { uk: "В НАЯВНОСТІ", ru: "В НАЛИЧИИ" } },
                { num: products.filter(p => p.badges.includes("limited")).length, label: { uk: "ЛІМІТ", ru: "ЛИМИТ" } },
                { num: products.filter(p => p.badges.includes("new")).length, label: { uk: "НОВЕ", ru: "НОВОЕ" } },
              ].map((s, i) => (
                <div key={i} className="bg-vss-graphite p-3 px-4 relative">
                  <CornerBrackets className="text-vss-fog/30" />
                  <div className="text-display text-xl font-bold text-vss-paper tabular-nums">{s.num}</div>
                  <div className="text-[8px] font-mono tracking-widest text-vss-mist uppercase mt-0.5">
                    {s.label[locale]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main grid */}
      <div className="container-vss py-8 md:py-12 relative">
        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          {/* Sidebar (desktop) */}
          <div className="hidden lg:block">
            <FilterSidebar totalCount={products.length} filteredCount={filtered.length} />
          </div>

          {/* Right column */}
          <div>
            {/* Toolbar */}
            <div className="flex flex-col gap-4 mb-8 pb-5 border-b border-vss-smoke">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="text-[11px] font-mono tracking-widest text-vss-mist uppercase">
                  <span className="text-vss-paper font-bold tabular-nums">{filtered.length}</span>{" "}
                  {locale === "uk" ? "результатів" : "результатов"}
                </div>
                <SortSelector />
              </div>
              <ActiveFilters />
            </div>

            {/* Products grid */}
            {filtered.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-x-4 md:gap-x-6 gap-y-12 md:gap-y-14">
                {filtered.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>
            )}

            {/* Bottom info */}
            {filtered.length > 0 && (
              <div className="mt-16 pt-8 border-t border-vss-smoke flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-vss-fog uppercase">
                  <PlusMarker className="w-2 h-2" />
                  {locale === "uk" ? "Restock не планується" : "Restock не планируется"}
                </div>
                <div className="text-[10px] font-mono tracking-widest text-vss-fog uppercase">
                  VSS · CATALOG · 001 / SS26
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter button */}
      <MobileFilterDrawer totalCount={products.length} filteredCount={filtered.length} />
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-vss-obsidian" />}>
      <CatalogPageInner />
    </Suspense>
  );
}