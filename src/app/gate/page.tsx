import { KnowstalgiaLogo } from "@/components/logo";
import { Container } from "@/components/container";
import { submitPasscode } from "./actions";

export const metadata = {
  title: "KNOWstalgia — beta access",
};

export default async function GatePage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string; error?: string }>;
}) {
  const { from = "/", error } = await searchParams;

  return (
    <main className="flex-1 flex items-center justify-center py-16">
      <Container className="flex flex-col items-center text-center gap-8">
        <KnowstalgiaLogo size="lg" />

        <div className="flex flex-col gap-2">
          <h1 className="font-display font-extrabold text-xl">
            Private beta
          </h1>
          <p className="text-ink-soft text-sm max-w-xs">
            KNOWstalgia isn&apos;t public yet. Got a passcode from Tom? Pop
            it in below.
          </p>
        </div>

        <form
          action={submitPasscode}
          className="w-full flex flex-col gap-3 max-w-xs"
        >
          <input type="hidden" name="from" value={from} />
          <input
            type="password"
            name="passcode"
            placeholder="Passcode"
            autoFocus
            autoComplete="off"
            className="w-full rounded-md border border-line bg-paper px-4 py-3 text-center text-lg tracking-widest text-ink placeholder:text-ink-soft/60 placeholder:tracking-normal focus:outline-none focus-visible:outline-3 focus-visible:outline-ink"
          />
          {error && (
            <p role="alert" className="text-sm font-medium text-incorrect">
              That passcode didn&apos;t work — try again.
            </p>
          )}
          <button
            type="submit"
            className="w-full rounded-md bg-ink text-cream font-semibold py-3 shadow-pop active:translate-y-0.5 active:shadow-none transition"
          >
            Enter
          </button>
        </form>
      </Container>
    </main>
  );
}
