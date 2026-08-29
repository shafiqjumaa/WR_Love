import Link from "next/link";
import { getJarMessages } from "@/lib/data";
import { isSupabaseConfigured } from "@/lib/supabase/serverClient";
import LoveJar from "@/components/LoveJar";

export default async function JarPage() {
  const configured = isSupabaseConfigured();
  const messages = configured ? await getJarMessages() : [];

  return (
    <main className="flex min-h-screen flex-col items-center px-5 py-12 text-center sm:px-10">
      <Link href="/" className="self-start text-sm opacity-60 hover:opacity-100">← الرئيسية</Link>
      <h1 className="font-display mt-2 text-4xl" style={{ color: "var(--color-primary)" }}>
        جرة الحب 🫙
      </h1>
      <p className="mt-2 opacity-70">كل ورقة فيها كلمة من كلامنا</p>

      <div className="mt-10">
        {!configured ? <p className="opacity-60">قاعدة البيانات لسا ما اتربطت.</p> : <LoveJar messages={messages} />}
      </div>
    </main>
  );
}
