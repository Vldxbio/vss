"use client";

import { useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Minus, Plus, Trash2, ChevronRight } from "lucide-react";
import { useCartStore } from "@/lib/store/cartStore";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { products } from "@/lib/data/products";
import { SafeImage } from "@/components/ui/SafeImage";
import { Price } from "@/components/ui/Price";
import { Button } from "@/components/ui/Button";
import { Asterisk, CornerBrackets, PlusMarker, RotatingStamp } from "@/components/ui/Decorations";

export default function CartPage() {
  const { locale } = useLocale();
  const { items, removeItem, updateQuantity, promo, getTotal, getDiscount, getFinalTotal } = useCartStore();

  const priceMap = useMemo(() => {
    const map: Record<string, number> = {};
    products.forEach((p) => (map[p.id] = p.price));
    return map;
  }, []);

  const total = getTotal(priceMap);
  const discount = getDiscount(priceMap);
  const finalTotal = getFinalTotal(priceMap);
  const freeShipping = finalTotal >= 1500;
  const shipping = freeShipping ? 0 : 60;

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] bg-vss-obsidian flex items-center justify-center">
        <div className="container-vss text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-vss-graphite border border-vss-smoke p-12 max-w-md mx-auto relative"
          >
            <CornerBrackets className="text-vss-fog/40" />
            <div className="text-[10px] font-mono tracking-[0.4em] text-vss-fog uppercase mb-4 flex items-center justify-center gap-2">
              <Asterisk className="w-3 h-3" />
              NULL · CART · EMPTY
              <Asterisk className="w-3 h-3" />
            </div>
            <div className="text-display text-7xl font-bold tracking-tightest text-vss-paper mb-3 glow-text">
              0
            </div>
            <p className="text-sm text-vss-mist mb-8">
              {locale === "uk" ? "Кошик порожній" : "Корзина пуста"}
            </p>
            <Link href="/catalog">
              <Button variant="primary" size="lg" arrow>
                {locale === "uk" ? "До каталогу" : "К каталогу"}
              </Button>
            </Link>
          </motion.div>
        </div>
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
        <RotatingStamp text="VSS · CART · " />
      </div>

      <div className="container-vss py-10 md:py-14 relative">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-vss-fog uppercase mb-8">
          <Link href="/" className="hover:text-vss-paper transition-colors">VSS</Link>
          <ChevronRight size={10} strokeWidth={2} />
          <span className="text-vss-paper font-bold">{locale === "uk" ? "КОШИК" : "КОРЗИНА"}</span>
        </div>

        {/* Title */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-vss-paper" />
            <Asterisk className="w-3 h-3 text-vss-paper" />
            <span className="text-[10px] tracking-[0.4em] text-vss-paper font-mono font-bold uppercase">
              {locale === "uk" ? "КОШИК" : "КОРЗИНА"} / {items.length}
            </span>
          </div>
          <h1 className="text-display text-5xl md:text-7xl font-bold tracking-tightest text-vss-paper leading-[0.9] glow-text">
            {locale === "uk" ? "ВАШЕ ЗАМОВЛЕННЯ" : "ВАШ ЗАКАЗ"}
          </h1>
        </div>

        <div className="grid lg:grid-cols-[1fr_400px] gap-8">
          {/* Items */}
          <div className="space-y-4">
            {items.map((item) => {
              const product = products.find((p) => p.id === item.productId);
              if (!product) return null;
              return (
                <motion.div
                  key={`${item.productId}-${item.size}-${item.color}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-vss-graphite border border-vss-smoke p-4 flex gap-4 relative group"
                >
                  <CornerBrackets className="text-vss-fog/30" />

                  <Link
                    href={`/product/${product.slug}`}
                    className="relative w-24 h-32 sm:w-28 sm:h-36 bg-vss-void border border-vss-smoke shrink-0 overflow-hidden"
                  >
                    <SafeImage src={product.images[0]} alt="" fill className="object-cover" sizes="120px" />
                  </Link>

                  <div className="flex-1 flex flex-col">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="min-w-0">
                        <p className="text-[9px] font-mono tracking-widest text-vss-fog uppercase mb-1">
                          {product.collection} · VSS·{product.id.toUpperCase()}
                        </p>
                        <Link
                          href={`/product/${product.slug}`}
                          className="text-base text-vss-paper font-medium hover:text-vss-glow transition-colors block"
                        >
                          {product.name[locale]}
                        </Link>
                      </div>
                      <button
                        onClick={() => removeItem(item.productId, item.size, item.color)}
                        className="text-vss-fog hover:text-vss-paper transition-colors shrink-0"
                        aria-label="Remove"
                      >
                        <Trash2 size={14} strokeWidth={1.5} />
                      </button>
                    </div>

                    <div className="flex items-center gap-3 text-[10px] font-mono tracking-widest text-vss-mist uppercase mb-3">
                      <span>{locale === "uk" ? "РОЗМ" : "РАЗМ"}: <span className="text-vss-paper font-bold">{item.size}</span></span>
                      <span>·</span>
                      <span>{locale === "uk" ? "КОЛІР" : "ЦВЕТ"}: <span className="text-vss-paper font-bold">{item.color}</span></span>
                    </div>

                    <div className="flex items-center justify-between mt-auto">
                      <div className="inline-flex items-center border border-vss-smoke">
                        <button
                          onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-vss-bone hover:text-vss-paper hover:bg-vss-ash transition-colors"
                          aria-label="Decrease"
                        >
                          <Minus size={12} strokeWidth={2} />
                        </button>
                        <span className="w-8 text-center text-sm font-mono font-bold text-vss-paper tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-vss-bone hover:text-vss-paper hover:bg-vss-ash transition-colors"
                          aria-label="Increase"
                        >
                          <Plus size={12} strokeWidth={2} />
                        </button>
                      </div>

                      <Price amount={product.price * item.quantity} size="lg" variant="highlight" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Summary */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="bg-vss-graphite border border-vss-smoke p-5 relative">
              <CornerBrackets className="text-vss-fog/40" />

              <div className="flex items-center gap-2 mb-5">
                <PlusMarker className="w-2.5 h-2.5 text-vss-paper" />
                <span className="text-[10px] font-mono tracking-[0.3em] text-vss-paper font-bold uppercase">
                  {locale === "uk" ? "ПІДСУМОК" : "ИТОГ"}
                </span>
              </div>

              {!freeShipping && (
                <div className="bg-vss-void border border-vss-smoke p-3 mb-5">
                  <div className="text-[10px] font-mono tracking-widest text-vss-mist uppercase mb-2">
                    {locale === "uk" ? "Ще" : "Ещё"}{" "}
                    <span className="text-vss-paper font-bold tabular-nums">{1500 - finalTotal} ₴</span>{" "}
                    {locale === "uk" ? "до безкоштовної доставки" : "до бесплатной доставки"}
                  </div>
                  <div className="h-1 bg-vss-smoke overflow-hidden">
                    <div className="h-full bg-vss-paper transition-all" style={{ width: `${(finalTotal / 1500) * 100}%` }} />
                  </div>
                </div>
              )}

              <div className="space-y-2.5 pb-4 border-b border-vss-smoke">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-vss-mist">{locale === "uk" ? "Підсумок" : "Подытог"}</span>
                  <Price amount={total} size="sm" />
                </div>
                {discount > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-vss-mist">{locale === "uk" ? "Знижка" : "Скидка"} {promo && `(${promo.code})`}</span>
                    <span className="font-mono font-bold text-vss-paper">−{discount.toLocaleString("uk-UA")} ₴</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-vss-mist">{locale === "uk" ? "Доставка" : "Доставка"}</span>
                  <span className="font-mono font-bold text-vss-paper">
                    {freeShipping ? (locale === "uk" ? "БЕЗКОШТ." : "БЕСПЛАТ.") : "60 ₴"}
                  </span>
                </div>
              </div>

              <div className="flex items-baseline justify-between py-4">
                <span className="text-[11px] font-mono tracking-widest text-vss-paper font-bold uppercase">
                  {locale === "uk" ? "ДО СПЛАТИ" : "К ОПЛАТЕ"}
                </span>
                <Price amount={finalTotal + shipping} size="xl" variant="highlight" />
              </div>

              <Link href="/checkout">
                <Button variant="primary" size="lg" fullWidth arrow>
                  {locale === "uk" ? "ОФОРМИТИ" : "ОФОРМИТЬ"}
                </Button>
              </Link>

              <Link href="/catalog" className="block mt-3 text-center text-[10px] font-mono tracking-widest text-vss-fog hover:text-vss-paper transition-colors uppercase">
                ← {locale === "uk" ? "Продовжити покупки" : "Продолжить покупки"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}