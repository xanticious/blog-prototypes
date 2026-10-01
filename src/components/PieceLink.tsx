import type { Book } from "../content/books";
import type { Guide, Poem, Review } from "../content/library";
import { authorsOf, formatDate, formatGenres, formatNames, yearsOf } from "../content/library";
import type { View } from "../machine/routes";
import { routeToHash } from "../machine/routes";
import type { Prototype } from "../prototypes/catalog";
import { BookCover } from "./BookCover";
import { NavLink } from "./NavLink";

export function ReviewCovers({
  books,
  size,
  groupClass,
}: {
  books: Book[];
  size: "sm" | "md" | "lg" | "tile";
  groupClass: string;
}) {
  const covers = books.map((book) => (
    <BookCover
      key={book.id}
      bookId={book.id}
      title={book.title}
      author={formatNames(book.authors)}
      size={size}
    />
  ));
  if (books.length < 2) return covers[0] ?? null;
  return <span className={groupClass}>{covers}</span>;
}

export function reviewView(slug: string): View {
  return { kind: "review", slug };
}

export function guideView(slug: string): View {
  return { kind: "guide", slug };
}

export function poemView(slug: string): View {
  return { kind: "poem", slug };
}

export function ReviewPiece({
  prototype,
  review,
  index,
}: {
  prototype: Prototype;
  review: Review;
  index: number;
}) {
  const view = reviewView(review.slug);
  const tile = prototype.layout === "tiles";
  return (
    <NavLink
      className="piece"
      href={routeToHash({ name: "prototype", prototypeId: prototype.id, view })}
      event={{ type: "OPEN_VIEW", view }}
    >
      <ReviewCovers books={review.books} size={tile ? "tile" : "sm"} groupClass="piece-covers" />
      <span className="piece-num">{String(index + 1).padStart(2, "0")}</span>
      <span className="piece-copy">
        <span className="kicker">
          {formatNames(authorsOf(review.books))} · {formatNames(yearsOf(review.books))}
        </span>
        <span className="piece-title">{review.title}</span>
        <span className="piece-meta">{formatDate(review.published)}</span>
      </span>
    </NavLink>
  );
}

export function PoemPiece({
  prototype,
  poem,
  index,
}: {
  prototype: Prototype;
  poem: Poem;
  index: number;
}) {
  const view = poemView(poem.slug);
  const tile = prototype.layout === "tiles";
  return (
    <NavLink
      className="piece"
      href={routeToHash({ name: "prototype", prototypeId: prototype.id, view })}
      event={{ type: "OPEN_VIEW", view }}
    >
      <BookCover bookId="margin-light" title={poem.title} author="A poem" size={tile ? "tile" : "sm"} />
      <span className="piece-num">{String(index + 1).padStart(2, "0")}</span>
      <span className="piece-copy">
        <span className="kicker">Poem</span>
        <span className="piece-title">{poem.title}</span>
        <span className="piece-dek">{poem.dek}</span>
        <span className="piece-meta">{formatDate(poem.published)}</span>
      </span>
    </NavLink>
  );
}

export function GuidePiece({ prototype, guide }: { prototype: Prototype; guide: Guide }) {
  const view = guideView(guide.slug);
  return (
    <NavLink
      className="guide-piece"
      href={routeToHash({ name: "prototype", prototypeId: prototype.id, view })}
      event={{ type: "OPEN_VIEW", view }}
    >
      <span className="kicker">{formatGenres(guide.genres)}</span>
      <span className="piece-title">{guide.title}</span>
      <span className="piece-dek">{guide.dek}</span>
      <span className="piece-meta">
        {guide.book} · {guide.author}
      </span>
      <span className="piece-meta">
        <time dateTime={guide.published}>{formatDate(guide.published)}</time>
        {" · "}
        {guide.tags.join(" · ")}
      </span>
    </NavLink>
  );
}
