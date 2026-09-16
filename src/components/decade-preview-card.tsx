import type { Decade } from "@/lib/decades";

/**
 * Foundation-phase preview of a decade's theme — proves the token system
 * and shows every colourway side by side. This is NOT the Phase 2 decade
 * selector (that gets its own interaction design, touch targets, and
 * transition treatment). Deliberately plain.
 */
export function DecadePreviewCard({ decade }: { decade: Decade }) {
  const { theme } = decade;

  return (
    <div
      data-decade={decade.id}
      className="rounded-lg overflow-hidden shadow-card border border-line"
    >
      <div
        className="p-4 flex flex-col gap-3"
        style={{
          background: `linear-gradient(160deg, ${theme.deep}, ${theme.secondary})`,
          color: theme.onDeep,
        }}
      >
        <div className="flex items-baseline justify-between">
          <span className="font-display font-extrabold text-2xl">
            {decade.label}
          </span>
          <span className="text-xs font-semibold opacity-80">
            {decade.name}
          </span>
        </div>
        <div className="flex gap-1.5">
          {[theme.primary, theme.secondary, theme.accent, theme.tint].map(
            (swatch, i) => (
              <span
                key={i}
                className="h-6 w-6 rounded-full border border-black/10"
                style={{ background: swatch }}
              />
            ),
          )}
        </div>
      </div>
      <div className="bg-paper px-4 py-2.5 text-xs font-semibold text-ink-soft tracking-wide">
        {decade.descriptors.join(" · ").toUpperCase()}
      </div>
    </div>
  );
}
