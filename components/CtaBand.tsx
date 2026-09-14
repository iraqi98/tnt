"use client";

import { useLanguage } from "@/lib/language-context";

export default function CtaBand() {
  const { lang } = useLanguage();

  return (
    <section className="cta-band" style={{ borderBottom: 0 }}>
      <div className="wrap">
        {lang === "ar" ? (
          <h2 lang="ar">خلي سيارتك تنفحص هسه</h2>
        ) : (
          <h2 lang="en">Get your car scanned today</h2>
        )}
        {lang === "ar" ? (
          <p lang="ar">راسلنا وحدد نوع السيارة والخدمة، نرجعلك بأقرب وقت متوفر.</p>
        ) : (
          <p lang="en">
            Send us your car&apos;s make and the service you need — we&apos;ll reply
            with the next available slot.
          </p>
        )}
        <div className="hero-cta">
          <a
            className="btn btn-primary"
            href="https://wa.me/9647717772446"
            target="_blank"
            rel="noopener"
          >
            {lang === "ar" ? "حجز عبر واتساب" : "Book on WhatsApp"}
          </a>
        </div>
      </div>
    </section>
  );
}
