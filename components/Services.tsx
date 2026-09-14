"use client";

import { useLanguage } from "@/lib/language-context";
import {
  DiagnosticIcon,
  PartsIcon,
  ElectricalIcon,
  TuneIcon,
  PaintIcon,
  BodyIcon,
  FluidsIcon,
  FuelIcon,
} from "@/components/icons/ServiceIcons";
import type { ComponentType } from "react";

interface Service {
  Icon: ComponentType;
  code: string;
  title: { ar: string; en: string };
  desc: { ar: string; en: string };
}

const services: Service[] = [
  {
    Icon: DiagnosticIcon,
    code: "01 / DIAG",
    title: { ar: "فحص شامل", en: "Full Diagnostic Scan" },
    desc: {
      ar: "فحص إلكتروني كامل لكل أنظمة السيارة قبل أي تدخل.",
      en: "Complete electronic scan of every system before any work begins.",
    },
  },
  {
    Icon: PartsIcon,
    code: "02 / PARTS",
    title: { ar: "قطع غيار", en: "Genuine Parts" },
    desc: {
      ar: "تجهيز وتركيب قطع غيار أصلية مطابقة للموديل.",
      en: "Sourcing and fitting parts that match your exact model.",
    },
  },
  {
    Icon: ElectricalIcon,
    code: "03 / ELEC",
    title: { ar: "كهربائيات", en: "Auto Electrical" },
    desc: {
      ar: "تشخيص وإصلاح أعطال الدارات الكهربائية والحساسات.",
      en: "Tracing and repairing circuit, wiring, and sensor faults.",
    },
  },
  {
    Icon: TuneIcon,
    code: "04 / TUNE",
    title: { ar: "برمجة HP Tuner", en: "HP Tuner ECU Programming" },
    desc: {
      ar: "إعادة برمجة وحدة التحكم لأداء أدق واستهلاك أفضل.",
      en: "Re-flashing the ECU for sharper response and efficiency.",
    },
  },
  {
    Icon: PaintIcon,
    code: "05 / PAINT",
    title: { ar: "دهن وتلميع", en: "Paint & Finish" },
    desc: {
      ar: "معالجة الخدوش والدهن الموضعي بألوان مطابقة.",
      en: "Scratch repair and spot painting with matched colors.",
    },
  },
  {
    Icon: BodyIcon,
    code: "06 / BODY",
    title: { ar: "حدادة الصدر", en: "Chassis & Body Work" },
    desc: {
      ar: "تقويم وتصليح هيكل المقدمة بعد الحوادث.",
      en: "Straightening and repairing front-end structural damage.",
    },
  },
  {
    Icon: FluidsIcon,
    code: "07 / FLUIDS",
    title: { ar: "فلاتر وزيوت", en: "Filters & Fluids" },
    desc: {
      ar: "تبديل الفلاتر والزيوت والمبرّد حسب جدول الصيانة.",
      en: "Filter, oil, and coolant changes on the right schedule.",
    },
  },
  {
    Icon: FuelIcon,
    code: "08 / FUEL",
    title: { ar: "تزويد وقود", en: "Fuel Supply Systems" },
    desc: {
      ar: "فحص وصيانة مضخات ورشاشات نظام الوقود.",
      en: "Servicing fuel pumps, injectors, and delivery lines.",
    },
  },
];

export default function Services() {
  const { lang } = useLanguage();

  return (
    <section id="services">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">{lang === "ar" ? "الخدمات" : "Services"}</span>
          {lang === "ar" ? (
            <h2 lang="ar">كل شي تحتاجه سيارتك الأمريكية تحت سقف وحد</h2>
          ) : (
            <h2 lang="en">Everything your American car needs, under one roof</h2>
          )}
        </div>

        <div className="services-grid">
          {services.map(({ Icon, code, title, desc }) => (
            <div className="service" key={code}>
              <div className="icon">
                <Icon />
              </div>
              <span className="code">{code}</span>
              <h3>{title[lang]}</h3>
              <p>{desc[lang]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
