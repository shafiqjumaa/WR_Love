export default function AdminSection({
  title,
  emoji,
  children,
}: {
  title: string;
  emoji: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-soft bg-surface p-6 shadow ring-1 ring-black/5">
      <h2 className="font-display mb-4 text-2xl" style={{ color: "var(--color-primary)" }}>
        {emoji} {title}
      </h2>
      {children}
    </section>
  );
}
