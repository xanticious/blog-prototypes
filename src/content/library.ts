import { getBook, type Book } from "./books";

export type Review = {
  slug: string;
  title: string;
  dek: string;
  bookId: string;
  book: Book;
  published: string;
  spoilers: boolean;
  body: string;
};

export type Guide = {
  slug: string;
  title: string;
  dek: string;
  published: string;
  body: string;
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
  bookId: string;
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

function loadReviews(): Review[] {
  return Object.entries(reviewFiles)
    .map(([file, raw]) => {
      const { data, body } = parseFrontmatter(String(raw), file);
      const front = data as Partial<ReviewFrontmatter>;
      const bookId = requireField(data, "bookId", file);
      const book = getBook(bookId);
      if (!book) throw new Error(`Unknown bookId "${bookId}" in ${file}`);
      const review: Review = {
        slug: front.slug || file,
        title: requireField(data, "title", file),
        dek: requireField(data, "dek", file),
        bookId,
        book,
        published: requireField(data, "published", file),
        spoilers: data.spoilers === "true",
        body,
      };
      return review;
    })
    .sort((a, b) => b.published.localeCompare(a.published));
}

function loadGuides(): Guide[] {
  return Object.entries(guideFiles)
    .map(([file, raw]) => {
      const { data, body } = parseFrontmatter(String(raw), file);
      const guide: Guide = {
        slug: data.slug || file,
        title: requireField(data, "title", file),
        dek: requireField(data, "dek", file),
        published: requireField(data, "published", file),
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

export function readingTime(body: string): string {
  const words = body.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 230));
  return `${minutes} min read`;
}

export function excerpt(body: string, max = 240): string {
  const paragraph = body
    .split(/\n\n+/)
    .map((block) => block.trim())
    .find((block) => block && !block.startsWith("#") && !block.startsWith(">") && !block.startsWith(":::"));
  if (!paragraph) return "";
  const clean = paragraph.replace(/[*_]/g, "");
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max).replace(/\s+\S*$/, "")}…`;
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
