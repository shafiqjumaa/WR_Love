import Link from "next/link";
import { getMessages, pickMessageOfTheDay } from "@/lib/data";
import { isSupabaseConfigured } from "@/lib/supabase/serverClient";
import MessageCard from "@/components/MessageCard";

export default async function MessagesPage() {
  if (!isSupabaseConfigured()) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center">
        <h1 className="font-display text-3xl" style={{ color: "var(--color-primary)" }}>
          رسائلنا 💌
        </h1>
        <p className="opacity-70">قاعدة البيانات لسا ما اتربطت. رح تشتغل تلقائيًا بعد آخر مرحلة.</p>
      </main>
    );
  }

  const messages = await getMessages();
  const visibleMessages = messages.filter((m) => !m.isSecret);
  const messageOfTheDay = pickMessageOfTheDay(visibleMessages);

  return (
    <main className="min-h-screen px-5 py-12 sm:px-10">
      <div className="mx-auto max-w-xl text-center">
        <Link href="/" className="text-sm opacity-60 hover:opacity-100">
          ← الرئيسية
        </Link>
        <h1 className="font-display mt-2 text-4xl" style={{ color: "var(--color-primary)" }}>
          رسائلنا 💌
        </h1>
      </div>

      {messageOfTheDay && (
        <div className="mx-auto mt-8 max-w-xl">
          <p className="mb-2 text-center text-sm font-bold" style={{ color: "var(--color-primary)" }}>
            رسالة اليوم ❤️
          </p>
          <div
            className="rounded-soft p-6 text-center shadow-lg"
            style={{ background: "var(--color-secondary)" }}
          >
            <p className="text-lg leading-relaxed">{messageOfTheDay.content}</p>
          </div>
        </div>
      )}

      <div className="mx-auto mt-10 flex max-w-xl flex-col gap-4">
        {visibleMessages.length === 0 ? (
          <p className="text-center opacity-60">لسا ما في رسائل مضافة 🌱</p>
        ) : (
          visibleMessages.map((m) => <MessageCard key={m.id} message={m} />)
        )}
      </div>
    </main>
  );
}
