import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Relative asset paths keep the build working on GitHub Pages project sites
// (https://user.github.io/repo/) and on a local preview. Navigation uses a
// hash, so the server only ever has to hand out index.html.
export default defineConfig({
  plugins: [react()],
  base: "./",
});
