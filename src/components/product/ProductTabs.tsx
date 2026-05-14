"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { CareSymbols, SpecLine, PlusMarker } from "@/components/ui/Decorations";
import type { Product } from "@/types";
import { cn } from "@/lib/utils/cn";

type TabKey = "description" | "material" | "care" | "delivery";

export function ProductTabs({ product }: { product: Product }) {
  const { locale } = useLocale();
  const [active, setActive] = useState<TabKey>("description");

  const tabs: { key: TabKey; label: { uk: string; ru: string } }[] = [
    { key: "description", label: { uk: "Опис", ru: "Описание" } },
    { key: "material", label: { uk: "Матеріал", ru: "Материал" } },
    { key: "care", label: { uk: "Догляд", ru: "Уход" } },
    { key: "delivery", label: { uk: "Доставка", ru: "Доставка" } },
  ];

  return (
    <div className="border-t border-vss-smoke pt-6">
      {/* Tab buttons */}
      <div className="flex flex-wrap gap-1 mb-5">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActive(t.key)}
            className={cn(
              "px-3 h-9 text-[10px] font-mono tracking-widest font-bold uppercase transition-all border",
              active === t.key
                ? "bg-vss-paper text-vss-void border-vss-paper"
                : "text-vss-bone border-vss-smoke hover:border-vss-paper bg-vss-graphite"
            )}
          >
            {t.label[locale]}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="bg-vss-graphite border border-vss-smoke p-5 min-h-[200px]"
        >
          {active === "description" && (
            <div className="space-y-4">
              <p className="text-sm text-vss-bone leading-relaxed">
                {product.description[locale]}
              </p>
              <div className="space-y-2 pt-3 border-t border-vss-smoke">
                <SpecLine label={locale === "uk" ? "Колекція" : "Коллекция"} value={product.collection} />
                <SpecLine label={locale === "uk" ? "Категорія" : "Категория"} value={product.category} />
                <SpecLine label="ID" value={product.id.toUpperCase()} />
                <SpecLine label="Drop" value="001 / SS26" />
              </div>
            </div>
          )}

          {active === "material" && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <PlusMarker className="w-2 h-2 text-vss-paper" />
                <span className="text-[10px] font-mono tracking-widest text-vss-paper font-bold uppercase">
                  {locale === "uk" ? "СКЛАД" : "СОСТАВ"}
                </span>
              </div>
              <p className="text-sm text-vss-bone leading-relaxed">
                {product.material[locale]}
              </p>
              <div className="pt-3 border-t border-vss-smoke">
                <p className="text-[11px] font-mono text-vss-mist leading-relaxed">
                  {locale === "uk"
                    ? "Ми використовуємо тільки преміум тканини. Кожна партія проходить перевірку якості перед відправкою."
                    : "Мы используем только премиум ткани. Каждая партия проходит проверку качества перед отправкой."}
                </p>
              </div>
            </div>
          )}

          {active === "care" && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <PlusMarker className="w-2 h-2 text-vss-paper" />
                <span className="text-[10px] font-mono tracking-widest text-vss-paper font-bold uppercase">
                  {locale === "uk" ? "ІНСТРУКЦІЯ" : "ИНСТРУКЦИЯ"}
                </span>
              </div>
              <p className="text-sm text-vss-bone leading-relaxed">
                {product.care[locale]}
              </p>
              <div className="pt-4 border-t border-vss-smoke">
                <div className="text-[10px] font-mono tracking-widest text-vss-fog mb-3 uppercase">
                  {locale === "uk" ? "Символи догляду" : "Символы ухода"}
                </div>
                <CareSymbols className="text-vss-bone" />
              </div>
            </div>
          )}

          {active === "delivery" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-vss-smoke">
                <span className="text-xs text-vss-bone">{locale === "uk" ? "Нова Пошта (відділення)" : "Новая Почта (отделение)"}</span>
                <span className="text-xs font-mono text-vss-paper font-bold">1–3 {locale === "uk" ? "дні" : "дня"}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-vss-smoke">
                <span className="text-xs text-vss-bone">{locale === "uk" ? "Поштомат" : "Почтомат"}</span>
                <span className="text-xs font-mono text-vss-paper font-bold">2–4 {locale === "uk" ? "дні" : "дня"}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-vss-smoke">
                <span className="text-xs text-vss-bone">{locale === "uk" ? "Безкоштовно від" : "Бесплатно от"}</span>
                <span className="text-xs font-mono text-vss-paper font-bold">1500 ₴</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-xs text-vss-bone">{locale === "uk" ? "Обмін / повернення" : "Обмен / возврат"}</span>
                <span className="text-xs font-mono text-vss-paper font-bold">14 {locale === "uk" ? "днів" : "дней"}</span>
              </div>
              <div className="pt-3 border-t border-vss-smoke">
                <p className="text-[11px] font-mono text-vss-mist leading-relaxed">
                  {locale === "uk"
                    ? "Відправка в день замовлення, якщо оформлено до 14:00 (ПН ВТ ЧТ ПТ)."
                    : "Отправка в день заказа, если оформлено до 14:00 (ПН ВТ ЧТ ПТ)."}
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}