import type { CSSProperties, ReactNode } from "react";
import { guides, reviews } from "../content/library";
import { useApp } from "../machine/AppState";
import type { SidebarMode } from "../machine/appMachine";
import { routeToHash, type View } from "../machine/routes";
import { getPrototype, layoutLabels, sitePrototypeId, type Prototype } from "../prototypes/catalog";
import { NavLink } from "./NavLink";
import { AboutView, GuideView, GuidesView, HomeView, PoemView, RelatedPosts, ReviewView, ReviewsView } from "./views";

const internalNav: { label: string; view: View; match: View["kind"][]; icon: IconName }[] = [
  { label: "Home", view: { kind: "home" }, match: ["home"], icon: "home" },
  { label: "Book reviews", view: { kind: "reviews" }, match: ["reviews", "review"], icon: "book" },
  { label: "Blog posts", view: { kind: "guides" }, match: ["guides", "guide"], icon: "guide" },
  { label: "About", view: { kind: "about" }, match: ["about"], icon: "about" },
];

type IconName = "menu" | "close" | "home" | "book" | "guide" | "about" | "back" | "panel";

function Icon({ name }: { name: IconName }) {
  return (
    <svg className="nav-icon" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      {name === "menu" ? <path d="M4 7h16M4 12h16M4 17h16" /> : null}
      {name === "close" ? <path d="M6 6l12 12M18 6L6 18" /> : null}
      {name === "home" ? <path d="M4 11.5 12 5l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1z" /> : null}
      {name === "book" ? <path d="M5 5.5A2.5 2.5 0 0 1 7.5 3H20v16H7.5A2.5 2.5 0 0 0 5 21.5zM5 5.5V21" /> : null}
      {name === "guide" ? <path d="M8 4h9l3 3v13H8zM8 4v16M11 10h6M11 14h6" /> : null}
      {name === "about" ? (
        <>
          <circle cx="12" cy="12" r="8" />
          <path d="M12 11v5M12 8h.01" />
        </>
      ) : null}
      {name === "back" ? <path d="M15 6 9 12l6 6M9 12h10" /> : null}
      {name === "panel" ? <path d="M5 5h14v14H5zM9 5v14" /> : null}
    </svg>
  );
}

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

function SectionLinks({
  prototype,
  view,
  withIcons,
  iconOnly,
}: {
  prototype: Prototype;
  view: View;
  withIcons?: boolean;
  iconOnly?: boolean;
}) {
  return (
    <>
      {internalNav.map((item) => (
        <NavLink
          key={item.label}
          href={routeToHash({ name: "prototype", prototypeId: prototype.id, view: item.view })}
          event={{ type: "OPEN_VIEW", view: item.view }}
          current={item.match.includes(view.kind)}
          title={iconOnly ? item.label : undefined}
        >
          {withIcons ? <Icon name={item.icon} /> : null}
          <span className={iconOnly ? "sr-only" : undefined}>{item.label}</span>
        </NavLink>
      ))}
    </>
  );
}

function TopBar({
  prototype,
  view,
  menuOpen,
  onToggle,
}: {
  prototype: Prototype;
  view: View;
  menuOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <header className="topbar">
      <div className="topbar-global">
        <p className="proto-name">{prototype.name}</p>
        <button
          type="button"
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="prototype-nav"
          onClick={onToggle}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </div>
      <nav id="prototype-nav" className="proto-links" aria-label={`${prototype.name} sections`}>
        <SectionLinks prototype={prototype} view={view} />
      </nav>
    </header>
  );
}

