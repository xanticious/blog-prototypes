# Spine & Page

Twenty static prototypes of a book blog, built to compare on purpose. The same reviews and reading guides are set in twenty combinations of type, color, and layout. The home screen is a gallery that opens each one.

The site is a React + TypeScript app. Navigation and the rest of the interface state live in an [XState](https://stately.ai/docs) machine. Addresses use a hash (`#/p/inkwell/reviews`), so the built files work on GitHub Pages without a server-side redirect.

## Write here, design there

| Path | What it is |
| --- | --- |
| `design/getting-started.md` | A plain-language guide to writing book reviews and choosing how a blog gets built. |
| `design/prototypes.md` | Design notes for the twenty prototypes, the state machine, and the content model. |
| `src/content/reviews/` | Sample essays, one Markdown file each. |
| `src/content/guides/` | Sample reading tutorials. |
| `src/content/books.ts` | Book facts the essays point at. |
| `src/prototypes/catalog.ts` | Names, fonts, colors, and layouts for the twenty prototypes. |
| `src/machine/` | The XState machine and the hash routes. |

## Scripts

Install Node 22 (see `.nvmrc`), then:

```bash
npm install
npm run dev
```

`npm run dev` starts a local preview. `npm run build` typechecks and writes `dist/`. `npm run preview` serves that folder.

## GitHub Pages

The workflow in `.github/workflows/pages.yml` builds the site and deploys it when commits land on `main`. In the repository settings, set Pages to **GitHub Actions**.

The Vite `base` is `./`, so the built asset paths stay relative on a project site such as `https://<user>.github.io/<repo>/`.
