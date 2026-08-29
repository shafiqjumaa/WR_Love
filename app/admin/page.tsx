import Link from "next/link";
import {
  getMemories,
  getMessages,
  getSurprises,
  getJarMessages,
  getOccasions,
  getGameQuestions,
  getSharedTheme,
} from "@/lib/data";
import { isSupabaseConfigured } from "@/lib/supabase/serverClient";
import {
  addMessage,
  deleteMessage,
  addMemory,
  deleteMemory,
  addSurprise,
  deleteSurprise,
  addJarMessage,
  deleteJarMessage,
  addOccasion,
  deleteOccasion,
  addGameQuestion,
  deleteGameQuestion,
} from "@/lib/actions";
import AdminSection from "@/components/admin/AdminSection";
import DeleteButton from "@/components/admin/DeleteButton";
import ThemePicker from "@/components/admin/ThemePicker";

const inputClass = "w-full rounded-xl border border-black/10 bg-base px-4 py-2 outline-none";
const buttonClass = "self-end rounded-full px-5 py-2 text-sm font-bold text-white";

export default async function AdminPage() {
  const configured = isSupabaseConfigured();
  if (!configured) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center">
        <h1 className="font-display text-3xl" style={{ color: "var(--color-primary)" }}>لوحة التحكم 🛠️</h1>
        <p className="opacity-70">قاعدة البيانات لسا ما اتربطت. رح تشتغل بعد آخر مرحلة.</p>
      </main>
    );
  }

  const [memories, messages, surprises, jarMessages, occasions, gameQuestions, theme] = await Promise.all([
    getMemories(),
    getMessages(),
    getSurprises(),
    getJarMessages(),
    getOccasions(),
    getGameQuestions(),
    getSharedTheme(),
  ]);

  return (
    <main className="min-h-screen px-5 py-12 sm:px-10" style={{ background: "var(--color-base)" }}>
      <div className="mx-auto max-w-2xl text-center">
        <Link href="/" className="text-sm opacity-60 hover:opacity-100">← الرئيسية</Link>
        <h1 className="font-display mt-2 text-4xl" style={{ color: "var(--color-primary)" }}>لوحة التحكم 🛠️</h1>
        <p className="mt-2 opacity-70">من هون بتتحكم بكل شي بالموقع</p>
      </div>

      <div className="mx-auto mt-10 flex max-w-2xl flex-col gap-6">
        {/* الألوان */}
        <AdminSection title="ألوان الموقع" emoji="🎨">
          <ThemePicker currentTheme={theme} />
        </AdminSection>

        {/* الرسائل */}
        <AdminSection title="رسائلنا" emoji="💌">
          <form action={addMessage} className="flex flex-col gap-3">
            <textarea name="content" required placeholder="نص الرسالة" className={inputClass} rows={2} />
            <input type="date" name="date" required className={inputClass} />
            <input type="url" name="image_url" placeholder="رابط صورة (اختياري)" className={inputClass} />
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="is_secret" /> رسالة سرية
            </label>
            <input type="datetime-local" name="scheduled_at" className={inputClass} placeholder="جدولة (اختياري)" />
            <button className={buttonClass} style={{ background: "var(--color-primary)" }}>إضافة رسالة</button>
          </form>
          <div className="mt-4 flex flex-col gap-2">
            {messages.map((m) => (
              <div key={m.id} className="flex items-center justify-between rounded-xl bg-base px-4 py-2 text-sm">
                <span className="truncate">{m.content}</span>
                <DeleteButton action={deleteMessage} id={m.id} />
              </div>
            ))}
          </div>
        </AdminSection>

        {/* الذكريات */}
        <AdminSection title="قصتنا - إضافة ذكرى" emoji="📸">
          <form action={addMemory} className="flex flex-col gap-3">
            <input type="text" name="title" required placeholder="عنوان الذكرى" className={inputClass} />
            <input type="date" name="date" required className={inputClass} />
            <textarea name="description" required placeholder="الوصف" className={inputClass} rows={2} />
            <input type="text" name="image_urls" placeholder="روابط الصور (افصل بينها بفاصلة ,)" className={inputClass} />
            <input type="url" name="video_url" placeholder="رابط فيديو (اختياري)" className={inputClass} />
            <input type="text" name="location" placeholder="المكان (اختياري)" className={inputClass} />
            <input type="text" name="linked_message" placeholder="رسالة مرتبطة (اختياري)" className={inputClass} />
            <button className={buttonClass} style={{ background: "var(--color-primary)" }}>إضافة ذكرى</button>
          </form>
          <div className="mt-4 flex flex-col gap-2">
            {memories.map((m) => (
              <div key={m.id} className="flex items-center justify-between rounded-xl bg-base px-4 py-2 text-sm">
                <span className="truncate">{m.title}</span>
                <DeleteButton action={deleteMemory} id={m.id} />
              </div>
            ))}
          </div>
        </AdminSection>

        {/* المفاجآت */}
        <AdminSection title="مفاجآتنا" emoji="🎁">
          <form action={addSurprise} className="flex flex-col gap-3">
            <input type="text" name="title" required placeholder="عنوان المفاجأة" className={inputClass} />
            <textarea name="message" placeholder="رسالة المفاجأة" className={inputClass} rows={2} />
            <input type="url" name="image_url" placeholder="رابط صورة (اختياري)" className={inputClass} />
            <input type="url" name="video_url" placeholder="رابط فيديو (اختياري)" className={inputClass} />
            <input type="text" name="question" placeholder="سؤال (اختياري)" className={inputClass} />
            <input type="datetime-local" name="unlock_at" required className={inputClass} />
            <button className={buttonClass} style={{ background: "var(--color-primary)" }}>إضافة مفاجأة</button>
          </form>
          <div className="mt-4 flex flex-col gap-2">
            {surprises.map((s) => (
              <div key={s.id} className="flex items-center justify-between rounded-xl bg-base px-4 py-2 text-sm">
                <span className="truncate">{s.title}</span>
                <DeleteButton action={deleteSurprise} id={s.id} />
              </div>
            ))}
          </div>
        </AdminSection>

        {/* جرة الحب */}
        <AdminSection title="جرة الحب" emoji="🫙">
          <form action={addJarMessage} className="flex flex-col gap-3">
            <textarea name="content" required placeholder="رسالة الجرة" className={inputClass} rows={2} />
            <button className={buttonClass} style={{ background: "var(--color-primary)" }}>إضافة للجرة</button>
          </form>
          <div className="mt-4 flex flex-col gap-2">
            {jarMessages.map((j) => (
              <div key={j.id} className="flex items-center justify-between rounded-xl bg-base px-4 py-2 text-sm">
                <span className="truncate">{j.content}</span>
                <DeleteButton action={deleteJarMessage} id={j.id} />
              </div>
            ))}
          </div>
        </AdminSection>

        {/* المناسبات */}
        <AdminSection title="عداد الحب - المناسبات" emoji="❤️">
          <form action={addOccasion} className="flex flex-col gap-3">
            <input type="text" name="label" required placeholder="اسم المناسبة" className={inputClass} />
            <input type="datetime-local" name="date" required className={inputClass} />
            <button className={buttonClass} style={{ background: "var(--color-primary)" }}>إضافة مناسبة</button>
          </form>
          <div className="mt-4 flex flex-col gap-2">
            {occasions.map((o) => (
              <div key={o.id} className="flex items-center justify-between rounded-xl bg-base px-4 py-2 text-sm">
                <span className="truncate">{o.label}</span>
                <DeleteButton action={deleteOccasion} id={o.id} />
              </div>
            ))}
          </div>
        </AdminSection>

        {/* أسئلة الألعاب */}
        <AdminSection title="أسئلة الألعاب" emoji="🎮">
          <form action={addGameQuestion} className="flex flex-col gap-3">
            <select name="kind" required className={inputClass}>
              <option value="yes_no">نعم أو لا</option>
              <option value="challenge">تحدي</option>
              <option value="know_you">مين بيعرف مين</option>
            </select>
            <textarea name="content" required placeholder="نص السؤال" className={inputClass} rows={2} />
            <button className={buttonClass} style={{ background: "var(--color-primary)" }}>إضافة سؤال</button>
          </form>
          <div className="mt-4 flex flex-col gap-2">
            {gameQuestions.map((q) => (
              <div key={q.id} className="flex items-center justify-between rounded-xl bg-base px-4 py-2 text-sm">
                <span className="truncate">{q.content}</span>
                <DeleteButton action={deleteGameQuestion} id={q.id} />
              </div>
            ))}
          </div>
        </AdminSection>
      </div>
    </main>
  );
}
