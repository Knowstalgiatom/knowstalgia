import { notFound } from "next/navigation";
import { getDecade, decades, type DecadeId } from "@/lib/decades";
import { getQuizzesForDecade } from "@/lib/quizzes";
import { getQuizQuestions, toPublicQuestion } from "@/lib/questions";
import { QuizPlayer } from "@/components/quiz-player";

/**
 * The Quiz Engine (Phase 3): renders questions one at a time, locks the
 * selection on tap, validates server-side (see ./actions.ts — correct
 * answers never reach the browser before submission, master brief §44),
 * shows feedback, tracks progress, and ends in a bare completion state.
 * The polished results screen (share, answer pattern, play again) is
 * Phase 4 — deliberately not built here.
 */

export function generateStaticParams() {
  return decades.map((decade) => ({ id: decade.id }));
}

export default async function PlayPage({ params }: PageProps<"/decade/[id]/play">) {
  const { id } = await params;
  const decade = getDecade(id as DecadeId);
  const quiz = getQuizzesForDecade(decade.id)[0];
  if (!quiz) notFound();

  const questions = getQuizQuestions(quiz.id).map(toPublicQuestion);

  return (
    <main className="flex-1 flex flex-col">
      <QuizPlayer
        decadeLabel={decade.label}
        lobbyHref={`/decade/${decade.id}`}
        quizTitle={quiz.title}
        questions={questions}
      />
    </main>
  );
}
