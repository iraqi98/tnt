"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/language-context";
import DiagnosticPanel from "@/components/DiagnosticPanel";

const TAGLINES: { ar: string; en: string }[] = [
  {
    ar: "صيانة أمريكية بدقّة تحسّها",
    en: "American cars, tuned with precision",
  },
  {
    ar: "فحص شامل قبل أي تدخل",
    en: "Full diagnostics before we touch a thing",
  },
  {
    ar: "برمجة ECU بخبرة حقيقية",
    en: "ECU tuning by real expertise",
  },
  {
    ar: "قطع أصلية وضمان واضح",
    en: "Genuine parts, clear warranty",
  },
];

const ROTATE_MS = 5000;
const TRANSITION_MS = 400;

function RotatingTagline({ lang }: { lang: "ar" | "en" }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion) return;

    let swapTimeout: ReturnType<typeof setTimeout>;
    const interval = setInterval(() => {
      setVisible(false);
      swapTimeout = setTimeout(() => {
        setIndex((i) => (i + 1) % TAGLINES.length);
        setVisible(true);
      }, TRANSITION_MS);
    }, ROTATE_MS);

    return () => {
      clearInterval(interval);
      clearTimeout(swapTimeout);
    };
  }, []);

  return (
    <div className="hero-tagline-wrap">
      <p
        className="hero-tagline"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(-8px)",
        }}
      >
        {TAGLINES[index][lang]}
      </p>
    </div>
  );
}

export default function Hero() {
  const { lang } = useLanguage();

  return (
    <header className="hero wrap">
      <div>
        {lang === "ar" ? (
          <h1 lang="ar">
            صيانة أمريكية بدقّة <span>تحسّها</span>
          </h1>
        ) : (
          <h1 lang="en">
            American cars, tuned with <span>precision</span>
          </h1>
        )}

        <RotatingTagline lang={lang} />

        {lang === "ar" ? (
          <p className="hero-sub" lang="ar">
            مركز TNT جراج متخصص بفحص وصيانة السيارات الأمريكية — قطع غيار، كهربائيات،
            برمجة ECU بواسطة HP Tuner، دهن، وحدادة صدر. كل سيارة تدخل عنّا تطلع مفحوصة
            ومبرمجة بدقة.
          </p>
        ) : (
          <p className="hero-sub" lang="en">
            TNT Garage is a specialist workshop for American vehicles — diagnostics,
            genuine parts, electrical repair, HP Tuner ECU programming, paint, and
            chassis work. Every car leaves scanned, tuned, and verified.
          </p>
        )}

        <div className="hero-cta">
          <a
            className="btn btn-primary"
            href="https://wa.me/9647717772446"
            target="_blank"
            rel="noopener"
          >
            {lang === "ar" ? "راسلنا على واتساب" : "Message on WhatsApp"}
          </a>
          <a className="btn btn-ghost" href="tel:07717772446">
            {lang === "ar" ? "07717772446" : "Call 07717772446"}
          </a>
        </div>

        <div className="hero-meta">
          <div>
            <div className="num">8</div>
            <div className="lbl">
              {lang === "ar" ? "خدمات أساسية" : "core services"}
            </div>
          </div>
          <div>
            <div className="num">10.7K</div>
            <div className="lbl">
              {lang === "ar" ? "متابع انستغرام" : "instagram followers"}
            </div>
          </div>
          <div>
            <div className="num">120+</div>
            <div className="lbl">
              {lang === "ar" ? "عمل موثّق" : "documented jobs"}
            </div>
          </div>
        </div>
      </div>

      <DiagnosticPanel lang={lang} />
    </header>
  );
}
