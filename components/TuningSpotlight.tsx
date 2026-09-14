"use client";

import { useLanguage } from "@/lib/language-context";
import { DynoChart } from "@/components/icons/Gauges";

const listItems: { ar: string; en: string }[] = [
  {
    ar: "قراءة وحفظ نسخة أصلية من برمجة المصنع",
    en: "Factory-file backup before any edit",
  },
  {
    ar: "تعديل يناسب حالة المحرك وليس قالب جاهز",
    en: "Tuned to the engine's condition, not a generic map",
  },
  {
    ar: "تقرير فحص بعد البرمجة قبل التسليم",
    en: "Post-tune diagnostic report before hand-off",
  },
];

export default function TuningSpotlight() {
  const { lang } = useLanguage();

  return (
    <section id="tuning">
      <div className="wrap spotlight">
        <div className="spotlight-copy">
          <span className="eyebrow">{lang === "ar" ? "البرمجة" : "Tuning"}</span>
          {lang === "ar" ? (
            <h2 lang="ar">غرفة البرمجة — وين تنبض السيارة بأداء ثاني</h2>
          ) : (
            <h2 lang="en">The tuning bay — where the car gets a second personality</h2>
          )}
          {lang === "ar" ? (
            <p lang="ar">
              باستخدام HP Tuner نقرأ ونعدّل خرائط وحدة التحكم مباشرة: توقيت الإشعال،
              نسبة الوقود، نقاط التحويل — كل شي موثّق ومختبر على السيارة قبل التسليم.
            </p>
          ) : (
            <p lang="en">
              With HP Tuner we read and edit the ECU&apos;s tables directly — ignition
              timing, fuel trims, shift points — every change logged and road-tested
              before the car goes back to you.
            </p>
          )}
          {listItems.map((item) => (
            <ul className="spotlight-list" key={item.en}>
              <li>{item[lang]}</li>
            </ul>
          ))}
        </div>

        <div className="dyno">
          <div className="dyno-head">
            <span className="t">
              {lang === "ar" ? "مثال توضيحي" : "Illustrative example"}
            </span>
          </div>
          <DynoChart />
        </div>
      </div>
    </section>
  );
}
