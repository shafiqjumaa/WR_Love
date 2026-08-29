import Link from "next/link";

const games = [
  { href: "/games/guess", emoji: "🔢", title: "تخمين الرقم", hint: "لعبة لحظية بينكم الاثنين" },
  { href: "/games/questions", emoji: "💬", title: "مين بيعرف التاني أكتر", hint: "أسئلة، تحديات، نعم أو لا" },
];

export default function GamesPage() {
  return (
    <main className="min-h-screen px-5 py-12 text-center sm:px-10">
      <Link href="/" className="text-sm opacity-60 hover:opacity-100">← الرئيسية</Link>
      <h1 className="font-display mt-2 text-4xl" style={{ color: "var(--color-primary)" }}>
        ألعابنا 🎮
      </h1>

      <div className="mx-auto mt-10 grid max-w-md gap-4">
        {games.map((g) => (
          <Link
            key={g.href}
            href={g.href}
            className="rounded-soft bg-surface p-6 shadow ring-1 ring-black/5 transition hover:-translate-y-1"
          >
            <p className="text-3xl">{g.emoji}</p>
            <p className="font-display mt-2 text-xl" style={{ color: "var(--color-primary)" }}>{g.title}</p>
            <p className="mt-1 text-sm opacity-70">{g.hint}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
