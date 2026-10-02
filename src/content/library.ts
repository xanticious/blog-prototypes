import { authorsOf, genresOf, getBook, yearsOf, type Book } from "./books";

export { authorsOf, genresOf, yearsOf };

export type Review = {
  slug: string;
  title: string;
  dek: string;
  books: Book[];
  published: string;
  spoilers: boolean;
  tags: string[];
  body: string;
};

export type GuideBook = {
  title: string;
  author: string;
  year: string;
};

export type Guide = {
  slug: string;
  title: string;
  dek: string;
  book: GuideBook | null;
  published: string;
  genres: string[];
  tags: string[];
  body: string;
};

export type ShelfBook = {
  title: string;
  year: string;
};

export type ShelfPiece = {
  kind: "review" | "guide";
  slug: string;
  title: string;
  dek: string;
  books: ShelfBook[];
  authors: string[];
  published: string;
  genres: string[];
  tags: string[];
  body: string;
};

export type ShelfKind = ShelfPiece["kind"];

export type ShelfQuery = {
  kind: ShelfKind;
  genre: string;
  author: string;
  tag: string;
  text: string;
};

export type ShelfMatch = {
  piece: ShelfPiece;
  matches: number;
};

export type Poem = {
  slug: string;
  title: string;
  dek: string;
  published: string;
  body: string;
};

type ReviewFrontmatter = {
  slug: string;
  title: string;
  dek: string;
  published: string;
};

