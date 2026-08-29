export default function NotAllowedPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center" data-theme="rose">
      <h1 className="font-display text-3xl" style={{ color: "var(--color-primary)" }}>
        عذرًا 🔒
      </h1>
      <p className="max-w-sm opacity-70">هاد المكان خاص لشخصين فقط، وبريدك مو من ضمنهم.</p>
      <a href="/login" className="mt-2 rounded-full px-5 py-2 text-sm font-bold text-white" style={{ background: "var(--color-primary)" }}>
        رجوع لتسجيل الدخول
      </a>
    </main>
  );
}
