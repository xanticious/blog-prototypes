import { coverKeys, type OpenLibraryCover } from "./covers";

export type Book = {
  id: string;
  title: string;
  authors: string[];
  year: string;
  genres: string[];
  /** Short original description shown beside the cover. */
  blurb: string;
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
    blurb:
      "Elizabeth Bennet has four sisters, a mother who treats every visit as a proposal, and a sharp opinion of a man she has met once. The neighborhood’s business is marriage: who has the fortune, who has the manners, and who will still be welcome if she chooses wrong. Elizabeth turns down the practical match and misjudges the proud one. The pleasure of the book is watching her revise the sentence she was so sure of, without becoming anyone quieter than she was.",
    cover: { key: "id", value: "12645114" }, // Penguin Classics, ISBN 9780141439518
  },
  {
    id: "frankenstein",
    title: "Frankenstein",
    authors: ["Mary Shelley"],
    year: "1818",
    genres: ["sci-fi", "gothic"],
    blurb:
      "A student in Ingolstadt builds a person out of parts and then will not look at what he made. The creature learns speech, kindness, and how completely he has been refused, and he asks for a companion the maker will not give him. What follows is a chase across ice, told by a man who still thinks the story is about his own genius. The horror is the abandonment as much as the assembly.",
    cover: { key: "id", value: "109033" }, // Penguin Classics, ISBN 9780141439471
  },
  {
    id: "jane-eyre",
    title: "Jane Eyre",
    authors: ["Charlotte Brontë"],
    year: "1847",
    genres: ["romance", "romantasy"],
    blurb:
      "An orphan who will not perform gratitude grows up, takes a post in a house with a locked room, and leaves when the terms of love turn out to be a lie. Thornfield has the brooding master, the uncanny laugh, and the fire, but the book belongs to Jane’s voice: precise, angry, and unwilling to be rescued into someone else’s story. She comes back only when she can choose the return.",
    cover: { key: "id", value: "109090" }, // Penguin Classics, ISBN 9780141441146
  },
  {
    id: "wuthering-heights",
    title: "Wuthering Heights",
    authors: ["Emily Brontë"],
    year: "1847",
    genres: ["romance", "gothic"],
    blurb:
      "Two children on a Yorkshire moor make a bond the houses around them cannot hold, and then the book refuses to let them tell it alone. Neighbors, servants, and the next generation all get a turn at the story, and none of them agree. The weather stays in the rooms. The second half belongs to the people who inherit the damage and have to decide whether the house is finished with them.",
    cover: { key: "id", value: "109038" }, // Penguin Classics, ISBN 9780141439556
  },
  {
    id: "dracula",
    title: "Dracula",
    authors: ["Bram Stoker"],
    year: "1897",
    genres: ["fantasy", "gothic"],
    blurb:
      "A young solicitor travels to a castle in the Carpathians and keeps a diary of a count who is preparing a move to England. The rest of the novel is letters, ship logs, and newspaper cuttings: a small group trying to name a hunger that has already crossed the sea. The fright is in the paperwork as much as in the teeth. Everyone writes it down because speaking it would sound impossible.",
    cover: { key: "id", value: "12216503" }, // Open Library edition OL35373336M
  },
  {
    id: "dorian-gray",
    title: "The Picture of Dorian Gray",
    authors: ["Oscar Wilde"],
    year: "1890",
    genres: ["gothic"],
    blurb:
      "A beautiful young man wishes that a portrait would age in his place, and the painting takes him at his word. He spends the years collecting sensations while the picture in the locked room keeps the accounts: cruelty, boredom, and the friends he uses up. The wit is bright and the moral is not subtle. The interesting question is how long a person can look like the first chapter.",
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
  if (!book.blurb.trim()) {
    throw new Error(`Book "${book.id}" needs a blurb`);
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
