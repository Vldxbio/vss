"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowUpRight, TrendingUp } from "lucide-react";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { products } from "@/lib/data/products";
import { SafeImage } from "@/components/ui/SafeImage";
import { Price } from "@/components/ui/Price";
import { Asterisk, PlusMarker } from "@/components/ui/Decorations";

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

const popularSearches = [
  { uk: "Худі", ru: "Худи", q: "hoodie" },
  { uk: "Футболки", ru: "Футболки", q: "tee" },
  { uk: "Джинси", ru: "Джинсы", q: "jeans" },
  { uk: "Шорти", ru: "Шорты", q: "shorts" },
  { uk: "Шкарпетки", ru: "Носки", q: "socks" },
];

export function SearchModal({ open, onClose }: SearchModalProps) {
  const { locale, t } = useLocale();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setQuery("");
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return products
      .filter((p) =>
        p.name[locale].toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.collection.toLowerCase().includes(q) ||
        p.tags.some((tag) => tag.toLowerCase().includes(q))
      )
      .slice(0, 8);
  }, [query, locale]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-vss-void/85 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-0 z-[70] max-h-screen overflow-y-auto"
          >
            <div className="container-vss pt-6 md:pt-10 pb-10">
              <div className="bg-vss-obsidian border border-vss-smoke">
                {/* Search input */}
                <div className="flex items-center gap-3 px-5 py-4 border-b border-vss-smoke">
                  <Search size={18} strokeWidth={1.5} className="text-vss-paper shrink-0" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={locale === "uk" ? "Шукати товари..." : "Искать товары..."}
                    className="flex-1 bg-transparent text-base md:text-lg text-vss-paper placeholder:text-vss-fog outline-none font-medium"
                  />
                  <span className="hidden md:inline-flex text-[10px] font-mono tracking-widest text-vss-fog px-2 py-1 border border-vss-smoke">
                    ESC
                  </span>
                  <button
                    onClick={onClose}
                    className="text-vss-bone hover:text-vss-paper transition-colors"
                    aria-label="Close"
                  >
                    <X size={18} strokeWidth={1.5} />
                  </button>
                </div>

                {/* Content */}
                <div className="p-5 max-h-[60vh] overflow-y-auto">
                  {!query.trim() ? (
                    <>
                      {/* Popular */}
                      <div className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                          <TrendingUp size={11} strokeWidth={1.5} className="text-vss-paper" />
                          <span className="text-[10px] font-mono tracking-widest text-vss-paper font-bold uppercase">
                            {locale === "uk" ? "ПОПУЛЯРНІ" : "ПОПУЛЯРНЫЕ"}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {popularSearches.map((s) => (
                            <button
                              key={s.q}
                              onClick={() => setQuery(s[locale])}
                              className="px-3 py-1.5 border border-vss-smoke text-xs font-mono text-vss-bone hover:border-vss-paper hover:text-vss-paper transition-colors"
                            >
                              {s[locale]}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Quick links */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Asterisk className="w-2.5 h-2.5 text-vss-paper" />
                          <span className="text-[10px] font-mono tracking-widest text-vss-paper font-bold uppercase">
                            {locale === "uk" ? "ШВИДКІ ПОСИЛАННЯ" : "БЫСТРЫЕ ССЫЛКИ"}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-px bg-vss-smoke">
                          <Link
                            href="/catalog"
                            onClick={onClose}
                            className="bg-vss-graphite p-3 hover:bg-vss-ash transition-colors flex items-center justify-between group"
                          >
                            <span className="text-sm text-vss-paper">{t.nav.catalog}</span>
                            <ArrowUpRight size={14} strokeWidth={1.5} className="text-vss-fog group-hover:text-vss-paper group-hover:rotate-45 transition-all" />
                          </Link>
                          <Link
                            href="/catalog?drop=nothing"
                            onClick={onClose}
                            className="bg-vss-graphite p-3 hover:bg-vss-ash transition-colors flex items-center justify-between group"
                          >
                            <span className="text-sm text-vss-paper">NOTHING DROP</span>
                            <ArrowUpRight size={14} strokeWidth={1.5} className="text-vss-fog group-hover:text-vss-paper group-hover:rotate-45 transition-all" />
                          </Link>
                          <Link
                            href="/about"
                            onClick={onClose}
                            className="bg-vss-graphite p-3 hover:bg-vss-ash transition-colors flex items-center justify-between group"
                          >
                            <span className="text-sm text-vss-paper">{t.nav.about}</span>
                            <ArrowUpRight size={14} strokeWidth={1.5} className="text-vss-fog group-hover:text-vss-paper group-hover:rotate-45 transition-all" />
                          </Link>
                          <Link
                            href="/delivery"
                            onClick={onClose}
                            className="bg-vss-graphite p-3 hover:bg-vss-ash transition-colors flex items-center justify-between group"
                          >
                            <span className="text-sm text-vss-paper">{t.nav.delivery}</span>
                            <ArrowUpRight size={14} strokeWidth={1.5} className="text-vss-fog group-hover:text-vss-paper group-hover:rotate-45 transition-all" />
                          </Link>
                        </div>
                      </div>
                    </>
                  ) : results.length === 0 ? (
                    <div className="py-12 text-center">
                      <div className="text-display text-5xl font-bold text-vss-paper mb-2 glow-text">0</div>
                      <p className="text-sm text-vss-mist">
                        {locale === "uk" ? "Нічого не знайдено за запитом" : "Ничего не найдено по запросу"}
                      </p>
                      <p className="text-xs font-mono text-vss-fog mt-1">"{query}"</p>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <PlusMarker className="w-2 h-2 text-vss-paper" />
                          <span className="text-[10px] font-mono tracking-widest text-vss-paper font-bold uppercase">
                            {locale === "uk" ? "ЗНАЙДЕНО" : "НАЙДЕНО"}
                          </span>
                          <span className="text-[10px] font-mono tracking-widest text-vss-fog tabular-nums">
                            {results.length}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        {results.map((p) => (
                          <Link
                            key={p.id}
                            href={`/product/${p.slug}`}
                            onClick={onClose}
                            className="flex items-center gap-3 p-2 hover:bg-vss-graphite transition-colors group"
                          >
                            <div className="relative w-12 h-14 bg-vss-graphite border border-vss-smoke shrink-0 overflow-hidden">
                              <SafeImage src={p.images[0]} alt="" fill className="object-cover" sizes="48px" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-[9px] font-mono tracking-widest text-vss-fog uppercase">
                                {p.collection} · {t.categories[p.category]}
                              </div>
                              <div className="text-sm text-vss-paper font-medium truncate group-hover:text-vss-glow transition-colors">
                                {p.name[locale]}
                              </div>
                            </div>
                            <Price amount={p.price} size="sm" />
                            <ArrowUpRight size={14} strokeWidth={1.5} className="text-vss-fog group-hover:text-vss-paper group-hover:rotate-45 transition-all shrink-0" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}