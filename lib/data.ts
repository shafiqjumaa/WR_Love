import { createClient } from "@/lib/supabase/serverClient";
import type { Memory, LoveMessage } from "@/lib/types";

export async function getMemories(): Promise<Memory[]> {
  const supabase = createClient();
  const { data: memories } = await supabase
    .from("memories")
    .select("*")
    .order("date", { ascending: true });

  if (!memories) return [];

  const { data: images } = await supabase.from("memory_images").select("*");

  return memories.map((m) => ({
    id: m.id,
    date: m.date,
    title: m.title,
    description: m.description,
    videoUrl: m.video_url ?? undefined,
    location: m.location ?? undefined,
    linkedMessage: m.linked_message ?? undefined,
    images: (images ?? [])
      .filter((img) => img.memory_id === m.id)
      .map((img) => ({ id: img.id, url: img.url, caption: img.caption ?? undefined })),
  }));
}

export async function getMessages(): Promise<LoveMessage[]> {
  const supabase = createClient();
  const { data } = await supabase
    .from("messages")
    .select("*")
    .order("date", { ascending: false });

  const now = new Date();

  return (data ?? [])
    .filter((m) => !m.scheduled_at || new Date(m.scheduled_at) <= now)
    .map((m) => ({
      id: m.id,
      content: m.content,
      date: m.date,
      imageUrl: m.image_url ?? undefined,
      isSecret: m.is_secret ?? false,
      scheduledAt: m.scheduled_at ?? undefined,
    }));
}

export async function getSurprises() {
  const supabase = createClient();
  const { data } = await supabase.from("surprises").select("*").order("unlock_at", { ascending: true });
  return (data ?? []).map((s) => ({
    id: s.id,
    title: s.title,
    message: s.message ?? undefined,
    imageUrl: s.image_url ?? undefined,
    videoUrl: s.video_url ?? undefined,
    question: s.question ?? undefined,
    unlockAt: s.unlock_at,
  }));
}

export async function getJarMessages() {
  const supabase = createClient();
  const { data } = await supabase.from("jar_messages").select("*");
  return (data ?? []).map((j) => ({ id: j.id, content: j.content }));
}

export async function getOccasions() {
  const supabase = createClient();
  const { data } = await supabase.from("occasions").select("*").order("date", { ascending: true });
  return (data ?? []).map((o) => ({ id: o.id, label: o.label, date: o.date }));
}

export async function getJournalEntries() {
  const supabase = createClient();
  const { data } = await supabase.from("journal_entries").select("*").order("created_at", { ascending: false });
  return (data ?? []).map((j) => ({
    id: j.id,
    content: j.content,
    authorEmail: j.author_email ?? undefined,
    createdAt: j.created_at,
  }));
}

export async function getSharedTheme(): Promise<string> {
  const supabase = createClient();
  const { data } = await supabase.from("site_settings").select("theme").eq("id", 1).maybeSingle();
  return data?.theme ?? "rose";
}

export async function getGameQuestions() {
  const supabase = createClient();
  const { data } = await supabase.from("game_questions").select("*");
  return (data ?? []).map((g) => ({ id: g.id, kind: g.kind, content: g.content }));
}

// رسالة اليوم: نفس الرسالة تظهر طول اليوم، وتتغيّر بشكل ثابت كل يوم (بدون عشوائية عند كل تحديث صفحة)
export function pickMessageOfTheDay(messages: LoveMessage[]): LoveMessage | null {
  if (messages.length === 0) return null;
  const dayNumber = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
  const index = dayNumber % messages.length;
  return messages[index];
}
