import Link from "next/link";
import { Container } from "@/components/container";
import { getDecade, type DecadeId } from "@/lib/decades";

/**
 * Placeholder — the real seven-question engine is Phase 3 (Quiz
 * Engine). This exists so "Start Quiz" from the lobby is a real,
 * working link rather than a dead end, and says plainly what's next
 * rather than silently failing or 404ing.
 */
export default async function PlayPage({ params }: PageProps<"/decade/[id]/play">) {
  const { id } = await params;
  const decade = getDecade(id as DecadeId);

  return (
    <main className="flex-1 flex flex-col items-center justify-center text-center py-16">
      <Container className="flex flex-col items-center gap-4">
        <span className="font-display font-extrabold text-2xl">
          {decade.name} quiz — coming in Phase 3
        </span>
        <p className="text-sm opacity-80 max-w-xs">
          The question engine (seven questions, answer feedback, progress
          and scoring) isn&apos;t built yet — this is next on the plan.
        </p>
        <Link
          href={`/decade/${decade.id}`}
          className="text-sm font-semibold underline underline-offset-4"
        >
          ‹ Back to the {decade.label} lobby
        </Link>
      </Container>
    </main>
  );
}