const reviewFiles = import.meta.glob("./reviews/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

const guideFiles = import.meta.glob("./guides/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

const poemFiles = import.meta.glob("./poems/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

function parseFrontmatter(raw: string, file: string): { data: Record<string, string>; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) {
    throw new Error(`Missing front matter in ${file}`);
  }
  const data: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    if (!line.trim()) continue;
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    data[key] = value;
  }
  return { data, body: match[2].trim() };
}

function requireField(data: Record<string, string>, key: string, file: string): string {
  const value = data[key];
  if (!value) throw new Error(`Missing "${key}" in ${file}`);
  return value;
}

function parseList(value: string | undefined, file: string, label: string): string[] {
  const items = splitList(value);
  if (items.length === 0) throw new Error(`Add at least one ${label} in ${file}`);
  return items;
}

function splitList(value: string | undefined): string[] {
  return (value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function reviewBooks(data: Record<string, string>, file: string): Book[] {
  const ids: string[] = [];
  const seen = new Set<string>();
  for (const id of [...splitList(data.bookId), ...splitList(data.bookIds)]) {
    if (seen.has(id)) continue;
    seen.add(id);
    ids.push(id);
  }
  if (ids.length === 0) {
    throw new Error(`Add at least one book in "bookId" or "bookIds" in ${file}`);
  }
  return ids.map((id) => {
    const book = getBook(id);
    if (!book) throw new Error(`Unknown book "${id}" in ${file}`);
    return book;
  });
}

function loadReviews(): Review[] {
  return Object.entries(reviewFiles)
    .map(([file, raw]) => {
      const { data, body } = parseFrontmatter(String(raw), file);
      const front = data as Partial<ReviewFrontmatter>;
      const books = reviewBooks(data, file);
      const review: Review = {
        slug: front.slug || file,
        title: requireField(data, "title", file),
        dek: requireField(data, "dek", file),
        books,
        published: requireField(data, "published", file),
        spoilers: data.spoilers === "true",
        tags: parseList(data.tags, file, "tag"),
        body,
      };
      return review;
    })
    .sort((a, b) => b.published.localeCompare(a.published));
}

function guideBook(data: Record<string, string>, file: string): GuideBook | null {
  const title = data.book?.trim() ?? "";
  const author = data.author?.trim() ?? "";
  const year = data.bookPublished?.trim() ?? "";
  if (!title && !author && !year) return null;
  if (!title || !author || !year) {
    throw new Error(
      `Name a book with "book", "author", and "bookPublished" together, or leave all three out, in ${file}`,
    );
  }
  return { title, author, year };
}

function loadGuides(): Guide[] {
  return Object.entries(guideFiles)
    .map(([file, raw]) => {
      const { data, body } = parseFrontmatter(String(raw), file);
      const guide: Guide = {
        slug: data.slug || file,
        title: requireField(data, "title", file),
        dek: requireField(data, "dek", file),
        book: guideBook(data, file),
        published: requireField(data, "published", file),
        genres: parseList(data.genre, file, "genre"),
        tags: parseList(data.tags, file, "tag"),
        body,
      };
      return guide;
    })
    .sort((a, b) => a.published.localeCompare(b.published));
}

function loadPoems(): Poem[] {
  return Object.entries(poemFiles)
    .map(([file, raw]) => {
      const { data, body } = parseFrontmatter(String(raw), file);
      const poem: Poem = {
        slug: data.slug || file,
        title: requireField(data, "title", file),
        dek: requireField(data, "dek", file),
        published: requireField(data, "published", file),
        body,
      };
      return poem;
    })
    .sort((a, b) => a.published.localeCompare(b.published));
}

export const reviews: Review[] = loadReviews();
export const guides: Guide[] = loadGuides();
export const poems: Poem[] = loadPoems();

const reviewsBySlug = new Map(reviews.map((review) => [review.slug, review]));
const guidesBySlug = new Map(guides.map((guide) => [guide.slug, guide]));
const poemsBySlug = new Map(poems.map((poem) => [poem.slug, poem]));

export function getReview(slug: string): Review | undefined {
  return reviewsBySlug.get(slug);
}

export function getGuide(slug: string): Guide | undefined {
  return guidesBySlug.get(slug);
}

export function getPoem(slug: string): Poem | undefined {
  return poemsBySlug.get(slug);
}

export function excerpt(body: string, max = 240): string {
  const paragraph = body
    .split(/\n\n+/)
    .map((block) => block.trim())
    .find((block) => block && !block.startsWith("#") && !block.startsWith(">") && !block.startsWith(":::"));
  if (!paragraph) return "";
  const clean = paragraph.replace(/\|\|[^\n]*?\|\|/g, "spoiler").replace(/[*_]/g, "");
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max).replace(/\s+\S*$/, "")}…`;
}

export function shelfPieces(): ShelfPiece[] {
  const fromReviews: ShelfPiece[] = reviews.map((review) => ({
    kind: "review",
    slug: review.slug,
    title: review.title,
    dek: review.dek,
    books: review.books.map((book) => ({ title: book.title, year: book.year })),
    authors: authorsOf(review.books),
    published: review.published,
    genres: genresOf(review.books),
    tags: review.tags,
    body: review.body,
  }));
  const fromGuides: ShelfPiece[] = guides.map((guide) => ({
    kind: "guide",
    slug: guide.slug,
    title: guide.title,
    dek: guide.dek,
    books: guide.book ? [{ title: guide.book.title, year: guide.book.year }] : [],
    authors: guide.book ? [guide.book.author] : [],
    published: guide.published,
    genres: guide.genres,
    tags: guide.tags,
    body: guide.body,
  }));
  return [...fromReviews, ...fromGuides].sort((a, b) => b.published.localeCompare(a.published));
}

export function formatNames(names: string[]): string {
  return names.join(", ");
}

export function formatGenres(genres: string[]): string {
  return formatNames(genres);
}

function uniqueSorted(values: string[]): string[] {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b));
}

function piecesOfKind(kind?: ShelfKind): ShelfPiece[] {
  const pieces = shelfPieces();
  return kind ? pieces.filter((piece) => piece.kind === kind) : pieces;
}

export function genresOnShelf(kind?: ShelfKind): string[] {
  return uniqueSorted(piecesOfKind(kind).flatMap((piece) => piece.genres));
}

export function authorsOnShelf(kind?: ShelfKind): string[] {
  return uniqueSorted(piecesOfKind(kind).flatMap((piece) => piece.authors));
}

export function tagsOnShelf(kind?: ShelfKind): string[] {
  return uniqueSorted(piecesOfKind(kind).flatMap((piece) => piece.tags));
}

function searchHaystack(piece: ShelfPiece): string {
  return [
    piece.title,
    piece.dek,
    ...piece.books.flatMap((book) => [book.title, book.year]),
    ...piece.authors,
    ...piece.genres,
    ...piece.tags,
    piece.body,
  ]
    .join("\n")
    .toLowerCase();
}

function countOccurrences(haystackText: string, needle: string): number {
  const query = needle.trim().toLowerCase();
  if (!query) return 0;
  let count = 0;
  let index = 0;
  while (index <= haystackText.length) {
    const found = haystackText.indexOf(query, index);
    if (found === -1) break;
    count += 1;
    index = found + query.length;
  }
  return count;
}

export function filterShelf(pieces: ShelfPiece[], query: ShelfQuery): ShelfMatch[] {
  const genre = query.genre.trim();
  const author = query.author.trim();
  const tag = query.tag.trim();
  const text = query.text.trim();

  const matched = pieces.filter((piece) => {
    if (piece.kind !== query.kind) return false;
    if (genre && !piece.genres.includes(genre)) return false;
    if (author && !piece.authors.includes(author)) return false;
    if (tag && !piece.tags.includes(tag)) return false;
    return true;
  });

  const ranked = matched.map((piece) => ({
    piece,
    matches: text ? countOccurrences(searchHaystack(piece), text) : 0,
  }));
  const visible = text ? ranked.filter((item) => item.matches > 0) : ranked;

  visible.sort((a, b) => {
    if (text && b.matches !== a.matches) return b.matches - a.matches;
    return b.piece.published.localeCompare(a.piece.published);
  });

  return visible;
}

export function formatDate(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  if (!year || !month || !day) return iso;
  return new Date(Date.UTC(year, month - 1, day)).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}
