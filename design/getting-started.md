# How to start a book blog

This guide is for someone who loves reading and is new to websites. You do not need to know how to code to follow the writing half. The website half names each tool in plain language, then shows the path this project uses, plus the other paths people commonly take.

A book blog is a place on the internet where you publish your own writing about books. A review says what a book is like and whether a certain reader should spend time with it. A tutorial, or reading guide, teaches a skill: how to take notes, how to reread a hard page, how to talk about a book with friends. Both belong on the same site. Reviews bring people in. Guides give them a reason to come back when they are between books.

“Static” means the site is a folder of finished files. When someone visits, the server hands over those files. It does not build the page from a database at the last second. Static sites are a good fit for a book blog. They are cheap to host, hard to break, and GitHub Pages can publish them for free.

## Write the review before you touch the website

The website is a shelf. The writing is the books on it. If you only remember one part of this guide, remember this one.

### While you are reading

Keep a note you can open with one hand. A paper scrap, a notes app, the margin of the book if you own it. After each sitting, write five lines at most:

1. Where you stopped.
2. One concrete thing: an object, a line, a room.
3. A question, even a grumpy one.
4. A plain reaction: bored, furious, delighted, suspicious.
5. Whether you want to keep going.

That is a reading journal. The longer version of this advice is one of the sample guides in this project (`src/content/guides/reading-journal.md`). The point of the short version is that you cannot write a review from a mood. You need a few pages you still remember.

### When you sit down to write

Start with three sentences you will not publish:

- The scene you still see.
- What the book seems to care about.
- Who you would hand it to, and who you would warn.

Then use a simple shape. You can change the order later.

1. **Open inside the book.** A room, a sentence, a decision. Not “This novel is about a man who…”
2. **Give a little context.** Who wrote it, when, and what kind of book it is. Three sentences is plenty.
3. **Look closely at one choice.** A narrator, a skipped chapter, a character who does not fit the theme.
4. **Admit a reservation if you have one.** Readers trust a review that can say “this part dragged.”
5. **Say who it is for.** “For readers who like diaries and detective plots” is useful. “A masterpiece” is fog.

Quote briefly. A sentence or two, and only when you cannot say it better yourself. If the book is still in copyright, keep quotations short. Your words should be the essay. The author’s words are exhibits. The sample reviews in this project are about books old enough to be in the public domain, which is a comfortable place to practice.

Read the draft aloud once. Anywhere you get bored, cut. Then stop. A clear four-hundred-word review that exists is better than a perfect essay that stays in a notes app because it does not sound official.

You do not need a special voice. You need attention, a few details, and the nerve to publish a version.

## Ways to write the words, and ways to see them on a page

A **viewer**, in this guide, means the tool that turns what you wrote into the page a visitor sees. People argue about viewers because they change two things: how you write, and how much a programmer has to help.

### Markdown

Markdown is a plain text file with a few marks:

```markdown
## A small heading

This is a paragraph. *This is italic.* **This is bold.**

> This is a quotation.
```

You can write it in any text editor. You can read it even if the website disappears. The sample reviews in this project are Markdown files. A small library called `react-markdown` is the viewer: it reads those marks and turns them into headings, paragraphs, and quotations in the browser.

Markdown is the best default for a beginner who is willing to learn about ten symbols. It is also what most static-site tools expect.

Each review here starts with **front matter**, a little block of facts between `---` lines. The site reads those facts (title, date, which book) and uses the rest of the file as the essay.

```markdown
---
slug: pride-and-prejudice
title: "The Intelligence of Manners"
dek: "One sentence that tells a passerby what the essay is doing."
bookId: pride-and-prejudice
published: "2026-01-12"
---

The essay starts here.
```

`slug` is the bit that shows up in the address. Use lowercase words and hyphens, and do not change it after you have shared the link.

`dek` is newspaper slang for the sentence under the headline. Write it for someone who has not decided to read yet.

### A visual editor

A visual editor looks like a word processor: you highlight text and press Bold. WordPress, Ghost, Notion, and many “CMS” products (content management systems) work this way. The thing you type is often saved as structured data, not as a Markdown file you can open in a folder.

