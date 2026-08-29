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
        <p className="neu-raised px-6 py-4" style={{ color: "var(--color-primary)" }}>
          تم إرسال رابط الدخول لبريدك 💌 روح افتحه من نفس الجهاز.
        </p>
      ) : (
        <form onSubmit={handleLogin} className="flex w-full max-w-xs flex-col gap-4">
          <input
            type="email"
            required
            placeholder="بريدك الإلكتروني"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="neu-inset border-0 px-5 py-3 text-center outline-none"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="neu-button px-5 py-3 font-bold text-white disabled:opacity-60"
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
