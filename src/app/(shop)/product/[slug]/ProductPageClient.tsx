"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Share2, ChevronRight, Check } from "lucide-react";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { useCartStore } from "@/lib/store/cartStore";
import { useFavoritesStore } from "@/lib/store/favoritesStore";
import { useAuthStore } from "@/lib/store/authStore";
import { Button } from "@/components/ui/Button";
import { Price } from "@/components/ui/Price";
import { StockIndicator } from "@/components/ui/StockIndicator";
import { ProductGallery } from "@/components/product/ProductGallery";
import { SizeSelector } from "@/components/product/SizeSelector";
import { ProductTabs } from "@/components/product/ProductTabs";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import {
  Asterisk,
  CornerBrackets,
  PlusMarker,
  Crosshair,
  RotatingStamp,
  Barcode,
} from "@/components/ui/Decorations";
import { cn } from "@/lib/utils/cn";
import type { Product, Size } from "@/types";

const categoryNames: Record<string, { uk: string; ru: string }> = {
  hoodie: { uk: "Худі", ru: "Худи" },
  tee: { uk: "Футболки", ru: "Футболки" },
  jeans: { uk: "Джинси", ru: "Джинсы" },
  shorts: { uk: "Шорти", ru: "Шорты" },
  socks: { uk: "Шкарпетки", ru: "Носки" },
};

