"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Minus, Plus, Trash2 } from "lucide-react";
import { useState, useMemo } from "react";
import { useCartStore } from "@/lib/store/cartStore";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { products } from "@/lib/data/products";
import { validatePromo } from "@/lib/data/promocodes";
import { SafeImage } from "@/components/ui/SafeImage";
import { Price } from "@/components/ui/Price";
import { Button } from "@/components/ui/Button";
import { Asterisk, PlusMarker, CornerBrackets } from "@/components/ui/Decorations";

export function CartDrawer() {
  const { locale } = useLocale();
  const { items, isOpen, closeCart, removeItem, updateQuantity, promo, setPromo, clearCart } = useCartStore();
  const [promoInput, setPromoInput] = useState("");
  const [promoError, setPromoError] = useState("");

  const priceMap = useMemo(() => {
    const map: Record<string, number> = {};
    products.forEach((p) => (map[p.id] = p.price));
    return map;
  }, []);

  const cartProducts = useMemo(
    () =>
      items.map((item) => ({
        item,
        product: products.find((p) => p.id === item.productId),
      })).filter((x) => x.product),
    [items]
  );

  const total = items.reduce((sum, i) => sum + (priceMap[i.productId] || 0) * i.quantity, 0);
  const discount = promo ? Math.round((total * promo.discount) / 100) : 0;
  const finalTotal = total - discount;
  const freeShipping = finalTotal >= 1500;
  const toFreeShipping = Math.max(0, 1500 - finalTotal);

  const handleApplyPromo = () => {
  setPromoError("");
  const result = validatePromo(promoInput.trim(), total);
  if (!result.valid) {
    setPromoError(result.errorMessage?.[locale] || "Error");
    return;
  }
  setPromo(result.promo!);
  setPromoInput("");
};

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-50 bg-vss-void/80 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 280 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full sm:w-[460px] bg-vss-obsidian border-l border-vss-smoke flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-vss-smoke">
              <div className="flex items-center gap-3">
                <ShoppingBag size={16} strokeWidth={1.5} className="text-vss-paper" />
                <span className="text-xs font-mono tracking-widest text-vss-paper font-bold uppercase">
                  {locale === "uk" ? "КОШИК" : "КОРЗИНА"}
                </span>
                <span className="text-[10px] font-mono tracking-widest text-vss-fog tabular-nums">
                  / {items.length}
                </span>
              </div>
              <button
                onClick={closeCart}
                className="text-vss-bone hover:text-vss-paper transition-colors"
                aria-label="Close"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            {/* Free shipping bar */}
            {items.length > 0 && (
              <div className="px-5 py-3 border-b border-vss-smoke bg-vss-graphite/30">
                {freeShipping ? (
                  <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-vss-paper font-bold uppercase">
                    <PlusMarker className="w-2.5 h-2.5" />
                    {locale === "uk" ? "БЕЗКОШТОВНА ДОСТАВКА АКТИВНА" : "БЕСПЛАТНАЯ ДОСТАВКА АКТИВНА"}
                  </div>
                ) : (
                  <>
                    <div className="text-[10px] font-mono tracking-widest text-vss-mist uppercase mb-2">
                      {locale === "uk" ? "Ще" : "Ещё"}{" "}
                      <span className="text-vss-paper font-bold tabular-nums">{toFreeShipping} ₴</span>{" "}
                      {locale === "uk" ? "до безкоштовної доставки" : "до бесплатной доставки"}
                    </div>
                    <div className="h-1 bg-vss-smoke overflow-hidden">
                      <motion.div
                        className="h-full bg-vss-paper"
                        initial={{ width: 0 }}
                        animate={{ width: `${(finalTotal / 1500) * 100}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Items */}
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <EmptyCart onClose={closeCart} />
              ) : (
                <div className="p-5 space-y-4">
                  {cartProducts.map(({ item, product }) => {
                    if (!product) return null;
                    return (
                      <div
                        key={`${item.productId}-${item.size}-${item.color}`}
                        className="flex gap-3 pb-4 border-b border-vss-smoke last:border-0"
                      >
                        {/* Image */}
                        <Link
                          href={`/product/${product.slug}`}
                          onClick={closeCart}
                          className="relative w-20 h-24 bg-vss-graphite border border-vss-smoke shrink-0 overflow-hidden"
                        >
                          <SafeImage src={product.images[0]} alt="" fill className="object-cover" sizes="80px" />
                        </Link>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <div className="min-w-0">
                              <p className="text-[9px] font-mono tracking-widest text-vss-fog uppercase mb-0.5">
                                {product.collection}
                              </p>
                              <Link
                                href={`/product/${product.slug}`}
                                onClick={closeCart}
                                className="text-sm text-vss-paper font-medium hover:text-vss-glow transition-colors block truncate"
                              >
                                {product.name[locale]}
                              </Link>
                            </div>
                            <button
                              onClick={() => removeItem(item.productId, item.size, item.color)}
                              className="text-vss-fog hover:text-vss-paper transition-colors shrink-0"
                              aria-label="Remove"
                            >
                              <Trash2 size={13} strokeWidth={1.5} />
                            </button>
                          </div>

                          <div className="flex items-center gap-3 text-[10px] font-mono tracking-widest text-vss-mist uppercase mb-2.5">
                            <span>{locale === "uk" ? "РОЗМ:" : "РАЗМ:"} <span className="text-vss-paper font-bold">{item.size}</span></span>
                          </div>

                          <div className="flex items-center justify-between">
                            {/* Quantity */}
                            <div className="inline-flex items-center border border-vss-smoke">
                              <button
                                onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity - 1)}
                                className="w-7 h-7 flex items-center justify-center text-vss-bone hover:text-vss-paper hover:bg-vss-graphite transition-colors"
                                aria-label="Decrease"
                              >
                                <Minus size={11} strokeWidth={2} />
                              </button>
                              <span className="w-7 text-center text-xs font-mono font-bold text-vss-paper tabular-nums">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity + 1)}
                                className="w-7 h-7 flex items-center justify-center text-vss-bone hover:text-vss-paper hover:bg-vss-graphite transition-colors"
                                aria-label="Increase"
                              >
                                <Plus size={11} strokeWidth={2} />
                              </button>
                            </div>

                            <Price amount={product.price * item.quantity} size="sm" variant="highlight" />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-vss-smoke p-5 space-y-4">
                {/* Promo */}
                {!promo ? (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Asterisk className="w-2.5 h-2.5 text-vss-fog" />
                      <span className="text-[10px] font-mono tracking-widest text-vss-fog uppercase">
                        {locale === "uk" ? "ПРОМОКОД" : "ПРОМОКОД"}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                        placeholder="VSS10 / NOTHING20"
                        className="flex-1 h-10 px-3 bg-vss-graphite border border-vss-smoke text-xs font-mono tracking-widest text-vss-paper placeholder:text-vss-fog focus:border-vss-paper outline-none transition-colors uppercase"
                        onKeyDown={(e) => e.key === "Enter" && handleApplyPromo()}
                      />
                      <button
                        onClick={handleApplyPromo}
                        className="px-4 h-10 bg-vss-paper text-vss-void text-[10px] font-mono font-bold tracking-widest uppercase hover:bg-vss-glow transition-colors"
                      >
                        OK
                      </button>
                    </div>
                    {promoError && (
                      <div className="text-[10px] font-mono text-vss-paper mt-1.5">
                        ↑ {promoError}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-vss-paper text-vss-void px-3 py-2.5 flex items-center justify-between">
                    <div>
                      <div className="text-[9px] font-mono tracking-widest font-bold opacity-60 uppercase">
                        {locale === "uk" ? "ПРОМОКОД АКТИВНИЙ" : "ПРОМОКОД АКТИВЕН"}
                      </div>
                      <div className="text-sm font-mono font-bold tracking-widest">
                        {promo.code} · −{promo.discount}%
                      </div>
                    </div>
                    <button
                      onClick={() => setPromo(null)}
                      className="text-vss-void hover:opacity-60 transition-opacity"
                      aria-label="Remove promo"
                    >
                      <X size={14} strokeWidth={2} />
                    </button>
                  </div>
                )}

                {/* Totals */}
                <div className="space-y-1.5 pt-3 border-t border-vss-smoke">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-vss-mist">{locale === "uk" ? "Підсумок" : "Подытог"}</span>
                    <Price amount={total} size="sm" />
                  </div>
                  {discount > 0 && (
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-vss-mist">{locale === "uk" ? "Знижка" : "Скидка"}</span>
                      <span className="font-mono font-bold text-vss-paper">−{discount.toLocaleString("uk-UA")} ₴</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-vss-mist">{locale === "uk" ? "Доставка" : "Доставка"}</span>
                    <span className="font-mono text-vss-paper font-bold">
                      {freeShipping ? (locale === "uk" ? "БЕЗКОШТ." : "БЕСПЛАТ.") : "60 ₴"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-2 mt-2 border-t border-vss-smoke">
                    <span className="text-[10px] font-mono tracking-widest text-vss-paper font-bold uppercase">
                      {locale === "uk" ? "ДО СПЛАТИ" : "К ОПЛАТЕ"}
                    </span>
                    <Price amount={finalTotal + (freeShipping ? 0 : 60)} size="lg" variant="highlight" />
                  </div>
                </div>

                {/* Buttons */}
                <Link href="/checkout" onClick={closeCart} className="block">
                  <Button variant="primary" size="lg" fullWidth arrow>
                    {locale === "uk" ? "ОФОРМИТИ ЗАМОВЛЕННЯ" : "ОФОРМИТЬ ЗАКАЗ"}
                  </Button>
                </Link>

                <button
                  onClick={clearCart}
                  className="w-full text-[10px] font-mono tracking-widest text-vss-fog hover:text-vss-paper transition-colors uppercase"
                >
                  {locale === "uk" ? "Очистити кошик" : "Очистить корзину"}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function EmptyCart({ onClose }: { onClose: () => void }) {
  const { locale } = useLocale();
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-10 text-center min-h-[400px]">
      <div className="bg-vss-graphite border border-vss-smoke p-8 max-w-sm relative">
        <CornerBrackets className="text-vss-fog/40" />
        <div className="text-[10px] font-mono tracking-widest text-vss-fog uppercase mb-3">
          NULL · EMPTY
        </div>
        <div className="text-display text-5xl font-bold tracking-tightest text-vss-paper mb-3 glow-text">
          0
        </div>
        <p className="text-sm text-vss-mist mb-5">
          {locale === "uk"
            ? "Кошик порожній. Час щось обрати."
            : "Корзина пуста. Время что-то выбрать."}
        </p>
        <Link href="/catalog" onClick={onClose}>
          <Button variant="primary" size="md" arrow>
            {locale === "uk" ? "Каталог" : "Каталог"}
          </Button>
        </Link>
      </div>
    </div>
  );
}