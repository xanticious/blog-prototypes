# Spine & Page

Window Seat is a book blog: short reviews of public-domain books, posts for people who love reading and are new to the practical side of writing online, and one short poem. The site is a React + TypeScript app. Navigation and the rest of the interface state live in an [XState](https://stately.ai/docs) machine. Addresses use a hash (`#/reviews`), so the built files work on GitHub Pages without a server-side redirect.

This repository used to hold a gallery of visual prototypes, the same essays dressed many ways so a design could be chosen on purpose. That comparison is finished. Window Seat is the design we are keeping. Further work is a series of small improvements to this one site.

## Write here, design there

| Path | What it is |
| --- | --- |
| `design/getting-started.md` | A plain-language guide to writing book reviews and publishing them here. |
| `design/prototypes.md` | How Window Seat is put together: routes, the state machine, and the content model. |
| `design/futureenhancements.md` | A categorized brainstorm of one hundred possible changes, including ones we may never build. |
| `.cursor/rules/grok.mdc` | Instructions for Cursor, including Grok. Read this before opening a pull request. |
| `src/content/reviews/` | Book reviews, one Markdown file each. |
| `src/content/guides/` | Blog posts: reading notes, and plain introductions to tools. |
| `src/content/poems/` | The sample poem. |
| `src/content/books.ts` | Book facts the reviews point at, including an Open Library cover when one is set. |
| `src/prototypes/catalog.ts` | Window Seat’s name, type, colors, and layout. |
| `src/machine/` | The XState machine and the hash routes. |

## What a post carries

Every review and every blog post records books, authors, a publication date, one or more genres, and one or more tags. On a review, the books, authors, and genres come from `src/content/books.ts`, and the tags and date live in the Markdown file. A review can name one book or several — a series, or a related shelf — and each book can name one author or several. On a blog post, the facts live in the file. Author names are matched as whole strings, so a review of two authors appears under each name.

Search, in the site menu, narrows that shelf. You can choose one genre, one author, and one tag. A text search looks through the title, the author, the tags, and the writing, and sorts by how often the words appear.

The bio is a separate page. The person keeping the shelf is Naomi Pell, a former reference librarian.

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

## For anyone using Cursor

This site is not released. Do not record screen shares, walkthrough videos, or other video demos before a pull request. The instruction lives in `.cursor/rules/grok.mdc`. A short written note is enough. It is easier to open the site than to review a recording.
