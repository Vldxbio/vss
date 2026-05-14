"use client";

import { forwardRef, ButtonHTMLAttributes, useRef, useState, MouseEvent } from "react";
import { cn } from "@/lib/utils/cn";

type Variant = "primary" | "secondary" | "ghost" | "outline" | "dark";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  magnet?: boolean;
  arrow?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", fullWidth, magnet = true, arrow = false, className, children, onMouseMove, onMouseLeave, ...props }, ref) => {
    const innerRef = useRef<HTMLButtonElement>(null);
    const [hovered, setHovered] = useState(false);

    const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
      if (magnet && innerRef.current) {
        const rect = innerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        innerRef.current.style.transform = `translate(${x * 0.15}px, ${y * 0.25}px)`;
      }
      onMouseMove?.(e);
    };

    const handleMouseLeave = (e: MouseEvent<HTMLButtonElement>) => {
      setHovered(false);
      if (magnet && innerRef.current) {
        innerRef.current.style.transform = "translate(0, 0)";
      }
      onMouseLeave?.(e);
    };

    const base =
      "relative inline-flex items-center justify-center font-bold tracking-widest uppercase overflow-hidden group disabled:opacity-40 disabled:cursor-not-allowed select-none";

    const variants: Record<Variant, string> = {
      primary: "bg-vss-paper text-vss-void hover:bg-vss-glow",
      secondary: "bg-vss-graphite text-vss-paper border border-vss-smoke hover:border-vss-paper",
      ghost: "bg-transparent text-vss-bone hover:text-vss-paper",
      outline: "bg-transparent text-vss-paper border border-vss-paper",
      dark: "bg-vss-void text-vss-paper border border-vss-smoke hover:border-vss-paper",
    };

    const sizes: Record<Size, string> = {
      sm: "h-9 px-4 text-[10px] gap-2",
      md: "h-12 px-6 text-[11px] gap-2.5",
      lg: "h-14 px-8 text-xs gap-3",
    };

    return (
      <button
        ref={(node) => {
          (innerRef as React.MutableRefObject<HTMLButtonElement | null>).current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn(
          base,
          variants[variant],
          sizes[size],
          fullWidth && "w-full",
          "transition-[background-color,border-color,color,box-shadow] duration-300 ease-out",
          magnet && "transition-transform duration-300 ease-out",
          variant === "primary" && hovered && "shadow-[0_8px_30px_rgba(255,255,255,0.15)]",
          variant === "outline" && "hover:bg-vss-paper hover:text-vss-void",
          className
        )}
        {...props}
      >
        {/* Shimmer overlay for primary */}
        {variant === "primary" && (
          <span
            className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
            }}
          />
        )}

        {/* Fill effect for outline */}
        {variant === "outline" && (
          <span className="absolute inset-0 bg-vss-paper -translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out pointer-events-none" />
        )}

        <span className="relative z-10 flex items-center gap-inherit">
          {children}
          {arrow && (
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          )}
        </span>
      </button>
    );
  }
);

Button.displayName = "Button";