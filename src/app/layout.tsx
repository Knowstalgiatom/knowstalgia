import type { Metadata, Viewport } from "next";
import "@fontsource-variable/bricolage-grotesque/wght.css";
import "@fontsource/plus-jakarta-sans/400.css";
import "@fontsource/plus-jakarta-sans/500.css";
import "@fontsource/plus-jakarta-sans/600.css";
import "@fontsource/plus-jakarta-sans/700.css";
import "./globals.css";

/**
 * Typography — placeholder pairing until the designer delivers the
 * locked wordmark treatment (Gibson Heavy / Grappa Two Variable Black,
 * per master brief §5). Self-hosted via @fontsource (npm packages, not
 * a Google Fonts CDN fetch) so builds don't depend on reaching
 * fonts.googleapis.com — swap out cleanly later, nothing downstream
 * cares which font sits behind --font-display / --font-sans.
 *
 * Bricolage Grotesque — heavy, slightly quirky display face for the
 * wordmark and big moments (retro-futurist rather than plain retro).
 * Plus Jakarta Sans — warm, highly legible UI face for everything a
 * player actually has to read at speed.
 */

export const metadata: Metadata = {
  title: "KNOWstalgia — the quiz of the future, all about the past",
  description:
    "Choose the decade you love. Test how well you remember it. Seven questions, one score, endless bragging rights.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: "#f6f1e4",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-cream text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
