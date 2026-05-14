"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { ProductCard } from "./ProductCard";
import { Asterisk, MarqueeDivider } from "@/components/ui/Decorations";
import type { Product } from "@/types";

interface Props {
  products: Product[];
}

export function RelatedProducts({ products }: Props) {
  const { locale } = useLocale();

  if (products.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-vss-obsidian relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container-vss relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-vss-paper" />
            <Asterisk className="w-3 h-3 text-vss-paper" />
            <span className="text-[10px] tracking-[0.4em] text-vss-paper font-mono font-bold uppercase">
              {locale === "uk" ? "З ЦИМ КУПУЮТЬ" : "С ЭТИМ ПОКУПАЮТ"}
            </span>
          </div>
          <h2 className="text-display text-3xl md:text-5xl font-bold tracking-tightest text-vss-paper leading-[0.9] glow-text">
            {locale === "uk" ? "ЗАВЕРШИ ОБРАЗ" : "ЗАВЕРШИ ОБРАЗ"}
          </h2>
        </motion.div>

        <MarqueeDivider text="COMPLETE THE LOOK" />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-12 mt-10">
          {products.slice(0, 4).map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}