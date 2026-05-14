"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Plus, Minus } from "lucide-react";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { Asterisk, CornerBrackets, RotatingStamp } from "@/components/ui/Decorations";
import { cn } from "@/lib/utils/cn";

const faqs = [
  {
    q: { uk: "Як обрати правильний розмір?", ru: "Как выбрать правильный размер?" },
    a: { uk: "Усі речі — оверсайз посадка. На сторінці кожного товару є таблиця замірів. Якщо сумніваєшся — обирай свій звичайний розмір.", ru: "Все вещи — оверсайз посадка. На странице каждого товара есть таблица замеров. Если сомневаешься — выбирай свой обычный размер." },
  },
  {
    q: { uk: "Коли відправите замовлення?", ru: "Когда отправите заказ?" },
    a: { uk: "Замовлення до 14:00 у робочі дні (ПН ВТ ЧТ ПТ) відправляються того ж дня. Інші — наступного робочого дня.", ru: "Заказы до 14:00 в рабочие дни (ПН ВТ ЧТ ПТ) отправляются в тот же день. Остальные — на следующий рабочий день." },
  },
  {
    q: { uk: "Чи можна повернути товар?", ru: "Можно ли вернуть товар?" },
    a: { uk: "Так, протягом 14 днів з моменту отримання. Товар має бути в оригінальному вигляді з усіма бирками. Зворотна доставка — за рахунок покупця.", ru: "Да, в течение 14 дней с момента получения. Товар должен быть в оригинальном виде со всеми бирками. Обратная доставка — за счёт покупателя." },
  },
  {
    q: { uk: "Що якщо товару немає в наявності?", ru: "Что если товара нет в наличии?" },
    a: { uk: "Можна додати товар в обране — ми повідомимо, якщо він знову з'явиться. Але restock на більшість товарів не планується.", ru: "Можно добавить товар в избранное — мы сообщим, если он снова появится. Но restock на большинство товаров не планируется." },
  },
  {
    q: { uk: "Чи буде restock?", ru: "Будет ли restock?" },
    a: { uk: "Ні. Кожен дроп — обмежена партія. Restock не гарантовано. Якщо річ закінчилась — швидше за все, не повернеться.", ru: "Нет. Каждый дроп — ограниченная партия. Restock не гарантирован. Если вещь закончилась — скорее всего, не вернётся." },
  },
  {
    q: { uk: "Як доглядати за речами?", ru: "Как ухаживать за вещами?" },
    a: { uk: "Прання при 30°C, без відбілювання. Прасування на низькій температурі. Сушити в розправленому вигляді — НЕ в сушарці.", ru: "Стирка при 30°C, без отбеливания. Глажка на низкой температуре. Сушить в расправленном виде — НЕ в сушке." },
  },
  {
    q: { uk: "Як використати промокод?", ru: "Как использовать промокод?" },
    a: { uk: "У кошику є поле для промокоду. Один промокод можна використати один раз на одному email. Промокоди не сумуються.", ru: "В корзине есть поле для промокода. Один промокод можно использовать один раз на одном email. Промокоды не суммируются." },
  },
];

export default function FAQPage() {
  const { locale } = useLocale();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="bg-vss-obsidian min-h-screen relative">
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="absolute top-32 right-8 w-16 h-16 text-vss-fog/40 hidden xl:block pointer-events-none">
        <RotatingStamp text="VSS · FAQ · " />
      </div>

      <div className="container-vss py-10 md:py-14 relative max-w-4xl">
        <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-vss-fog uppercase mb-8">
          <Link href="/" className="hover:text-vss-paper transition-colors">VSS</Link>
          <ChevronRight size={10} strokeWidth={2} />
          <span className="text-vss-paper font-bold">FAQ</span>
        </div>

        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-vss-paper" />
            <Asterisk className="w-3 h-3 text-vss-paper" />
            <span className="text-[10px] tracking-[0.4em] text-vss-paper font-mono font-bold uppercase">
              FAQ · 8 ПИТАНЬ
            </span>
          </div>
          <h1 className="text-display text-5xl md:text-7xl font-bold tracking-tightest text-vss-paper leading-[0.9] glow-text">
            {locale === "uk" ? "ПИТАННЯ" : "ВОПРОСЫ"}
          </h1>
        </div>

        <div className="space-y-2">
          {faqs.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className={cn(
                "border bg-vss-graphite transition-colors relative",
                open === i ? "border-vss-paper" : "border-vss-smoke hover:border-vss-fog"
              )}
            >
              {open === i && <CornerBrackets className="text-vss-paper" />}
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full p-5 flex items-center justify-between gap-4 text-left"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <span className="text-[10px] font-mono tracking-widest text-vss-fog tabular-nums shrink-0">
                    / 0{i + 1}
                  </span>
                  <span className={cn("text-base font-medium", open === i ? "text-vss-paper" : "text-vss-bone")}>
                    {f.q[locale]}
                  </span>
                </div>
                <div className="shrink-0">
                  {open === i ? (
                    <Minus size={16} strokeWidth={1.5} className="text-vss-paper" />
                  ) : (
                    <Plus size={16} strokeWidth={1.5} className="text-vss-fog" />
                  )}
                </div>
              </button>

              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 pl-[68px]">
                      <p className="text-sm text-vss-bone leading-relaxed">{f.a[locale]}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-vss-mist mb-4">
            {locale === "uk" ? "Не знайшли відповідь?" : "Не нашли ответ?"}
          </p>
          <a
            href="https://t.me/vss_kh"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 h-12 bg-vss-paper text-vss-void text-xs font-bold tracking-widest uppercase hover:bg-vss-glow transition-all"
          >
            TELEGRAM →
          </a>
        </div>
      </div>
    </div>
  );
}