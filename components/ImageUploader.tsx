"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/browserClient";

export default function ImageUploader({
  onUploaded,
  multiple = false,
}: {
  onUploaded: (urls: string[]) => void;
  multiple?: boolean;
}) {
  const [uploading, setUploading] = useState(false);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);

  async function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    const supabase = createClient();
    const urls: string[] = [];

    for (const file of Array.from(files)) {
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}-${file.name}`;
      const { error } = await supabase.storage.from("our-photos").upload(path, file);
      if (!error) {
        const { data } = supabase.storage.from("our-photos").getPublicUrl(path);
        urls.push(data.publicUrl);
      }
    }

    const all = multiple ? [...uploadedUrls, ...urls] : urls;
    setUploadedUrls(all);
    onUploaded(all);
    setUploading(false);
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="neu-button w-fit cursor-pointer px-4 py-2 text-sm font-bold text-white" style={{ background: "var(--color-primary)" }}>
        {uploading ? "جاري الرفع..." : "📷 إضافة صور"}
        <input type="file" accept="image/*" multiple={multiple} onChange={handleFiles} className="hidden" disabled={uploading} />
      </label>
      {uploadedUrls.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {uploadedUrls.map((u) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={u} src={u} alt="" className="h-16 w-16 rounded-lg object-cover" />
          ))}
        </div>
      )}
    </div>
  );
}
