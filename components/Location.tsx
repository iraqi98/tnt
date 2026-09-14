"use client";

import { useLanguage } from "@/lib/language-context";
import {
  LocationIcon,
  PhoneIcon,
  InstagramIcon,
  MapPinIcon,
} from "@/components/icons/ServiceIcons";

export default function Location() {
  const { lang } = useLanguage();

  return (
    <section id="visit">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">
            {lang === "ar" ? "الموقع والتواصل" : "Visit & Contact"}
          </span>
          {lang === "ar" ? (
            <h2 lang="ar">جاهزين ناخذ سيارتك للفحص</h2>
          ) : (
            <h2 lang="en">Ready when you bring the car in</h2>
          )}
        </div>

        <div className="loc-grid">
          <div className="loc-cell">
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
          </div>

          <a
            className="map-mark"
            href="https://www.google.com/maps/search/?api=1&query=Kaneesa+Street+Hai+Hutteen+Baghdad+TNT+Garage"
            target="_blank"
            rel="noopener"
            style={{ textDecoration: "none" }}
          >
            <div style={{ textAlign: "center" }}>
              <div className="map-pin" style={{ marginInline: "auto" }}>
                <MapPinIcon />
              </div>
              <div className="map-link">
                {lang === "ar"
                  ? "فتح الموقع في خرائط جوجل"
                  : "Open location in Google Maps"}
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
