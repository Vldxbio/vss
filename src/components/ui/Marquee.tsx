"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

interface MarqueeProps {
  children: ReactNode;
  className?: string;
  speed?: "slow" | "normal" | "fast";
}

export function Marquee({ children, className, speed = "normal" }: MarqueeProps) {
  const speeds = {
    slow: "60s",
    normal: "40s",
    fast: "20s",
  };

  return (
    <div className={cn("overflow-hidden whitespace-nowrap", className)}>
      <div
        className="inline-flex"
        style={{ animation: `marquee ${speeds[speed]} linear infinite` }}
      >
        <div className="inline-flex">{children}</div>
        <div className="inline-flex" aria-hidden="true">{children}</div>
      </div>
    </div>
  );
}