import "server-only";
import { supabase } from "./supabase";
import { categories } from "./categories";

/**
 * Real question content, read from Supabase (Phase 5 content backend —
 * beta-plan.md §4.5). Replaces the old hardcoded seven-question demo
 * set that was shared across every decade — each quiz now reads its
 * own 7 fact-checked questions, in the order they were written
 * (sport → music → tv-film → food-drink → pop-culture →
 * games-jokes-quotes-logos → knowstalgia-trip), via `sort_order`.
 *
 * `server-only` (the import above) makes this a build error if a
 * Client Component ever imports this module directly — correct answers
 * (and now fun facts, which can also hint at the answer) must never
 * reach the browser before an answer is submitted (master brief §44,
 * LOCKED).
 */

export interface Question {
  id: string;
  categoryId: string;
  text: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  funFact: string;
}

/**
 * What's safe to send to the browser before the player has answered:
 * no correct answer, and no fun fact either, since a fun fact often
 * gives the answer away (e.g. "Pelé lifted the trophy..." names the
 * winning country). Both are only released via submitAnswer, after the
 * player has locked in a choice.
 */
export type PublicQuestion = Omit<Question, "correctIndex" | "funFact">;

interface QuestionRow {
  id: string;
  category_id: string;
  sort_order: number;
  text: string;
  options: unknown;
  correct_index: number;
  fun_fact: string;
}

function toQuestion(row: QuestionRow): Question {
  const options = row.options as string[];
  if (!Array.isArray(options) || options.length !== 4) {
    throw new Error(`Question ${row.id} has malformed options: ${JSON.stringify(row.options)}`);
  }
  if (row.correct_index < 0 || row.correct_index > 3) {
    throw new Error(`Question ${row.id} has an out-of-range correct_index: ${row.correct_index}`);
  }

  return {
    id: row.id,
    categoryId: row.category_id,
    text: row.text,
    options: options as [string, string, string, string],
    correctIndex: row.correct_index as 0 | 1 | 2 | 3,
    funFact: row.fun_fact,
  };
}

export async function getQuizQuestions(quizId: string): Promise<Question[]> {
  const { data, error } = await supabase
    .from("questions")
    .select("id, category_id, sort_order, text, options, correct_index, fun_fact")
    .eq("quiz_id", quizId)
    .order("sort_order", { ascending: true });

  if (error) {
    throw new Error(`Failed to load questions for quiz "${quizId}": ${error.message}`);
  }

  const questions = (data ?? []).map((row) => toQuestion(row as QuestionRow));

  // Sense-check against the fixed category order (master brief §9) —
  // every quiz should run sport → music → … → knowstalgia-trip. This
  // never throws in production (a content mistake shouldn't take the
  // whole quiz down); it just surfaces loudly in server logs so a
  // sort_order slip in a future content batch gets noticed fast.
  questions.forEach((q, i) => {
    const expected = categories[i]?.id;
    if (expected && q.categoryId !== expected) {
      console.error(
        `Quiz ${quizId}, question ${i + 1}: category is "${q.categoryId}" but expected "${expected}" — check sort_order in the SQL for this quiz.`,
      );
    }
  });

  return questions;
}

export async function getQuestion(questionId: string): Promise<Question | undefined> {
  const { data, error } = await supabase
    .from("questions")
    .select("id, category_id, sort_order, text, options, correct_index, fun_fact")
    .eq("id", questionId)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to load question "${questionId}": ${error.message}`);
  }
  if (!data) return undefined;

  return toQuestion(data as QuestionRow);
}

export function toPublicQuestion(question: Question): PublicQuestion {
  return {
    id: question.id,
    categoryId: question.categoryId,
    text: question.text,
    options: question.options,
  };
}
