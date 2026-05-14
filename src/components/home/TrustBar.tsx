"use client";

import { motion } from "framer-motion";
import { Truck, ShieldCheck, Flame, MessageCircle, Clock } from "lucide-react";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { CornerBrackets, Asterisk } from "@/components/ui/Decorations";

export function TrustBar() {
  const { locale } = useLocale();

  const items = [
    {
      icon: Clock,
      num: "01",
      title: { uk: "ГРАФІК РОБОТИ", ru: "ГРАФИК РАБОТЫ" },
      text: { uk: "ПН · ВТ · ЧТ · ПТ — 11:00 до 18:00", ru: "ПН · ВТ · ЧТ · ПТ — 11:00 до 18:00" },
      highlight: { uk: "ПН ВТ ЧТ ПТ", ru: "ПН ВТ ЧТ ПТ" },
    },
    {
      icon: Truck,
      num: "02",
      title: { uk: "БЕЗКОШТОВНА ДОСТАВКА", ru: "БЕСПЛАТНАЯ ДОСТАВКА" },
      text: { uk: "від 1500 ₴ Новою Поштою по Україні", ru: "от 1500 ₴ Новой Почтой по Украине" },
      highlight: { uk: "1500₴+", ru: "1500₴+" },
    },
    {
      icon: Flame,
      num: "03",
      title: { uk: "ВІДПРАВКА ЗА 24 ГОД", ru: "ОТПРАВКА ЗА 24 ЧАСА" },
      text: { uk: "якщо замовлення до 14:00", ru: "если заказ до 14:00" },
      highlight: { uk: "24H", ru: "24H" },
    },
    {
      icon: ShieldCheck,
      num: "04",
      title: { uk: "ОБМІН / ПОВЕРНЕННЯ", ru: "ОБМЕН / ВОЗВРАТ" },
      text: { uk: "14 днів без зайвих питань", ru: "14 дней без лишних вопросов" },
      highlight: { uk: "14 ДНІВ", ru: "14 ДНЕЙ" },
    },
  ];

  return (
    <section className="py-14 md:py-16 bg-vss-obsidian border-y border-vss-smoke relative">
      <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
        <Asterisk className="w-3 h-3 text-vss-fog" />
        <span className="text-[9px] tracking-[0.4em] font-mono text-vss-fog uppercase">
          {locale === "uk" ? "ГАРАНТІЇ" : "ГАРАНТИИ"} / 002
        </span>
        <Asterisk className="w-3 h-3 text-vss-fog" />
      </div>

      <div className="container-vss">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-vss-smoke">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-vss-obsidian relative group hover:bg-vss-graphite transition-colors duration-500 p-6 md:p-8"
              >
                <CornerBrackets className="text-vss-smoke group-hover:text-vss-paper transition-colors" />
                <div className="absolute top-4 right-4 text-[10px] font-mono tracking-widest text-vss-fog">
                  / {item.num}
                </div>

                <div className="w-11 h-11 border border-vss-smoke flex items-center justify-center group-hover:border-vss-paper group-hover:bg-vss-paper transition-all duration-500 mb-4">
                  <Icon size={18} strokeWidth={1.4} className="text-vss-bone group-hover:text-vss-void transition-colors" />
                </div>

                <div className="inline-flex items-center px-2 py-0.5 bg-vss-paper text-vss-void text-[9px] font-mono font-bold tracking-widest mb-3">
                  {item.highlight[locale]}
                </div>

                <h4 className="text-[12px] tracking-widest font-bold text-vss-paper mb-2 leading-tight">
                  {item.title[locale]}
                </h4>
                <p className="text-xs text-vss-mist leading-relaxed">
                  {item.text[locale]}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}