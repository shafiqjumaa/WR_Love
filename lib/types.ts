export type MemoryImage = {
  id: string;
  url: string;
  caption?: string;
};

export type Memory = {
  id: string;
  date: string; // YYYY-MM-DD
  title: string;
  description: string;
  images: MemoryImage[];
  videoUrl?: string;
  location?: string;
  linkedMessage?: string;
};

export type LoveMessage = {
  id: string;
  content: string;
  date: string;
  imageUrl?: string;
  isSecret?: boolean;
  scheduledAt?: string; // ISO datetime - لعرضها بوقت محدد فقط
};

export type Surprise = {
  id: string;
  title: string;
  message?: string;
  imageUrl?: string;
  videoUrl?: string;
  question?: string;
  unlockAt: string;
};

export type JarMessage = {
  id: string;
  content: string;
};

export type Occasion = {
  id: string;
  label: string;
  date: string;
};

export type GameQuestion = {
  id: string;
  kind: "yes_no" | "challenge" | "know_you";
  content: string;
};

export type JournalEntry = {
  id: string;
  content: string;
  authorEmail?: string;
  createdAt: string;
};

export type NumberGame = {
  id: string;
  player1Email: string;
  player2Email: string | null;
  player1Number: number | null;
  player2Number: number | null;
  status: "waiting" | "playing" | "finished";
  turn: string | null;
  history: { by: string; guess: number; result: "أعلى" | "أقل" | "صح" }[];
  winner: string | null;
};
