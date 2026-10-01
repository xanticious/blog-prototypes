import { useMemo, useState } from "react";
import {
  excerpt,
  filterShelf,
  formatDate,
  genresOnShelf,
  getGuide,
  getPoem,
  getReview,
  guides,
  poems,
  reviews,
  shelfPieces,
  tagsOnShelf,
  type Guide,
  type Review,
  type ShelfPiece,
} from "../content/library";
import { routeToHash, type View } from "../machine/routes";
import { layoutLabels, moodLabels, shellLabels, type Prototype } from "../prototypes/catalog";
import { BookCover } from "./BookCover";
import { MarkdownBody } from "./MarkdownBody";
import { NavLink } from "./NavLink";
import { GuidePiece, PoemPiece, ReviewPiece } from "./PieceLink";

function PostMeta({
  book,
  author,
  bookPublished,
  published,
  genre,
  tags,
}: {
  book: string;
  author: string;
  bookPublished?: string;
  published: string;
  genre: string;
  tags: string[];
}) {
  const bookLabel = bookPublished ? `${book} (${bookPublished})` : book;
  return (
    <dl className="post-meta">
      <div>
        <dt>Book</dt>
        <dd>{bookLabel}</dd>
      </div>
      <div>
        <dt>Author</dt>
        <dd>{author}</dd>
      </div>
      <div>
        <dt>Publication date</dt>
        <dd>
          <time dateTime={published}>{formatDate(published)}</time>
        </dd>
      </div>
      <div>
        <dt>Genre</dt>
        <dd>{genre}</dd>
      </div>
      <div>
        <dt>Tags</dt>
        <dd>
          <ul className="tag-list">
            {tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </dd>
      </div>
    </dl>
  );
}

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
          {review.spoilers ? <p className="spoiler-warning">This review contains spoilers.</p> : null}
        </div>
      </div>
      <PostMeta
        book={review.book.title}
        author={review.book.author}
        bookPublished={review.book.year}
        published={review.published}
        genre={review.book.genre}
        tags={review.tags}
      />
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
          Notes on reading, and a few plain introductions for writers who are new to the tools around a blog:
          Markdown, saving drafts, early copies, and finding readers.
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
        </div>
      </div>
      <PostMeta
        book={guide.book}
        author={guide.author}
        bookPublished={guide.bookPublished}
        published={guide.published}
        genre={guide.genre}
        tags={guide.tags}
      />
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
      meta: guide.genre,
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
          The essays are sample book reviews, with blog posts on how to stay with a book and how to keep a
          small site. The shelf is here so the room can be read with real writing in it.
        </p>
        <p>
          <NavLink
            href={routeToHash({ name: "prototype", prototypeId: prototype.id, view: { kind: "bio" } })}
            event={{ type: "OPEN_VIEW", view: { kind: "bio" } }}
          >
            Naomi Pell
          </NavLink>{" "}
          keeps the shelf. Her note is on the bio page.
        </p>
      </div>
    </article>
  );
}

function searchTokens(text: string): string[] {
  return text
    .split(",")
    .map((token) => token.trim())
    .filter(Boolean);
}

function toggleTag(text: string, tag: string): string {
  const tokens = searchTokens(text);
  const exists = tokens.some((token) => token.toLowerCase() === tag.toLowerCase());
  const next = exists ? tokens.filter((token) => token.toLowerCase() !== tag.toLowerCase()) : [...tokens, tag];
  return next.join(", ");
}

function SearchResult({ prototype, piece }: { prototype: Prototype; piece: ShelfPiece }) {
  const view: View = piece.kind === "review" ? { kind: "review", slug: piece.slug } : { kind: "guide", slug: piece.slug };
  return (
    <article className="search-hit">
      <p className="kicker">{piece.kind === "review" ? "Book review" : "Blog post"}</p>
      <h2>
        <NavLink
          href={routeToHash({ name: "prototype", prototypeId: prototype.id, view })}
          event={{ type: "OPEN_VIEW", view }}
        >
          {piece.title}
        </NavLink>
      </h2>
      <p className="piece-dek">{piece.dek}</p>
      <PostMeta
        book={piece.book}
        author={piece.author}
        bookPublished={piece.bookPublished}
        published={piece.published}
        genre={piece.genre}
        tags={piece.tags}
      />
    </article>
  );
}

