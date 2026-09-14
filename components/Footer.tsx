"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="wrap">
      <div className="foot-row">
        <div className="l">
          <Image
            src="/logo.jpg"
            alt=""
            width={18}
            height={18}
            style={{ borderRadius: 3, height: 18, width: 18 }}
          />
          TNT GARAGE · HP TUNER CERTIFIED SHOP
        </div>
        <div className="r">
          <a
            href="https://www.instagram.com/tnt_cars55/"
            target="_blank"
            rel="noopener"
          >
            Instagram
          </a>
          <a href="tel:07717772446">07717772446</a>
          <a href="https://wa.me/9647717772446" target="_blank" rel="noopener">
            WhatsApp
          </a>
        </div>
      </div>
    </footer>
  );
}
