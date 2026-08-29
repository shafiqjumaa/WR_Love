import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import DarkModeToggle from "@/components/DarkModeToggle";
import { getSharedTheme } from "@/lib/data";
import { isSupabaseConfigured } from "@/lib/supabase/serverClient";

// خط ثمانية - يُستخدم للعناوين والنصوص معًا (خط واضح وعصري Sans Serif)
const thmanyah = localFont({
  src: [
    { path: "./fonts/thmanyahsans-Light.woff2", weight: "300", style: "normal" },
    { path: "./fonts/thmanyahsans-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/thmanyahsans-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/thmanyahsans-Bold.woff2", weight: "700", style: "normal" },
    { path: "./fonts/thmanyahsans-Black.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-thmanyah",
  display: "swap",
});

export const metadata: Metadata = {
  title: "عالمنا الخاص ❤️",
  description: "مساحتنا الرومانسية الخاصة بنا نحن الاثنين فقط",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = isSupabaseConfigured() ? await getSharedTheme() : "rose";

  return (
    <html lang="ar" dir="rtl" data-theme={theme} className={thmanyah.variable}>
      <body>
        <DarkModeToggle />
        {children}
      </body>
    </html>
  );
}