export function ProductPageClient({ product, related }: { product: Product; related: Product[] }) {
  const { locale, t } = useLocale();
  const addToCart = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);
  const isFav = useFavoritesStore((s) => s.has(product.id));
  const toggleFav = useFavoritesStore((s) => s.toggle);
  const isAuth = useAuthStore((s) => !!s.user);

  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [showSizeError, setShowSizeError] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const isSoldOut = product.badges.includes("soldout") || product.stock === 0;

  const handleAddToCart = () => {
    if (!selectedSize) {
      setShowSizeError(true);
      setTimeout(() => setShowSizeError(false), 2500);
      return;
    }
    addToCart(product.id, selectedSize, product.colors[0].name);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      openCart();
    }, 600);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      setShowSizeError(true);
      setTimeout(() => setShowSizeError(false), 2500);
      return;
    }
    addToCart(product.id, selectedSize, product.colors[0].name);
    window.location.href = "/checkout";
  };

  const handleFav = () => {
    if (!isAuth) {
      alert(locale === "uk" ? "Увійдіть, щоб зберігати товари" : "Войдите, чтобы сохранять товары");
      return;
    }
    toggleFav(product.id);
  };

  const productNum = `00${(parseInt(product.id.split("-")[1]) || 1).toString().padStart(2, "0")}`;
  const serial = `VSS·${product.collection.slice(0, 3)}·${productNum}`;

  return (
    <>
      <div className="relative bg-vss-obsidian min-h-screen">
        {/* BG decorations */}
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-radial-glow opacity-15 blur-3xl pointer-events-none" />

        <div className="absolute top-32 right-8 w-16 h-16 text-vss-fog/40 hidden xl:block pointer-events-none">
          <RotatingStamp text="VSS · ORIGINAL · " />
        </div>

        <div className="container-vss relative pt-8 md:pt-12 pb-32 lg:pb-16">
          {/* Breadcrumbs */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-vss-fog uppercase mb-8 flex-wrap"
          >
            <Link href="/" className="hover:text-vss-paper transition-colors">VSS</Link>
            <ChevronRight size={10} strokeWidth={2} />
            <Link href="/catalog" className="hover:text-vss-paper transition-colors">
              {locale === "uk" ? "КАТАЛОГ" : "КАТАЛОГ"}
            </Link>
            <ChevronRight size={10} strokeWidth={2} />
            <Link
              href={`/catalog?category=${product.category}`}
              className="hover:text-vss-paper transition-colors"
            >
              {categoryNames[product.category][locale].toUpperCase()}
            </Link>
            <ChevronRight size={10} strokeWidth={2} />
            <span className="text-vss-paper font-bold">{product.name[locale].toUpperCase()}</span>
          </motion.div>

          {/* Main grid */}
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-12">
            {/* Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:sticky lg:top-24 lg:self-start"
            >
              <ProductGallery images={product.images} alt={product.name[locale]} />

              {/* Below gallery: extra info chips */}
              <div className="mt-4 hidden lg:flex items-center gap-3 text-[10px] font-mono tracking-widest text-vss-fog uppercase">
                <div className="flex items-center gap-1.5">
                  <Crosshair size={11} className="text-vss-paper" />
                  <span>HD QUALITY</span>
                </div>
                <span className="text-vss-fog/40">·</span>
                <div className="flex items-center gap-1.5">
                  <Asterisk className="w-2.5 h-2.5" />
                  <span>4 ANGLES</span>
                </div>
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-6"
            >
              {/* Top: serial + share */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <PlusMarker className="w-2 h-2 text-vss-fog" />
                  <span className="text-[10px] font-mono tracking-widest text-vss-fog uppercase">
                    {serial}
                  </span>
                </div>
                <button
                  onClick={() => navigator.share?.({ title: product.name[locale], url: window.location.href })}
                  className="text-vss-bone hover:text-vss-paper transition-colors"
                  aria-label="Share"
                  title={locale === "uk" ? "Поділитись" : "Поделиться"}
                >
                  <Share2 size={16} strokeWidth={1.5} />
                </button>
              </div>

              {/* Category */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono tracking-[0.4em] text-vss-paper font-bold uppercase">
                  {product.collection}
                </span>
                <span className="text-vss-fog">·</span>
                <span className="text-[10px] font-mono tracking-widest text-vss-mist uppercase">
                  {categoryNames[product.category][locale]}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tightest text-vss-paper leading-[0.95] glow-text">
                {product.name[locale]}
              </h1>

              {/* Badges */}
              <div className="flex flex-wrap gap-1.5">
                {product.badges.includes("new") && !isSoldOut && (
                  <div className="bg-vss-paper text-vss-void px-2 py-0.5">
                    <span className="text-[10px] font-mono tracking-widest font-bold">NEW</span>
                  </div>
                )}
                {product.badges.includes("limited") && !isSoldOut && (
                  <div className="border border-vss-paper text-vss-paper px-2 py-0.5">
                    <span className="text-[10px] font-mono tracking-widest font-bold">LIMITED</span>
                  </div>
                )}
                {product.badges.includes("drop") && !isSoldOut && (
                  <div className="border border-vss-smoke text-vss-paper px-2 py-0.5">
                    <span className="text-[10px] font-mono tracking-widest font-bold">DROP 001</span>
                  </div>
                )}
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 pt-2 border-t border-vss-smoke pt-5">
                <Price
                  amount={product.price}
                  amountUSD={product.priceUSD}
                  oldPrice={product.oldPrice}
                  size="xl"
                  variant="highlight"
                  showUSD
                />
              </div>

              {/* Stock */}
              <StockIndicator
                stock={product.stock}
                maxStock={30}
                isSoldOut={isSoldOut}
                variant="detail"
              />

              {/* Sizes */}
              <SizeSelector
                sizes={product.sizes}
                selected={selectedSize}
                onChange={setSelectedSize}
                disabled={isSoldOut}
              />

              {/* Size error */}
              {showSizeError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-vss-paper text-vss-void px-3 py-2 text-[11px] font-mono tracking-widest font-bold uppercase inline-flex items-center gap-2"
                >
                  ↑ {locale === "uk" ? "Спочатку обери розмір" : "Сначала выбери размер"}
                </motion.div>
              )}

              {/* Actions */}
              <div className="flex flex-col gap-2.5 pt-2">
                <div className="flex gap-2.5">
                  <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    onClick={handleAddToCart}
                    disabled={isSoldOut}
                    className="flex-1"
                  >
                    {justAdded ? (
                      <span className="inline-flex items-center gap-2">
                        <Check size={14} strokeWidth={2.5} />
                        {locale === "uk" ? "ДОДАНО" : "ДОБАВЛЕНО"}
                      </span>
                    ) : isSoldOut ? (
                      "SOLD OUT"
                    ) : (
                      locale === "uk" ? "У КОШИК" : "В КОРЗИНУ"
                    )}
                  </Button>
                  <button
                    onClick={handleFav}
                    className={cn(
                      "w-14 h-14 border flex items-center justify-center transition-all shrink-0",
                      isFav ? "bg-vss-paper border-vss-paper text-vss-void" : "border-vss-smoke hover:border-vss-paper text-vss-bone hover:text-vss-paper"
                    )}
                    aria-label={isFav ? t.actions.removeFromFav : t.actions.addToFav}
                  >
                    <Heart size={16} strokeWidth={1.6} className={isFav ? "fill-current" : ""} />
                  </button>
                </div>

                <Button
                  variant="outline"
                  size="lg"
                  fullWidth
                  onClick={handleBuyNow}
                  disabled={isSoldOut}
                  arrow
                >
                  {locale === "uk" ? "КУПИТИ ЗАРАЗ" : "КУПИТЬ СЕЙЧАС"}
                </Button>
              </div>

              {/* Trust mini */}
              <div className="grid grid-cols-3 gap-px bg-vss-smoke mt-4">
                {[
                  { val: "1500₴+", label: { uk: "Безкошт.", ru: "Бесплат." } },
                  { val: "24h", label: { uk: "Відправка", ru: "Отправка" } },
                  { val: "14д", label: { uk: "Повернення", ru: "Возврат" } },
                ].map((t, i) => (
                  <div key={i} className="bg-vss-graphite p-3 text-center relative">
                    <CornerBrackets className="text-vss-fog/30" />
                    <div className="text-display text-base font-bold text-vss-paper">{t.val}</div>
                    <div className="text-[8px] font-mono tracking-widest text-vss-mist uppercase mt-0.5">
                      {t.label[locale]}
                    </div>
                  </div>
                ))}
              </div>

              {/* Tabs */}
              <ProductTabs product={product} />

              {/* Bottom info */}
              <div className="flex items-center justify-between pt-4 text-[10px] font-mono tracking-widest text-vss-fog uppercase">
                <div className="flex items-center gap-2">
                  <Barcode />
                </div>
                <span>VSS · 2026 · KH</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Sticky add to cart on mobile */}
        {!isSoldOut && (
          <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-vss-void/95 backdrop-blur-xl border-t border-vss-smoke p-3">
            <div className="container-vss flex items-center gap-3">
              <div className="flex-shrink-0">
                <Price amount={product.price} size="md" variant="highlight" />
              </div>
              <button
                onClick={handleAddToCart}
                className="flex-1 h-12 bg-vss-paper text-vss-void text-xs font-bold tracking-widest uppercase"
              >
                {locale === "uk" ? "У КОШИК" : "В КОРЗИНУ"}
              </button>
            </div>
          </div>
        )}
      </div>

      <RelatedProducts products={related} />
    </>
  );
}