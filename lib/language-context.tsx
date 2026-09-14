"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Lang = "ar" | "en";

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  dir: "rtl" | "ltr";
}

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ar");

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem("tnt-lang");
    } catch {
      // ignore
    }
    if (saved === "ar" || saved === "en") {
      setLangState(saved);
    }
  }, []);

  const dir: "rtl" | "ltr" = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  const setLang = (next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem("tnt-lang", next);
    } catch {
      // ignore
    }
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
