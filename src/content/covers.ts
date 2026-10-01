export const coverKeys = ["id", "olid", "isbn", "oclc", "lccn"] as const;

export type CoverKey = (typeof coverKeys)[number];

/** An Open Library cover. `id` is their cover id. `olid` is an edition id such as OL7440033M. */
export type OpenLibraryCover = {
  key: CoverKey;
  value: string;
};

const sizeLetter = {
  sm: "S",
  md: "M",
  lg: "L",
  tile: "L",
} as const;

export type CoverSize = keyof typeof sizeLetter;

/**
 * https://covers.openlibrary.org/b/$key/$value-$size.jpg
 *
 * Lookups by ISBN, OCLC, and LCCN are limited to 100 requests per address
 * every five minutes. Cover id and OLID are not. `default=false` makes a
 * missing cover a 404, so the page can draw its own jacket instead of a blank.
 */
export function openLibraryCoverUrl(cover: OpenLibraryCover, size: CoverSize): string {
  const key = cover.key.toLowerCase();
  const value = encodeURIComponent(cover.value.trim());
  const letter = sizeLetter[size];
  return `https://covers.openlibrary.org/b/${key}/${value}-${letter}.jpg?default=false`;
}
