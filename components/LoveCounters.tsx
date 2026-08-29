"use client";
import { useEffect, useState } from "react";
import type { Occasion } from "@/lib/types";

function elapsed(from: Date, now: Date) {
  const diff = Math.max(0, now.getTime() - from.getTime());
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return { days, hours, minutes, seconds };
}

function OccasionCounter({ occasion }: { occasion: Occasion }) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const { days, hours, minutes, seconds } = elapsed(new Date(occasion.date), now);
  const units = [
    { label: "يوم", value: days },
    { label: "ساعة", value: hours },
    { label: "دقيقة", value: minutes },
    { label: "ثانية", value: seconds },
  ];

  return (
    <div className="neu-raised p-6 text-center">
      <p className="font-display text-xl" style={{ color: "var(--color-primary)" }}>{occasion.label}</p>
      <p className="mt-1 text-sm opacity-60">مرّ على قصتنا...</p>
      <div className="mt-4 grid grid-cols-4 gap-2">
        {units.map((u) => (
          <div key={u.label} className="neu-inset p-3">
            <p className="text-2xl font-bold">{u.value}</p>
            <p className="text-xs opacity-70">{u.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function LoveCounters({ occasions }: { occasions: Occasion[] }) {
  if (occasions.length === 0) {
    return <p className="text-center opacity-60">ضيف تاريخ مهم من لوحة التحكم عشان يبدأ العداد ❤️</p>;
  }
  return (
    <div className="mx-auto flex max-w-md flex-col gap-5">
      {occasions.map((o) => (
        <OccasionCounter key={o.id} occasion={o} />
      ))}
    </div>
  );
}
