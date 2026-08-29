import type { Memory } from "@/lib/types";

export default function Gallery({ memories }: { memories: Memory[] }) {
  const allImages = memories.flatMap((m) =>
    m.images.map((img) => ({ ...img, memoryTitle: m.title, date: m.date }))
  );

  if (allImages.length === 0) {
    return (
      <p className="mx-auto mt-10 max-w-sm text-center opacity-60">
        الصور اللي بتضيفها على الذكريات بتظهر هون تلقائيًا 🖼️
      </p>
    );
  }

  return (
    <div className="mx-auto grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
      {allImages.map((img) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={img.id}
          src={img.url}
          alt={img.caption ?? img.memoryTitle}
          title={img.memoryTitle}
          className="aspect-square w-full rounded-xl object-cover shadow-sm transition hover:scale-[1.03]"
        />
      ))}
    </div>
  );
}
