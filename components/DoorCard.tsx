import Link from "next/link";

export default function DoorCard({
  href,
  emoji,
  title,
  hint,
  delay = "0s",
}: {
  href: string;
  emoji: string;
  title: string;
  hint: string;
  delay?: string;
}) {
  return (
    <Link
      href={href}
      className="group relative flex flex-col items-center gap-2 rounded-soft bg-surface/80 p-6 text-center shadow-[0_10px_30px_-15px_rgba(58,46,57,0.35)] ring-1 ring-black/5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_40px_-15px_rgba(58,46,57,0.45)] animate-popIn"
      style={{ animationDelay: delay }}
    >
      <span
        className="flex h-14 w-14 items-center justify-center rounded-full text-2xl transition-transform duration-300 group-hover:scale-110"
        style={{ background: "var(--color-secondary)" }}
      >
        {emoji}
      </span>
      <span className="font-display text-xl" style={{ color: "var(--color-primary)" }}>
        {title}
      </span>
      <span className="text-sm opacity-70">{hint}</span>
    </Link>
  );
}
