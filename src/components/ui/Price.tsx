"use client";

import { cn } from "@/lib/utils/cn";

interface PriceProps {
  amount: number;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  variant?: "default" | "highlight" | "muted";
  oldPrice?: number;
  className?: string;
}

export function Price({
  amount,
  size = "md",
  variant = "default",
  oldPrice,
  className,
}: PriceProps) {
  const sizes = {
    xs: { num: "text-xs", currency: "text-[8px]" },
    sm: { num: "text-sm", currency: "text-[9px]" },
    md: { num: "text-base", currency: "text-[10px]" },
    lg: { num: "text-xl", currency: "text-xs" },
    xl: { num: "text-3xl md:text-4xl", currency: "text-sm" },
  };

  const numStyles = {
    default: "text-vss-paper",
    highlight: "text-vss-paper glow-text",
    muted: "text-vss-fog",
  };

  const currencyStyles = {
    default: "text-vss-bone",
    highlight: "text-vss-paper glow-text",
    muted: "text-vss-fog",
  };

  return (
    <div className={cn("inline-flex items-baseline gap-1.5 tabular-nums", className)}>
      {oldPrice && (
        <span className={cn("font-mono line-through text-vss-fog", sizes[size].num)}>
          {oldPrice.toLocaleString("uk-UA")}
        </span>
      )}
      <span className={cn("font-mono font-bold tracking-tight", sizes[size].num, numStyles[variant])}>
        {amount.toLocaleString("uk-UA")}
      </span>
      <span className={cn("font-mono tracking-widest font-bold", sizes[size].currency, currencyStyles[variant])}>
        ₴
      </span>
    </div>
  );
}