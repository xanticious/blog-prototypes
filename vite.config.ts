import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages publishes this repository's main branch. It does not run Vite,
// so index.html has to point at built files with relative URLs. A leading
// slash would drop the /<repo>/ prefix on a project site. While developing
// and bundling, swap that script back to the TypeScript entry. Drop the
// production stylesheet link too: Vite injects CSS from the import in main.
// Point the icon at /favicon.svg so the copy published to the repo root is
// not bundled over the file in public/.
function sourceEntry(): Plugin {
  return {
    name: "source-entry",
    transformIndexHtml: {
      order: "pre",
      handler(html) {
        return html
          .replace(
            /\s*<link rel="stylesheet" href="\.\/assets\/index\.css"\s*\/?>/,
            "",
          )
          .replace('href="./favicon.svg"', 'href="/favicon.svg"')
          .replace(
            /<script type="module" src="\.\/assets\/index\.js"><\/script>/,
            '<script type="module" src="/src/main.tsx"></script>',
          );
      },
    },
  };
}

// Relative asset paths keep the build working on GitHub Pages project sites
// (https://user.github.io/repo/) and on a local preview. Navigation uses a
// hash, so the server only ever has to hand out index.html.
export default defineConfig({
  plugins: [sourceEntry(), react()],
  base: "./",
  build: {
    rollupOptions: {
      output: {
        entryFileNames: "assets/index.js",
        chunkFileNames: "assets/[name].js",
        assetFileNames: "assets/[name][extname]",
      },
    },
  },
});
