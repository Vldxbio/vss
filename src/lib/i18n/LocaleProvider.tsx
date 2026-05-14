"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { translations } from "./translations";
import type { Locale } from "@/types";

type Translations = typeof translations.uk;

interface LocaleContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Translations;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("uk");

  useEffect(() => {
    const saved = localStorage.getItem("vss-locale") as Locale | null;
    if (saved) {
      setLocaleState(saved);
      return;
    }
    // Автоопределение по браузеру
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith("ru")) {
      setLocaleState("ru");
    } else {
      setLocaleState("uk");
    }
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    localStorage.setItem("vss-locale", l);
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t: translations[locale] as Translations }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used inside LocaleProvider");
  return ctx;
}