import {
  excerpt,
  formatDate,
  getGuide,
  getPoem,
  getReview,
  guides,
  poems,
  reviews,
  type Guide,
  type Review,
} from "../content/library";
import { routeToHash, type View } from "../machine/routes";
import { layoutLabels, moodLabels, shellLabels, type Prototype } from "../prototypes/catalog";
import { BookCover } from "./BookCover";
import { MarkdownBody } from "./MarkdownBody";
import { NavLink } from "./NavLink";
import { GuidePiece, PoemPiece, ReviewPiece } from "./PieceLink";

function Missing({
  prototype,
  heading,
  label,
  view,
}: {
  prototype: Prototype;
  heading: string;
  label: string;
  view: View;
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
  reviews: shelfReviews,
  guides,
}: {
  prototype: Prototype;
  reviews: Review[];
  guides: Guide[];
}) {
  const featured = shelfReviews[0];
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
            <p className="excerpt">{excerpt(featured.body, 320)}</p>
            <p className="byline">
              {featured.book.author} · {featured.book.year}
            </p>
          </div>
        </article>
      ) : null}
      <section className="shelf" aria-labelledby="shelf-heading">
        <h2 id="shelf-heading" className="section-label">
          On the shelf
        </h2>
        <ul className="piece-list">
          {shelfReviews.map((review, index) => (
            <li key={review.slug}>
              <ReviewPiece prototype={prototype} review={review} index={index} />
            </li>
          ))}
          {poems.map((poem, index) => (
            <li key={poem.slug}>
              <PoemPiece prototype={prototype} poem={poem} index={shelfReviews.length + index} />
            </li>
          ))}
        </ul>
      </section>
      <section className="guide-row" aria-labelledby="guide-heading">
        <h2 id="guide-heading" className="section-label">
          Blog posts
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
        <p className="eyebrow">Book reviews</p>
        <h1>Essays on the books.</h1>
        <p className="lede">
          Twelve long reviews of books old enough to belong to everyone. Open a cover to read the essay.
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
      <Missing prototype={prototype} heading="That review is not on the shelf." label="All book reviews" view={{ kind: "reviews" }} />
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
            <span> · {formatDate(review.published)}</span>
          </p>
          {review.spoilers ? <p className="spoiler-warning">This review contains spoilers.</p> : null}
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
          More book reviews
        </NavLink>
      </p>
    </article>
  );
}

export function GuidesView({ prototype, guides }: { prototype: Prototype; guides: Guide[] }) {
  return (
    <div className="section-page">
      <header className="page-intro">
        <p className="eyebrow">Blog posts</p>
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
      <Missing prototype={prototype} heading="That post is not on the shelf." label="All blog posts" view={{ kind: "guides" }} />
    );
  }
  return (
    <article className="essay">
      <div className="essay-top essay-top-plain">
        <div>
          <p className="kicker">Blog post</p>
          <h1>{guide.title}</h1>
          <p className="dek">{guide.dek}</p>
          <p className="byline">{formatDate(guide.published)}</p>
        </div>
      </div>
      <MarkdownBody body={guide.body} />
      <p className="essay-foot">
        <NavLink
          href={routeToHash({ name: "prototype", prototypeId: prototype.id, view: { kind: "guides" } })}
          event={{ type: "OPEN_VIEW", view: { kind: "guides" } }}
        >
          More blog posts
        </NavLink>
      </p>
    </article>
  );
}

export function PoemView({ prototype, slug }: { prototype: Prototype; slug: string }) {
  const poem = getPoem(slug);
  if (!poem) {
    return (
      <Missing
        prototype={prototype}
        heading="That poem is not on the shelf."
        label="Back home"
        view={{ kind: "home" }}
      />
    );
  }
  return (
    <article className="essay">
      <div className="essay-top">
        <BookCover bookId="margin-light" title={poem.title} author="A poem" size="md" />
        <div>
          <p className="kicker">Poem</p>
          <h1>{poem.title}</h1>
          <p className="dek">{poem.dek}</p>
          <p className="byline">{formatDate(poem.published)}</p>
        </div>
      </div>
      <MarkdownBody body={poem.body} />
      <p className="essay-foot">
        <NavLink
          href={routeToHash({ name: "prototype", prototypeId: prototype.id, view: { kind: "home" } })}
          event={{ type: "OPEN_VIEW", view: { kind: "home" } }}
        >
          Back home
        </NavLink>
      </p>
    </article>
  );
}

type RelatedPost = {
  key: string;
  title: string;
  meta: string;
  view: View;
};

export function RelatedPosts({ prototype, current }: { prototype: Prototype; current: View }) {
  const posts: RelatedPost[] = [
    ...reviews.map((review) => ({
      key: `review-${review.slug}`,
      title: review.title,
      meta: review.book.author,
      view: { kind: "review" as const, slug: review.slug },
    })),
    ...poems.map((poem) => ({
      key: `poem-${poem.slug}`,
      title: poem.title,
      meta: "Poem",
      view: { kind: "poem" as const, slug: poem.slug },
    })),
    ...guides.map((guide) => ({
      key: `guide-${guide.slug}`,
      title: guide.title,
      meta: "Blog post",
      view: { kind: "guide" as const, slug: guide.slug },
    })),
  ].filter((post) => {
    if (current.kind === "review" && post.view.kind === "review") return post.view.slug !== current.slug;
    if (current.kind === "guide" && post.view.kind === "guide") return post.view.slug !== current.slug;
    if (current.kind === "poem" && post.view.kind === "poem") return post.view.slug !== current.slug;
    return true;
  });

  return (
    <aside className="related-panel" aria-label="Other posts">
      <p className="rail-label">Other posts</p>
      <ul>
        {posts.map((post) => (
          <li key={post.key}>
            <NavLink
              href={routeToHash({ name: "prototype", prototypeId: prototype.id, view: post.view })}
              event={{ type: "OPEN_VIEW", view: post.view }}
            >
              <span className="related-title">{post.title}</span>
              <span className="related-meta">{post.meta}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
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
          <span>Navigation</span>
          {shellLabels[prototype.shell]}
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
          The essays are sample book reviews, with a few blog posts on how to stay with a book. The shelf is
          here so the room can be read with real writing in it.
        </p>
      </div>
    </article>
  );
}
