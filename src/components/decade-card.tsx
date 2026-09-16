import Link from "next/link";
import type { Decade } from "@/lib/decades";

/**
 * The decade selector tile — shared component per master brief §38.
 * Large, thumb-friendly, self-themed via its own [data-decade] scope so
 * it can sit on the (undecorated) master-brand homepage and still show
 * its decade's personality. Renders as a link when `href` is given,
 * otherwise as a static card (used for e.g. future summary displays).
 */
export function DecadeCard({
  decade,
  href,
  className = "",
}: {
  decade: Decade;
  href?: string;
  className?: string;
}) {
  const { theme } = decade;

  const content = (
    <div
      data-decade={decade.id}
      className={`group rounded-md overflow-hidden shadow-card border border-line transition-transform ${
        href ? "active:scale-[0.97] active:shadow-pop" : ""
      } ${className}`}
    >
      <div
        className="p-4 flex flex-col gap-4 min-h-32"
        style={{
          background: `linear-gradient(155deg, ${theme.deep}, ${theme.secondary})`,
          color: theme.onDeep,
        }}
      >
        <div className="flex items-start justify-between">
          <span className="font-display font-extrabold text-3xl leading-none">
            {decade.label}
          </span>
          {href && (
            <span
              aria-hidden="true"
              className="text-lg leading-none opacity-70 transition-transform group-active:translate-x-0.5"
            >
              →
            </span>
          )}
        </div>
        <div className="flex gap-1.5">
          {[theme.primary, theme.secondary, theme.accent, theme.tint].map(
            (swatch, i) => (
              <span
                key={i}
                aria-hidden="true"
                className="h-4 w-4 rounded-full border border-black/10"
                style={{ background: swatch }}
              />
            ),
          )}
        </div>
      </div>
    </div>
  );

  if (!href) return content;

  return (
    <Link
      href={href}
      className="block rounded-md focus-visible:outline-none"
      aria-label={`Play a ${decade.name} quiz`}
    >
      {content}
    </Link>
  );
}
