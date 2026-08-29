import type { Memory } from "@/lib/types";

function formatArabicDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("ar-EG-u-nu-latn", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function MemoryCard({ memory }: { memory: Memory }) {
  return (
    <article className="relative rounded-soft bg-surface p-5 shadow-[0_10px_30px_-15px_rgba(58,46,57,0.35)] ring-1 ring-black/5 sm:p-7">
      <p className="text-sm font-bold opacity-60">{formatArabicDate(memory.date)}</p>
      <h3 className="font-display mt-1 text-2xl" style={{ color: "var(--color-primary)" }}>
        {memory.title}
      </h3>
      <p className="mt-2 leading-relaxed opacity-85">{memory.description}</p>

      {memory.images.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {memory.images.map((img) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={img.id}
              src={img.url}
              alt={img.caption ?? memory.title}
              className="h-32 w-full rounded-xl object-cover sm:h-36"
            />
          ))}
        </div>
      )}

      {memory.videoUrl && (
        <video controls className="mt-4 w-full rounded-xl">
          <source src={memory.videoUrl} />
        </video>
      )}

      {memory.location && (
        <p className="mt-3 text-sm opacity-60">📍 {memory.location}</p>
      )}

      {memory.linkedMessage && (
        <p
          className="mt-4 rounded-2xl px-4 py-3 text-sm"
          style={{ background: "var(--color-secondary)", color: "var(--color-ink)" }}
        >
          "{memory.linkedMessage}"
        </p>
      )}
    </article>
  );
}
