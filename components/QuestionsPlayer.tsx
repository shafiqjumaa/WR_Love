"use client";
import { useState } from "react";
import type { GameQuestion } from "@/lib/types";

const KIND_LABEL: Record<string, string> = {
  yes_no: "نعم أو لا",
  challenge: "تحدي",
  know_you: "مين بيعرف مين",
};

export default function QuestionsPlayer({ questions }: { questions: GameQuestion[] }) {
  const [index, setIndex] = useState(0);

  if (questions.length === 0) {
    return <p className="opacity-60">ضيف أسئلة من لوحة التحكم عشان تبدأ اللعب 🎲</p>;
  }

  const q = questions[index % questions.length];

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="animate-popIn neu-inset w-full p-8 text-center">
        <p className="text-xs font-bold opacity-60">{KIND_LABEL[q.kind]}</p>
        <p className="mt-3 text-lg leading-relaxed">{q.content}</p>
      </div>
      <button
        onClick={() => setIndex((i) => i + 1)}
        className="neu-button px-6 py-2 font-bold text-white"
        style={{ background: "var(--color-primary)" }}
      >
        السؤال التالي ←
      </button>
    </div>
  );
}
