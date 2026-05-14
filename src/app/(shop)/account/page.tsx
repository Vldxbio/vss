"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, User, Heart, Package, LogOut, Mail, Phone, MapPin } from "lucide-react";
import { useAuthStore } from "@/lib/store/authStore";
import { useFavoritesStore } from "@/lib/store/favoritesStore";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { Button } from "@/components/ui/Button";
import { Asterisk, CornerBrackets, PlusMarker } from "@/components/ui/Decorations";
import { cn } from "@/lib/utils/cn";

export default function AccountPage() {
  const { locale } = useLocale();
  const { user, login, logout } = useAuthStore();
  const favCount = useFavoritesStore((s) => s.ids.length);

  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    login(email, name || email.split("@")[0]);
  };

  if (!user) {
    return (
      <div className="bg-vss-obsidian min-h-screen relative">
        <div className="container-vss py-10 md:py-20 relative">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="h-px w-8 bg-vss-paper" />
                <Asterisk className="w-3 h-3 text-vss-paper" />
                <span className="text-[10px] tracking-[0.4em] text-vss-paper font-mono font-bold uppercase">
                  ACCOUNT
                </span>
              </div>
              <h1 className="text-display text-5xl font-bold tracking-tightest text-vss-paper leading-[0.9] glow-text mb-3">
                {mode === "login" ? (locale === "uk" ? "ВХІД" : "ВХОД") : (locale === "uk" ? "РЕЄСТРАЦІЯ" : "РЕГИСТРАЦИЯ")}
              </h1>
              <p className="text-sm text-vss-mist">
                {locale === "uk" ? "Швидкий вхід через email" : "Быстрый вход через email"}
              </p>
            </div>

            <div className="bg-vss-graphite border border-vss-smoke p-6 relative">
              <CornerBrackets className="text-vss-fog/40" />

              {/* Tabs */}
              <div className="flex gap-1 mb-5">
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className={cn(
                    "flex-1 h-10 text-[10px] font-mono font-bold tracking-widest uppercase transition-all",
                    mode === "login" ? "bg-vss-paper text-vss-void" : "bg-vss-void text-vss-bone border border-vss-smoke"
                  )}
                >
                  {locale === "uk" ? "ВХІД" : "ВХОД"}
                </button>
                <button
                  type="button"
                  onClick={() => setMode("register")}
                  className={cn(
                    "flex-1 h-10 text-[10px] font-mono font-bold tracking-widest uppercase transition-all",
                    mode === "register" ? "bg-vss-paper text-vss-void" : "bg-vss-void text-vss-bone border border-vss-smoke"
                  )}
                >
                  {locale === "uk" ? "РЕЄСТРАЦІЯ" : "РЕГИСТРАЦИЯ"}
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                {mode === "register" && (
                  <Field label={locale === "uk" ? "Ім'я" : "Имя"} value={name} onChange={setName} placeholder="Name" />
                )}
                <Field label="Email" value={email} onChange={setEmail} type="email" placeholder="hello@vss.ua" />
                {mode === "register" && (
                  <Field label={locale === "uk" ? "Телефон" : "Телефон"} value={phone} onChange={setPhone} type="tel" placeholder="+380" />
                )}

                <Button variant="primary" size="lg" fullWidth type="submit" arrow>
                  {mode === "login" ? (locale === "uk" ? "УВІЙТИ" : "ВОЙТИ") : (locale === "uk" ? "СТВОРИТИ" : "СОЗДАТЬ")}
                </Button>
              </form>

              <p className="text-[10px] font-mono tracking-widest text-vss-fog text-center mt-4 uppercase">
                {locale === "uk" ? "Mock авторизація — без пароля" : "Mock авторизация — без пароля"}
              </p>
            </div>
          </div>
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
          <span className="text-vss-paper font-bold">ACCOUNT</span>
        </div>

        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-vss-paper" />
            <Asterisk className="w-3 h-3 text-vss-paper" />
            <span className="text-[10px] tracking-[0.4em] text-vss-paper font-mono font-bold uppercase">
              ACCOUNT / 001
            </span>
          </div>
          <h1 className="text-display text-5xl md:text-7xl font-bold tracking-tightest text-vss-paper leading-[0.9] glow-text">
            {user.name.toUpperCase()}
          </h1>
          <p className="text-sm text-vss-mist mt-3">{user.email}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-4">
          {/* Stats */}
          <StatCard icon={Heart} label={locale === "uk" ? "ОБРАНЕ" : "ИЗБРАННОЕ"} value={favCount} href="/favorites" />
          <StatCard icon={Package} label={locale === "uk" ? "ЗАМОВЛЕНЬ" : "ЗАКАЗОВ"} value={0} />
          <StatCard icon={User} label={locale === "uk" ? "СТАТУС" : "СТАТУС"} value="GUEST" />
        </div>

        {/* Profile */}
        <div className="mt-6 grid lg:grid-cols-2 gap-4">
          <div className="bg-vss-graphite border border-vss-smoke p-5 relative">
            <CornerBrackets className="text-vss-fog/30" />
            <div className="flex items-center gap-2 mb-4">
              <PlusMarker className="w-2 h-2 text-vss-paper" />
              <span className="text-[10px] font-mono tracking-[0.3em] text-vss-paper font-bold uppercase">
                {locale === "uk" ? "ПРОФІЛЬ" : "ПРОФИЛЬ"}
              </span>
            </div>
            <div className="space-y-3">
              <InfoRow icon={User} label={locale === "uk" ? "Ім'я" : "Имя"} value={user.name} />
              <InfoRow icon={Mail} label="Email" value={user.email} />
              <InfoRow icon={Phone} label={locale === "uk" ? "Телефон" : "Телефон"} value={user.phone || "—"} />
            </div>
          </div>

          <div className="bg-vss-graphite border border-vss-smoke p-5 relative">
            <CornerBrackets className="text-vss-fog/30" />
            <div className="flex items-center gap-2 mb-4">
              <PlusMarker className="w-2 h-2 text-vss-paper" />
              <span className="text-[10px] font-mono tracking-[0.3em] text-vss-paper font-bold uppercase">
                {locale === "uk" ? "ОСТАННІ ЗАМОВЛЕННЯ" : "ПОСЛЕДНИЕ ЗАКАЗЫ"}
              </span>
            </div>
            <div className="text-[11px] font-mono text-vss-fog tracking-widest uppercase text-center py-8">
              {locale === "uk" ? "Поки що немає замовлень" : "Пока нет заказов"}
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={logout}
            className="inline-flex items-center gap-2 px-5 h-11 border border-vss-smoke hover:border-vss-paper text-vss-bone hover:text-vss-paper text-[10px] font-mono tracking-widest font-bold uppercase transition-all"
          >
            <LogOut size={12} strokeWidth={1.5} />
            {locale === "uk" ? "Вийти" : "Выйти"}
          </button>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, href }: { icon: any; label: string; value: number | string; href?: string }) {
  const inner = (
    <div className="bg-vss-graphite border border-vss-smoke p-5 relative h-full hover:border-vss-paper transition-all group">
      <CornerBrackets className="text-vss-fog/30 group-hover:text-vss-paper transition-colors" />
      <Icon size={18} strokeWidth={1.5} className="text-vss-paper mb-3" />
      <div className="text-display text-3xl font-bold text-vss-paper tabular-nums">{value}</div>
      <div className="text-[9px] font-mono tracking-widest text-vss-fog uppercase mt-1">{label}</div>
    </div>
  );
  return href ? <Link href={href}>{inner}</Link> : inner;
}

function InfoRow({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-vss-smoke last:border-0">
      <div className="flex items-center gap-2">
        <Icon size={12} strokeWidth={1.5} className="text-vss-fog" />
        <span className="text-[10px] font-mono tracking-widest text-vss-mist uppercase">{label}</span>
      </div>
      <span className="text-xs text-vss-paper font-mono">{value}</span>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", placeholder }: { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string }) {
  return (
    <div>
      <label className="block text-[9px] font-mono tracking-widest text-vss-mist uppercase mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-11 px-3 bg-vss-void border border-vss-smoke text-sm text-vss-paper placeholder:text-vss-fog focus:border-vss-paper outline-none transition-colors"
      />
    </div>
  );
}