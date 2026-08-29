"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/browserClient";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sent" | "loading" | "error">("idle");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    setStatus(error ? "error" : "sent");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center" data-theme="rose">
      <h1 className="font-display text-4xl" style={{ color: "var(--color-primary)" }}>
        عالمنا الخاص ❤️
      </h1>
      <p className="max-w-sm opacity-70">هاد المكان لشخصين فقط. أدخل بريدك عشان نرسلّك رابط دخول آمن.</p>

      {status === "sent" ? (
        <p className="rounded-soft bg-surface px-6 py-4 shadow" style={{ color: "var(--color-primary)" }}>
          تم إرسال رابط الدخول لبريدك 💌 روح افتحه من نفس الجهاز.
        </p>
      ) : (
        <form onSubmit={handleLogin} className="flex w-full max-w-xs flex-col gap-3">
          <input
            type="email"
            required
            placeholder="بريدك الإلكتروني"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-full border border-black/10 bg-surface px-5 py-3 text-center outline-none"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="rounded-full px-5 py-3 font-bold text-white transition disabled:opacity-60"
            style={{ background: "var(--color-primary)" }}
          >
            {status === "loading" ? "جاري الإرسال..." : "أرسل رابط الدخول"}
          </button>
          {status === "error" && (
            <p className="text-sm text-red-500">صار في خطأ، جرّب مرة ثانية.</p>
          )}
        </form>
      )}
    </main>
  );
}
