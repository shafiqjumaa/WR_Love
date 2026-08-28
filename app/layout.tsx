import type { Metadata } from "next";
import { Tajawal, Aref_Ruqaa } from "next/font/google";
import "./globals.css";

const body = Tajawal({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-body",
});

const display = Aref_Ruqaa({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "عالمنا الخاص ❤️",
  description: "مساحتنا الرومانسية الخاصة بنا نحن الاثنين فقط",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" data-theme="rose" className={`${body.variable} ${display.variable}`}>
      <body>{children}</body>
    </html>
  );
}
