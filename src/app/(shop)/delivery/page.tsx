"use client";

import Link from "next/link";
import { ChevronRight, Truck, Package, CreditCard, Shield, Clock } from "lucide-react";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { Asterisk, CornerBrackets, PlusMarker, RotatingStamp } from "@/components/ui/Decorations";
import { WorkSchedule } from "@/components/ui/WorkSchedule";

export default function DeliveryPage() {
  const { locale } = useLocale();

  const deliveryOptions = [
    { icon: Truck, title: { uk: "Нова Пошта · Відділення", ru: "Новая Почта · Отделение" }, time: "1–3 дні", price: { uk: "60 ₴ / безкошт. від 1500 ₴", ru: "60 ₴ / беспл. от 1500 ₴" } },
    { icon: Package, title: { uk: "Нова Пошта · Поштомат", ru: "Новая Почта · Почтомат" }, time: "2–4 дні", price: { uk: "60 ₴ / безкошт. від 1500 ₴", ru: "60 ₴ / беспл. от 1500 ₴" } },
    { icon: Truck, title: { uk: "Укрпошта · Відділення", ru: "Укрпочта · Отделение" }, time: "3–7 днів", price: { uk: "45 ₴ / безкошт. від 1500 ₴", ru: "45 ₴ / беспл. от 1500 ₴" } },
  ];

  const paymentOptions = [
    { icon: CreditCard, title: { uk: "Картка онлайн", ru: "Карта онлайн" }, desc: { uk: "Visa / Mastercard через MonoPay", ru: "Visa / Mastercard через MonoPay" } },
    { icon: Package, title: { uk: "Накладений платіж", ru: "Наложенный платёж" }, desc: { uk: "Оплата при отриманні. Комісія ~2%", ru: "Оплата при получении. Комиссия ~2%" } },
  ];

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
        <RotatingStamp text="DELIVERY · NP · UP · " />
      </div>

      <div className="container-vss py-10 md:py-14 relative">
        <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-vss-fog uppercase mb-8">
          <Link href="/" className="hover:text-vss-paper transition-colors">VSS</Link>
          <ChevronRight size={10} strokeWidth={2} />
          <span className="text-vss-paper font-bold">{locale === "uk" ? "ДОСТАВКА" : "ДОСТАВКА"}</span>
        </div>

        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-vss-paper" />
            <Asterisk className="w-3 h-3 text-vss-paper" />
            <span className="text-[10px] tracking-[0.4em] text-vss-paper font-mono font-bold uppercase">
              DELIVERY · PAYMENT
            </span>
          </div>
          <h1 className="text-display text-5xl md:text-7xl font-bold tracking-tightest text-vss-paper leading-[0.9] glow-text">
            {locale === "uk" ? "ДОСТАВКА" : "ДОСТАВКА"}
          </h1>
        </div>

        <div className="mb-12">
          <SectionTitle title={locale === "uk" ? "СПОСОБИ ДОСТАВКИ" : "СПОСОБЫ ДОСТАВКИ"} number="01" />
          <div className="grid md:grid-cols-3 gap-4">
            {deliveryOptions.map((opt, i) => {
              const Icon = opt.icon;
              return (
                <div key={i} className="bg-vss-graphite border border-vss-smoke p-6 relative group hover:border-vss-paper transition-all">
                  <CornerBrackets className="text-vss-fog/30 group-hover:text-vss-paper transition-colors" />
                  <Icon size={20} strokeWidth={1.5} className="text-vss-paper mb-4" />
                  <h3 className="text-display text-lg font-bold text-vss-paper mb-2 leading-tight">
                    {opt.title[locale]}
                  </h3>
                  <div className="flex items-center gap-2 mb-3">
                    <Clock size={11} className="text-vss-fog" />
                    <span className="text-[11px] font-mono tracking-widest text-vss-mist uppercase">
                      {opt.time}
                    </span>
                  </div>
                  <p className="text-xs text-vss-bone leading-relaxed">{opt.price[locale]}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mb-12">
          <SectionTitle title={locale === "uk" ? "СПОСОБИ ОПЛАТИ" : "СПОСОБЫ ОПЛАТЫ"} number="02" />
          <div className="grid md:grid-cols-2 gap-4">
            {paymentOptions.map((opt, i) => {
              const Icon = opt.icon;
              return (
                <div key={i} className="bg-vss-graphite border border-vss-smoke p-6 relative group hover:border-vss-paper transition-all">
                  <CornerBrackets className="text-vss-fog/30 group-hover:text-vss-paper transition-colors" />
                  <Icon size={20} strokeWidth={1.5} className="text-vss-paper mb-4" />
                  <h3 className="text-display text-xl font-bold text-vss-paper mb-2">
                    {opt.title[locale]}
                  </h3>
                  <p className="text-xs text-vss-bone leading-relaxed">{opt.desc[locale]}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mb-12">
          <SectionTitle title={locale === "uk" ? "ГРАФІК РОБОТИ" : "ГРАФИК РАБОТЫ"} number="03" />
          <div className="max-w-md">
            <WorkSchedule variant="full" />
          </div>
          <p className="text-xs text-vss-mist mt-4 max-w-md leading-relaxed">
            {locale === "uk"
              ? "Замовлення оформлені до 14:00 у робочі дні відправляються того ж дня."
              : "Заказы, оформленные до 14:00 в рабочие дни, отправляются в тот же день."}
          </p>
        </div>

        <div className="bg-vss-graphite border border-vss-smoke p-6 relative">
          <CornerBrackets className="text-vss-fog/30" />
          <Shield size={20} strokeWidth={1.5} className="text-vss-paper mb-4" />
          <h3 className="text-display text-2xl font-bold text-vss-paper mb-3">
            {locale === "uk" ? "Обмін / Повернення" : "Обмен / Возврат"}
          </h3>
          <div className="space-y-2 text-sm text-vss-bone">
            <div className="flex items-start gap-2"><PlusMarker className="w-2 h-2 text-vss-paper mt-1.5 shrink-0" /><span>{locale === "uk" ? "14 днів на повернення з моменту отримання" : "14 дней на возврат с момента получения"}</span></div>
            <div className="flex items-start gap-2"><PlusMarker className="w-2 h-2 text-vss-paper mt-1.5 shrink-0" /><span>{locale === "uk" ? "Товар має зберегти товарний вигляд та бирки" : "Товар должен сохранить товарный вид и бирки"}</span></div>
            <div className="flex items-start gap-2"><PlusMarker className="w-2 h-2 text-vss-paper mt-1.5 shrink-0" /><span>{locale === "uk" ? "Зворотна доставка — за рахунок покупця" : "Обратная доставка — за счёт покупателя"}</span></div>
            <div className="flex items-start gap-2"><PlusMarker className="w-2 h-2 text-vss-paper mt-1.5 shrink-0" /><span>{locale === "uk" ? "Гроші повертаємо протягом 3-5 днів" : "Деньги возвращаем в течение 3-5 дней"}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ title, number }: { title: string; number: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <PlusMarker className="w-2.5 h-2.5 text-vss-paper" />
      <span className="text-[10px] tracking-[0.4em] text-vss-paper font-mono font-bold uppercase">{title}</span>
      <span className="text-[10px] font-mono tracking-widest text-vss-fog">/ {number}</span>
      <div className="flex-1 h-px bg-vss-smoke" />
    </div>
  );
}