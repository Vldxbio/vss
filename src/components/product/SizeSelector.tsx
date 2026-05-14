"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Ruler, X } from "lucide-react";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { cn } from "@/lib/utils/cn";
import type { Size } from "@/types";

interface SizeSelectorProps {
  sizes: Size[];
  selected: Size | null;
  onChange: (size: Size) => void;
  disabled?: boolean;
}

const sizeChart = [
  { size: "XS", chest: 96, length: 66, sleeve: 22 },
  { size: "S", chest: 102, length: 68, sleeve: 23 },
  { size: "M", chest: 108, length: 70, sleeve: 24 },
  { size: "L", chest: 114, length: 72, sleeve: 25 },
  { size: "XL", chest: 120, length: 74, sleeve: 26 },
  { size: "XXL", chest: 126, length: 76, sleeve: 27 },
];

export function SizeSelector({ sizes, selected, onChange, disabled }: SizeSelectorProps) {
  const { locale } = useLocale();
  const [showChart, setShowChart] = useState(false);

  return (
    <>
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-mono tracking-widest text-vss-paper font-bold uppercase">
            {locale === "uk" ? "РОЗМІР" : "РАЗМЕР"}
            {selected && <span className="text-vss-mist ml-2">— {selected}</span>}
          </span>
          <button
            onClick={() => setShowChart(true)}
            className="inline-flex items-center gap-1.5 text-[10px] font-mono tracking-widest text-vss-mist hover:text-vss-paper uppercase transition-colors"
          >
            <Ruler size={12} strokeWidth={1.5} />
            {locale === "uk" ? "Таблиця" : "Таблица"}
          </button>
        </div>

        <div className="grid grid-cols-6 gap-1.5">
          {(["XS", "S", "M", "L", "XL", "XXL"] as Size[]).map((s) => {
            const available = sizes.includes(s);
            const isSelected = selected === s;
            return (
              <button
                key={s}
                onClick={() => available && !disabled && onChange(s)}
                disabled={!available || disabled}
                className={cn(
                  "h-12 text-sm font-mono font-bold border transition-all relative",
                  isSelected && "bg-vss-paper text-vss-void border-vss-paper",
                  !isSelected && available && "text-vss-paper border-vss-smoke hover:border-vss-paper bg-vss-graphite",
                  !available && "text-vss-fog/50 border-vss-smoke/40 cursor-not-allowed bg-vss-graphite/30 line-through"
                )}
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {showChart && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowChart(false)}
              className="fixed inset-0 z-50 bg-vss-void/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            >
              <div className="bg-vss-graphite border border-vss-smoke max-w-md w-full pointer-events-auto">
                <div className="flex items-center justify-between p-4 border-b border-vss-smoke">
                  <span className="text-xs font-mono tracking-widest text-vss-paper font-bold uppercase">
                    {locale === "uk" ? "Таблиця розмірів" : "Таблица размеров"}
                  </span>
                  <button onClick={() => setShowChart(false)} className="text-vss-bone hover:text-vss-paper">
                    <X size={18} strokeWidth={1.5} />
                  </button>
                </div>
                <div className="p-5">
                  <p className="text-[10px] font-mono text-vss-mist mb-4 leading-relaxed">
                    {locale === "uk"
                      ? "Заміри в сантиметрах. Посадка — оверсайз. Якщо сумніваєшся — обирай свій звичайний розмір."
                      : "Замеры в сантиметрах. Посадка — оверсайз. Если сомневаешься — выбирай свой обычный размер."}
                  </p>
                  <table className="w-full text-xs font-mono">
                    <thead>
                      <tr className="border-b border-vss-smoke text-vss-fog tracking-widest text-[9px]">
                        <th className="text-left py-2 font-bold">SIZE</th>
                        <th className="text-right py-2 font-bold">{locale === "uk" ? "ГРУДИ" : "ГРУДЬ"}</th>
                        <th className="text-right py-2 font-bold">{locale === "uk" ? "ДОВЖИНА" : "ДЛИНА"}</th>
                        <th className="text-right py-2 font-bold">{locale === "uk" ? "РУКАВ" : "РУКАВ"}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sizeChart.map((row) => (
                        <tr key={row.size} className="border-b border-vss-smoke/40">
                          <td className="py-2.5 text-vss-paper font-bold">{row.size}</td>
                          <td className="py-2.5 text-right text-vss-bone tabular-nums">{row.chest}</td>
                          <td className="py-2.5 text-right text-vss-bone tabular-nums">{row.length}</td>
                          <td className="py-2.5 text-right text-vss-bone tabular-nums">{row.sleeve}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}