import type { LoveMessage } from "@/lib/types";

function formatArabicDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("ar-EG-u-nu-latn", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function MessageCard({ message }: { message: LoveMessage }) {
  return (
    <article className="rounded-soft bg-surface p-5 shadow-[0_10px_30px_-15px_rgba(58,46,57,0.35)] ring-1 ring-black/5">
      <p className="text-xs font-bold opacity-50">{formatArabicDate(message.date)}</p>
      <p className="mt-2 leading-relaxed">{message.content}</p>
      {message.imageUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={message.imageUrl} alt="" className="mt-3 max-h-64 w-full rounded-xl object-cover" />
      )}
    </article>
  );
}
