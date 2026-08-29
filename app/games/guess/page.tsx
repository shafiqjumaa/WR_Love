import Link from "next/link";
import { isSupabaseConfigured } from "@/lib/supabase/serverClient";
import NumberGuessGame from "@/components/NumberGuessGame";

export default function GuessPage() {
  const configured = isSupabaseConfigured();
  return (
    <main className="flex min-h-screen flex-col items-center px-5 py-12 text-center sm:px-10">
      <Link href="/games" className="self-start text-sm opacity-60 hover:opacity-100">← الألعاب</Link>
      <h1 className="font-display mt-2 text-4xl" style={{ color: "var(--color-primary)" }}>
        تخمين الرقم 🔢
      </h1>
      <p className="mt-2 max-w-sm opacity-70">كل واحد يختار رقم سري، والتاني يحاول يخمّنه</p>
      <div className="mt-10 w-full">
        {!configured ? <p className="opacity-60">قاعدة البيانات لسا ما اتربطت.</p> : <NumberGuessGame />}
      </div>
    </main>
  );
}
