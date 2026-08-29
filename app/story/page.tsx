import Link from "next/link";
import { getMemories } from "@/lib/data";
import { isSupabaseConfigured } from "@/lib/supabase/serverClient";
import StoryTabs from "@/components/StoryTabs";

export default async function StoryPage() {
  if (!isSupabaseConfigured()) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center">
        <h1 className="font-display text-3xl" style={{ color: "var(--color-primary)" }}>
          قصتنا 📸
        </h1>
        <p className="opacity-70">قاعدة البيانات لسا ما اتربطت. رح تشتغل تلقائيًا بعد آخر مرحلة.</p>
      </main>
    );
  }

  const memories = await getMemories();

  return (
    <main className="min-h-screen px-5 py-12 sm:px-10">
      <div className="mx-auto max-w-2xl text-center">
        <Link href="/" className="text-sm opacity-60 hover:opacity-100">
          ← الرئيسية
        </Link>
        <h1 className="font-display mt-2 text-4xl" style={{ color: "var(--color-primary)" }}>
          قصتنا ❤️
        </h1>
        <p className="mt-2 opacity-70">كل ذكرى... بصورها، بتفاصيلها، بمكانها الصح بالوقت</p>
      </div>

      <div className="mt-10">
        <StoryTabs memories={memories} />
      </div>
    </main>
  );
}
