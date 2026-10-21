import { notFound } from "next/navigation";
import { getDecade, decades, type DecadeId } from "@/lib/decades";
import { getQuizzesForDecade, pickQuiz } from "@/lib/quizzes";
import { getQuizQuestions, toPublicQuestion } from "@/lib/questions";
import { QuizPlayer } from "@/components/quiz-player";

/**
 * The Quiz Engine (Phase 3): renders questions one at a time, locks the
 * selection on tap, validates server-side (see ./actions.ts — correct
 * answers never reach the browser before submission, master brief §44),
 * shows feedback (now including the fun fact, Phase 5), tracks
 * progress, and hands off to the results screen (Phase 4) on the last
 * question.
 *
 * `?q=<index>` picks which of the decade's quizzes to play (0, 1, 2 —
 * wraps if out of range). Omitted/invalid defaults to the first one.
 * This is what "Play again" uses to move on to the next quiz instead
 * of repeating the one just played (beta-plan.md §4.5).
 */

export function generateStaticParams() {
  return decades.map((decade) => ({ id: decade.id }));
}

export default async function PlayPage({
  params,
  searchParams,
}: PageProps<"/decade/[id]/play">) {
  const { id } = await params;
  const { q } = await searchParams;
  const decade = getDecade(id as DecadeId);

  const quizzes = await getQuizzesForDecade(decade.id);
  if (quizzes.length === 0) notFound();

  const requestedIndex = Number(Array.isArray(q) ? q[0] : q);
  const quizIndex = Number.isInteger(requestedIndex) ? requestedIndex : 0;
  const quiz = pickQuiz(quizzes, quizIndex);
  if (!quiz) notFound();

  const questions = (await getQuizQuestions(quiz.id)).map(toPublicQuestion);
  const nextQuizHref = `/decade/${decade.id}/play?q=${(quizIndex + 1) % quizzes.length}`;

  return (
    <main className="flex-1 flex flex-col">
      <QuizPlayer
        key={quiz.id}
        decadeLabel={decade.label}
        lobbyHref={`/decade/${decade.id}`}
        quizTitle={quiz.title}
        questions={questions}
        nextQuizHref={nextQuizHref}
      />
    </main>
  );
}
