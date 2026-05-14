"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ChevronRight } from "lucide-react";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { Button } from "@/components/ui/Button";
import { Asterisk, CornerBrackets, PlusMarker, RotatingStamp, Barcode } from "@/components/ui/Decorations";

interface OrderInfo {
  number: string;
  items: number;
  total: number;
  payment: string;
  email: string;
}

export default function SuccessPage() {
  const { locale } = useLocale();
  const [order, setOrder] = useState<OrderInfo | null>(null);

  useEffect(() => {
    const data = sessionStorage.getItem("vss-last-order");
    if (data) setOrder(JSON.parse(data));
  }, []);

  return (
    <div className="bg-vss-void min-h-screen relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
      <div className="absolute inset-0 bg-radial-glow opacity-30" />

      <div className="absolute top-20 left-12 w-20 h-20 text-vss-fog/40 hidden lg:block">
        <RotatingStamp text="ORDER · CONFIRMED · " />
      </div>
      <div className="absolute bottom-20 right-12 w-20 h-20 text-vss-fog/40 hidden lg:block">
        <RotatingStamp text="VSS · 2026 · " />
      </div>

      <div className="container-vss py-20 md:py-28 relative z-10">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Top */}
            <div className="text-center mb-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", damping: 15 }}
                className="inline-flex w-16 h-16 bg-vss-paper text-vss-void items-center justify-center mb-6"
              >
                <Check size={28} strokeWidth={2.5} />
              </motion.div>

              <div className="flex items-center justify-center gap-3 mb-5">
                <span className="h-px w-10 bg-vss-paper" />
                <Asterisk className="w-3 h-3 text-vss-paper" />
                <span className="text-[10px] tracking-[0.4em] text-vss-paper font-mono font-bold uppercase">
                  {locale === "uk" ? "ЗАМОВЛЕННЯ ПРИЙНЯТО" : "ЗАКАЗ ПРИНЯТ"}
                </span>
                <Asterisk className="w-3 h-3 text-vss-paper" />
                <span className="h-px w-10 bg-vss-paper" />
              </div>

              <h1 className="text-display text-6xl md:text-8xl font-bold tracking-tightest text-vss-paper leading-[0.85] glow-text-strong mb-4">
                THANK<br />YOU
              </h1>

              <p className="text-base text-vss-mist max-w-md mx-auto">
                {locale === "uk"
                  ? "Ми отримали ваше замовлення. Підтвердження прийде на email."
                  : "Мы получили ваш заказ. Подтверждение придёт на email."}
              </p>
            </div>

            {/* Order details */}
            {order && (
              <div className="bg-vss-graphite border border-vss-smoke p-6 mb-6 relative">
                <CornerBrackets className="text-vss-fog/40" />

                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <PlusMarker className="w-2.5 h-2.5 text-vss-paper" />
                    <span className="text-[10px] font-mono tracking-[0.3em] text-vss-paper font-bold uppercase">
                      {locale === "uk" ? "ДЕТАЛІ ЗАМОВЛЕННЯ" : "ДЕТАЛИ ЗАКАЗА"}
                    </span>
                  </div>
                  <Barcode />
                </div>

                <div className="grid grid-cols-2 gap-px bg-vss-smoke mb-4">
                  <div className="bg-vss-graphite p-4">
                    <div className="text-[9px] font-mono tracking-widest text-vss-fog uppercase mb-1">
                      {locale === "uk" ? "НОМЕР" : "НОМЕР"}
                    </div>
                    <div className="text-display text-lg font-bold text-vss-paper">{order.number}</div>
                  </div>
                  <div className="bg-vss-graphite p-4">
                    <div className="text-[9px] font-mono tracking-widest text-vss-fog uppercase mb-1">
                      {locale === "uk" ? "СУМА" : "СУММА"}
                    </div>
                    <div className="text-display text-lg font-bold text-vss-paper tabular-nums">
                      {order.total.toLocaleString("uk-UA")} ₴
                    </div>
                  </div>
                  <div className="bg-vss-graphite p-4">
                    <div className="text-[9px] font-mono tracking-widest text-vss-fog uppercase mb-1">
                      {locale === "uk" ? "ТОВАРІВ" : "ТОВАРОВ"}
                    </div>
                    <div className="text-display text-lg font-bold text-vss-paper">{order.items}</div>
                  </div>
                  <div className="bg-vss-graphite p-4">
                    <div className="text-[9px] font-mono tracking-widest text-vss-fog uppercase mb-1">
                      {locale === "uk" ? "ОПЛАТА" : "ОПЛАТА"}
                    </div>
                    <div className="text-display text-lg font-bold text-vss-paper uppercase">
                      {order.payment === "card" ? (locale === "uk" ? "КАРТКА" : "КАРТА") : order.payment === "usdt" ? "USDT" : (locale === "uk" ? "НАКЛ." : "НАЛОЖ.")}
                    </div>
                  </div>
                </div>

                <div className="text-[10px] font-mono text-vss-mist leading-relaxed">
                  {locale === "uk"
                    ? `Підтвердження надіслано на ${order.email}. Ми відправимо замовлення протягом 24 годин (ПН ВТ ЧТ ПТ).`
                    : `Подтверждение отправлено на ${order.email}. Мы отправим заказ в течение 24 часов (ПН ВТ ЧТ ПТ).`}
                </div>
              </div>
            )}

            {/* Next steps */}
            <div className="bg-vss-obsidian border border-vss-smoke p-5 mb-8">
              <div className="text-[10px] font-mono tracking-widest text-vss-paper font-bold uppercase mb-4">
                {locale === "uk" ? "ЩО ДАЛІ" : "ЧТО ДАЛЬШЕ"}
              </div>
              <div className="space-y-2.5 text-xs text-vss-bone">
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 bg-vss-paper text-vss-void flex items-center justify-center text-[9px] font-bold font-mono shrink-0">1</span>
                  <span>{locale === "uk" ? "Підтвердження прийде на email" : "Подтверждение придёт на email"}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 bg-vss-paper text-vss-void flex items-center justify-center text-[9px] font-bold font-mono shrink-0">2</span>
                  <span>{locale === "uk" ? "Менеджер зв'яжеться для уточнення" : "Менеджер свяжется для уточнения"}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 bg-vss-paper text-vss-void flex items-center justify-center text-[9px] font-bold font-mono shrink-0">3</span>
                  <span>{locale === "uk" ? "Відправка протягом 24 годин" : "Отправка в течение 24 часов"}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 bg-vss-paper text-vss-void flex items-center justify-center text-[9px] font-bold font-mono shrink-0">4</span>
                  <span>{locale === "uk" ? "Доставка Новою Поштою 1-3 дні" : "Доставка Новой Почтой 1-3 дня"}</span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/catalog">
                <Button variant="primary" size="lg" arrow>
                  {locale === "uk" ? "ПРОДОВЖИТИ" : "ПРОДОЛЖИТЬ"}
                </Button>
              </Link>
              <a href="https://t.me/vss_kh" target="_blank" rel="noreferrer">
                <Button variant="outline" size="lg" arrow>
                  TELEGRAM
                </Button>
              </a>
            </div>

            {/* Bottom info */}
            <div className="mt-12 text-center text-[10px] font-mono tracking-widest text-vss-fog uppercase">
              VSS · 2026 · KHARKIV / UA
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}