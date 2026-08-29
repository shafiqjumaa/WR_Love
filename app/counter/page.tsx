import Link from "next/link";
import { getOccasions } from "@/lib/data";
import { isSupabaseConfigured } from "@/lib/supabase/serverClient";
import LoveCounters from "@/components/LoveCounters";

export default async function CounterPage() {
  const configured = isSupabaseConfigured();
  const occasions = configured ? await getOccasions() : [];

  return (
    <main className="min-h-screen px-5 py-12 sm:px-10">
      <div className="mx-auto max-w-xl text-center">
        <Link href="/" className="text-sm opacity-60 hover:opacity-100">← الرئيسية</Link>
        <h1 className="font-display mt-2 text-4xl" style={{ color: "var(--color-primary)" }}>
          عداد حبنا ❤️
        </h1>
      </div>
      <div className="mt-10">
        {!configured ? <p className="text-center opacity-60">قاعدة البيانات لسا ما اتربطت.</p> : <LoveCounters occasions={occasions} />}
      </div>
    </main>
  );
}
