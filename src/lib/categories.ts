/**
 * The seven canonical quiz categories, in their fixed order (master brief
 * §9). Every KNOWstalgia quiz — whatever the decade — runs through this
 * same sequence. Categories are decade-agnostic; only the questions
 * inside them change per decade/quiz (content backend, Phase 5).
 */

export interface Category {
  id: string;
  label: string;
  /** One line describing what this category draws on, shown in the lobby. */
  blurb: string;
}

export const categories: Category[] = [
  { id: "sport", label: "Sport", blurb: "Moments, kits, celebrations, commentary" },
  { id: "music", label: "Music", blurb: "Artists, songs, gigs, formats, fashion" },
  { id: "tv-film", label: "TV & Film", blurb: "Shows, characters, catchphrases, Saturday nights" },
  { id: "food-drink", label: "Food & Drink", blurb: "Sweets, snacks, adverts, discontinued favourites" },
  { id: "pop-culture", label: "Pop Culture", blurb: "Toys, trends, playground crazes, tech" },
  { id: "games-jokes-quotes-logos", label: "Games, Jokes, Quotes & Logos", blurb: "Finish-the-line, slogans, logos, playground games" },
  { id: "knowstalgia-trip", label: "KNOWstalgia Trip", blurb: "The signature final trip back" },
];
