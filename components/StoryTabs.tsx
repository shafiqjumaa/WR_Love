"use client";
import { useState } from "react";
import type { Memory } from "@/lib/types";
import Timeline from "@/components/Timeline";
import Gallery from "@/components/Gallery";

export default function StoryTabs({ memories }: { memories: Memory[] }) {
  const [tab, setTab] = useState<"timeline" | "gallery">("timeline");

  return (
    <div>
      <div className="neu-inset mx-auto mb-8 flex w-fit gap-2 p-1">
        <button
          onClick={() => setTab("timeline")}
          className={`px-5 py-2 text-sm font-bold transition ${tab === "timeline" ? "neu-button text-white" : ""}`}
          style={tab === "timeline" ? { background: "var(--color-primary)" } : {}}
        >
          الخط الزمني 📖
        </button>
        <button
          onClick={() => setTab("gallery")}
          className={`px-5 py-2 text-sm font-bold transition ${tab === "gallery" ? "neu-button text-white" : ""}`}
          style={tab === "gallery" ? { background: "var(--color-primary)" } : {}}
        >
          معرض الصور 🖼️
        </button>
      </div>

      {tab === "timeline" ? <Timeline memories={memories} /> : <Gallery memories={memories} />}
    </div>
  );
}
