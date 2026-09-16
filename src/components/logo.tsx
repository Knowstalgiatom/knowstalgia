/**
 * KNOWstalgia wordmark.
 *
 * PLACEHOLDER — a coded approximation of the locked logo spec (master
 * brief §5), not the final artwork. Swap for the designer's SVG the
 * moment it lands; every place this component is used should keep
 * working unchanged since the props (variant/size) describe intent,
 * not pixels.
 *
 * Locked spec this follows:
 *  - "K" stands clean, on its own — no question mark built into it.
 *  - The rest of the word is lowercase: "nowstal".
 *  - The question mark replaces the lowercase "g" in "-gia", sitting
 *    low in descender territory, integrated into the type rather than
 *    read as inserted punctuation.
 *  - "ia" closes the word.
 *  - Whatever the visual treatment, it must still be coded/read as the
 *    single word "KNOWstalgia" — handled here via an accessible name on
 *    the wrapper with the decorative letterforms hidden from AT.
 */

// Fluid, viewport-relative sizing (rather than fixed breakpoint classes)
// so the wordmark scales smoothly and never overflows on narrow phones —
// "Knowstal?ia" is long enough that a fixed text-7xl clips on anything
// under ~430px wide.
const sizeStyles = {
  sm: "clamp(1.25rem, 5vw, 1.5rem)",
  md: "clamp(1.75rem, 7vw, 2.25rem)",
  lg: "clamp(2.25rem, 9vw, 3.5rem)",
  xl: "clamp(2.5rem, 11vw, 5.5rem)",
} as const;

interface LogoProps {
  /** primary = ink wordmark for light surfaces, reverse = cream wordmark for dark/decade surfaces */
  variant?: "primary" | "reverse";
  size?: keyof typeof sizeStyles;
  className?: string;
}

export function KnowstalgiaLogo({
  variant = "primary",
  size = "md",
  className = "",
}: LogoProps) {
  const color = variant === "reverse" ? "text-cream" : "text-ink";

  return (
    <span
      aria-label="KNOWstalgia"
      role="img"
      className={`inline-flex items-baseline font-display font-extrabold leading-none tracking-tight max-w-full ${color} ${className}`}
      style={{ fontSize: sizeStyles[size] }}
    >
      <span aria-hidden="true">K</span>
      <span aria-hidden="true">nowstal</span>
      <span
        aria-hidden="true"
        className="inline-block"
        style={{
          transform: "translateY(0.22em)",
          fontSize: "0.82em",
          marginInline: "-0.02em",
        }}
      >
        ?
      </span>
      <span aria-hidden="true">ia</span>
    </span>
  );
}
