import { isPrototypeId } from "../prototypes/catalog";

export type View =
  | { kind: "home" }
  | { kind: "reviews" }
  | { kind: "review"; slug: string }
  | { kind: "guides" }
  | { kind: "guide"; slug: string }
  | { kind: "about" };

export type Route =
  | { name: "gallery" }
  | { name: "prototype"; prototypeId: string; view: View };

export function hashToRoute(hash: string): Route {
  const raw = decodeURIComponent(hash.replace(/^#/, "").replace(/^\//, ""));
  const parts = raw.split("/").filter(Boolean);
  if (parts[0] !== "p" || !parts[1] || !isPrototypeId(parts[1])) {
    return { name: "gallery" };
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
  if (section === "about") {
    return { name: "prototype", prototypeId, view: { kind: "about" } };
  }
  return { name: "prototype", prototypeId, view: { kind: "home" } };
}

export function routeToHash(route: Route): string {
  if (route.name === "gallery") return "#/";
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
    case "about":
      return `${base}/about`;
  }
}

export function viewLabel(view: View): string {
  switch (view.kind) {
    case "home":
      return "Home";
    case "reviews":
      return "Reviews";
    case "review":
      return "Review";
    case "guides":
      return "Reading guides";
    case "guide":
      return "Guide";
    case "about":
      return "About this design";
  }
}
