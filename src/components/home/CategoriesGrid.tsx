"use client";

import Link from "next/link";
import { SafeImage } from "@/components/ui/SafeImage";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { CornerBrackets, Asterisk, PlusMarker } from "@/components/ui/Decorations";
import { products } from "@/lib/data/products";

const categoryData = [
  {
    key: "hoodie", image: "/images/products/hoodie-shadow-1.png", number: "01",
    span: "col-span-2 row-span-2",
    fromPrice: 1199,
  },
  {
    key: "tee", image: "/images/products/tee-shadow-1.png", number: "02",
    span: "col-span-1 row-span-1",
    fromPrice: 699,
  },
  {
    key: "jeans", image: "/images/products/jeans-shadow-1.png", number: "03",
    span: "col-span-1 row-span-2",
    fromPrice: 1199,
  },
  {
    key: "shorts", image: "/images/products/shorts-shadow-1.png", number: "04",
    span: "col-span-1 row-span-1",
    fromPrice: 749,
  },
  {
    key: "socks", image: "/images/products/socks-shadow-1.png", number: "05",
    span: "col-span-1 row-span-1",
    fromPrice: 449,
  },
] as const;

export function CategoriesGrid() {
  const { t, locale } = useLocale();

  return (
    <section className="py-20 md:py-32 bg-vss-obsidian relative">
      <div className="container-vss">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 md:mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-5"
            >
              <span className="h-px w-8 bg-vss-paper" />
              <Asterisk className="w-3 h-3 text-vss-paper" />
              <span className="text-[10px] md:text-xs tracking-[0.4em] text-vss-paper font-mono font-bold uppercase">
                CATEGORIES / 003
              </span>
            </motion.div>

            <h2 className="text-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tightest text-vss-paper leading-[0.9] glow-text">
              SHOP <br className="md:hidden" />
              <span className="text-stroke">BY TYPE</span>
            </h2>

            <p className="text-sm text-vss-mist mt-4 max-w-md">
              {locale === "uk"
                ? "П'ять категорій. Жодного компромісу. Все в одній естетиці — тінь на тіні."
                : "Пять категорий. Никаких компромиссов. Всё в одной эстетике — тень на тени."}
            </p>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right">
              <div className="text-display text-3xl font-bold text-vss-paper">{products.length}</div>
              <div className="text-[10px] tracking-widest font-mono text-vss-mist uppercase">
                {locale === "uk" ? "ТОВАРІВ" : "ТОВАРОВ"}
              </div>
            </div>
            <div className="w-px h-12 bg-vss-smoke" />
            <div>
              <div className="text-display text-3xl font-bold text-vss-paper">5</div>
              <div className="text-[10px] tracking-widest font-mono text-vss-mist uppercase">
                {locale === "uk" ? "КАТЕГОРІЙ" : "КАТЕГОРИЙ"}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 auto-rows-[200px] md:auto-rows-[280px]">
          {categoryData.map((cat, i) => {
            const itemsCount = products.filter(p => p.category === cat.key).length;
            return (
              <motion.div
                key={cat.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={cat.span}
              >
                <Link
                  href={`/catalog?category=${cat.key}`}
                  className="group relative block w-full h-full bg-vss-graphite overflow-hidden"
                >
                  <SafeImage
                    src={cat.image}
                    alt={t.categories[cat.key]}
                    fill
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-vss-void via-vss-void/30 to-transparent opacity-90" />
                  <div className="absolute inset-0 bg-radial-glow opacity-0 group-hover:opacity-50 transition-opacity duration-700" />
                  <div className="absolute inset-0 border border-vss-smoke group-hover:border-vss-paper/30 transition-colors duration-500" />
                  <CornerBrackets className="text-vss-paper opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Top: number + items count */}
                  <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <PlusMarker className="text-vss-paper w-2.5 h-2.5" />
                        <span className="text-[10px] tracking-widest font-mono text-vss-paper font-bold">
                          / {cat.number}
                        </span>
                      </div>
                      <span className="text-[9px] tracking-widest font-mono text-vss-mist mt-1 block">
                        {itemsCount} {locale === "uk" ? "ШТ" : "ШТ"}
                      </span>
                    </div>
                    <div className="w-9 h-9 border border-vss-smoke group-hover:border-vss-paper group-hover:bg-vss-paper flex items-center justify-center transition-all duration-500">
                      <ArrowUpRight
                        size={16}
                        strokeWidth={1.5}
                        className="text-vss-paper group-hover:text-vss-void group-hover:rotate-45 transition-all duration-500"
                      />
                    </div>
                  </div>

                  {/* Bottom: name + price */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-[9px] tracking-widest font-mono text-vss-mist mb-1">
                      {locale === "uk" ? "ВІД" : "ОТ"} <span className="text-vss-paper font-bold">{cat.fromPrice} ₴</span>
                    </div>
                    <h3 className="text-display text-2xl md:text-3xl lg:text-4xl font-bold text-vss-paper tracking-tight leading-none glow-text">
                      {t.categories[cat.key]}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
