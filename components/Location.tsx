"use client";

import { useLanguage } from "@/lib/language-context";
import {
  LocationIcon,
  PhoneIcon,
  InstagramIcon,
} from "@/components/icons/ServiceIcons";
import ScrollReveal from "@/components/ScrollReveal";

const MAP_EMBED_SRC =
  "https://www.google.com/maps?q=Kaneesa+Street+Hai+Hutteen+Baghdad+TNT+Garage&output=embed";
const MAP_SEARCH_URL =
  "https://www.google.com/maps/search/?api=1&query=Kaneesa+Street+Hai+Hutteen+Baghdad+TNT+Garage";

export default function Location() {
  const { lang } = useLanguage();

  return (
    <section id="visit">
      <div className="wrap">
        <ScrollReveal className="section-head">
          <span className="eyebrow">
            {lang === "ar" ? "الموقع والتواصل" : "Visit & Contact"}
          </span>
          {lang === "ar" ? (
            <h2 lang="ar">جاهزين ناخذ سيارتك للفحص</h2>
          ) : (
            <h2 lang="en">Ready when you bring the car in</h2>
          )}
        </ScrollReveal>

        <div className="loc-grid">
          <ScrollReveal className="loc-cell" index={0}>
            <h3>{lang === "ar" ? "التفاصيل" : "Details"}</h3>

            <div className="loc-row">
              <span className="icon">
                <LocationIcon />
              </span>
              {lang === "ar" ? (
                <span className="v">
                  شارع الكنيسة، حي حطين، بغداد
                  <small>العنوان</small>
                </span>
              ) : (
                <span className="v">
                  Kaneesa Street, Hai Hutteen, Baghdad
                  <small>Address</small>
                </span>
              )}
            </div>

            <div className="loc-row">
              <span className="icon">
                <PhoneIcon />
              </span>
              <span className="v" style={{ fontFamily: "var(--f-mono)" }}>
                07717772446
                <small>{lang === "ar" ? "هاتف / واتساب" : "Phone / WhatsApp"}</small>
              </span>
            </div>

            <div className="loc-row">
              <span className="icon">
                <InstagramIcon />
              </span>
              <span className="v">
                @tnt_cars55
                <small>{lang === "ar" ? "انستغرام" : "Instagram"}</small>
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal className="map-mark" index={1}>
            <iframe
              src={MAP_EMBED_SRC}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 220, display: "block" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={
                lang === "ar"
                  ? "خريطة موقع TNT جراج"
                  : "Map of TNT Garage location"
              }
            />
            <a
              className="map-overlay-link"
              href={MAP_SEARCH_URL}
              target="_blank"
              rel="noopener"
            >
              {lang === "ar"
                ? "فتح الموقع في خرائط جوجل"
                : "Open location in Google Maps"}
            </a>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
