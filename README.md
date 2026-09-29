# Spine & Page

Twenty-one static prototypes of a book blog, built to compare on purpose. The same reviews, reading guides, and poem are set in twenty-one combinations of type, color, layout, and navigation. The home screen is a gallery that opens each one.

The site is a React + TypeScript app. Navigation and the rest of the interface state live in an [XState](https://stately.ai/docs) machine. Addresses use a hash (`#/p/inkwell/reviews`), so the built files work on GitHub Pages without a server-side redirect.

## Write here, design there

| Path | What it is |
| --- | --- |
| `design/getting-started.md` | A plain-language guide to writing book reviews and choosing how a blog gets built. |
| `design/prototypes.md` | Design notes for the twenty-one prototypes, the state machine, and the content model. |
| `src/content/reviews/` | Sample essays, one Markdown file each. |
| `src/content/guides/` | Sample reading tutorials. |
| `src/content/poems/` | The sample poem. |
| `src/content/books.ts` | Book facts the essays point at. |
| `src/prototypes/catalog.ts` | Names, fonts, colors, layouts, and shells for the twenty-one prototypes. |
| `src/machine/` | The XState machine and the hash routes. |

## Scripts

Install Node 22 (see `.nvmrc`), then:

```bash
npm install
npm run dev
```

`npm run dev` starts a local preview. `npm run build` typechecks, writes `dist/`, and copies the published JavaScript, CSS, and favicon to the repository root. `npm run preview` serves `dist/`.

## GitHub Pages

This repository's Pages site is published from the `main` branch, folder `/ (root)`. Pages serves those files as they are. It does not compile TypeScript.

`index.html` loads `./assets/index.js`, `./assets/index.css`, and `./favicon.svg`. Relative URLs keep the project-site prefix, so a page at `https://<user>.github.io/<repo>/` requests `https://<user>.github.io/<repo>/assets/index.js` rather than `https://<user>.github.io/src/main.tsx`.

`npm run build` produces those files. The workflow in `.github/workflows/pages.yml` runs that build when commits land on `main` and commits the result. In the repository settings, leave Pages on **Deploy from a branch**, branch `main`, folder `/ (root)`.
