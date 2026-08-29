import Link from "next/link";
import { addJournalEntry } from "@/lib/actions";
import { getJournalEntries as fetchJournalEntries } from "@/lib/data";
import { isSupabaseConfigured } from "@/lib/supabase/serverClient";

export default async function JournalPage() {
  const configured = isSupabaseConfigured();
  const entries = configured ? await fetchJournalEntries() : [];

  return (
    <main className="min-h-screen px-5 py-12 sm:px-10">
      <div className="mx-auto max-w-xl text-center">
        <Link href="/" className="text-sm opacity-60 hover:opacity-100">← الرئيسية</Link>
        <h1 className="font-display mt-2 text-4xl" style={{ color: "var(--color-primary)" }}>
          دفترنا 📖
        </h1>
        <p className="mt-2 opacity-70">خواطر صغيرة، اكتبها بأي وقت</p>
      </div>

      {configured && (
        <form action={addJournalEntry} className="mx-auto mt-8 flex max-w-xl flex-col gap-3">
          <textarea
            name="content"
            required
            rows={3}
            placeholder="اكتب خاطرة..."
            className="rounded-2xl border border-black/10 bg-surface px-4 py-3 outline-none"
          />
          <button type="submit" className="self-end rounded-full px-5 py-2 text-sm font-bold text-white" style={{ background: "var(--color-primary)" }}>
            أضف
          </button>
        </form>
      )}

      <div className="mx-auto mt-8 flex max-w-xl flex-col gap-3">
        {!configured ? (
          <p className="text-center opacity-60">قاعدة البيانات لسا ما اتربطت.</p>
        ) : entries.length === 0 ? (
          <p className="text-center opacity-60">لسا الدفتر فاضي 🌱</p>
        ) : (
          entries.map((e) => (
            <div key={e.id} className="rounded-soft bg-surface p-4 shadow-sm">
              <p className="leading-relaxed">{e.content}</p>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
