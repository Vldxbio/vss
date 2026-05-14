"use client";

import Link from "next/link";
import { Heart, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { useFavoritesStore } from "@/lib/store/favoritesStore";
import { useAuthStore } from "@/lib/store/authStore";
import { useCartStore } from "@/lib/store/cartStore";
import { SafeImage } from "@/components/ui/SafeImage";
import { Price } from "@/components/ui/Price";
import { StockIndicator } from "@/components/ui/StockIndicator";
import { cn } from "@/lib/utils/cn";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  index?: number;
  variant?: "default" | "large" | "wide";
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { locale, t } = useLocale();
  const isFav = useFavoritesStore((s) => s.has(product.id));
  const toggleFav = useFavoritesStore((s) => s.toggle);
  const isAuth = useAuthStore((s) => !!s.user);
  const addToCart = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);
  const [isHovered, setIsHovered] = useState(false);
  const [showAuthHint, setShowAuthHint] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const handleFav = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuth) {
      setShowAuthHint(true);
      setTimeout(() => setShowAuthHint(false), 2500);
      return;
    }
    toggleFav(product.id);
  };

  const handleQuickAdd = (e: React.MouseEvent, size?: string) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product.id, (size || selectedSize || product.sizes[0]) as any, product.colors[0].name);
    openCart();
  };

  const isSoldOut = product.badges.includes("soldout") || product.stock === 0;
  const productNum = `00${(parseInt(product.id.split("-")[1]) || 1).toString().padStart(2, "0")}`;
  const serial = `VSS·${product.collection.slice(0, 3)}·${productNum}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.06, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      {/* TOP META — meta-info стилизованная под журнал */}
      <div className="flex items-center justify-between mb-2.5 px-0.5">
        <div className="flex items-center gap-2">
          <span className="text-[9px] font-mono tracking-widest text-vss-fog uppercase">
            {serial}
          </span>
          <span className="text-vss-fog/40">·</span>
          <span className="text-[9px] font-mono tracking-widest text-vss-mist uppercase font-bold">
            {t.categories[product.category]}
          </span>
        </div>
        {/* Index number */}
        <span className="text-[9px] font-mono tracking-widest text-vss-fog tabular-nums">
          № {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <Link href={`/product/${product.slug}`} className="block">
        {/* IMAGE BLOCK */}
        <div className="relative overflow-hidden bg-vss-graphite aspect-[4/5]">
          {/* Image */}
          <motion.div
            className="absolute inset-0"
            animate={{ scale: isHovered && !isSoldOut ? 1.04 : 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <SafeImage
              src={product.images[0]}
              alt={product.name[locale]}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className={cn("object-cover", isSoldOut && "opacity-25 grayscale")}
            />
          </motion.div>

          {/* Glow on hover */}
          <div
            className={cn(
              "absolute inset-0 bg-radial-glow opacity-0 transition-opacity duration-500 pointer-events-none",
              isHovered && !isSoldOut && "opacity-40"
            )}
          />

          {/* Border + corner brackets on hover */}
          <div className={cn(
            "absolute inset-0 border transition-colors duration-500 pointer-events-none",
            isHovered && !isSoldOut ? "border-vss-paper/40" : "border-vss-smoke/30"
          )} />

          {/* Animated corner brackets */}
          {isHovered && !isSoldOut && (
            <>
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute top-0 left-0 w-3 h-3 border-l border-t border-vss-paper"
              />
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 0.05 }}
                className="absolute top-0 right-0 w-3 h-3 border-r border-t border-vss-paper"
              />
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="absolute bottom-0 left-0 w-3 h-3 border-l border-b border-vss-paper"
              />
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 0.15 }}
                className="absolute bottom-0 right-0 w-3 h-3 border-r border-b border-vss-paper"
              />
            </>
          )}

          {/* TOP LEFT: badges (vertical) */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {product.badges.includes("new") && !isSoldOut && (
              <div className="bg-vss-paper text-vss-void px-2 py-0.5">
                <span className="text-[9px] font-mono tracking-widest font-bold">NEW</span>
              </div>
            )}
            {product.badges.includes("limited") && !isSoldOut && (
              <div className="bg-vss-void/85 backdrop-blur-md border border-vss-paper px-2 py-0.5">
                <span className="text-[9px] font-mono tracking-widest text-vss-paper font-bold">LIMITED</span>
              </div>
            )}
            {product.badges.includes("drop") && !isSoldOut && (
              <div className="bg-vss-void/85 backdrop-blur-md border border-vss-smoke px-2 py-0.5">
                <span className="text-[9px] font-mono tracking-widest text-vss-paper font-bold">DROP 001</span>
              </div>
            )}
          </div>

          {/* TOP RIGHT: favorite */}
          <button
            onClick={handleFav}
            className={cn(
              "absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center bg-vss-void/85 backdrop-blur-md border transition-all duration-300",
              isFav ? "border-vss-paper" : "border-vss-smoke hover:border-vss-paper"
            )}
            aria-label={isFav ? t.actions.removeFromFav : t.actions.addToFav}
            title={isFav ? t.actions.removeFromFav : t.actions.addToFav}
          >
            <Heart
              size={12}
              strokeWidth={1.6}
              className={cn("transition-all", isFav ? "fill-vss-paper text-vss-paper" : "text-vss-bone")}
            />
          </button>

          {showAuthHint && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute top-12 right-3 z-20 bg-vss-paper text-vss-void px-3 py-2 text-[10px] font-mono tracking-widest font-bold whitespace-nowrap shadow-xl"
            >
              {locale === "uk" ? "УВІЙДІТЬ →" : "ВОЙДИТЕ →"}
            </motion.div>
          )}

          {/* SOLD OUT overlay */}
          {isSoldOut && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
              <div className="bg-vss-void/85 backdrop-blur-sm px-5 py-2.5 border border-vss-fog">
                <span className="text-display text-base font-bold text-vss-paper tracking-widest">SOLD OUT</span>
              </div>
            </div>
          )}

          {/* BOTTOM LEFT: rotating "VIEW" arrow on hover */}
          <motion.div
            initial={false}
            animate={{
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1 : 0.5,
            }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-3 left-3 z-10 w-9 h-9 bg-vss-paper text-vss-void flex items-center justify-center"
          >
            <ArrowUpRight size={16} strokeWidth={2} className="group-hover:rotate-45 transition-transform duration-500" />
          </motion.div>

          {/* HOVER: SIZES selector at bottom */}
          {!isSoldOut && (
            <motion.div
              initial={false}
              animate={{ y: isHovered ? 0 : "100%", opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-0 left-0 right-0 bg-vss-void/95 backdrop-blur-xl border-t border-vss-paper/30 z-10"
            >
              <div className="px-3 py-2.5">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[8px] font-mono tracking-widest text-vss-mist uppercase">
                    {locale === "uk" ? "ШВИДКЕ ЗАМОВЛЕННЯ" : "БЫСТРЫЙ ЗАКАЗ"}
                  </span>
                  <span className="text-[8px] font-mono tracking-widest text-vss-fog uppercase">
                    {locale === "uk" ? "ОБЕРИ РОЗМІР" : "ВЫБЕРИ РАЗМЕР"}
                  </span>
                </div>
                <div className="flex gap-1">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={(e) => handleQuickAdd(e, s)}
                      className="flex-1 h-8 border border-vss-smoke text-vss-bone text-[10px] font-mono font-bold hover:bg-vss-paper hover:text-vss-void hover:border-vss-paper transition-all"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* INFO BLOCK — magazine style */}
        <div className="pt-3.5 px-0.5">
          {/* Name + price */}
          <div className="flex items-baseline justify-between gap-3 mb-2">
            <h3 className={cn(
              "text-sm md:text-[15px] truncate transition-colors font-medium leading-tight",
              isHovered && !isSoldOut ? "text-vss-glow" : "text-vss-paper"
            )}>
              {product.name[locale]}
            </h3>
            <Price
              amount={product.price}
              size="md"
              variant={isSoldOut ? "muted" : isHovered ? "highlight" : "default"}
              className="shrink-0"
            />
          </div>

          {/* Stock progress bar */}
          <div className="mb-2.5">
            <StockIndicator
              stock={product.stock}
              maxStock={30}
              isSoldOut={isSoldOut}
              variant="card"
            />
          </div>

          {/* Sizes line */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="text-[8px] font-mono text-vss-fog uppercase tracking-widest">
                {locale === "uk" ? "Розм." : "Разм."}
              </span>
              <div className="flex gap-1">
                {product.sizes.map((s) => (
                  <span
                    key={s}
                    className={cn(
                      "text-[9px] font-mono uppercase tracking-wider tabular-nums",
                      isSoldOut ? "text-vss-fog/40" : "text-vss-mist"
                    )}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
            {/* Material indicator */}
            <span className="text-[9px] font-mono tracking-widest text-vss-fog uppercase">
              {product.material[locale].split(",")[0].slice(0, 14)}
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}