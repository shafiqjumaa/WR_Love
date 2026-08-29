"use client";
import { setSharedTheme } from "@/lib/actions";

const THEMES = [
  { key: "rose", emoji: "🌸", label: "وردي حالم" },
  { key: "sky", emoji: "💙", label: "أزرق سماوي" },
  { key: "sun", emoji: "💛", label: "أصفر مشرق" },
  { key: "mint", emoji: "💚", label: "أخضر لطيف" },
  { key: "ruby", emoji: "❤️", label: "أحمر رومانسي" },
  { key: "violet", emoji: "💜", label: "بنفسجي" },
  { key: "rainbow", emoji: "🌈", label: "ألوان حيوية" },
];

export default function ThemePicker({ currentTheme }: { currentTheme: string }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {THEMES.map((t) => (
        <button
          key={t.key}
          onClick={() => setSharedTheme(t.key)}
          className="rounded-2xl p-3 text-sm font-bold ring-2 transition"
          style={{
            background: currentTheme === t.key ? "var(--color-primary)" : "transparent",
            color: currentTheme === t.key ? "white" : "var(--color-ink)",
            borderColor: "var(--color-primary)",
          }}
        >
          {t.emoji} {t.label}
        </button>
      ))}
    </div>
  );
}
