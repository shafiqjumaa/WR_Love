"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/browserClient";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"email" | "code">("email");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function sendCode(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) {
      setErrorMsg("صار خطأ بإرسال الرمز. جرّب مرة ثانية.");
      setStatus("error");
    } else {
      setStep("code");
      setStatus("idle");
    }
  }

  async function verifyCode(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    const supabase = createClient();
    const { error } = await supabase.auth.verifyOtp({ email, token: code, type: "email" });
    if (error) {
      setErrorMsg("الرمز غلط أو منتهي. تأكد منه أو اطلب رمز جديد.");
      setStatus("error");
    } else {
      router.push("/");
      router.refresh();
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center" data-theme="rose">
      <h1 className="font-display text-4xl" style={{ color: "var(--color-primary)" }}>
        عالمنا الخاص ❤️
      </h1>

      {step === "email" ? (
        <>
          <p className="max-w-sm opacity-70">هاد المكان لشخصين فقط. أدخل بريدك عشان نرسلّك رمز دخول.</p>
          <form onSubmit={sendCode} className="flex w-full max-w-xs flex-col gap-4">
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
              {status === "loading" ? "جاري الإرسال..." : "أرسل رمز الدخول"}
            </button>
            {status === "error" && <p className="text-sm text-red-500">{errorMsg}</p>}
          </form>
        </>
      ) : (
        <>
          <p className="max-w-sm opacity-70">
            بعثنالك رمز مكوّن من 6 أرقام على <strong>{email}</strong>. افتح بريدك واكتب الرمز هون.
          </p>
          <form onSubmit={verifyCode} className="flex w-full max-w-xs flex-col gap-4">
            <input
              type="text"
              inputMode="numeric"
              required
              maxLength={6}
              placeholder="123456"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="neu-inset border-0 px-5 py-3 text-center text-2xl tracking-[0.5em] outline-none"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="neu-button px-5 py-3 font-bold text-white disabled:opacity-60"
              style={{ background: "var(--color-primary)" }}
            >
              {status === "loading" ? "جاري التحقق..." : "دخول"}
            </button>
            {status === "error" && <p className="text-sm text-red-500">{errorMsg}</p>}
            <button
              type="button"
              onClick={() => setStep("email")}
              className="text-sm opacity-60 hover:opacity-100"
            >
              رجوع لتغيير البريد
            </button>
          </form>
        </>
      )}
    </main>
  );
}

