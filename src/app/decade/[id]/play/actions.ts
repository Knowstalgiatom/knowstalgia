"use server";

import { getQuestion } from "@/lib/questions";

/**
 * Server-side answer validation (master brief §44, LOCKED): the client
 * never receives which option is correct — or the fun fact, which can
 * also give the answer away — until it submits an answer. This runs on
 * the server, looks the question up by id, and is the only place
 * "correct" gets decided. Doesn't need to be banking-grade — just not
 * trivially cheatable via View Source/dev tools, which this satisfies:
 * neither value ever serialises into anything sent to the browser
 * before this point.
 */

export interface AnswerResult {
  correct: boolean;
  correctIndex: number;
  funFact: string;
}

export async function submitAnswer(
  questionId: string,
  selectedIndex: number,
): Promise<AnswerResult> {
  const question = await getQuestion(questionId);
  if (!question) {
    throw new Error(`Unknown question: ${questionId}`);
  }

  return {
    correct: question.correctIndex === selectedIndex,
    correctIndex: question.correctIndex,
    funFact: question.funFact,
  };
}