export function SearchView({ prototype }: { prototype: Prototype }) {
  const pieces = useMemo(() => shelfPieces(), []);
  const genres = useMemo(() => genresOnShelf(), []);
  const tags = useMemo(() => tagsOnShelf(), []);
  const [genreA, setGenreA] = useState("");
  const [genreB, setGenreB] = useState("");
  const [text, setText] = useState("");
  const results = useMemo(() => filterShelf(pieces, [genreA, genreB], text), [pieces, genreA, genreB, text]);
  const active = Boolean(genreA || genreB || text.trim());
  const chosen = searchTokens(text).map((token) => token.toLowerCase());

  return (
    <div className="section-page search-page">
      <header className="page-intro">
        <p className="eyebrow">Search</p>
        <h1>Two genres, and the tags.</h1>
        <p className="lede">
          Look through the reviews and the posts by genre and by tag. Pick up to two genres, then narrow them
          with tags. You can type the tags, or press them. Genre names work in the field too, separated by commas.
        </p>
      </header>
      <form
        className="search-form"
        role="search"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <label htmlFor="shelf-search">
          Search genres and tags
          <input
            id="shelf-search"
            type="search"
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="gothic, letters, rereading"
            autoComplete="off"
          />
        </label>
        <div className="genre-pair">
          <label htmlFor="genre-a">
            First genre
            <select id="genre-a" value={genreA} onChange={(event) => setGenreA(event.target.value)}>
              <option value="">Any genre</option>
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="genre-b">
            Second genre
            <select id="genre-b" value={genreB} onChange={(event) => setGenreB(event.target.value)}>
              <option value="">Any genre</option>
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </label>
        </div>
        <fieldset className="tag-field">
          <legend>Tags</legend>
          <ul className="tag-cloud">
            {tags.map((tag) => {
              const pressed = chosen.includes(tag.toLowerCase());
              return (
                <li key={tag}>
                  <button type="button" aria-pressed={pressed} onClick={() => setText((current) => toggleTag(current, tag))}>
                    {tag}
                  </button>
                </li>
              );
            })}
          </ul>
        </fieldset>
        {active ? (
          <button
            type="button"
            className="search-clear"
            onClick={() => {
              setText("");
              setGenreA("");
              setGenreB("");
            }}
          >
            Clear search
          </button>
        ) : null}
      </form>
      <p className="search-count" aria-live="polite">
        {results.length === 1 ? "1 piece" : `${results.length} pieces`}
        {active ? " match this search." : " on the shelf."}
      </p>
      {results.length === 0 ? (
        <p className="search-empty">Nothing on the shelf fits those genres and tags. Try one genre, or a single tag.</p>
      ) : (
        <ul className="search-results">
          {results.map((piece) => (
            <li key={`${piece.kind}-${piece.slug}`}>
              <SearchResult prototype={prototype} piece={piece} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function BioView({ prototype }: { prototype: Prototype }) {
  return (
    <article className="essay about-essay">
      <div className="essay-top essay-top-plain">
        <div>
          <p className="eyebrow">Bio</p>
          <h1>Naomi Pell</h1>
          <p className="dek">
            A former reference librarian who still answers the question “what should I read next,” only now she
            writes the answer down.
          </p>
        </div>
      </div>
      <div className="prose">
        <p>
          I spent fourteen years on the evening shift at the Millrace Public Library, at the desk nearest the
          tall windows. People asked for tax forms, train times, and “a novel like the one I loved in 1998,
          but I cannot remember the title.” The title usually came back. The person usually stayed to tell me
          why it had mattered. I left the job in 2024. I did not leave the habit.
        </p>
        <p>
          {prototype.name} is the chair I would have pointed them toward if the library had been allowed to
          keep one person reading for an hour. I write about old books that belong to everyone, and about the
          ordinary skills around a reading life: notes, clubs, a plain file, a way to save a draft. I am not a
          critic by training. I am a person who got good at listening to what a reader was actually asking.
        </p>
        <p>A few things I like, besides the next chapter:</p>
        <ul>
          <li>Rereading a novel I already know, with a pencil and no ambition to be fair.</li>
          <li>Mysteries with a library, a train, or a secret nobody is keeping very well.</li>
          <li>Graphic memoirs, and cookbooks I read as essays.</li>
          <li>Dawn walks before the town is noisy, and cold-water swimming in summer, badly.</li>
          <li>Sunday community radio, crosswords, and the fountain pen that leaks.</li>
          <li>Notes left in used books by strangers who thought they were only talking to themselves.</li>
          <li>Orange cake, black tea, and the dollar cart at the friends-of-the-library sale.</li>
          <li>Postcards. A private list of books I did not like, with the reason written down.</li>
        </ul>
        <p>
          If you want a recommendation, tell me what you finished last, and whether you want more of that
          feeling or a change of weather. That is still my favorite question. The design of this room has its
          own page, if you came looking for type and color instead of a person.
        </p>
        <p>
          <NavLink
            href={routeToHash({ name: "prototype", prototypeId: prototype.id, view: { kind: "about" } })}
            event={{ type: "OPEN_VIEW", view: { kind: "about" } }}
          >
            About this design
          </NavLink>
        </p>
      </div>
    </article>
  );
}
