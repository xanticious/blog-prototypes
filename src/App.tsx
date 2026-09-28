import { Gallery } from "./components/Gallery";
import { PrototypeApp } from "./components/PrototypeApp";
import { useApp } from "./machine/AppState";

export function App() {
  const { snapshot } = useApp();
  if (snapshot.context.route.name === "gallery") return <Gallery />;
  return <PrototypeApp />;
}
