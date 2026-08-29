"use client";
import { useState } from "react";
import type { Memory } from "@/lib/types";
import Timeline from "@/components/Timeline";
import Gallery from "@/components/Gallery";

export default function StoryTabs({ memories }: { memories: Memory[] }) {
  const [tab, setTab] = useState<"timeline" | "gallery">("timeline");

  return (
    <div>
      <div className="mx-auto mb-8 flex w-fit gap-2 rounded-full bg-surface p-1 shadow">
        <button
          onClick={() => setTab("timeline")}
          className="rounded-full px-5 py-2 text-sm font-bold transition"
          style={tab === "timeline" ? { background: "var(--color-primary)", color: "white" } : {}}
        >
          الخط الزمني 📖
        </button>
        <button
          onClick={() => setTab("gallery")}
          className="rounded-full px-5 py-2 text-sm font-bold transition"
          style={tab === "gallery" ? { background: "var(--color-primary)", color: "white" } : {}}
        >
          معرض الصور 🖼️
        </button>
      </div>

      {tab === "timeline" ? <Timeline memories={memories} /> : <Gallery memories={memories} />}
    </div>
  );
}
