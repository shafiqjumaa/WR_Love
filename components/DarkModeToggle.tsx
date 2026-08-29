"use client";
import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("mode");
    const isDark = saved === "dark";
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("mode", next ? "dark" : "light");
  }

  return (
    <button
      onClick={toggle}
      aria-label="تبديل الوضع الفاتح والغامق"
      className="fixed left-4 top-4 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-surface text-lg shadow ring-1 ring-black/5"
    >
      {dark ? "☀️" : "🌙"}
    </button>
  );
}
