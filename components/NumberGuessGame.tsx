"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/browserClient";

type Row = {
  id: string;
  player1_email: string;
  player2_email: string | null;
  player1_number: number | null;
  player2_number: number | null;
  status: "waiting" | "playing" | "finished";
  turn: string | null;
  history: { by: string; guess: number; result: string }[];
  winner: string | null;
};

export default function NumberGuessGame() {
  const supabase = createClient();
  const [myEmail, setMyEmail] = useState<string | null>(null);
  const [game, setGame] = useState<Row | null>(null);
  const [secretInput, setSecretInput] = useState("");
  const [guessInput, setGuessInput] = useState("");
  const [loading, setLoading] = useState(true);

  // جلب بريد المستخدم الحالي + آخر لعبة موجودة
  useEffect(() => {
    (async () => {
      const { data: userData } = await supabase.auth.getUser();
      const email = userData.user?.email ?? null;
      setMyEmail(email);

      const { data } = await supabase
        .from("number_games")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      setGame(data as Row | null);
      setLoading(false);
    })();
  }, []);

  // الاستماع اللحظي لأي تغيير على اللعبة
  useEffect(() => {
    if (!game?.id) return;
    const channel = supabase
      .channel(`number_game_${game.id}`)
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "number_games", filter: `id=eq.${game.id}` },
        (payload) => setGame(payload.new as Row)
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [game?.id]);

  async function createGame() {
    const secret = parseInt(secretInput, 10);
    if (isNaN(secret)) return;
    const { data } = await supabase
      .from("number_games")
      .insert({ player1_email: myEmail, player1_number: secret, status: "waiting" })
      .select()
      .single();
    setGame(data as Row);
    setSecretInput("");
  }

  async function joinGame() {
    if (!game) return;
    const secret = parseInt(secretInput, 10);
    if (isNaN(secret)) return;
    const { data } = await supabase
      .from("number_games")
      .update({
        player2_email: myEmail,
        player2_number: secret,
        status: "playing",
        turn: game.player1_email,
      })
      .eq("id", game.id)
      .select()
      .single();
    setGame(data as Row);
    setSecretInput("");
  }

  async function submitGuess() {
    if (!game || !myEmail) return;
    const guess = parseInt(guessInput, 10);
    if (isNaN(guess)) return;

    const opponentNumber = myEmail === game.player1_email ? game.player2_number : game.player1_number;
    const opponentEmail = myEmail === game.player1_email ? game.player2_email : game.player1_email;
    if (opponentNumber === null) return;

    let result: string;
    let status = game.status;
    let winner = game.winner;
    if (guess === opponentNumber) {
      result = "صح 🎉";
      status = "finished";
      winner = myEmail;
    } else if (guess > opponentNumber) {
      result = "أقل";
    } else {
      result = "أعلى";
    }

    const newHistory = [...(game.history ?? []), { by: myEmail, guess, result }];

    const { data } = await supabase
      .from("number_games")
      .update({
        history: newHistory,
        turn: status === "finished" ? null : opponentEmail,
        status,
        winner,
      })
      .eq("id", game.id)
      .select()
      .single();

    setGame(data as Row);
    setGuessInput("");
  }

  async function playAgain() {
    setGame(null);
  }

  if (loading) return <p className="text-center opacity-60">جاري التحميل...</p>;

  // ===== لا يوجد لعبة حالية =====
  if (!game || game.status === "finished") {
    return (
      <div className="flex flex-col items-center gap-4">
        {game?.status === "finished" && (
          <div className="neu-inset p-5 text-center">
            <p className="font-bold">
              {game.winner === myEmail ? "🎉 خمّنت صح، فزت!" : "الطرف التاني خمّن رقمك وفاز 🎉"}
            </p>
          </div>
        )}
        <p className="opacity-70">اختر رقمك السري (بين 1 و 100) وابدأ لعبة جديدة</p>
        <input
          type="number"
          value={secretInput}
          onChange={(e) => setSecretInput(e.target.value)}
          className="neu-inset w-32 border-0 px-4 py-2 text-center"
          placeholder="رقمك السري"
        />
        <button onClick={createGame} className="neu-button px-5 py-2 font-bold text-white" style={{ background: "var(--color-primary)" }}>
          ابدأ لعبة جديدة
        </button>
      </div>
    );
  }

  // ===== في انتظار الطرف الثاني =====
  if (game.status === "waiting") {
    if (game.player1_email === myEmail) {
      return <p className="text-center opacity-70">بانتظار خطيبتك تنضم للعبة 💭</p>;
    }
    return (
      <div className="flex flex-col items-center gap-4">
        <p className="opacity-70">خطيبك بدأ لعبة! اختر رقمك السري وانضم</p>
        <input
          type="number"
          value={secretInput}
          onChange={(e) => setSecretInput(e.target.value)}
          className="neu-inset w-32 border-0 px-4 py-2 text-center"
          placeholder="رقمك السري"
        />
        <button onClick={joinGame} className="neu-button px-5 py-2 font-bold text-white" style={{ background: "var(--color-primary)" }}>
          انضم للعبة
        </button>
      </div>
    );
  }

  // ===== اللعبة جارية =====
  const myTurn = game.turn === myEmail;
  return (
    <div className="flex flex-col items-center gap-4">
      <p className="font-bold" style={{ color: "var(--color-primary)" }}>
        {myTurn ? "دورك تخمّن الآن 🎯" : "بانتظار تخمين الطرف الثاني..."}
      </p>

      {myTurn && (
        <div className="flex gap-2">
          <input
            type="number"
            value={guessInput}
            onChange={(e) => setGuessInput(e.target.value)}
            className="neu-inset w-32 border-0 px-4 py-2 text-center"
            placeholder="تخمينك"
          />
          <button onClick={submitGuess} className="neu-button px-5 py-2 font-bold text-white" style={{ background: "var(--color-primary)" }}>
            خمّن
          </button>
        </div>
      )}

      <div className="mt-4 w-full max-w-sm">
        <p className="mb-2 text-center text-sm opacity-60">سجل التخمينات</p>
        <div className="flex flex-col gap-2">
          {(game.history ?? []).slice().reverse().map((h, i) => (
            <div key={i} className="flex justify-between neu-raised px-4 py-2 text-sm">
              <span>{h.by === myEmail ? "أنت" : "الطرف الثاني"} خمّن {h.guess}</span>
              <span className="font-bold">{h.result}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
