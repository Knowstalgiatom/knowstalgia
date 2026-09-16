import "server-only";
import { categories } from "./categories";

/**
 * DEMO CONTENT — one shared placeholder question set, reused across
 * every decade's demo quiz, purely to exercise the Quiz Engine (Phase
 * 3): rendering, locking, correct/incorrect feedback, progress,
 * completion. This is deliberately NOT sourced or reviewed against
 * content-guidelines/ — that pipeline is for the real 147-question
 * launch set (Phase 5, beta-plan.md §4.5). Nothing here should be
 * mistaken for finished decade-specific content; it's the same seven
 * questions regardless of which decade you picked.
 *
 * `server-only` (the import above) makes this a build error if a
 * Client Component ever imports this module directly — correct answers
 * must never reach the browser (master brief §44, LOCKED).
 */

export interface Question {
  id: string;
  categoryId: string;
  text: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
}

export type PublicQuestion = Omit<Question, "correctIndex">;

const demoQuestions: Question[] = [
  {
    id: "demo-1",
    categoryId: "sport",
    text: "Which colour card does a football referee show for a sending-off?",
    options: ["Yellow", "Red", "Blue", "Green"],
    correctIndex: 1,
  },
  {
    id: "demo-2",
    categoryId: "music",
    text: "Which instrument has 88 keys?",
    options: ["Guitar", "Piano", "Violin", "Flute"],
    correctIndex: 1,
  },
  {
    id: "demo-3",
    categoryId: "tv-film",
    text: "In The Wizard of Oz, what colour are Dorothy's famous shoes?",
    options: ["Silver", "Gold", "Red", "Blue"],
    correctIndex: 2,
  },
  {
    id: "demo-4",
    categoryId: "food-drink",
    text: "What's the main ingredient in guacamole?",
    options: ["Avocado", "Tomato", "Pepper", "Onion"],
    correctIndex: 0,
  },
  {
    id: "demo-5",
    categoryId: "pop-culture",
    text: "What shape is a stop sign?",
    options: ["Circle", "Square", "Octagon", "Triangle"],
    correctIndex: 2,
  },
  {
    id: "demo-6",
    categoryId: "games-jokes-quotes-logos",
    text: "Which fast-food chain's logo is a pair of golden arches?",
    options: ["Burger King", "McDonald's", "KFC", "Wendy's"],
    correctIndex: 1,
  },
  {
    id: "demo-7",
    categoryId: "knowstalgia-trip",
    text: "Before smartphones, what did most people use to find their way around a new city?",
    options: ["A paper map", "A compass app", "Satellite radio", "A pager"],
    correctIndex: 0,
  },
];

/** categoryId is derived from the shared category order — kept in sync by construction. */
demoQuestions.forEach((q, i) => {
  if (q.categoryId !== categories[i].id) {
    throw new Error(
      `Demo question ${i} is tagged "${q.categoryId}" but canonical order expects "${categories[i].id}"`,
    );
  }
});

// `quizId` isn't used yet — every quiz shares this one demo set — but it
// stays in the signature because Phase 5 will use it to select between
// real per-quiz question sets, and call sites shouldn't need to change.
export function getQuizQuestions(quizId: string): Question[] {
  void quizId;
  return demoQuestions;
}

export function getQuestion(questionId: string): Question | undefined {
  return demoQuestions.find((q) => q.id === questionId);
}

export function toPublicQuestion(question: Question): PublicQuestion {
  return {
    id: question.id,
    categoryId: question.categoryId,
    text: question.text,
    options: question.options,
  };
}
