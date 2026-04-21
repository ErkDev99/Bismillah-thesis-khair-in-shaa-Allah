"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import en, { type Translations } from "@/lib/translations/en";
import ru from "@/lib/translations/ru";

export type Locale = "en" | "ru";

interface LocaleContextValue {
  locale: Locale;
  t: Translations;
  setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: "en",
  t: en,
  setLocale: () => {},
});

export function useLocale() {
  return useContext(LocaleContext);
}

export default function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const stored = localStorage.getItem("locale");
    if (stored === "ru" || stored === "en") {
      setLocaleState(stored);
      document.documentElement.lang = stored;
    }
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("locale", newLocale);
    document.documentElement.lang = newLocale;
  }, []);

  const t = locale === "ru" ? ru : en;

  return (
    <LocaleContext.Provider value={{ locale, t, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}
