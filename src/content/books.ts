import { coverKeys, type OpenLibraryCover } from "./covers";

export type Book = {
  id: string;
  title: string;
  authors: string[];
  year: string;
  genres: string[];
  /** Open Library cover. Prefer `id` or `olid`; ISBN, OCLC, and LCCN are rate-limited. */
  cover?: OpenLibraryCover;
};

export const books: Book[] = [
  {
    id: "pride-and-prejudice",
    title: "Pride and Prejudice",
    authors: ["Jane Austen"],
    year: "1813",
    genres: ["romance"],
    cover: { key: "id", value: "12645114" }, // Penguin Classics, ISBN 9780141439518
  },
  {
    id: "frankenstein",
    title: "Frankenstein",
    authors: ["Mary Shelley"],
    year: "1818",
    genres: ["sci-fi", "gothic"],
    cover: { key: "id", value: "109033" }, // Penguin Classics, ISBN 9780141439471
  },
  {
    id: "jane-eyre",
    title: "Jane Eyre",
    authors: ["Charlotte Brontë"],
    year: "1847",
    genres: ["romance", "romantasy"],
    cover: { key: "id", value: "109090" }, // Penguin Classics, ISBN 9780141441146
  },
  {
    id: "wuthering-heights",
    title: "Wuthering Heights",
    authors: ["Emily Brontë"],
    year: "1847",
    genres: ["romance", "gothic"],
    cover: { key: "id", value: "109038" }, // Penguin Classics, ISBN 9780141439556
  },
  {
    id: "dracula",
    title: "Dracula",
    authors: ["Bram Stoker"],
    year: "1897",
    genres: ["fantasy", "gothic"],
    cover: { key: "id", value: "12216503" }, // Open Library edition OL35373336M
  },
  {
    id: "dorian-gray",
    title: "The Picture of Dorian Gray",
    authors: ["Oscar Wilde"],
    year: "1890",
    genres: ["gothic"],
    cover: { key: "id", value: "15259210" }, // Penguin Classics, ISBN 9780141439570
  },
];

const seenIds = new Set<string>();
for (const book of books) {
  if (seenIds.has(book.id)) throw new Error(`Duplicate book id "${book.id}"`);
  seenIds.add(book.id);
  if (book.authors.length === 0 || book.authors.some((name) => !name.trim())) {
    throw new Error(`Book "${book.id}" needs at least one author`);
  }
  if (book.genres.length === 0 || book.genres.some((genre) => !genre.trim())) {
    throw new Error(`Book "${book.id}" needs at least one genre`);
  }
  if (book.cover && (!coverKeys.includes(book.cover.key) || !book.cover.value.trim())) {
    throw new Error(`Book "${book.id}" needs an Open Library cover key and value`);
  }
}

const byId = new Map(books.map((book) => [book.id, book]));

export function getBook(id: string): Book | undefined {
  return byId.get(id);
}

function uniqueNames(groups: string[][]): string[] {
  const seen = new Set<string>();
  const names: string[] = [];
  for (const group of groups) {
    for (const name of group) {
      const trimmed = name.trim();
      if (!trimmed || seen.has(trimmed)) continue;
      seen.add(trimmed);
      names.push(trimmed);
    }
  }
  return names;
}

export function authorsOf(booksInPiece: Book[]): string[] {
  return uniqueNames(booksInPiece.map((book) => book.authors));
}

export function genresOf(booksInPiece: Book[]): string[] {
  return uniqueNames(booksInPiece.map((book) => book.genres));
}

export function yearsOf(booksInPiece: Book[]): string[] {
  return uniqueNames(booksInPiece.map((book) => [book.year]));
}
