export type Book = {
  id: string;
  title: string;
  authors: string[];
  year: string;
  genres: string[];
};

export const books: Book[] = [
  {
    id: "pride-and-prejudice",
    title: "Pride and Prejudice",
    authors: ["Jane Austen"],
    year: "1813",
    genres: ["romance"],
  },
  {
    id: "frankenstein",
    title: "Frankenstein",
    authors: ["Mary Shelley"],
    year: "1818",
    genres: ["sci-fi", "gothic"],
  },
  {
    id: "jane-eyre",
    title: "Jane Eyre",
    authors: ["Charlotte Brontë"],
    year: "1847",
    genres: ["romance", "romantasy"],
  },
  {
    id: "wuthering-heights",
    title: "Wuthering Heights",
    authors: ["Emily Brontë"],
    year: "1847",
    genres: ["romance", "gothic"],
  },
  {
    id: "dracula",
    title: "Dracula",
    authors: ["Bram Stoker"],
    year: "1897",
    genres: ["fantasy", "gothic"],
  },
  {
    id: "dorian-gray",
    title: "The Picture of Dorian Gray",
    authors: ["Oscar Wilde"],
    year: "1890",
    genres: ["gothic"],
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
