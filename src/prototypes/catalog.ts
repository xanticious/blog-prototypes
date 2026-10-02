export type Mood = "literary" | "dark" | "editorial" | "educational" | "cozy" | "playful";

export type LayoutId =
  | "column"
  | "stacks"
  | "rail"
  | "broadsheet"
  | "cards"
  | "folio"
  | "catalog"
  | "manuscript"
  | "grid"
  | "scatter"
  | "index"
  | "tiles";

export type ShellId = "sticky" | "static" | "hamburger" | "sidebar";

export type Palette = {
  bg: string;
  ink: string;
  muted: string;
  accent: string;
  accentInk: string;
  surface: string;
  rule: string;
};

export type Prototype = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  about: string;
  mood: Mood;
  layout: LayoutId;
  tone: "light" | "dark";
  shell: ShellId;
  relatedPosts?: boolean;
  displayFont: string;
  textFont: string;
  sansFont: string;
  monoFont: string;
  fontLabel: string;
  palette: Palette;
  featuredSlug: string;
};

export const sitePrototypeId = "window-seat";

export const moodLabels: Record<Mood, string> = {
  literary: "Literary",
  dark: "After dark",
  editorial: "Editorial",
  educational: "For teaching",
  cozy: "Cozy",
  playful: "Playful",
};

export const layoutLabels: Record<LayoutId, string> = {
  column: "Narrow column",
  stacks: "Full-bleed stacks",
  rail: "Sidebar rail",
  broadsheet: "Newspaper",
  cards: "Cover cards",
  folio: "Magazine folio",
  catalog: "Card catalog",
  manuscript: "Manuscript page",
  grid: "Modular grid",
  scatter: "Scattered notes",
  index: "Quiet index",
  tiles: "Cover tiles",
};

export const shellLabels: Record<ShellId, string> = {
  sticky: "Sticky top bar",
  static: "Static top bar",
  hamburger: "Floating menu",
  sidebar: "Side bar",
};

export const prototypes: Prototype[] = [
  {
    id: sitePrototypeId,
    name: "Window Seat",
    tagline: "A tiled shelf, and then just the page.",
    description:
      "Clay and cream, covers packed edge to edge, and a quiet measure once a review opens — with the jacket and a short blurb in a gray panel under the title.",
    about:
      "Window Seat is a lamp-warm reading room: clay, sage-brown, and cream. The home page is a tight grid of covers. EB Garamond carries the titles and the notes. Once a piece opens, the page narrows. The jacket sits at the top left of a gray panel, and a short blurb wraps beside it, because the cover that led you here should still be in the room. A round button in the corner opens the sections, and other posts stay listed beside what you are reading.",
    mood: "cozy",
    layout: "tiles",
    tone: "light",
    shell: "hamburger",
    relatedPosts: true,
    displayFont: '"EB Garamond", serif',
    textFont: '"EB Garamond", serif',
    sansFont: '"EB Garamond", serif',
    monoFont: '"IBM Plex Mono", monospace',
    fontLabel: "EB Garamond",
    palette: {
      bg: "#f3e6d4",
      ink: "#3a261c",
      muted: "#6d5144",
      accent: "#c4653a",
      accentInk: "#fff8f2",
      surface: "#fff8ef",
      rule: "#e2cbb3",
    },
    featuredSlug: "jane-eyre",
  },
];

const byId = new Map(prototypes.map((prototype) => [prototype.id, prototype]));

export function getPrototype(id: string): Prototype | undefined {
  return byId.get(id);
}

export function isPrototypeId(id: string): boolean {
  return byId.has(id);
}
