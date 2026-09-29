import { createContext, useContext, useEffect, useMemo, type ReactNode } from "react";
import { useMachine } from "@xstate/react";
import { getGuide, getPoem, getReview } from "../content/library";
import { getPrototype } from "../prototypes/catalog";
import { appMachine, type AppEvent, type AppSnapshot } from "./appMachine";
import { routeToHash, viewLabel } from "./routes";

type AppApi = {
  snapshot: AppSnapshot;
  send: (event: AppEvent) => void;
};

const AppStateContext = createContext<AppApi | null>(null);

function pageTitle(snapshot: AppSnapshot): string {
  const route = snapshot.context.route;
  const prototype = getPrototype(route.prototypeId);
  const name = prototype?.name ?? "Prototype";
  if (route.view.kind === "review") {
    const review = getReview(route.view.slug);
    return review ? `${review.title} — ${name}` : `${viewLabel(route.view)} — ${name}`;
  }
  if (route.view.kind === "guide") {
    const guide = getGuide(route.view.slug);
    return guide ? `${guide.title} — ${name}` : `${viewLabel(route.view)} — ${name}`;
  }
  if (route.view.kind === "poem") {
    const poem = getPoem(route.view.slug);
    return poem ? `${poem.title} — ${name}` : `${viewLabel(route.view)} — ${name}`;
  }
  if (route.view.kind === "home") return `${name} — Spine & Page`;
  return `${viewLabel(route.view)} — ${name}`;
}

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [snapshot, send] = useMachine(appMachine, {
    input: { hash: typeof window === "undefined" ? "" : window.location.hash },
  });

  const routeKey = useMemo(() => JSON.stringify(snapshot.context.route), [snapshot.context.route]);

  useEffect(() => {
    const onHash = () => {
      send({ type: "HASH_CHANGED", hash: window.location.hash });
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") send({ type: "CLOSE_MENU" });
    };
    window.addEventListener("hashchange", onHash);
    window.addEventListener("keydown", onKey);
    const canonical = routeToHash(snapshot.context.route);
    if (window.location.hash !== canonical) {
      window.history.replaceState(null, "", canonical);
    }
    return () => {
      window.removeEventListener("hashchange", onHash);
      window.removeEventListener("keydown", onKey);
    };
    // Normalize the address once. Later navigation goes through the machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [send]);

  useEffect(() => {
    document.title = pageTitle(snapshot);
    window.scrollTo(0, 0);
    // Opening the menu should not jump the page.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routeKey]);

  return <AppStateContext.Provider value={{ snapshot, send }}>{children}</AppStateContext.Provider>;
}

export function useApp(): AppApi {
  const value = useContext(AppStateContext);
  if (!value) {
    throw new Error("useApp must be used inside AppStateProvider");
  }
  return value;
}
