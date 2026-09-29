import { isPrototypeId, sitePrototypeId } from "../prototypes/catalog";

export type View =
  | { kind: "home" }
  | { kind: "reviews" }
  | { kind: "review"; slug: string }
  | { kind: "guides" }
  | { kind: "guide"; slug: string }
  | { kind: "poem"; slug: string }
  | { kind: "about" };

export type Route = { name: "prototype"; prototypeId: string; view: View };

export function hashToRoute(hash: string): Route {
  const raw = decodeURIComponent(hash.replace(/^#/, "").replace(/^\//, ""));
  const parts = raw.split("/").filter(Boolean);
  if (parts[0] !== "p" || !parts[1] || !isPrototypeId(parts[1])) {
    return { name: "prototype", prototypeId: sitePrototypeId, view: { kind: "home" } };
  }
  const prototypeId = parts[1];
  const section = parts[2];
  const slug = parts[3];
  if (section === "reviews" && slug) {
    return { name: "prototype", prototypeId, view: { kind: "review", slug } };
  }
  if (section === "reviews") {
    return { name: "prototype", prototypeId, view: { kind: "reviews" } };
  }
  if (section === "guides" && slug) {
    return { name: "prototype", prototypeId, view: { kind: "guide", slug } };
  }
  if (section === "guides") {
    return { name: "prototype", prototypeId, view: { kind: "guides" } };
  }
  if (section === "poems" && slug) {
    return { name: "prototype", prototypeId, view: { kind: "poem", slug } };
  }
  if (section === "about") {
    return { name: "prototype", prototypeId, view: { kind: "about" } };
  }
  return { name: "prototype", prototypeId, view: { kind: "home" } };
}

export function routeToHash(route: Route): string {
  const base = `#/p/${route.prototypeId}`;
  switch (route.view.kind) {
    case "home":
      return base;
    case "reviews":
      return `${base}/reviews`;
    case "review":
      return `${base}/reviews/${encodeURIComponent(route.view.slug)}`;
    case "guides":
      return `${base}/guides`;
    case "guide":
      return `${base}/guides/${encodeURIComponent(route.view.slug)}`;
    case "poem":
      return `${base}/poems/${encodeURIComponent(route.view.slug)}`;
    case "about":
      return `${base}/about`;
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
    case "about":
      return "About";
  }
}
