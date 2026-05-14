"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, CreditCard, Truck, Package, Check } from "lucide-react";
import { useCartStore } from "@/lib/store/cartStore";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { products } from "@/lib/data/products";
import { Asterisk, CornerBrackets, PlusMarker } from "@/components/ui/Decorations";
import { Button } from "@/components/ui/Button";
import { Price } from "@/components/ui/Price";
import { SafeImage } from "@/components/ui/SafeImage";
import { Autocomplete } from "@/components/ui/Autocomplete";
import {
  useNPCitySearch, useNPWarehouses, NPCity, NPWarehouse,
  useUPCitySearch, useUPWarehouses, UPCity, UPWarehouse,
} from "@/lib/hooks/useNovaPoshta";
import { markPromoUsed } from "@/lib/data/promocodes";
import { formatPhone, validatePhone, validateEmail, validateTelegram, validateName } from "@/lib/utils/validation";
import { cn } from "@/lib/utils/cn";

type Carrier = "np" | "up";
type DeliveryType = "branch" | "postomat";
type PaymentType = "card" | "cod";

export default function CheckoutPage() {
  const { locale } = useLocale();
  const router = useRouter();
  const { items, getTotal, getDiscount, getFinalTotal, promo, clearCart } = useCartStore();

  const [form, setForm] = useState({
    name: "",
    surname: "",
    phone: "",
    email: "",
    telegram: "",
    comment: "",
    noContact: false,
  });

  const [carrier, setCarrier] = useState<Carrier>("np");
  const [delivery, setDelivery] = useState<DeliveryType>("branch");
  const [payment, setPayment] = useState<PaymentType>("card");
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // NP
  const [npCityQuery, setNpCityQuery] = useState("");
  const [selectedNpCity, setSelectedNpCity] = useState<NPCity | null>(null);
  const { cities: npCities, loading: npCitiesLoading } = useNPCitySearch(npCityQuery);

  const [npWhQuery, setNpWhQuery] = useState("");
  const [selectedNpWh, setSelectedNpWh] = useState<NPWarehouse | null>(null);
  const { warehouses: npWh, loading: npWhLoading } = useNPWarehouses(selectedNpCity?.Ref || null, delivery);

  const filteredNpWh = useMemo(() => {
    if (!npWhQuery) return npWh.slice(0, 30);
    const q = npWhQuery.toLowerCase();
    return npWh.filter((w) => w.Description.toLowerCase().includes(q) || w.Number.includes(npWhQuery)).slice(0, 30);
  }, [npWh, npWhQuery]);

  // UP
  const [upCityQuery, setUpCityQuery] = useState("");
  const [selectedUpCity, setSelectedUpCity] = useState<UPCity | null>(null);
  const { cities: upCities, loading: upCitiesLoading } = useUPCitySearch(upCityQuery);

  const [upWhQuery, setUpWhQuery] = useState("");
  const [selectedUpWh, setSelectedUpWh] = useState<UPWarehouse | null>(null);
  const { warehouses: upWh, loading: upWhLoading } = useUPWarehouses(selectedUpCity?.id || null);

  const filteredUpWh = useMemo(() => {
    if (!upWhQuery) return upWh;
    const q = upWhQuery.toLowerCase();
    return upWh.filter((w) => w.address.toLowerCase().includes(q));
  }, [upWh, upWhQuery]);

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

  const validate = () => {
    const e: Record<string, string> = {};
    if (!validateName(form.name)) e.name = locale === "uk" ? "Мінімум 2 символи" : "Минимум 2 символа";
    if (!validateName(form.surname)) e.surname = locale === "uk" ? "Мінімум 2 символи" : "Минимум 2 символа";
    if (!validatePhone(form.phone)) e.phone = locale === "uk" ? "Невірний формат" : "Неверный формат";
    if (form.email && !validateEmail(form.email)) e.email = locale === "uk" ? "Невірний email" : "Неверный email";
    if (form.telegram && !validateTelegram(form.telegram)) e.telegram = locale === "uk" ? "Невірний username" : "Неверный username";

    // Хотя бы один контакт (email или telegram) — рекомендация
    if (!form.email && !form.telegram) {
      e.contact = locale === "uk" ? "Вкажіть email або Telegram" : "Укажите email или Telegram";
    }

    if (carrier === "np") {
      if (!selectedNpCity) e.city = "!";
      if (!selectedNpWh) e.warehouse = "!";
    } else {
      if (!selectedUpCity) e.city = "!";
      if (!selectedUpWh) e.warehouse = "!";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      window.scrollTo({ top: 200, behavior: "smooth" });
      return;
    }

    setSubmitting(true);

    if (promo && form.email) {
      markPromoUsed(form.email, promo.code);
    }

    const orderNumber = `VSS-${Date.now().toString().slice(-6)}`;
    const cityName = carrier === "np" ? selectedNpCity!.Description : selectedUpCity!.name;
    const whName = carrier === "np" ? selectedNpWh!.Description : selectedUpWh!.address;
    const orderTotal = finalTotal + shipping;

    const orderInfo = {
      number: orderNumber,
      items: items.length,
      total: orderTotal,
      payment,
      carrier,
      delivery,
      city: cityName,
      warehouse: whName,
      email: form.email,
      telegram: form.telegram,
      phone: form.phone,
      noContact: form.noContact,
    };

    sessionStorage.setItem("vss-last-order", JSON.stringify(orderInfo));

    if (payment === "card") {
      // MonoPay — создаём инвойс
      try {
        const cartItems = items.map((i) => {
          const p = products.find((pp) => pp.id === i.productId);
          return {
            name: `${p?.name[locale]} (${i.size})`,
            price: p?.price || 0,
            quantity: i.quantity,
          };
        });

        const res = await fetch("/api/monopay/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: orderTotal,
            reference: orderNumber,
            destination: `Замовлення VSS ${orderNumber}`,
            redirectUrl: `${window.location.origin}/success?order=${orderNumber}`,
            items: cartItems,
          }),
        });

        const data = await res.json();

        if (data.pageUrl) {
          clearCart();
          window.location.href = data.pageUrl;
          return;
        } else {
          throw new Error(data.error || "Payment failed");
        }
      } catch (err) {
        console.error("Payment error:", err);
        alert(locale === "uk" ? "Помилка оплати. Спробуйте ще раз." : "Ошибка оплаты. Попробуйте ещё раз.");
        setSubmitting(false);
        return;
      }
    } else {
      // Накладений — без оплаты
      await new Promise((r) => setTimeout(r, 1200));
      clearCart();
      router.push("/success");
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-vss-obsidian">
        <div className="text-center">
          <p className="text-sm text-vss-mist mb-5">{locale === "uk" ? "Кошик порожній" : "Корзина пуста"}</p>
          <Link href="/catalog">
            <Button variant="primary" size="md" arrow>{locale === "uk" ? "Каталог" : "Каталог"}</Button>
          </Link>
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

      <div className="container-vss py-10 md:py-14 relative">
        <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-vss-fog uppercase mb-8">
          <Link href="/" className="hover:text-vss-paper transition-colors">VSS</Link>
          <ChevronRight size={10} strokeWidth={2} />
          <Link href="/cart" className="hover:text-vss-paper transition-colors">
            {locale === "uk" ? "КОШИК" : "КОРЗИНА"}
          </Link>
          <ChevronRight size={10} strokeWidth={2} />
          <span className="text-vss-paper font-bold">CHECKOUT</span>
        </div>

        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-vss-paper" />
            <Asterisk className="w-3 h-3 text-vss-paper" />
            <span className="text-[10px] tracking-[0.4em] text-vss-paper font-mono font-bold uppercase">
              CHECKOUT / 002
            </span>
          </div>
          <h1 className="text-display text-5xl md:text-7xl font-bold tracking-tightest text-vss-paper leading-[0.9] glow-text">
            {locale === "uk" ? "ОФОРМЛЕННЯ" : "ОФОРМЛЕНИЕ"}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-[1fr_400px] gap-8">
          <div className="space-y-6">
            {/* CONTACTS */}
            <FormSection title={locale === "uk" ? "КОНТАКТИ" : "КОНТАКТЫ"} number="01">
              <div className="grid grid-cols-2 gap-3">
                <Input required label={locale === "uk" ? "Ім'я" : "Имя"} value={form.name} onChange={(v) => setForm({ ...form, name: v })} error={errors.name} />
                <Input required label={locale === "uk" ? "Прізвище" : "Фамилия"} value={form.surname} onChange={(v) => setForm({ ...form, surname: v })} error={errors.surname} />
              </div>
              <Input
                required
                label={locale === "uk" ? "Телефон" : "Телефон"}
                value={form.phone}
                onChange={(v) => setForm({ ...form, phone: formatPhone(v) })}
                error={errors.phone}
                placeholder="+380 XX XXX XX XX"
                type="tel"
              />
              <Input
                label="Email"
                value={form.email}
                onChange={(v) => setForm({ ...form, email: v })}
                error={errors.email}
                type="email"
                placeholder="hello@vss.ua"
                hint={locale === "uk" ? "Не обов'язково. Для підтвердження замовлення" : "Необязательно. Для подтверждения заказа"}
              />
              <Input
                label="Telegram"
                value={form.telegram}
                onChange={(v) => {
                  const clean = v.replace(/^@+/, "");
                  setForm({ ...form, telegram: clean ? "@" + clean : "" });
                }}
                error={errors.telegram}
                placeholder="@username"
                hint={locale === "uk" ? "Не обов'язково. Для оперативного зв'язку" : "Необязательно. Для оперативной связи"}
              />

              {errors.contact && (
                <div className="bg-vss-paper text-vss-void px-3 py-2 text-[11px] font-mono tracking-widest font-bold uppercase">
                  ↑ {errors.contact}
                </div>
              )}

              <label className="flex items-start gap-3 cursor-pointer group pt-2">
                <div className={cn(
                  "w-5 h-5 border flex items-center justify-center shrink-0 mt-0.5 transition-all",
                  form.noContact ? "bg-vss-paper border-vss-paper" : "border-vss-smoke group-hover:border-vss-paper"
                )}>
                  <input
                    type="checkbox"
                    checked={form.noContact}
                    onChange={(e) => setForm({ ...form, noContact: e.target.checked })}
                    className="sr-only"
                  />
                  {form.noContact && <Check size={12} strokeWidth={3} className="text-vss-void" />}
                </div>
                <div className="flex-1">
                  <div className={cn("text-xs transition-colors", form.noContact ? "text-vss-paper font-medium" : "text-vss-bone")}>
                    {locale === "uk" ? "Не зв'язуватись зі мною" : "Не связываться со мной"}
                  </div>
                  <div className="text-[10px] font-mono text-vss-fog mt-0.5">
                    {locale === "uk"
                      ? "Менеджер не телефонуватиме. Усі сповіщення в Telegram/email."
                      : "Менеджер не позвонит. Все уведомления в Telegram/email."}
                  </div>
                </div>
              </label>
            </FormSection>

            {/* DELIVERY */}
            <FormSection title={locale === "uk" ? "ДОСТАВКА" : "ДОСТАВКА"} number="02">
              {/* Carrier tabs */}
              <div className="grid grid-cols-2 gap-1.5 mb-2">
                <button
                  type="button"
                  onClick={() => {
                    setCarrier("np");
                    setSelectedUpCity(null);
                    setSelectedUpWh(null);
                  }}
                  className={cn(
                    "h-11 text-xs font-mono font-bold tracking-widest uppercase border transition-all",
                    carrier === "np"
                      ? "bg-vss-paper text-vss-void border-vss-paper"
                      : "bg-vss-void text-vss-bone border-vss-smoke hover:border-vss-paper"
                  )}
                >
                  Нова Пошта
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCarrier("up");
                    setSelectedNpCity(null);
                    setSelectedNpWh(null);
                  }}
                  className={cn(
                    "h-11 text-xs font-mono font-bold tracking-widest uppercase border transition-all",
                    carrier === "up"
                      ? "bg-vss-paper text-vss-void border-vss-paper"
                      : "bg-vss-void text-vss-bone border-vss-smoke hover:border-vss-paper"
                  )}
                >
                  Укрпошта
                </button>
              </div>

              {carrier === "np" && (
                <>
                  <div className="grid grid-cols-2 gap-2">
                    <RadioCard
                      selected={delivery === "branch"}
                      onClick={() => { setDelivery("branch"); setSelectedNpWh(null); setNpWhQuery(""); }}
                      icon={Truck}
                      title={locale === "uk" ? "Відділення" : "Отделение"}
                      subtitle="1–3 дні"
                    />
                    <RadioCard
                      selected={delivery === "postomat"}
                      onClick={() => { setDelivery("postomat"); setSelectedNpWh(null); setNpWhQuery(""); }}
                      icon={Package}
                      title={locale === "uk" ? "Поштомат" : "Почтомат"}
                      subtitle="2–4 дні"
                    />
                  </div>

                  <Autocomplete<NPCity>
                    label={locale === "uk" ? "Місто" : "Город"}
                    value={selectedNpCity}
                    onChange={(c) => { setSelectedNpCity(c); setSelectedNpWh(null); setNpWhQuery(""); }}
                    query={npCityQuery}
                    onQueryChange={setNpCityQuery}
                    items={npCities}
                    loading={npCitiesLoading}
                    getKey={(c) => c.Ref}
                    getLabel={(c) => c.Description}
                    getSubLabel={(c) => c.AreaDescription ? `${c.AreaDescription} обл.` : ""}
                    placeholder={locale === "uk" ? "Почніть вводити місто" : "Начните вводить город"}
                    error={errors.city}
                  />

                  <Autocomplete<NPWarehouse>
                    label={delivery === "branch" ? (locale === "uk" ? "Відділення" : "Отделение") : (locale === "uk" ? "Поштомат" : "Почтомат")}
                    value={selectedNpWh}
                    onChange={setSelectedNpWh}
                    query={npWhQuery}
                    onQueryChange={setNpWhQuery}
                    items={filteredNpWh}
                    loading={npWhLoading}
                    getKey={(w) => w.Ref}
                    getLabel={(w) => w.Description}
                    getSubLabel={(w) => `№ ${w.Number}`}
                    placeholder={selectedNpCity ? (locale === "uk" ? "Оберіть відділення" : "Выберите отделение") : (locale === "uk" ? "Спочатку оберіть місто" : "Сначала выберите город")}
                    error={errors.warehouse}
                    disabled={!selectedNpCity}
                  />
                </>
              )}

              {carrier === "up" && (
                <>
                  <div className="bg-vss-void border border-vss-smoke p-3 mb-2">
                    <div className="text-[9px] font-mono tracking-widest text-vss-fog uppercase mb-1">
                      ↳ {locale === "uk" ? "ТЕРМІНИ" : "СРОКИ"}
                    </div>
                    <div className="text-xs text-vss-bone">
                      {locale === "uk" ? "Доставка Укрпоштою: 3–7 днів" : "Доставка Укрпочтой: 3–7 дней"}
                    </div>
                  </div>

                  <Autocomplete<UPCity>
                    label={locale === "uk" ? "Місто" : "Город"}
                    value={selectedUpCity}
                    onChange={(c) => { setSelectedUpCity(c); setSelectedUpWh(null); setUpWhQuery(""); }}
                    query={upCityQuery}
                    onQueryChange={setUpCityQuery}
                    items={upCities}
                    loading={upCitiesLoading}
                    getKey={(c) => c.id}
                    getLabel={(c) => c.name}
                    getSubLabel={(c) => c.region}
                    placeholder={locale === "uk" ? "Почніть вводити місто" : "Начните вводить город"}
                    error={errors.city}
                  />

                  <Autocomplete<UPWarehouse>
                    label={locale === "uk" ? "Відділення" : "Отделение"}
                    value={selectedUpWh}
                    onChange={setSelectedUpWh}
                    query={upWhQuery}
                    onQueryChange={setUpWhQuery}
                    items={filteredUpWh}
                    loading={upWhLoading}
                    getKey={(w) => w.id}
                    getLabel={(w) => w.address}
                    placeholder={selectedUpCity ? (locale === "uk" ? "Оберіть відділення" : "Выберите отделение") : (locale === "uk" ? "Спочатку оберіть місто" : "Сначала выберите город")}
                    error={errors.warehouse}
                    disabled={!selectedUpCity}
                  />
                </>
              )}
            </FormSection>

            {/* PAYMENT */}
            <FormSection title={locale === "uk" ? "ОПЛАТА" : "ОПЛАТА"} number="03">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <RadioCard
                  selected={payment === "card"}
                  onClick={() => setPayment("card")}
                  icon={CreditCard}
                  title={locale === "uk" ? "Картка онлайн" : "Карта онлайн"}
                  subtitle="MonoPay · Visa / Mastercard"
                />
                <RadioCard
                  selected={payment === "cod"}
                  onClick={() => setPayment("cod")}
                  icon={Package}
                  title={locale === "uk" ? "Накладений" : "Наложенный"}
                  subtitle={locale === "uk" ? "При отриманні" : "При получении"}
                />
              </div>

              {payment === "card" && (
                <div className="bg-vss-void border border-vss-smoke p-4 mt-3">
                  <div className="flex items-center gap-2 mb-2">
                    <CreditCard size={12} className="text-vss-paper" />
                    <span className="text-[10px] font-mono tracking-widest text-vss-paper font-bold uppercase">
                      MONOPAY
                    </span>
                  </div>
                  <p className="text-[11px] text-vss-mist leading-relaxed">
                    {locale === "uk"
                      ? "Безпечна оплата через MonoPay. Після підтвердження ви будете перенаправлені на сторінку банку."
                      : "Безопасная оплата через MonoPay. После подтверждения вы будете перенаправлены на страницу банка."}
                  </p>
                </div>
              )}

              {payment === "cod" && (
                <div className="bg-vss-void border border-vss-smoke p-4 mt-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Package size={12} className="text-vss-paper" />
                    <span className="text-[10px] font-mono tracking-widest text-vss-paper font-bold uppercase">
                      {locale === "uk" ? "НАКЛАДЕНИЙ ПЛАТІЖ" : "НАЛОЖЕННЫЙ ПЛАТЁЖ"}
                    </span>
                  </div>
                  <p className="text-[11px] text-vss-mist leading-relaxed">
                    {locale === "uk"
                      ? "Оплата при отриманні. Комісія перевізника ~2% від суми + фіксований збір."
                      : "Оплата при получении. Комиссия перевозчика ~2% от суммы + фиксированный сбор."}
                  </p>
                </div>
              )}
            </FormSection>

            {/* COMMENT */}
            <FormSection title={locale === "uk" ? "КОМЕНТАР" : "КОММЕНТАРИЙ"} number="04">
              <textarea
                value={form.comment}
                onChange={(e) => setForm({ ...form, comment: e.target.value })}
                placeholder={locale === "uk" ? "Додаткові побажання (не обов'язково)" : "Дополнительные пожелания (необязательно)"}
                rows={3}
                className="w-full p-3 bg-vss-void border border-vss-smoke text-sm text-vss-paper placeholder:text-vss-fog focus:border-vss-paper outline-none transition-colors resize-none"
              />
            </FormSection>
          </div>

          {/* SUMMARY */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="bg-vss-graphite border border-vss-smoke p-5 relative">
              <CornerBrackets className="text-vss-fog/40" />

              <div className="flex items-center gap-2 mb-5">
                <PlusMarker className="w-2.5 h-2.5 text-vss-paper" />
                <span className="text-[10px] font-mono tracking-[0.3em] text-vss-paper font-bold uppercase">
                  {locale === "uk" ? "ЗАМОВЛЕННЯ" : "ЗАКАЗ"}
                </span>
              </div>

              <div className="space-y-2.5 mb-5 pb-5 border-b border-vss-smoke max-h-60 overflow-y-auto">
                {items.map((item) => {
                  const product = products.find((p) => p.id === item.productId);
                  if (!product) return null;
                  return (
                    <div key={`${item.productId}-${item.size}`} className="flex items-center gap-3">
                      <div className="relative w-12 h-14 bg-vss-void border border-vss-smoke shrink-0 overflow-hidden">
                        <SafeImage src={product.images[0]} alt="" fill className="object-cover" sizes="48px" />
                        <div className="absolute top-0 right-0 bg-vss-paper text-vss-void text-[8px] font-mono font-bold px-1 tabular-nums">
                          ×{item.quantity}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-vss-paper truncate">{product.name[locale]}</div>
                        <div className="text-[9px] font-mono tracking-widest text-vss-fog uppercase">
                          {item.size}
                        </div>
                      </div>
                      <Price amount={product.price * item.quantity} size="xs" />
                    </div>
                  );
                })}
              </div>

              <div className="space-y-1.5 pb-4 border-b border-vss-smoke">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-vss-mist">{locale === "uk" ? "Товари" : "Товары"}</span>
                  <Price amount={total} size="sm" />
                </div>
                {discount > 0 && (
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-vss-mist">{promo?.code}</span>
                    <span className="font-mono font-bold text-vss-paper">−{discount.toLocaleString("uk-UA")} ₴</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-xs">
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

              <Button variant="primary" size="lg" fullWidth type="submit" disabled={submitting}>
                {submitting ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="w-3 h-3 border-2 border-vss-void border-t-transparent rounded-full animate-spin" />
                    {locale === "uk" ? "ОБРОБКА..." : "ОБРАБОТКА..."}
                  </span>
                ) : (
                  <>{payment === "card" ? (locale === "uk" ? "СПЛАТИТИ" : "ОПЛАТИТЬ") : (locale === "uk" ? "ПІДТВЕРДИТИ" : "ПОДТВЕРДИТЬ")} <span>→</span></>
                )}
              </Button>

              <div className="mt-3 text-center text-[9px] font-mono tracking-widest text-vss-fog uppercase">
                {locale === "uk" ? "Натискаючи, ви погоджуєтесь з умовами" : "Нажимая, вы соглашаетесь с условиями"}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

function FormSection({ title, number, children }: { title: string; number: string; children: React.ReactNode }) {
  return (
    <div className="bg-vss-graphite border border-vss-smoke p-5 relative">
      <CornerBrackets className="text-vss-fog/30" />
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <PlusMarker className="w-2 h-2 text-vss-paper" />
          <span className="text-[10px] font-mono tracking-[0.3em] text-vss-paper font-bold uppercase">{title}</span>
        </div>
        <span className="text-[9px] font-mono tracking-widest text-vss-fog">/ {number}</span>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Input({
  label, value, onChange, error, placeholder, type = "text", hint, required,
}: {
  label: string; value: string; onChange: (v: string) => void;
  error?: string; placeholder?: string; type?: string; hint?: string; required?: boolean;
}) {
  return (
    <div>
      <label className="block text-[9px] font-mono tracking-widest text-vss-mist uppercase mb-1.5">
        {label} {required && <span className="text-vss-paper">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "w-full h-11 px-3 bg-vss-void border text-sm text-vss-paper placeholder:text-vss-fog focus:border-vss-paper outline-none transition-colors",
          error ? "border-vss-paper" : "border-vss-smoke"
        )}
      />
      {error && (
        <div className="text-[9px] font-mono text-vss-paper mt-1 font-bold tracking-widest uppercase">
          ↑ {error}
        </div>
      )}
      {hint && !error && <div className="text-[9px] font-mono text-vss-fog mt-1">{hint}</div>}
    </div>
  );
}

function RadioCard({
  selected, onClick, icon: Icon, title, subtitle,
}: {
  selected: boolean; onClick: () => void; icon: any; title: string; subtitle: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "p-4 border text-left transition-all relative",
        selected ? "bg-vss-paper text-vss-void border-vss-paper" : "bg-vss-void border-vss-smoke hover:border-vss-paper text-vss-bone"
      )}
    >
      <div className="flex items-start justify-between mb-2">
        <Icon size={16} strokeWidth={1.5} />
        {selected && <Check size={12} strokeWidth={2.5} />}
      </div>
      <div className="text-xs font-bold tracking-wide">{title}</div>
      <div className={cn("text-[10px] font-mono tracking-widest mt-0.5", selected ? "opacity-70" : "text-vss-fog")}>
        {subtitle}
      </div>
    </button>
  );
}