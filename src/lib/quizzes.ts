import "server-only";
import { supabase } from "./supabase";
import type { DecadeId } from "./decades";

/**
 * Real quiz metadata, read from Supabase (Phase 5 content backend —
 * beta-plan.md §4.5). Replaces the old hardcoded placeholder that gave
 * every decade a single fake "Quiz 001" — each decade now has three
 * real, fact-checked quizzes (21 questions each... well, 7 each, 21
 * total per decade), ordered by `sort_order`.
 */

export interface Quiz {
  id: string;
  decadeId: DecadeId;
  title: string;
  sortOrder: number;
  questionCount: number;
}

/** Fixed by design — every quiz has exactly 7 questions, one per category. */
const QUESTIONS_PER_QUIZ = 7;

export async function getQuizzesForDecade(id: DecadeId): Promise<Quiz[]> {
  const { data, error } = await supabase
    .from("quizzes")
    .select("id, decade_id, title, sort_order")
    .eq("decade_id", id)
    .order("sort_order", { ascending: true });

  if (error) {
    throw new Error(`Failed to load quizzes for decade "${id}": ${error.message}`);
  }

  return (data ?? []).map((row) => ({
    id: row.id,
    decadeId: row.decade_id as DecadeId,
    title: row.title,
    sortOrder: row.sort_order,
    questionCount: QUESTIONS_PER_QUIZ,
  }));
}

/**
 * Picks one quiz for a decade by position, wrapping round if the index
 * is out of range — this is what lets "Play again" cycle through a
 * decade's three quizzes (1 → 2 → 3 → 1 → …) instead of repeating the
 * same one, now that there's more than one quiz per decade to pick from.
 */
export function pickQuiz(quizzes: Quiz[], index: number): Quiz | undefined {
  if (quizzes.length === 0) return undefined;
  const wrapped = ((index % quizzes.length) + quizzes.length) % quizzes.length;
  return quizzes[wrapped];
}
