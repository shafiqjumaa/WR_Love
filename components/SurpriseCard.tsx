"use client";
import { useEffect, useState } from "react";
import type { Surprise } from "@/lib/types";

export default function SurpriseCard({ surprise }: { surprise: Surprise }) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const unlockDate = new Date(surprise.unlockAt);
  const isLocked = now < unlockDate;

  if (isLocked) {
    const diff = unlockDate.getTime() - now.getTime();
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    return (
      <div className="rounded-soft bg-surface p-6 text-center shadow ring-1 ring-black/5">
        <p className="text-3xl">🔒</p>
        <h3 className="font-display mt-2 text-xl" style={{ color: "var(--color-primary)" }}>
          {surprise.title}
        </h3>
        <p className="mt-2 opacity-70">لسا بدها شوية صبر...</p>
        <p className="mt-1 text-sm opacity-60">
          {days > 0 ? `${days} يوم و` : ""} {hours} ساعة و {mins} دقيقة
        </p>
      </div>
    );
  }

  return (
    <div className="animate-popIn rounded-soft p-6 text-center shadow-lg" style={{ background: "var(--color-secondary)" }}>
      <p className="text-3xl">🎉</p>
      <h3 className="font-display mt-2 text-xl" style={{ color: "var(--color-primary)" }}>
        {surprise.title}
      </h3>
      {surprise.message && <p className="mt-3 leading-relaxed">{surprise.message}</p>}
      {surprise.imageUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={surprise.imageUrl} alt="" className="mt-3 w-full rounded-xl object-cover" />
      )}
      {surprise.videoUrl && (
        <video controls className="mt-3 w-full rounded-xl">
          <source src={surprise.videoUrl} />
        </video>
      )}
      {surprise.question && (
        <p className="mt-3 rounded-xl bg-white/50 px-4 py-3 font-bold">{surprise.question}</p>
      )}
    </div>
  );
}
