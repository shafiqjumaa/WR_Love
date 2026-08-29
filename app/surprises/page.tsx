import Link from "next/link";
import { getSurprises } from "@/lib/data";
import { isSupabaseConfigured } from "@/lib/supabase/serverClient";
import SurpriseCard from "@/components/SurpriseCard";

export default async function SurprisesPage() {
  const configured = isSupabaseConfigured();
  const surprises = configured ? await getSurprises() : [];

  return (
    <main className="min-h-screen px-5 py-12 sm:px-10">
      <div className="mx-auto max-w-xl text-center">
        <Link href="/" className="text-sm opacity-60 hover:opacity-100">← الرئيسية</Link>
        <h1 className="font-display mt-2 text-4xl" style={{ color: "var(--color-primary)" }}>
          مفاجآتي إلك 🎁
        </h1>
      </div>

      <div className="mx-auto mt-10 flex max-w-xl flex-col gap-5">
        {!configured ? (
          <p className="text-center opacity-60">قاعدة البيانات لسا ما اتربطت.</p>
        ) : surprises.length === 0 ? (
          <p className="text-center opacity-60">لسا ما في مفاجآت... جهّز وحدة من لوحة التحكم 🎁</p>
        ) : (
          surprises.map((s) => <SurpriseCard key={s.id} surprise={s} />)
        )}
      </div>
    </main>
  );
}
