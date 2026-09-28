import {
  excerpt,
  formatDate,
  getGuide,
  getReview,
  readingTime,
  type Guide,
  type Review,
} from "../content/library";
import { routeToHash } from "../machine/routes";
import { layoutLabels, moodLabels, type Prototype } from "../prototypes/catalog";
import { BookCover } from "./BookCover";
import { MarkdownBody } from "./MarkdownBody";
import { NavLink } from "./NavLink";
import { GuidePiece, ReviewPiece } from "./PieceLink";

function Missing({
  prototype,
  heading,
  label,
  view,
}: {
  prototype: Prototype;
  heading: string;
  label: string;
  view: { kind: "reviews" } | { kind: "guides" };
}) {
  return (
    <div className="missing">
      <h1>{heading}</h1>
      <p>The link may be old, or the piece has not been added to the shelf yet.</p>
      <NavLink
        href={routeToHash({ name: "prototype", prototypeId: prototype.id, view })}
        event={{ type: "OPEN_VIEW", view }}
      >
        {label}
      </NavLink>
    </div>
  );
}

export function HomeView({
  prototype,
  reviews,
  guides,
}: {
  prototype: Prototype;
  reviews: Review[];
  guides: Guide[];
}) {
  const featured = reviews[0];
  return (
    <div className="home">
      <header className="home-intro">
        <p className="eyebrow">{prototype.name}</p>
        <h1>{prototype.tagline}</h1>
        <p className="lede">{prototype.description}</p>
      </header>
      {featured ? (
        <article className="featured">
          <BookCover
            bookId={featured.bookId}
            title={featured.book.title}
            author={featured.book.author}
            size="lg"
          />
          <div className="featured-copy">
            <p className="kicker">Featured review · {featured.book.title}</p>
            <h2>
              <NavLink
                href={routeToHash({
                  name: "prototype",
                  prototypeId: prototype.id,
                  view: { kind: "review", slug: featured.slug },
                })}
                event={{ type: "OPEN_VIEW", view: { kind: "review", slug: featured.slug } }}
              >
                {featured.title}
              </NavLink>
            </h2>
            <p className="dek">{featured.dek}</p>
            <p className="excerpt">{excerpt(featured.body, 320)}</p>
            <p className="byline">
              {featured.book.author} · {featured.book.year} · {readingTime(featured.body)}
            </p>
          </div>
        </article>
      ) : null}
      <section className="shelf" aria-labelledby="shelf-heading">
        <h2 id="shelf-heading" className="section-label">
          On the shelf
        </h2>
        <ul className="piece-list">
          {reviews.map((review, index) => (
            <li key={review.slug}>
              <ReviewPiece prototype={prototype} review={review} index={index} />
            </li>
          ))}
        </ul>
      </section>
      <section className="guide-row" aria-labelledby="guide-heading">
        <h2 id="guide-heading" className="section-label">
          Reading guides
        </h2>
        <ul className="guide-list">
          {guides.map((guide) => (
            <li key={guide.slug}>
              <GuidePiece prototype={prototype} guide={guide} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export function ReviewsView({ prototype, reviews }: { prototype: Prototype; reviews: Review[] }) {
  return (
    <div className="section-page">
      <header className="page-intro">
        <p className="eyebrow">Reviews</p>
        <h1>Essays on the books.</h1>
        <p className="lede">
          Twelve long reviews of books old enough to belong to everyone. The words stay the same in every
          prototype; only the room changes.
        </p>
      </header>
      <ul className="piece-list">
        {reviews.map((review, index) => (
          <li key={review.slug}>
            <ReviewPiece prototype={prototype} review={review} index={index} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ReviewView({ prototype, slug }: { prototype: Prototype; slug: string }) {
  const review = getReview(slug);
  if (!review) {
    return (
      <Missing prototype={prototype} heading="That review is not on the shelf." label="All reviews" view={{ kind: "reviews" }} />
    );
  }
  return (
    <article className="essay">
      <div className="essay-top">
        <BookCover bookId={review.bookId} title={review.book.title} author={review.book.author} size="md" />
        <div>
          <p className="kicker">{review.book.genre}</p>
          <h1>{review.title}</h1>
          <p className="dek">{review.dek}</p>
          <p className="byline">
            On {review.book.title} by {review.book.author} · {review.book.year}
            <span> · {formatDate(review.published)} · {readingTime(review.body)}</span>
          </p>
        </div>
      </div>
      <aside className="book-facts">
        <p className="rail-label">In the margin</p>
        <dl>
          <div>
            <dt>Book</dt>
            <dd>{review.book.title}</dd>
          </div>
          <div>
            <dt>Author</dt>
            <dd>{review.book.author}</dd>
          </div>
          <div>
            <dt>Published</dt>
            <dd>{review.book.year}</dd>
          </div>
          <div>
            <dt>Kind</dt>
            <dd>{review.book.genre}</dd>
          </div>
        </dl>
      </aside>
      <MarkdownBody body={review.body} />
      <p className="essay-foot">
        <NavLink
          href={routeToHash({ name: "prototype", prototypeId: prototype.id, view: { kind: "reviews" } })}
          event={{ type: "OPEN_VIEW", view: { kind: "reviews" } }}
        >
          More reviews
        </NavLink>
      </p>
    </article>
  );
}

export function GuidesView({ prototype, guides }: { prototype: Prototype; guides: Guide[] }) {
  return (
    <div className="section-page">
      <header className="page-intro">
        <p className="eyebrow">Reading guides</p>
        <h1>How to stay with a book.</h1>
        <p className="lede">
          Short tutorials for the part of a book blog that is not a review: taking notes, rereading a page,
          and talking with other people.
        </p>
      </header>
      <ul className="guide-list">
        {guides.map((guide) => (
          <li key={guide.slug}>
            <GuidePiece prototype={prototype} guide={guide} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function GuideView({ prototype, slug }: { prototype: Prototype; slug: string }) {
  const guide = getGuide(slug);
  if (!guide) {
    return (
      <Missing prototype={prototype} heading="That guide is not on the shelf." label="All guides" view={{ kind: "guides" }} />
    );
  }
  return (
    <article className="essay">
      <div className="essay-top essay-top-plain">
        <div>
          <p className="kicker">Reading guide</p>
          <h1>{guide.title}</h1>
          <p className="dek">{guide.dek}</p>
          <p className="byline">
            {formatDate(guide.published)} · {readingTime(guide.body)}
          </p>
        </div>
      </div>
      <MarkdownBody body={guide.body} />
      <p className="essay-foot">
        <NavLink
          href={routeToHash({ name: "prototype", prototypeId: prototype.id, view: { kind: "guides" } })}
          event={{ type: "OPEN_VIEW", view: { kind: "guides" } }}
        >
          More guides
        </NavLink>
      </p>
    </article>
  );
}

export function AboutView({ prototype }: { prototype: Prototype }) {
  return (
    <article className="essay about-essay">
      <div className="essay-top essay-top-plain">
        <div>
          <p className="eyebrow">About this design</p>
          <h1>{prototype.name}</h1>
          <p className="dek">{prototype.tagline}</p>
        </div>
      </div>
      <div className="about-facts">
        <p>
          <span>Mood</span>
          {moodLabels[prototype.mood]}
        </p>
        <p>
          <span>Layout</span>
          {layoutLabels[prototype.layout]}
        </p>
        <p>
          <span>Type</span>
          {prototype.fontLabel}
        </p>
      </div>
      <div className="swatch-row" aria-hidden="true">
        {Object.entries(prototype.palette).map(([name, color]) => (
          <span key={name} style={{ background: color }} title={`${name} ${color}`} />
        ))}
      </div>
      <div className="prose">
        <p>{prototype.about}</p>
        <p>{prototype.description}</p>
        <p>
          The essays and guides are shared sample content, written so the prototypes can be compared fairly.
          A finished blog would keep one of these designs, or mix pieces of several, and then replace the
          sample shelf with your own reading.
        </p>
      </div>
    </article>
  );
}
