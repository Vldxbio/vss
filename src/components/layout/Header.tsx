"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Heart, ShoppingBag, User, Search, Menu, X, Globe } from "lucide-react";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { useCartStore } from "@/lib/store/cartStore";
import { useFavoritesStore } from "@/lib/store/favoritesStore";
import { Tooltip } from "@/components/ui/Tooltip";
import { SearchModal } from "@/components/layout/SearchModal";
import { cn } from "@/lib/utils/cn";

export function Header() {
  const { t, locale, setLocale } = useLocale();
  const cartCount = useCartStore((s) => s.getCount());
  const toggleCart = useCartStore((s) => s.toggleCart);
  const favCount = useFavoritesStore((s) => s.ids.length);

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cmd+K / Ctrl+K to open search
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const navLinks = [
    { href: "/catalog", label: t.nav.catalog },
    { href: "/catalog?drop=nothing", label: "DROP" },
    { href: "/about", label: t.nav.about },
    { href: "/delivery", label: t.nav.delivery },
  ];

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 transition-all duration-500",
          scrolled
            ? "bg-vss-void/85 backdrop-blur-xl border-b border-vss-smoke"
            : "bg-transparent border-b border-transparent"
        )}
      >
        <div className="container-vss flex items-center justify-between h-16 md:h-20">
          <button
            className="md:hidden text-vss-bone hover:text-vss-paper transition-colors"
            onClick={() => setMobileOpen(true)}
            aria-label="Меню"
          >
            <Menu size={22} strokeWidth={1.5} />
          </button>

          <Link
            href="/"
            className="text-display text-2xl md:text-3xl font-bold tracking-tightest text-vss-paper glow-text"
          >
            VSS
          </Link>

          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs tracking-widest uppercase text-vss-bone hover:text-vss-paper transition-colors duration-300 font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3 md:gap-4">
            <Tooltip text={locale === "uk" ? "Змінити мову" : "Сменить язык"}>
              <button
                onClick={() => setLocale(locale === "uk" ? "ru" : "uk")}
                className="hidden md:flex items-center gap-1.5 text-[10px] tracking-widest uppercase text-vss-mist hover:text-vss-paper transition-colors font-bold"
                aria-label="Switch language"
              >
                <Globe size={14} strokeWidth={1.5} />
                {locale.toUpperCase()}
              </button>
            </Tooltip>

            <Tooltip text={`${t.nav.search} (Ctrl+K)`}>
              <button
                onClick={() => setSearchOpen(true)}
                className="text-vss-bone hover:text-vss-paper transition-colors"
                aria-label={t.nav.search}
              >
                <Search size={18} strokeWidth={1.5} />
              </button>
            </Tooltip>

            <Tooltip text={t.nav.favorites}>
              <Link
                href="/favorites"
                className="relative text-vss-bone hover:text-vss-paper transition-colors"
                aria-label={t.nav.favorites}
              >
                <Heart size={18} strokeWidth={1.5} />
                {favCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 min-w-[16px] h-4 px-1 bg-vss-paper text-vss-void text-[9px] font-mono font-bold flex items-center justify-center">
                    {favCount}
                  </span>
                )}
              </Link>
            </Tooltip>

            <Tooltip text={t.nav.account}>
              <Link
                href="/account"
                className="hidden md:block text-vss-bone hover:text-vss-paper transition-colors"
                aria-label={t.nav.account}
              >
                <User size={18} strokeWidth={1.5} />
              </Link>
            </Tooltip>

            <Tooltip text={t.nav.cart}>
              <button
                onClick={toggleCart}
                className="relative text-vss-bone hover:text-vss-paper transition-colors"
                aria-label={t.nav.cart}
              >
                <ShoppingBag size={18} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 min-w-[16px] h-4 px-1 bg-vss-paper text-vss-void text-[9px] font-mono font-bold flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </Tooltip>
          </div>
        </div>

        {mobileOpen && (
          <div className="fixed inset-0 z-50 bg-vss-void md:hidden">
            <div className="container-vss flex items-center justify-between h-16">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="text-display text-2xl font-bold tracking-tightest text-vss-paper"
              >
                VSS
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="text-vss-bone"
                aria-label="Закрити меню"
              >
                <X size={22} strokeWidth={1.5} />
              </button>
            </div>
            <nav className="container-vss flex flex-col gap-6 mt-12">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-display text-3xl text-vss-paper hover:text-vss-glow transition-colors font-bold"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/account"
                onClick={() => setMobileOpen(false)}
                className="text-display text-2xl text-vss-bone hover:text-vss-paper transition-colors font-bold mt-4"
              >
                {t.nav.account}
              </Link>
              <button
                onClick={() => {
                  setLocale(locale === "uk" ? "ru" : "uk");
                  setMobileOpen(false);
                }}
                className="flex items-center gap-2 text-sm tracking-widest uppercase text-vss-mist mt-8 font-bold"
              >
                <Globe size={16} strokeWidth={1.5} />
                {locale === "uk" ? "RU" : "UA"}
              </button>
            </nav>
          </div>
        )}
      </header>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}