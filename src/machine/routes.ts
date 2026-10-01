import { sitePrototypeId } from "../prototypes/catalog";

export type View =
  | { kind: "home" }
  | { kind: "reviews" }
  | { kind: "review"; slug: string }
  | { kind: "guides" }
  | { kind: "guide"; slug: string }
  | { kind: "poem"; slug: string }
  | { kind: "search" }
  | { kind: "bio" }
  | { kind: "about" };

export type Route = { name: "prototype"; prototypeId: string; view: View };

function viewFromParts(section: string | undefined, slug: string | undefined): View {
  if (section === "reviews" && slug) return { kind: "review", slug };
  if (section === "reviews") return { kind: "reviews" };
  if (section === "guides" && slug) return { kind: "guide", slug };
  if (section === "guides") return { kind: "guides" };
  if (section === "poems" && slug) return { kind: "poem", slug };
  if (section === "search") return { kind: "search" };
  if (section === "bio") return { kind: "bio" };
  if (section === "about") return { kind: "about" };
  return { kind: "home" };
}

export function hashToRoute(hash: string): Route {
  const raw = decodeURIComponent(hash.replace(/^#/, "").replace(/^\//, ""));
  const parts = raw.split("/").filter(Boolean);
  // Older addresses looked like #/p/window-seat/reviews. There is one site now.
  const sectionParts = parts[0] === "p" ? parts.slice(2) : parts;
  return {
    name: "prototype",
    prototypeId: sitePrototypeId,
    view: viewFromParts(sectionParts[0], sectionParts[1]),
  };
}

export function routeToHash(route: Route): string {
  switch (route.view.kind) {
    case "home":
      return "#/";
    case "reviews":
      return "#/reviews";
    case "review":
      return `#/reviews/${encodeURIComponent(route.view.slug)}`;
    case "guides":
      return "#/guides";
    case "guide":
      return `#/guides/${encodeURIComponent(route.view.slug)}`;
    case "poem":
      return `#/poems/${encodeURIComponent(route.view.slug)}`;
    case "search":
      return "#/search";
    case "bio":
      return "#/bio";
    case "about":
      return "#/about";
  }
}

export function viewLabel(view: View): string {
  switch (view.kind) {
    case "home":
      return "Home";
    case "reviews":
      return "Book reviews";
    case "review":
      return "Book review";
    case "guides":
      return "Blog posts";
    case "guide":
      return "Blog post";
    case "poem":
      return "Poem";
    case "search":
      return "Search";
    case "bio":
      return "Bio";
    case "about":
      return "About";
  }
}
