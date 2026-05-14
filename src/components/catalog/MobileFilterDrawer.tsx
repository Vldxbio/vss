"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import { FilterSidebar } from "./FilterSidebar";
import { useCatalogFilters } from "@/lib/hooks/useCatalogFilters";
import { useLocale } from "@/lib/i18n/LocaleProvider";

interface Props {
  totalCount: number;
  filteredCount: number;
}

export function MobileFilterDrawer({ totalCount, filteredCount }: Props) {
  const [open, setOpen] = useState(false);
  const { activeCount } = useCatalogFilters();
  const { locale } = useLocale();

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-30 inline-flex items-center gap-2 px-5 py-3 bg-vss-paper text-vss-void text-xs font-bold tracking-widest uppercase rounded-full shadow-2xl"
      >
        <SlidersHorizontal size={14} strokeWidth={2.5} />
        {locale === "uk" ? "ФІЛЬТРИ" : "ФИЛЬТРЫ"}
        {activeCount > 0 && (
          <span className="ml-1 px-1.5 py-0.5 bg-vss-void text-vss-paper rounded-full text-[9px] font-mono tabular-nums">
            {activeCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-vss-void/80 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-vss-obsidian border-t border-vss-smoke max-h-[85vh] overflow-y-auto lg:hidden"
            >
              <div className="sticky top-0 bg-vss-obsidian border-b border-vss-smoke flex items-center justify-between p-4 z-10">
                <span className="text-xs font-mono tracking-widest text-vss-paper font-bold uppercase">
                  {locale === "uk" ? "ФІЛЬТРИ" : "ФИЛЬТРЫ"}
                </span>
                <button onClick={() => setOpen(false)} className="text-vss-bone hover:text-vss-paper">
                  <X size={20} strokeWidth={1.5} />
                </button>
              </div>
              <div className="p-4">
                <FilterSidebar totalCount={totalCount} filteredCount={filteredCount} />
              </div>
              <div className="sticky bottom-0 bg-vss-obsidian border-t border-vss-smoke p-4">
                <button
                  onClick={() => setOpen(false)}
                  className="w-full py-3 bg-vss-paper text-vss-void text-xs font-bold tracking-widest uppercase"
                >
                  {locale === "uk" ? `Показати ${filteredCount}` : `Показать ${filteredCount}`}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}