This is the right choice if you never want to see a file. It is a weaker choice if you want the writing to live in Git, next to the code, where a friend can review it like any other change. You can add a visual editor later, on top of Markdown, without throwing the essays away. Decap CMS is one tool people drop onto a Git-based site for that reason. You do not need it on day one.

### MDX, Markdoc, and other “Markdown plus”

MDX is Markdown that can also contain little islands of website code (a custom pull-quote, an audio player, a spoiler box). Markdoc, used by some documentation sites, is a cousin with stricter rules.

These are wonderful when a developer is building custom components and a writer is willing to type a few tags. They are a bad first step. A book review rarely needs a component. It needs paragraphs. This project stays with ordinary Markdown, plus two small fences the viewer already understands: `:::spoiler` for a collapsed block, and `:::verse` for a poem’s line breaks. A new essay cannot accidentally embed a program.

### Writing the essay inside the program

You could also write each review as React code: a function that returns headings and paragraphs. That is how some heavily designed sites work. It makes every essay a programming task. This project does not do that. The designs are code. The essays are files in `src/content/`.

## The process in this project

Here is the whole loop, from “I finished a book” to “it is on the site.”

1. **Install the tools once.** Install Node.js (the version in `.nvmrc` or any current Node 22 is fine), then, in this folder, run `npm install`. Node is the program that runs JavaScript on your computer. npm is the tool that downloads the libraries the site needs.
2. **Start the preview.** Run `npm run dev`. Open the address it prints, usually `http://localhost:5173`. Leave that window open. When you save a file, the page refreshes.
3. **Add the book, if it is new.** Open `src/content/books.ts`. Copy one of the existing book blocks and fill in an id (lowercase, hyphens), title, author, year, and genre. The id is how a review finds its cover.
4. **Add a cover, if you want one.** Open `src/components/BookCover.tsx`. Each book has colors, a short title broken over a line or two, and a simple drawing. Copy a block, change the colors, and pick a motif. The drawings are original jacket designs, not reproductions of published covers, so you are not borrowing someone else’s artwork.
5. **Write the review.** Create a new file in `src/content/reviews/`. The name can match the slug. Copy the front matter pattern above. Write the essay in Markdown underneath. Save.
6. **Look at it in more than one prototype.** The home page of the app is a table of twenty-one designs. Open two or three. The words should be the same. If a paragraph looks bad in only one design, that is a design problem, not a writing problem.
7. **Write a guide the same way,** in `src/content/guides/`, if the piece is a tutorial rather than a review. Guides do not need a `bookId`.
8. **Check that the site still builds.** Run `npm run build`. This is the same command GitHub will run. If it complains about missing front matter, the message names the file.
9. **Save the change in Git.** Git is a history of the folder. The usual three commands are `git add`, `git commit`, and `git push`. A commit is a labeled snapshot. Push sends that snapshot to GitHub.

You do not have to understand React, TypeScript, or XState to do steps 3 through 7. Those are the writing steps. React is the library that draws the page. TypeScript is JavaScript with labels on the data, so a typo in a book id fails while you are still at your desk. XState is explained in the other design note; it is how the site remembers which page you are on.

## Other ways to make a blog

This repository is one option. It is not the simplest, and it is not the only good one. Pick based on who is doing the work.

| Approach | What it feels like | Good fit | Tradeoff |
| --- | --- | --- | --- |
| Medium or Substack | An account and a text box | You want readers and email more than a custom site | You rent the shelf. Design choices are mostly theirs. |
| WordPress.com | A hosted website with themes | You want a visual editor and plugins | More site than you may need, and themes can fight the writing. |
| Ghost | A clean publishing product, hosted or self-run | A magazine-like blog with members | Another system to maintain if you host it yourself. |
| Jekyll | Markdown files, built into a site. GitHub Pages can build it for you | A simple blog that stays close to GitHub | Themes are Ruby-flavored. Custom layout work is real work. |
| Hugo | Markdown in, a very fast site out | A large archive of reviews | The template language is its own dialect. |
| Eleventy (11ty) | Markdown plus small templates | A personal site you want to understand end to end | You assemble the design yourself, which is also the joy of it. |
| Astro | A modern static-site tool that likes content folders | You want components, but only a little application behavior | A programmer should set it up. Writers can still live in Markdown. |
| This project | A React app with twenty-one designs and a hash address | You want to compare custom looks, with a developer friend nearby | Heavier than a blog needs to be once you have chosen one look. |

