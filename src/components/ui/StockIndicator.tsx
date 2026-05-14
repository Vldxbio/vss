"use client";

import { cn } from "@/lib/utils/cn";
import { useLocale } from "@/lib/i18n/LocaleProvider";

interface StockIndicatorProps {
  stock: number;
  maxStock?: number;
  isSoldOut?: boolean;
  variant?: "card" | "detail" | "minimal" | "bar";
  className?: string;
}

export function StockIndicator({ stock, maxStock = 30, isSoldOut, variant = "card", className }: StockIndicatorProps) {
  const { locale } = useLocale();

  const isLow = !isSoldOut && stock > 0 && stock <= 5;
  const isAvailable = !isSoldOut && stock > 5;
  const percent = Math.max(0, Math.min(100, (stock / maxStock) * 100));

  if (variant === "minimal") {
    return (
      <div className={cn("inline-flex items-center gap-1.5", className)}>
        <span className="relative flex h-1.5 w-1.5">
          {(isAvailable || isLow) && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-50" />
          )}
          <span className={cn("relative inline-flex rounded-full h-1.5 w-1.5", isAvailable && "bg-vss-paper", isLow && "bg-vss-paper", isSoldOut && "bg-vss-fog")} />
        </span>
        <span className="text-[9px] font-mono tracking-widest font-bold uppercase">
          {isSoldOut ? (locale === "uk" ? "НЕМАЄ" : "НЕТ") : isLow ? `${stock} ШТ` : (locale === "uk" ? "В НАЯВНОСТІ" : "В НАЛИЧИИ")}
        </span>
      </div>
    );
  }

  if (variant === "bar") {
    return (
      <div className={cn("w-full", className)}>
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-1.5 w-1.5">
              {(isAvailable || isLow) && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-50" />
              )}
              <span className={cn("relative inline-flex rounded-full h-1.5 w-1.5", isSoldOut ? "bg-vss-fog" : "bg-vss-paper")} />
            </span>
            <span className={cn("text-[9px] font-mono tracking-widest font-bold uppercase", isSoldOut ? "text-vss-fog" : "text-vss-paper")}>
              {isSoldOut ? (locale === "uk" ? "НЕМАЄ В НАЯВНОСТІ" : "НЕТ В НАЛИЧИИ") : isLow ? (locale === "uk" ? "ОБМЕЖЕНО" : "ОГРАНИЧЕНО") : (locale === "uk" ? "В НАЯВНОСТІ" : "В НАЛИЧИИ")}
            </span>
          </div>
          {!isSoldOut && (
            <span className="text-[9px] font-mono text-vss-mist tracking-widest tabular-nums">
              {stock}/{maxStock}
            </span>
          )}
        </div>
        <div className="relative h-[3px] bg-vss-smoke overflow-hidden">
          <div
            className={cn("absolute inset-y-0 left-0 transition-all duration-700 ease-out", isSoldOut ? "bg-vss-fog/40" : isLow ? "bg-vss-paper" : "bg-vss-paper")}
            style={{ width: `${isSoldOut ? 0 : percent}%` }}
          />
          {isLow && !isSoldOut && (
            <div
              className="absolute inset-y-0 left-0 bg-vss-paper/40 animate-pulse"
              style={{ width: `${percent}%` }}
            />
          )}
        </div>
      </div>
    );
  }

  if (variant === "detail") {
    return (
      <div className={cn("border", isSoldOut ? "border-vss-fog/40 bg-vss-graphite/30" : isLow ? "border-vss-paper/50 bg-vss-paper/[0.03]" : "border-vss-smoke bg-vss-graphite", className)}>
        <div className="p-4">
          <div className="flex items-start gap-3 mb-3">
            <div className="relative shrink-0 mt-1">
              {(isAvailable || isLow) && (
                <>
                  <span className="absolute inset-0 animate-ping rounded-full bg-vss-paper opacity-30" />
                  <span className="relative block w-2.5 h-2.5 rounded-full bg-vss-paper" />
                </>
              )}
              {isSoldOut && <span className="block w-2.5 h-2.5 rounded-full border border-vss-fog" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className={cn("text-xs font-mono tracking-widest font-bold uppercase mb-0.5", isSoldOut ? "text-vss-fog" : "text-vss-paper")}>
                {isSoldOut ? (locale === "uk" ? "НЕМАЄ В НАЯВНОСТІ" : "НЕТ В НАЛИЧИИ") : isLow ? (locale === "uk" ? "ОБМЕЖЕНА КІЛЬКІСТЬ" : "ОГРАНИЧЕННОЕ КОЛИЧЕСТВО") : (locale === "uk" ? "В НАЯВНОСТІ" : "В НАЛИЧИИ")}
              </div>
              <div className="text-[10px] font-mono text-vss-mist">
                {isSoldOut ? (locale === "uk" ? "Restock не гарантовано" : "Restock не гарантирован") : isLow ? (locale === "uk" ? `Залишилось ${stock} шт.` : `Осталось ${stock} шт.`) : (locale === "uk" ? "Готово до відправки" : "Готово к отправке")}
              </div>
            </div>
            {!isSoldOut && (
              <span className="text-[10px] font-mono text-vss-paper font-bold tabular-nums shrink-0">
                {stock}/{maxStock}
              </span>
            )}
          </div>
          <div className="relative h-[3px] bg-vss-smoke overflow-hidden">
            <div
              className={cn("absolute inset-y-0 left-0 transition-all duration-700 ease-out", isSoldOut ? "bg-vss-fog/40" : "bg-vss-paper")}
              style={{ width: `${isSoldOut ? 0 : percent}%` }}
            />
          </div>
        </div>
      </div>
    );
  }

  // card variant — слайдер прогресс
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between mb-1">
        <span className={cn("text-[9px] font-mono tracking-widest font-bold uppercase", isSoldOut ? "text-vss-fog" : "text-vss-paper")}>
          {isSoldOut ? (locale === "uk" ? "НЕМАЄ" : "НЕТ") : isLow ? (locale === "uk" ? `${stock} ШТ` : `${stock} ШТ`) : (locale === "uk" ? "В НАЯВНОСТІ" : "В НАЛИЧИИ")}
        </span>
      </div>
      <div className="relative h-[2px] bg-vss-smoke/60 overflow-hidden">
        <div
          className={cn("absolute inset-y-0 left-0 transition-all duration-700 ease-out", isSoldOut ? "bg-vss-fog/30" : "bg-vss-paper")}
          style={{ width: `${isSoldOut ? 0 : percent}%` }}
        />
      </div>
    </div>
  );
}