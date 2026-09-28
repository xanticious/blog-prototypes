import type { CSSProperties } from "react";
import { guides, reviews } from "../content/library";
import { useApp } from "../machine/AppState";
import { routeToHash, type View } from "../machine/routes";
import { getPrototype, layoutLabels, type Prototype } from "../prototypes/catalog";
import { NavLink } from "./NavLink";
import { AboutView, GuideView, GuidesView, HomeView, ReviewView, ReviewsView } from "./views";

const internalNav: { label: string; view: View; match: View["kind"][] }[] = [
  { label: "Home", view: { kind: "home" }, match: ["home"] },
  { label: "Reviews", view: { kind: "reviews" }, match: ["reviews", "review"] },
  { label: "Guides", view: { kind: "guides" }, match: ["guides", "guide"] },
  { label: "About", view: { kind: "about" }, match: ["about"] },
];

function themeStyle(prototype: Prototype): CSSProperties {
  const { palette } = prototype;
  return {
    "--bg": palette.bg,
    "--ink": palette.ink,
    "--muted": palette.muted,
    "--accent": palette.accent,
    "--accent-ink": palette.accentInk,
    "--surface": palette.surface,
    "--rule": palette.rule,
    "--display": prototype.displayFont,
    "--text": prototype.textFont,
    "--sans": prototype.sansFont,
    "--mono": prototype.monoFont,
  } as CSSProperties;
}

export function PrototypeApp() {
  const { snapshot, send } = useApp();
  const route = snapshot.context.route;
  if (route.name !== "prototype") return null;
  const prototype = getPrototype(route.prototypeId);
  if (!prototype) {
    return (
      <main className="missing-shell">
        <h1>That prototype is not on the table.</h1>
        <NavLink href="#/" event={{ type: "GO_GALLERY" }}>
          Back to all prototypes
        </NavLink>
      </main>
    );
  }

  const view = route.view;
  const orderedReviews = [
    ...reviews.filter((review) => review.slug === prototype.featuredSlug),
    ...reviews.filter((review) => review.slug !== prototype.featuredSlug),
  ];

  return (
    <div
      className={snapshot.context.menuOpen ? "prototype is-menu-open" : "prototype"}
      data-id={prototype.id}
      data-layout={prototype.layout}
      data-tone={prototype.tone}
      style={themeStyle(prototype)}
    >
      <a className="skip" href="#content">
        Skip to content
      </a>
      <header className="topbar">
        <div className="topbar-global">
          <NavLink className="back-link" href="#/" event={{ type: "GO_GALLERY" }}>
            ← All prototypes
          </NavLink>
          <p className="proto-name">
            <span className="proto-name-label">Viewing</span>
            {prototype.name}
          </p>
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={snapshot.context.menuOpen}
            aria-controls="prototype-nav"
            onClick={() => send({ type: "TOGGLE_MENU" })}
          >
            {snapshot.context.menuOpen ? "Close" : "Menu"}
          </button>
        </div>
        <nav id="prototype-nav" className="proto-links" aria-label={`${prototype.name} sections`}>
          {internalNav.map((item) => (
            <NavLink
              key={item.label}
              href={routeToHash({ name: "prototype", prototypeId: prototype.id, view: item.view })}
              event={{ type: "OPEN_VIEW", view: item.view }}
              current={item.match.includes(view.kind)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <div className="proto-body">
        {prototype.layout === "rail" ? (
          <aside className="rail" aria-label="Shelf">
            <p className="rail-label">{layoutLabels[prototype.layout]}</p>
            <ol>
              {orderedReviews.map((review, index) => (
                <li key={review.slug}>
                  <NavLink
                    href={routeToHash({
                      name: "prototype",
                      prototypeId: prototype.id,
                      view: { kind: "review", slug: review.slug },
                    })}
                    event={{ type: "OPEN_VIEW", view: { kind: "review", slug: review.slug } }}
                    current={view.kind === "review" && view.slug === review.slug}
                  >
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {review.book.title}
                  </NavLink>
                </li>
              ))}
            </ol>
          </aside>
        ) : null}
        <main id="content" className="proto-main">
          <div className="reading-surface">
            {view.kind === "home" ? <HomeView prototype={prototype} reviews={orderedReviews} guides={guides} /> : null}
            {view.kind === "reviews" ? <ReviewsView prototype={prototype} reviews={orderedReviews} /> : null}
            {view.kind === "review" ? <ReviewView prototype={prototype} slug={view.slug} /> : null}
            {view.kind === "guides" ? <GuidesView prototype={prototype} guides={guides} /> : null}
            {view.kind === "guide" ? <GuideView prototype={prototype} slug={view.slug} /> : null}
            {view.kind === "about" ? <AboutView prototype={prototype} /> : null}
          </div>
        </main>
      </div>
    </div>
  );
}
