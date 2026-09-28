import { useApp } from "../machine/AppState";
import type { GalleryFilter } from "../machine/appMachine";
import { moodLabels, prototypes, type Mood } from "../prototypes/catalog";
import { NavLink } from "./NavLink";

const filters: { id: GalleryFilter; label: string }[] = [
  { id: "all", label: "All twenty" },
  { id: "literary", label: moodLabels.literary },
  { id: "dark", label: moodLabels.dark },
  { id: "editorial", label: moodLabels.editorial },
  { id: "educational", label: moodLabels.educational },
  { id: "cozy", label: moodLabels.cozy },
  { id: "playful", label: moodLabels.playful },
];

export function Gallery() {
  const { snapshot, send } = useApp();
  const filter = snapshot.context.galleryFilter;
  const visible = prototypes.filter((prototype) => filter === "all" || prototype.mood === filter);

  return (
    <div className="gallery">
      <a className="skip" href="#prototype-list">
        Skip to prototypes
      </a>
      <header className="gallery-hero">
        <p className="gallery-kicker">A static studio for a book blog</p>
        <h1>Twenty ways to keep a shelf.</h1>
        <p className="gallery-lede">
          Spine &amp; Page is a set of prototypes for a blog about books: reviews, reading guides, and the
          quiet work of paying attention. Every prototype holds the same essays, so you can compare type,
          color, and layout without the words changing underneath. Navigation lives in one state machine and
          uses a hash address, which is how a React app stays friendly with GitHub Pages.
        </p>
        <p className="gallery-note">
          New to writing reviews? The plain-language guide is in <code>design/getting-started.md</code>. The
          notes for these twenty designs are in <code>design/prototypes.md</code>.
        </p>
      </header>

      <div className="filter-row" role="group" aria-label="Filter prototypes">
        {filters.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={filter === item.id}
            onClick={() => send({ type: "SET_FILTER", filter: item.id })}
          >
            {item.label}
          </button>
        ))}
      </div>

      <ul id="prototype-list" className="proto-grid">
        {visible.map((prototype) => (
          <li key={prototype.id}>
            <NavLink
              className="proto-card"
              href={`#/p/${prototype.id}`}
              event={{ type: "OPEN_PROTOTYPE", prototypeId: prototype.id }}
            >
              <span
                className="specimen"
                style={{
                  background: prototype.palette.bg,
                  color: prototype.palette.ink,
                  fontFamily: prototype.displayFont,
                  borderColor: prototype.palette.rule,
                }}
              >
                <span className="specimen-accent" style={{ background: prototype.palette.accent }} />
                <span className="specimen-name">{prototype.name}</span>
                <span className="specimen-line" style={{ fontFamily: prototype.textFont }}>
                  {prototype.tagline}
                </span>
                <span className="swatches" aria-hidden="true">
                  {[prototype.palette.bg, prototype.palette.surface, prototype.palette.accent, prototype.palette.ink].map(
                    (color, swatchIndex) => (
                      <span key={swatchIndex} style={{ background: color }} />
                    ),
                  )}
                </span>
              </span>
              <span className="card-meta">
                <span className="card-index">{String(prototypes.indexOf(prototype) + 1).padStart(2, "0")}</span>
                <span>
                  <span className="card-name">{prototype.name}</span>
                  <span className="card-fonts">{prototype.fontLabel}</span>
                </span>
              </span>
              <span className="card-tags">
                <span>{moodLabels[prototype.mood as Mood]}</span>
                <span>{prototype.layout}</span>
              </span>
            </NavLink>
          </li>
        ))}
      </ul>
      {visible.length === 0 ? <p className="gallery-empty">Nothing in this group yet.</p> : null}
    </div>
  );
}
