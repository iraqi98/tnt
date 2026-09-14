"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/language-context";

export default function Nav() {
  const { lang, setLang } = useLanguage();

  return (
    <nav className="nav">
      <div className="wrap nav-inner">
        <div className="brand">
          <Image
            src="/logo.jpg"
            alt="TNT Garage"
            width={30}
            height={30}
            style={{ borderRadius: 4, height: 30, width: 30 }}
          />
          <span className="brand-name">TNT&nbsp;GARAGE</span>
        </div>
        <div className="nav-right">
          <div className="lang-switch" role="group" aria-label="Language">
            <button
              type="button"
              aria-pressed={lang === "ar"}
              onClick={() => setLang("ar")}
            >
              ع
            </button>
            <button
              type="button"
              aria-pressed={lang === "en"}
              onClick={() => setLang("en")}
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
