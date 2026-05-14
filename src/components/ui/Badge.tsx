import { cn } from "@/lib/utils/cn";
import type { ProductBadge } from "@/types";

interface BadgeProps {
  type: ProductBadge;
  label: string;
  className?: string;
}

export function Badge({ type, label, className }: BadgeProps) {
  const styles: Record<ProductBadge, string> = {
    new: "bg-vss-paper text-vss-void",
    limited: "bg-vss-void text-vss-paper border border-vss-smoke",
    soldout: "bg-vss-void/80 text-vss-mist border border-vss-fog backdrop-blur-sm",
    drop: "bg-transparent text-vss-paper border border-vss-paper",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-1 text-[10px] tracking-widest font-mono uppercase",
        styles[type],
        className
      )}
    >
      {label}
    </span>
  );
}