export default function FloatingShapes() {
  const shapes = [
    { top: "8%", right: "10%", size: 46, delay: "0s", opacity: 0.5, kind: "heart" },
    { top: "20%", right: "70%", size: 30, delay: "1.2s", opacity: 0.35, kind: "star" },
    { top: "55%", right: "4%", size: 34, delay: "0.6s", opacity: 0.4, kind: "cloud" },
    { top: "70%", right: "55%", size: 22, delay: "2s", opacity: 0.3, kind: "heart" },
    { top: "12%", right: "40%", size: 20, delay: "1.6s", opacity: 0.35, kind: "star" },
  ];

  const glyph = (kind: string) => (kind === "heart" ? "❤" : kind === "star" ? "✦" : "☁");

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {shapes.map((s, i) => (
        <span
          key={i}
          className="absolute animate-drift-slow select-none"
          style={{
            top: s.top,
            right: s.right,
            fontSize: s.size,
            opacity: s.opacity,
            color: "var(--color-primary)",
            animationDelay: s.delay,
          }}
        >
          {glyph(s.kind)}
        </span>
      ))}
    </div>
  );
}
