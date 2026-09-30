"use client";

import { useState } from "react";
import type { PublicQuestion } from "@/lib/questions";
import { categories } from "@/lib/categories";
import { submitAnswer } from "@/app/decade/[id]/play/actions";
import { ResultsScreen } from "@/components/results-screen";

interface AnswerState {
  selectedIndex: number;
  correctIndex: number;
  isCorrect: boolean;
}

export function QuizPlayer({
  decadeLabel,
  lobbyHref,
  quizTitle,
  questions,
}: {
  decadeLabel: string;
  lobbyHref: string;
  quizTitle: string;
  questions: PublicQuestion[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, AnswerState>>({});
  const [submitting, setSubmitting] = useState(false);
  const [complete, setComplete] = useState(false);

  const total = questions.length;
  const current = questions[currentIndex];
  const answer = answers[current?.id];
  const isLast = currentIndex === total - 1;

  async function handleSelect(optionIndex: number) {
    if (answer || submitting || !current) return;
    setSubmitting(true);
    try {
      const result = await submitAnswer(current.id, optionIndex);
      setAnswers((prev) => ({
        ...prev,
        [current.id]: {
          selectedIndex: optionIndex,
          correctIndex: result.correctIndex,
          isCorrect: result.correct,
        },
      }));
    } finally {
      setSubmitting(false);
    }
  }

  function handleContinue() {
    if (isLast) {
      setComplete(true);
    } else {
      setCurrentIndex((i) => i + 1);
    }
  }

  function handlePlayAgain() {
    // Restarts the same demo quiz — the only one this decade has for
    // now. Once Phase 5 lands more than one quiz per decade, this is
    // where "play again" would pick the next one instead.
    setCurrentIndex(0);
    setAnswers({});
    setComplete(false);
  }

  if (complete) {
    return (
      <ResultsScreen
        decadeLabel={decadeLabel}
        lobbyHref={lobbyHref}
        quizTitle={quizTitle}
        questions={questions}
        answers={answers}
        onPlayAgain={handlePlayAgain}
      />
    );
  }

  if (!current) return null;

  const category = categories.find((c) => c.id === current.categoryId);

  return (
    <div className="flex-1 flex flex-col px-5 py-8 gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs font-semibold opacity-70">
          <span>{category?.label ?? "Question"}</span>
          <span>
            {currentIndex + 1} / {total}
          </span>
        </div>
        <div className="flex gap-1" role="presentation">
          {questions.map((q, i) => (
            <span
              key={q.id}
              className={`h-1.5 flex-1 rounded-full ${
                i < currentIndex || (i === currentIndex && answer)
                  ? "bg-decade-accent"
                  : i === currentIndex
                    ? "bg-white/50"
                    : "bg-white/15"
              }`}
            />
          ))}
        </div>
      </div>

      <h1 className="font-display font-extrabold text-2xl leading-tight">
        {current.text}
      </h1>

      <div className="flex flex-col gap-3" role="group" aria-label="Answer options">
        {current.options.map((option, i) => {
          const isSelected = answer?.selectedIndex === i;
          const isCorrectOption = answer && answer.correctIndex === i;

          let tone = "bg-white/10 border-white/20";
          if (answer) {
            if (isCorrectOption) {
              tone = "bg-correct border-correct text-white";
            } else if (isSelected) {
              tone = "bg-incorrect border-incorrect text-white";
            } else {
              tone = "bg-white/5 border-white/10 opacity-60";
            }
          }

          return (
            <button
              key={i}
              type="button"
              disabled={!!answer || submitting}
              onClick={() => handleSelect(i)}
              className={`w-full text-left rounded-md border px-4 py-3.5 font-semibold transition ${tone} ${
                !answer ? "active:scale-[0.98]" : ""
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>

      <div role="status" aria-live="polite" className="sr-only">
        {answer
          ? answer.isCorrect
            ? "Correct."
            : `Incorrect. The correct answer was ${current.options[answer.correctIndex]}.`
          : ""}
      </div>

      <div className="flex-1" />

      {answer && (
        <button
          type="button"
          onClick={handleContinue}
          className="w-full rounded-md bg-decade-accent text-decade-deep font-display font-extrabold text-lg py-3.5 shadow-pop active:translate-y-0.5 active:shadow-none transition"
        >
          {isLast ? "See your score" : "Next question →"}
        </button>
      )}
    </div>
  );
}
