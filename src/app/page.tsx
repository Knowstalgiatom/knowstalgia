import { KnowstalgiaLogo } from "@/components/logo";
import { Container } from "@/components/container";
import { DecadePreviewCard } from "@/components/decade-preview-card";
import { decades } from "@/lib/decades";

/**
 * Phase 1 (Foundation) landing placeholder.
 *
 * This proves the design-token system, typography, logo and mobile-first
 * shell all work end to end — it is deliberately NOT the real "What's
 * your decade?" selector from master brief §15, which is Phase 2 (Core
 * UX) work with its own interaction design, transitions and touch-target
 * treatment. Keeping this page honestly minimal so it isn't mistaken for
 * finished product surface.
 */
export default function Home() {
  return (
    <main className="flex-1 flex flex-col">
      <section className="flex-1 flex flex-col items-center justify-center text-center gap-5 py-16">
        <Container className="flex flex-col items-center gap-5">
          <KnowstalgiaLogo size="xl" />
          <p className="font-semibold text-ink-soft max-w-xs">
            The quiz of the future, all about the past.
          </p>
        </Container>
      </section>

      <section className="bg-paper border-t border-line py-10">
        <Container className="flex flex-col gap-4 !max-w-2xl">
          <div className="flex flex-col gap-1">
            <h2 className="font-display font-extrabold text-lg">
              Foundation check — seven decade worlds
            </h2>
            <p className="text-sm text-ink-soft">
              One brand, seven theme personalities. Colours are placeholder
              direction from the brand mock-up until final assets land —
              the decade selector itself is next (Phase 2).
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {decades.map((decade) => (
              <DecadePreviewCard key={decade.id} decade={decade} />
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
