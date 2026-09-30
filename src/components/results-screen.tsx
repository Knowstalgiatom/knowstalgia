"use client";

import { useState } from "react";
import Link from "next/link";
import type { PublicQuestion } from "@/lib/questions";

interface AnswerState {
  selectedIndex: number;
  correctIndex: number;
  isCorrect: boolean;
}

/**
 * The Phase 4 results screen (master brief §20-21): headline score,
 * answer pattern, play again / switch decade, and a Wordle-style share.
 * Email capture is the one piece that's UI-only for now — see the note
 * by its form below.
 */
export function ResultsScreen({
  decadeLabel,
  lobbyHref,
  quizTitle,
  questions,
  answers,
  onPlayAgain,
}: {
  decadeLabel: string;
  lobbyHref: string;
  quizTitle: string;
  questions: PublicQuestion[];
  answers: Record<string, AnswerState>;
  onPlayAgain: () => void;
}) {
  const [shareState, setShareState] = useState<"idle" | "copied" | "shared">("idle");
  const [email, setEmail] = useState("");
  const [notifySubmitted, setNotifySubmitted] = useState(false);

  const total = questions.length;
  const score = questions.filter((q) => answers[q.id]?.isCorrect).length;
  const pattern = questions.map((q) => (answers[q.id]?.isCorrect ? "🟩" : "⬛"));

  function scoreMessage() {
    if (score === total) return "Certified decade legend.";
    if (score / total >= 0.7) return "Seriously good memory on you.";
    if (score / total >= 0.4) return "Not bad — some of that's fuzzy.";
    return "Time to dig out the old photos.";
  }

  async function handleShare() {
    const url =
      typeof window !== "undefined"
        ? `${window.location.origin}${lobbyHref}`
        : lobbyHref;
    const text = [
      `KNOWstalgia · ${decadeLabel}`,
      `${score}/${total}`,
      pattern.join(""),
      "The quiz of the future, all about the past.",
      url,
    ].join("\n");

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ text });
        setShareState("shared");
      } catch {
        // user cancelled the native share sheet — not an error
      }
      return;
    }

    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      setShareState("copied");
      setTimeout(() => setShareState("idle"), 2000);
    }
  }

  function handleNotifySubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) return;
    // UI-only for now — nothing persists this yet. Where captured emails
    // actually go (a Supabase table, a mailing-list provider, etc.) is a
    // product/privacy decision that hasn't been made, so this
    // deliberately doesn't pretend to wire up a backend that isn't
    // there. Flagged to Tom rather than assumed.
    setNotifySubmitted(true);
  }

  return (
    <div className="flex-1 flex flex-col items-center text-center gap-6 px-5 py-12">
      <span className="text-sm font-semibold opacity-70 uppercase tracking-wide">
        {decadeLabel} · {quizTitle}
      </span>

      <div className="flex flex-col items-center gap-1">
        <span className="font-display font-extrabold text-7xl leading-none">
          {score}/{total}
        </span>
        <p className="text-sm opacity-80">{scoreMessage()}</p>
      </div>

      <div className="flex gap-1.5" aria-label={`Answer pattern: ${score} out of ${total} correct`}>
        {pattern.map((mark, i) => (
          <span
            key={i}
            aria-hidden="true"
            className={`h-6 w-6 rounded-sm ${mark === "🟩" ? "bg-correct" : "bg-white/15"}`}
          />
        ))}
      </div>

      <div className="w-full max-w-xs flex flex-col gap-3">
        <button
          type="button"
          onClick={handleShare}
          className="w-full rounded-md bg-decade-accent text-decade-deep font-display font-extrabold py-3.5 shadow-pop active:translate-y-0.5 active:shadow-none transition"
        >
          {shareState === "copied"
            ? "Copied to clipboard!"
            : shareState === "shared"
              ? "Shared!"
              : "Share your result"}
        </button>

        <button
          type="button"
          onClick={onPlayAgain}
          className="w-full rounded-md border border-white/25 font-semibold py-3.5 active:translate-y-0.5 transition"
        >
          Play again
        </button>

        <Link
          href="/"
          className="text-sm font-semibold underline underline-offset-4 opacity-90 mt-1"
        >
          Choose another decade
        </Link>
      </div>

      <div className="w-full max-w-xs border-t border-white/15 pt-6 mt-2">
        {notifySubmitted ? (
          <p className="text-sm opacity-80">
            Thanks — we&apos;ll let you know when KNOWstalgia launches.
          </p>
        ) : (
          <form onSubmit={handleNotifySubmit} className="flex flex-col gap-2">
            <label htmlFor="notify-email" className="text-xs opacity-70">
              Want to know when KNOWstalgia launches?
            </label>
            <div className="flex gap-2">
              <input
                id="notify-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="flex-1 min-w-0 rounded-md border border-white/25 bg-white/10 px-3 py-2 text-sm placeholder:opacity-50 focus:outline-none focus-visible:outline-2 focus-visible:outline-white"
              />
              <button
                type="submit"
                className="rounded-md bg-white/15 px-4 py-2 text-sm font-semibold active:translate-y-0.5 transition"
              >
                Notify me
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
