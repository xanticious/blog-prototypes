import { assign, setup, type StateFrom } from "xstate";
import type { Mood } from "../prototypes/catalog";
import { hashToRoute, routeToHash, type Route, type View } from "./routes";

export type GalleryFilter = "all" | Mood;

export type SidebarMode = "collapsed" | "icons" | "text";

export type AppContext = {
  route: Route;
  menuOpen: boolean;
  galleryFilter: GalleryFilter;
  sidebarMode: SidebarMode;
};

export type AppEvent =
  | { type: "HASH_CHANGED"; hash: string }
  | { type: "GO_GALLERY" }
  | { type: "OPEN_PROTOTYPE"; prototypeId: string }
  | { type: "OPEN_VIEW"; view: View }
  | { type: "TOGGLE_MENU" }
  | { type: "CLOSE_MENU" }
  | { type: "SET_FILTER"; filter: GalleryFilter }
  | { type: "CYCLE_SIDEBAR" };

export type AppInput = {
  hash: string;
};

function sameRoute(a: Route, b: Route): boolean {
  if (a.name !== b.name) return false;
  if (a.name === "gallery" || b.name === "gallery") return a.name === b.name;
  if (a.prototypeId !== b.prototypeId) return false;
  if (a.view.kind !== b.view.kind) return false;
  if (a.view.kind === "review" && b.view.kind === "review") return a.view.slug === b.view.slug;
  if (a.view.kind === "guide" && b.view.kind === "guide") return a.view.slug === b.view.slug;
  if (a.view.kind === "poem" && b.view.kind === "poem") return a.view.slug === b.view.slug;
  return true;
}

export const appMachine = setup({
  types: {
    context: {} as AppContext,
    events: {} as AppEvent,
    input: {} as AppInput,
  },
  actions: {
    syncHash: ({ context }) => {
      if (typeof window === "undefined") return;
      const next = routeToHash(context.route);
      if (window.location.hash !== next) {
        window.location.hash = next;
      }
    },
  },
}).createMachine({
  id: "bookBlog",
  context: ({ input }) => ({
    route: hashToRoute(input.hash || ""),
    menuOpen: false,
    galleryFilter: "all",
    sidebarMode: "text",
  }),
  on: {
    HASH_CHANGED: {
      actions: [
        assign(({ context, event }) => {
          const route = hashToRoute(event.hash);
          return {
            route,
            menuOpen: sameRoute(context.route, route) ? context.menuOpen : false,
          };
        }),
        "syncHash",
      ],
    },
    GO_GALLERY: {
      actions: [
        assign({
          route: { name: "gallery" },
          menuOpen: false,
        }),
        "syncHash",
      ],
    },
    OPEN_PROTOTYPE: {
      actions: [
        assign(({ event }) => ({
          route: {
            name: "prototype" as const,
            prototypeId: event.prototypeId,
            view: { kind: "home" as const },
          },
          menuOpen: false,
        })),
        "syncHash",
      ],
    },
    OPEN_VIEW: {
      guard: ({ context }) => context.route.name === "prototype",
      actions: [
        assign(({ context, event }) => {
          if (context.route.name !== "prototype") return {};
          return {
            route: {
              name: "prototype" as const,
              prototypeId: context.route.prototypeId,
              view: event.view,
            },
            menuOpen: false,
          };
        }),
        "syncHash",
      ],
    },
    TOGGLE_MENU: {
      actions: assign({
        menuOpen: ({ context }) => !context.menuOpen,
      }),
    },
    CLOSE_MENU: {
      actions: assign({ menuOpen: false }),
    },
    SET_FILTER: {
      actions: assign({
        galleryFilter: ({ event }) => event.filter,
      }),
    },
    CYCLE_SIDEBAR: {
      actions: assign({
        sidebarMode: ({ context }) =>
          context.sidebarMode === "collapsed" ? "icons" : context.sidebarMode === "icons" ? "text" : "collapsed",
      }),
    },
  },
});

export type AppSnapshot = StateFrom<typeof appMachine>;
