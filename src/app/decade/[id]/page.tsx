import Link from "next/link";
import type { Metadata } from "next";
import { KnowstalgiaLogo } from "@/components/logo";
import { Container } from "@/components/container";
import { getDecade, decades, type DecadeId } from "@/lib/decades";
import { getQuizzesForDecade } from "@/lib/quizzes";
import { categories } from "@/lib/categories";

/**
 * Quiz lobby (master brief §17): a lightweight intro to the chosen
 * decade — branding, quiz title, "7 questions", the category list, and
 * Start Quiz. No configuration screen — the decade choice already made
 * on the homepage is the only decision a player needs to make.
 */

export async function generateMetadata({
  params,
}: PageProps<"/decade/[id]">): Promise<Metadata> {
  const { id } = await params;
  const decade = decades.find((d) => d.id === id);
  return { title: decade ? `${decade.name} quiz — KNOWstalgia` : "KNOWstalgia" };
}

export default async function DecadeLobbyPage({
  params,
}: PageProps<"/decade/[id]">) {
  const { id } = await params;
  const decade = getDecade(id as DecadeId);
  const quiz = getQuizzesForDecade(decade.id)[0];

  return (
    <main className="flex-1 flex flex-col py-10">
      <Container className="flex-1 flex flex-col items-center text-center gap-8">
        <Link href="/" className="text-sm font-semibold opacity-80 hover:opacity-100">
          ‹ Choose another decade
        </Link>

        <div className="flex flex-col items-center gap-3">
          <KnowstalgiaLogo variant="reverse" size="sm" />
          <span className="font-display font-extrabold text-5xl leading-none">
            {decade.name}
          </span>
          <p className="text-sm opacity-80">
            {decade.descriptors.join(" · ")}
          </p>
        </div>

        <div className="w-full max-w-xs flex flex-col gap-4">
          <div>
            <h1 className="font-display font-extrabold text-lg">
              {quiz?.title ?? "Quiz"}
            </h1>
            <p className="text-sm opacity-80">
              {quiz?.questionCount ?? 7} questions · multiple choice
            </p>
          </div>

          <ol className="flex flex-col gap-1.5 text-left text-sm">
            {categories.map((category, i) => (
              <li
                key={category.id}
                className="flex items-baseline gap-2 rounded-sm bg-white/10 px-3 py-2"
              >
                <span className="opacity-60 text-xs w-4 shrink-0">
                  {i + 1}
                </span>
                <span className="font-semibold">{category.label}</span>
              </li>
            ))}
          </ol>
        </div>

        <Link
          href={`/decade/${decade.id}/play`}
          className="w-full max-w-xs rounded-md bg-decade-accent text-decade-deep font-display font-extrabold text-lg py-3.5 shadow-pop active:translate-y-0.5 active:shadow-none transition"
        >
          Start Quiz
        </Link>
      </Container>
    </main>
  );
}
