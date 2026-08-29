"use server";
import { createClient } from "@/lib/supabase/serverClient";
import { revalidatePath } from "next/cache";

// ===== الرسائل =====
export async function addMessage(formData: FormData) {
  const supabase = createClient();
  await supabase.from("messages").insert({
    content: formData.get("content") as string,
    date: formData.get("date") as string,
    image_url: (formData.get("image_url") as string) || null,
    is_secret: formData.get("is_secret") === "on",
    scheduled_at: (formData.get("scheduled_at") as string) || null,
  });
  revalidatePath("/messages");
  revalidatePath("/admin");
}

export async function deleteMessage(id: string) {
  const supabase = createClient();
  await supabase.from("messages").delete().eq("id", id);
  revalidatePath("/messages");
  revalidatePath("/admin");
}

// ===== الذكريات =====
export async function addMemory(formData: FormData) {
  const supabase = createClient();
  const { data: memory } = await supabase
    .from("memories")
    .insert({
      title: formData.get("title") as string,
      date: formData.get("date") as string,
      description: formData.get("description") as string,
      location: (formData.get("location") as string) || null,
      linked_message: (formData.get("linked_message") as string) || null,
      video_url: (formData.get("video_url") as string) || null,
    })
    .select()
    .single();

  const imageUrls = (formData.get("image_urls") as string) || "";
  const urls = imageUrls.split(",").map((u) => u.trim()).filter(Boolean);
  if (memory && urls.length > 0) {
    await supabase.from("memory_images").insert(urls.map((url) => ({ memory_id: memory.id, url })));
  }

  revalidatePath("/story");
  revalidatePath("/admin");
}

export async function deleteMemory(id: string) {
  const supabase = createClient();
  await supabase.from("memories").delete().eq("id", id);
  revalidatePath("/story");
  revalidatePath("/admin");
}

// ===== المفاجآت =====
export async function addSurprise(formData: FormData) {
  const supabase = createClient();
  await supabase.from("surprises").insert({
    title: formData.get("title") as string,
    message: (formData.get("message") as string) || null,
    image_url: (formData.get("image_url") as string) || null,
    video_url: (formData.get("video_url") as string) || null,
    question: (formData.get("question") as string) || null,
    unlock_at: formData.get("unlock_at") as string,
  });
  revalidatePath("/surprises");
  revalidatePath("/admin");
}

export async function deleteSurprise(id: string) {
  const supabase = createClient();
  await supabase.from("surprises").delete().eq("id", id);
  revalidatePath("/surprises");
  revalidatePath("/admin");
}

// ===== جرة الرسائل =====
export async function addJarMessage(formData: FormData) {
  const supabase = createClient();
  await supabase.from("jar_messages").insert({ content: formData.get("content") as string });
  revalidatePath("/jar");
  revalidatePath("/admin");
}

export async function deleteJarMessage(id: string) {
  const supabase = createClient();
  await supabase.from("jar_messages").delete().eq("id", id);
  revalidatePath("/jar");
  revalidatePath("/admin");
}

// ===== المناسبات (عداد الحب) =====
export async function addOccasion(formData: FormData) {
  const supabase = createClient();
  await supabase.from("occasions").insert({
    label: formData.get("label") as string,
    date: formData.get("date") as string,
  });
  revalidatePath("/counter");
  revalidatePath("/admin");
}

export async function deleteOccasion(id: string) {
  const supabase = createClient();
  await supabase.from("occasions").delete().eq("id", id);
  revalidatePath("/counter");
  revalidatePath("/admin");
}

// ===== أسئلة الألعاب =====
export async function addGameQuestion(formData: FormData) {
  const supabase = createClient();
  await supabase.from("game_questions").insert({
    kind: formData.get("kind") as string,
    content: formData.get("content") as string,
  });
  revalidatePath("/games");
  revalidatePath("/admin");
}

export async function deleteGameQuestion(id: string) {
  const supabase = createClient();
  await supabase.from("game_questions").delete().eq("id", id);
  revalidatePath("/games");
  revalidatePath("/admin");
}

// ===== دفتر الخواطر =====
export async function addJournalEntry(formData: FormData) {
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  await supabase.from("journal_entries").insert({
    content: formData.get("content") as string,
    author_email: userData.user?.email ?? null,
  });
  revalidatePath("/journal");
}

export async function deleteJournalEntry(id: string) {
  const supabase = createClient();
  await supabase.from("journal_entries").delete().eq("id", id);
  revalidatePath("/journal");
}

// ===== Theme الموقع المشترك =====
export async function setSharedTheme(theme: string) {
  const supabase = createClient();
  await supabase.from("site_settings").update({ theme }).eq("id", 1);
  revalidatePath("/", "layout");
}
