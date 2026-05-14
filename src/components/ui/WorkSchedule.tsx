"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";
import { Clock } from "lucide-react";
import { Asterisk } from "@/components/ui/Decorations";

export function WorkSchedule({ variant = "full" }: { variant?: "full" | "compact" | "inline" }) {
  const { locale } = useLocale();

  const days = [
    { day: { uk: "ПН", ru: "ПН" }, active: true },
    { day: { uk: "ВТ", ru: "ВТ" }, active: true },
    { day: { uk: "СР", ru: "СР" }, active: false },
    { day: { uk: "ЧТ", ru: "ЧТ" }, active: true },
    { day: { uk: "ПТ", ru: "ПТ" }, active: true },
    { day: { uk: "СБ", ru: "СБ" }, active: false },
    { day: { uk: "НД", ru: "ВС" }, active: false },
  ];

  if (variant === "inline") {
    return (
      <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest">
        <Clock size={12} strokeWidth={1.5} className="text-vss-paper" />
        <span className="text-vss-paper font-bold">
          {locale === "uk" ? "ПН ВТ ЧТ ПТ" : "ПН ВТ ЧТ ПТ"} · 11:00–18:00
        </span>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <Clock size={14} strokeWidth={1.5} className="text-vss-paper" />
          <span className="text-[11px] font-mono tracking-widest text-vss-paper font-bold">
            11:00–18:00
          </span>
        </div>
        <div className="flex gap-1">
          {days.map((d, i) => (
            <div
              key={i}
              className={`w-5 h-5 flex items-center justify-center text-[8px] font-mono font-bold border ${
                d.active
                  ? "bg-vss-paper text-vss-void border-vss-paper"
                  : "bg-transparent text-vss-fog border-vss-smoke"
              }`}
            >
              {d.day[locale][0]}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-vss-graphite border border-vss-smoke p-5 relative">
      <div className="absolute top-3 right-3">
        <Asterisk className="w-3 h-3 text-vss-fog" />
      </div>
      <div className="flex items-center gap-2 mb-4">
        <Clock size={16} strokeWidth={1.5} className="text-vss-paper" />
        <span className="text-[11px] font-mono tracking-widest text-vss-paper font-bold uppercase">
          {locale === "uk" ? "ГРАФІК РОБОТИ" : "ГРАФИК РАБОТЫ"}
        </span>
      </div>
      <div className="flex gap-1 mb-3">
        {days.map((d, i) => (
          <div
            key={i}
            className={`flex-1 flex flex-col items-center gap-1 py-2 border ${
              d.active
                ? "bg-vss-paper text-vss-void border-vss-paper"
                : "bg-transparent text-vss-fog border-vss-smoke"
            }`}
          >
            <span className="text-[9px] font-mono font-bold">{d.day[locale]}</span>
          </div>
        ))}
      </div>
      <div className="text-center">
        <span className="text-sm font-mono font-bold text-vss-paper">11:00 — 18:00</span>
      </div>
    </div>
  );
}