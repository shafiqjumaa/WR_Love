export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="font-display text-4xl" style={{ color: "var(--color-primary)" }}>
        سماؤنا ⭐
      </h1>
      <p className="opacity-70">هاد القسم قيد التجهيز... رح يصير جاهز بالمرحلة الجاية 🌸</p>
      <a
        href="/"
        className="mt-4 rounded-full px-5 py-2 text-sm font-bold text-white"
        style={{ background: "var(--color-primary)" }}
      >
        العودة للرئيسية
      </a>
    </main>
  );
}
