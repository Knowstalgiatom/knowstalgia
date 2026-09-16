/**
 * The seven decade "worlds" of KNOWstalgia.
 *
 * This is the canonical data model for a decade — one master brand,
 * seven swappable theme personalities (master brief §6, §36-38).
 *
 * Colour values below are PLACEHOLDERS lifted from the ChatGPT brand
 * mock-up (`6EEF344E-…png`) that lives in the project. They are direction,
 * not final art — brand-foundations.md is explicit that a designer is
 * producing final logo + colour assets, and this file is designed to have
 * those values swapped in later without touching any component that
 * consumes them (everything reads through CSS custom properties, see
 * globals.css).
 *
 * `host` is carried as optional metadata per master brief §28 — the AI
 * decade host concept is not built in beta, but the name is worth keeping
 * attached to the decade record now rather than bolting it on later.
 */

export type DecadeId = "60s" | "70s" | "80s" | "90s" | "00s" | "10s" | "20s";

export interface DecadeTheme {
  /** Primary brand colour for this decade — buttons, key accents. */
  primary: string;
  /** Secondary colour — supporting accents, gradients. */
  secondary: string;
  /** Tertiary/highlight colour — small details, progress, sparkle. */
  accent: string;
  /** Light tint used as a soft background/card colour within the theme. */
  tint: string;
  /** Deep/rich background colour for full-bleed decade-themed screens. */
  deep: string;
  /** Text colour to use on top of `deep`. */
  onDeep: string;
}

export interface Decade {
  id: DecadeId;
  /** Short label used in UI, e.g. "90s" */
  label: string;
  /** Full name, e.g. "1990s" */
  name: string;
  /** Three-word atmosphere descriptor from the brand sheet. */
  descriptors: [string, string, string];
  theme: DecadeTheme;
  /** Optional future AI decade host metadata (master brief §28). Not used in beta. */
  host?: string;
}

export const decades: Decade[] = [
  {
    id: "60s",
    label: "60s",
    name: "1960s",
    descriptors: ["Freer", "Brighter", "Bolder"],
    theme: {
      primary: "#E24B3B",
      secondary: "#F2803D",
      accent: "#F6C744",
      tint: "#FBE9D6",
      deep: "#C23A2C",
      onDeep: "#FBF3E4",
    },
    host: "Groovy Grace",
  },
  {
    id: "70s",
    label: "70s",
    name: "1970s",
    descriptors: ["Bigger", "Bolder", "Warmer"],
    theme: {
      primary: "#C2601F",
      secondary: "#8A431F",
      accent: "#D9A441",
      tint: "#F0E4CE",
      deep: "#4A2416",
      onDeep: "#F2E8D5",
    },
    host: "Disco Gloria",
  },
  {
    id: "80s",
    label: "80s",
    name: "1980s",
    descriptors: ["Louder", "Brighter", "Braver"],
    theme: {
      primary: "#E23E8C",
      secondary: "#8B3FD1",
      accent: "#2BD8D8",
      tint: "#DFF7F7",
      deep: "#1B1140",
      onDeep: "#F2ECFF",
    },
    host: "Neon Nick",
  },
  {
    id: "90s",
    label: "90s",
    name: "1990s",
    descriptors: ["Cooler", "Smarter", "Bigger"],
    theme: {
      primary: "#1E9C74",
      secondary: "#0B6E52",
      accent: "#6FD9A8",
      tint: "#E4F1DF",
      deep: "#0B4A3A",
      onDeep: "#EAF7EE",
    },
    host: "Cassie Green",
  },
  {
    id: "00s",
    label: "00s",
    name: "2000s",
    descriptors: ["Newer", "Digital", "Connected"],
    theme: {
      primary: "#2A63D9",
      secondary: "#13275E",
      accent: "#6FB3EF",
      tint: "#E6EEF9",
      deep: "#0D1B45",
      onDeep: "#EAF1FC",
    },
    host: "Myspace Max",
  },
  {
    id: "10s",
    label: "10s",
    name: "2010s",
    descriptors: ["Faster", "Smarter", "Brighter"],
    theme: {
      primary: "#F5B518",
      secondary: "#EF8A1E",
      accent: "#F5A96B",
      tint: "#FBF0DC",
      deep: "#8A4E10",
      onDeep: "#FEF7E8",
    },
    host: "Viral Vicky",
  },
  {
    id: "20s",
    label: "20s",
    name: "2020s",
    descriptors: ["Braver", "Kinder", "Brighter"],
    theme: {
      primary: "#D6395C",
      secondary: "#6E1530",
      accent: "#F2A8C6",
      tint: "#F9E3EC",
      deep: "#4A0E22",
      onDeep: "#FBE9F0",
    },
    host: "Flex Finn",
  },
];

export function getDecade(id: DecadeId): Decade {
  const decade = decades.find((d) => d.id === id);
  if (!decade) throw new Error(`Unknown decade: ${id}`);
  return decade;
}
