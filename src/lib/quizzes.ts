import type { DecadeId } from "./decades";

/**
 * PLACEHOLDER content. The real content backend (Supabase — decades,
 * quizzes, questions, submissions) is Phase 5 (master brief §22-25,
 * beta-plan.md phase 5). This exists only so Phase 2's quiz lobby has
 * something real to point at instead of a hardcoded string, and so the
 * shape here is what the Phase 5 schema needs to match, not the other
 * way round: id, decade, title, order/position, category set.
 */

export interface Quiz {
  id: string;
  decadeId: DecadeId;
  title: string;
  questionCount: number;
}

export const quizzesByDecade: Record<DecadeId, Quiz[]> = {
  "60s": [{ id: "60s-001", decadeId: "60s", title: "Quiz 001", questionCount: 7 }],
  "70s": [{ id: "70s-001", decadeId: "70s", title: "Quiz 001", questionCount: 7 }],
  "80s": [{ id: "80s-001", decadeId: "80s", title: "Quiz 001", questionCount: 7 }],
  "90s": [{ id: "90s-001", decadeId: "90s", title: "Quiz 001", questionCount: 7 }],
  "00s": [{ id: "00s-001", decadeId: "00s", title: "Quiz 001", questionCount: 7 }],
  "10s": [{ id: "10s-001", decadeId: "10s", title: "Quiz 001", questionCount: 7 }],
  "20s": [{ id: "20s-001", decadeId: "20s", title: "Quiz 001", questionCount: 7 }],
};

export function getQuizzesForDecade(id: DecadeId): Quiz[] {
  return quizzesByDecade[id] ?? [];
}
