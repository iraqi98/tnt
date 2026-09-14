import type { Metadata } from "next";
import { Oswald, Tajawal, Inter, JetBrains_Mono } from "next/font/google";
import { LanguageProvider } from "@/lib/language-context";
import "./globals.css";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-oswald",
});

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-tajawal",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "TNT Garage",
  description:
    "مركز TNT جراج متخصص بفحص وصيانة السيارات الأمريكية — قطع غيار، كهربائيات، برمجة ECU بواسطة HP Tuner، دهن، وحدادة صدر.",
  icons: {
    icon: "/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${oswald.variable} ${tajawal.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