function FloatingMenu({
  prototype,
  view,
  menuOpen,
  onToggle,
  onClose,
}: {
  prototype: Prototype;
  view: View;
  menuOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  return (
    <>
      <button
        type="button"
        className="float-toggle"
        aria-expanded={menuOpen}
        aria-controls="prototype-nav"
        onClick={onToggle}
      >
        <Icon name={menuOpen ? "close" : "menu"} />
        <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
      </button>
      {menuOpen ? <button type="button" className="float-scrim" aria-label="Close menu" onClick={onClose} /> : null}
      <div id="prototype-nav" className="float-panel" hidden={!menuOpen}>
        <p className="proto-name">{prototype.name}</p>
        <nav className="proto-links float-links" aria-label={`${prototype.name} sections`}>
          <SectionLinks prototype={prototype} view={view} />
        </nav>
      </div>
    </>
  );
}

function sidebarLabel(mode: SidebarMode): string {
  if (mode === "collapsed") return "Show icons only";
  if (mode === "icons") return "Show text labels";
  return "Collapse sidebar";
}

function SideBar({
  prototype,
  view,
  mode,
  onCycle,
}: {
  prototype: Prototype;
  view: View;
  mode: SidebarMode;
  onCycle: () => void;
}) {
  const iconOnly = mode === "icons";
  return (
    <aside className={`app-sidebar is-${mode}`} aria-label={`${prototype.name} navigation`}>
      <button type="button" className="sidebar-cycle" onClick={onCycle} aria-label={sidebarLabel(mode)} title={sidebarLabel(mode)}>
        <Icon name="panel" />
        {mode === "text" ? <span>Collapse</span> : <span className="sr-only">{sidebarLabel(mode)}</span>}
      </button>
      {mode === "collapsed" ? null : (
        <nav className="sidebar-links" aria-label={`${prototype.name} sections`}>
          <SectionLinks prototype={prototype} view={view} withIcons iconOnly={iconOnly} />
        </nav>
      )}
      {mode === "text" ? <p className="sidebar-name">{prototype.name}</p> : null}
    </aside>
  );
}

function Article({ prototype, view }: { prototype: Prototype; view: View }) {
  return (
    <>
      {view.kind === "home" ? <HomeView prototype={prototype} reviews={ordered(prototype)} guides={guides} /> : null}
      {view.kind === "reviews" ? <ReviewsView prototype={prototype} reviews={ordered(prototype)} /> : null}
      {view.kind === "review" ? <ReviewView prototype={prototype} slug={view.slug} /> : null}
      {view.kind === "guides" ? <GuidesView prototype={prototype} guides={guides} /> : null}
      {view.kind === "guide" ? <GuideView prototype={prototype} slug={view.slug} /> : null}
      {view.kind === "poem" ? <PoemView prototype={prototype} slug={view.slug} /> : null}
      {view.kind === "about" ? <AboutView prototype={prototype} /> : null}
    </>
  );
}

function ordered(prototype: Prototype) {
  return [
    ...reviews.filter((review) => review.slug === prototype.featuredSlug),
    ...reviews.filter((review) => review.slug !== prototype.featuredSlug),
  ];
}

function isArticle(view: View): boolean {
  return view.kind === "review" || view.kind === "guide" || view.kind === "poem";
}

export function PrototypeApp() {
  const { snapshot, send } = useApp();
  const route = snapshot.context.route;
  if (route.name !== "prototype") return null;
  const prototype = getPrototype(route.prototypeId);
  if (!prototype) {
    return (
      <main className="missing-shell">
        <h1>That page is not on the shelf.</h1>
        <NavLink href={`#/p/${sitePrototypeId}`} event={{ type: "OPEN_PROTOTYPE", prototypeId: sitePrototypeId }}>
          Back home
        </NavLink>
      </main>
    );
  }

  const view = route.view;
  const menuOpen = snapshot.context.menuOpen;
  const showRelated = Boolean(prototype.relatedPosts) && isArticle(view);
  let chrome: ReactNode = null;
  if (prototype.shell === "hamburger") {
    chrome = (
      <FloatingMenu
        prototype={prototype}
        view={view}
        menuOpen={menuOpen}
        onToggle={() => send({ type: "TOGGLE_MENU" })}
        onClose={() => send({ type: "CLOSE_MENU" })}
      />
    );
  } else if (prototype.shell === "sidebar") {
    chrome = (
      <SideBar
        prototype={prototype}
        view={view}
        mode={snapshot.context.sidebarMode}
        onCycle={() => send({ type: "CYCLE_SIDEBAR" })}
      />
    );
  } else {
    chrome = (
      <TopBar
        prototype={prototype}
        view={view}
        menuOpen={menuOpen}
        onToggle={() => send({ type: "TOGGLE_MENU" })}
      />
    );
  }

  return (
    <div
      className={menuOpen ? "prototype is-menu-open" : "prototype"}
      data-id={prototype.id}
      data-layout={prototype.layout}
      data-tone={prototype.tone}
      data-shell={prototype.shell}
      style={themeStyle(prototype)}
    >
      <a className="skip" href="#content">
        Skip to content
      </a>
      {chrome}
      <div className="shell-main">
        <div className="proto-body">
          {prototype.layout === "rail" ? (
            <aside className="rail" aria-label="Shelf">
              <p className="rail-label">{layoutLabels[prototype.layout]}</p>
              <ol>
                {ordered(prototype).map((review, index) => (
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
          <main id="content" className={showRelated ? "proto-main with-related" : "proto-main"}>
            <div className="reading-surface">
              <Article prototype={prototype} view={view} />
            </div>
            {showRelated ? <RelatedPosts prototype={prototype} current={view} /> : null}
          </main>
        </div>
      </div>
    </div>
  );
}
