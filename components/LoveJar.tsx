"use client";
import { useState } from "react";
import type { JarMessage } from "@/lib/types";

export default function LoveJar({ messages }: { messages: JarMessage[] }) {
  const [current, setCurrent] = useState<JarMessage | null>(null);

  function pickRandom() {
    if (messages.length === 0) return;
    const i = Math.floor(Math.random() * messages.length);
    setCurrent(messages[i]);
  }

  if (messages.length === 0) {
    return <p className="text-center opacity-60">الجرة لسا فاضية... ضيف رسائل من لوحة التحكم 🫙</p>;
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <button
        onClick={pickRandom}
        className="neu-icon-circle flex h-40 w-40 items-center justify-center text-6xl transition hover:scale-105"
        aria-label="افتح ورقة من الجرة"
      >
        🫙
      </button>
      <p className="text-sm opacity-60">اضغط على الجرة لتطلع ورقة</p>

      {current && (
        <div className="animate-popIn neu-raised max-w-sm p-6 text-center">
          <p className="text-lg leading-relaxed">{current.content}</p>
        </div>
      )}
    </div>
  );
}
