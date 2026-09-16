import { KnowstalgiaLogo } from "@/components/logo";
import { Container } from "@/components/container";
import { DecadeCard } from "@/components/decade-card";
import { decades } from "@/lib/decades";

/**
 * The KNOWstalgia landing page (master brief §15-16): brand + strapline,
 * then "What's your decade?" dominating the page with minimal
 * explanatory text. This IS the real selector — Phase 1's version of
 * this page was a foundation proof only; this replaces it.
 */
export default function Home() {
  return (
    <main className="flex-1 flex flex-col">
      <section className="pt-12 pb-6">
        <Container className="flex flex-col items-center text-center gap-3">
          <KnowstalgiaLogo size="lg" />
          <p className="font-semibold text-ink-soft text-sm">
            The quiz of the future, all about the past.
          </p>
        </Container>
      </section>

      <section className="flex-1 pb-10">
        <Container className="flex flex-col gap-4 !max-w-xl">
          <h1 className="font-display font-extrabold text-2xl text-center">
            What&apos;s your decade?
          </h1>

          <div className="grid grid-cols-2 gap-3">
            {decades.map((decade, i) => (
              <DecadeCard
                key={decade.id}
                decade={decade}
                href={`/decade/${decade.id}`}
                className={i === decades.length - 1 ? "col-span-2" : ""}
              />
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
