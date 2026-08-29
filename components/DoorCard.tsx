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
      className="neu-raised group relative flex flex-col items-center gap-2 p-6 text-center transition-transform duration-300 hover:-translate-y-1.5 animate-popIn"
      style={{ animationDelay: delay }}
    >
      <span className="neu-icon-circle flex h-14 w-14 items-center justify-center text-2xl transition-transform duration-300 group-hover:scale-110">
        {emoji}
      </span>
      <span className="font-display text-xl" style={{ color: "var(--color-primary)" }}>
        {title}
      </span>
      <span className="text-sm opacity-70">{hint}</span>
    </Link>
  );
}
