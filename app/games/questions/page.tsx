import Link from "next/link";
import { getGameQuestions } from "@/lib/data";
import { isSupabaseConfigured } from "@/lib/supabase/serverClient";
import QuestionsPlayer from "@/components/QuestionsPlayer";

export default async function QuestionsPage() {
  const configured = isSupabaseConfigured();
  const questions = configured ? await getGameQuestions() : [];

  return (
    <main className="flex min-h-screen flex-col items-center px-5 py-12 text-center sm:px-10">
      <Link href="/games" className="self-start text-sm opacity-60 hover:opacity-100">← الألعاب</Link>
      <h1 className="font-display mt-2 text-4xl" style={{ color: "var(--color-primary)" }}>
        مين بيعرف التاني أكتر 💬
      </h1>
      <div className="mt-10 w-full max-w-md">
        {!configured ? (
          <p className="opacity-60">قاعدة البيانات لسا ما اتربطت.</p>
        ) : (
          <QuestionsPlayer questions={questions} />
        )}
      </div>
    </main>
  );
}
