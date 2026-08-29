import type { Memory } from "@/lib/types";
import MemoryCard from "@/components/MemoryCard";

export default function Timeline({ memories }: { memories: Memory[] }) {
  if (memories.length === 0) {
    return (
      <p className="mx-auto mt-10 max-w-sm text-center opacity-60">
        لسا ما في ذكريات مضافة... أول ذكرى رح تبدأ القصة 🌱
      </p>
    );
  }

  return (
    <div className="relative mx-auto max-w-2xl">
      <div
        aria-hidden="true"
        className="absolute right-4 top-0 h-full w-0.5 sm:right-1/2"
        style={{ background: "var(--color-secondary)" }}
      />
      <div className="flex flex-col gap-8">
        {memories.map((memory) => (
          <div key={memory.id} className="relative pr-10 sm:pr-0">
            <span
              aria-hidden="true"
              className="absolute right-2.5 top-6 h-3 w-3 rounded-full sm:right-[calc(50%-6px)]"
              style={{ background: "var(--color-primary)" }}
            />
            <MemoryCard memory={memory} />
          </div>
        ))}
      </div>
    </div>
  );
}
