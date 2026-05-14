"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Heart } from "lucide-react";
import { useFavoritesStore } from "@/lib/store/favoritesStore";
import { useAuthStore } from "@/lib/store/authStore";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { products } from "@/lib/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/Button";
import { Asterisk, CornerBrackets, RotatingStamp } from "@/components/ui/Decorations";

export default function FavoritesPage() {
  const { locale } = useLocale();
  const ids = useFavoritesStore((s) => s.ids);
  const isAuth = useAuthStore((s) => !!s.user);

  const favProducts = products.filter((p) => ids.includes(p.id));

  if (!isAuth) {
    return (
      <div className="min-h-[70vh] bg-vss-obsidian flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-vss-graphite border border-vss-smoke p-10 max-w-md mx-4 text-center relative"
        >
          <CornerBrackets className="text-vss-fog/40" />
          <Heart size={32} strokeWidth={1.2} className="text-vss-paper mx-auto mb-4" />
          <h2 className="text-display text-3xl font-bold text-vss-paper mb-3 tracking-tight glow-text">
            {locale === "uk" ? "УВІЙДІТЬ" : "ВОЙДИТЕ"}
          </h2>
          <p className="text-sm text-vss-mist mb-6">
            {locale === "uk"
              ? "Щоб зберігати улюблені речі — потрібен акаунт"
              : "Чтобы сохранять любимые вещи — нужен аккаунт"}
          </p>
          <Link href="/account">
            <Button variant="primary" size="md" arrow>
              {locale === "uk" ? "Увійти" : "Войти"}
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

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
        <RotatingStamp text="VSS · WISHLIST · " />
      </div>

      <div className="container-vss py-10 md:py-14 relative">
        <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-vss-fog uppercase mb-8">
          <Link href="/" className="hover:text-vss-paper transition-colors">VSS</Link>
          <ChevronRight size={10} strokeWidth={2} />
          <span className="text-vss-paper font-bold">{locale === "uk" ? "ОБРАНЕ" : "ИЗБРАННОЕ"}</span>
        </div>

        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-vss-paper" />
            <Asterisk className="w-3 h-3 text-vss-paper" />
            <span className="text-[10px] tracking-[0.4em] text-vss-paper font-mono font-bold uppercase">
              {locale === "uk" ? "ОБРАНЕ" : "ИЗБРАННОЕ"} / {favProducts.length}
            </span>
          </div>
          <h1 className="text-display text-5xl md:text-7xl font-bold tracking-tightest text-vss-paper leading-[0.9] glow-text">
            {locale === "uk" ? "WISHLIST" : "WISHLIST"}
          </h1>
        </div>

        {favProducts.length === 0 ? (
          <div className="bg-vss-graphite border border-vss-smoke p-12 text-center max-w-md mx-auto relative">
            <CornerBrackets className="text-vss-fog/40" />
            <div className="text-display text-7xl font-bold text-vss-paper mb-3 glow-text">0</div>
            <p className="text-sm text-vss-mist mb-6">
              {locale === "uk" ? "Поки що немає обраних речей" : "Пока нет избранных вещей"}
            </p>
            <Link href="/catalog"><Button variant="primary" size="md" arrow>{locale === "uk" ? "Каталог" : "Каталог"}</Button></Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-12">
            {favProducts.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}