Jekyll, Hugo, Eleventy, and Astro are all “static site generators.” You write Markdown. A command turns the folder into HTML, which is the language browsers already understand. GitHub Pages can host the result. For a finished book blog, one of those generators is often the calmer long-term home. This React project exists so you can see many designs before you choose, and so a custom version is possible if you want the site to behave like a small application.

## If a friend who builds websites is helping

You can split the work cleanly.

**You can own:**

- Which books get written about, and in what order.
- The essays and the guides, as Markdown.
- The tone: a classroom, a diary, a magazine, a scrapbook.
- The decision about which of the twenty-one prototypes feels like the site you would actually keep.

**A developer can own:**

- Getting the project running, and putting it on GitHub Pages.
- Choosing one prototype and deleting the other nineteen when you are done comparing.
- Adjusting type, color, and layout in `src/styles/global.css` and `src/prototypes/catalog.ts`.
- Adding a visual editor, a search box, or an RSS feed later, if you discover you need them.

Custom does not mean “invent a new system from a blank file.” Reasonable custom paths, from lightest to heaviest:

1. **Use a generator and a theme.** Jekyll or Hugo, a theme you both like, Markdown for every post. Fastest way to a real blog. Least like a designed object.
2. **Use Astro or Eleventy and design one layout.** Your friend builds a single reading page. You never think about components. This is the best “we want it to feel like ours” path for most pairs.
3. **Keep this project and pick one prototype.** The navigation, the content folder, and the GitHub Pages setup are already here. Your friend removes the gallery when you have chosen, and keeps the XState hash router. Do this if you liked one of these rooms and want to stay in it.
4. **Treat the set as sketches and build one more.** Use `design/prototypes.md` as the brief. Your friend copies a layout, changes the fonts and colors, and you react to a real page full of real essays instead of a mood board.

What you should not do, early, is design a login system, a commenting platform, and a custom database. A book blog can be a stack of pages. Comments can be an email link. Subscriptions can be a newsletter you add when strangers are actually reading.

## Putting it on GitHub Pages

GitHub Pages serves a static folder. This app is built for that in two ways.

- The build command (`npm run build`) writes a `dist/` folder, then copies the JavaScript, CSS, and favicon to the repository root. GitHub Pages is set to deploy from the `main` branch, folder `/ (root)`, and serves those files directly. The workflow in `.github/workflows/pages.yml` rebuilds and commits them when changes land on `main`.
- The address of each page uses a **hash**, the `#` in a URL. `#/p/inkwell/reviews` is still the same `index.html` file as far as the server is concerned. The browser, and the state machine in this project, read the part after `#` and decide what to show. That works on GitHub Pages project sites (`https://yourname.github.io/your-repo/`) without a special server rule. The asset paths are relative for the same reason.

A hash address will not give you pretty links like `/reviews/jane-eyre` without extra hosting setup. For a first static blog, that is a fair trade. If you later move to Netlify, Cloudflare Pages, or your own server, a developer can switch the router. The essays would not have to change.

## A checklist for the first real post

- [ ] I finished the book, or I am honest about where I stopped.
- [ ] I have three concrete notes, not just a star rating.
- [ ] The draft opens inside a scene.
- [ ] I quoted less than I talked.
- [ ] The front matter has a slug, title, dek, book id, and date.
- [ ] I looked at the essay in at least two prototypes.
- [ ] `npm run build` succeeds.
- [ ] I committed the Markdown file.

Then go read something else. The site can wait. The next book is the point.
