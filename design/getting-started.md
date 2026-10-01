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

You can write it in any text editor. You can read it even if the website disappears. The sample reviews in this project are Markdown files. A small library called `react-markdown` is the viewer: it reads those marks and turns them into headings, paragraphs, and quotations in the browser. A plain tour of the tools is one of the blog posts (`src/content/guides/editing-markdown.md`).

Markdown is the best default for a beginner who is willing to learn about ten symbols. It is also what most static-site tools expect.

Each review and each blog post starts with **front matter**, a little block of facts between `---` lines. The site reads those facts and uses the rest of the file as the piece. Every post shows the same kinds of facts on the page: the book or books, the author or authors, a publication date, one or more genres, and one or more tags.

A review points at one or more books that already live in `src/content/books.ts`. Each record holds the title, one or more authors, the original year, and the genres. The review file adds the date the note went up, and the tags. Use `bookId` for a single book. Use `bookIds` when the note is about a series or a related shelf, and separate the ids with commas.

```markdown
---
slug: pride-and-prejudice
title: "Book review: Pride and Prejudice"
dek: "One sentence that tells a passerby what the essay is doing."
bookId: pride-and-prejudice
published: "2026-01-12"
tags: manners, romance, rereading
---

The essay starts here.
```

A note about more than one book lists every id:

```markdown
---
slug: bronte-novels
title: "Book review: The Brontë novels"
dek: "One sentence that tells a passerby what the note is doing."
bookIds: jane-eyre, wuthering-heights
published: "2026-06-20"
tags: gothic, sisters, comparison
---
```

You can put several ids in `bookId` as well. If both fields are present, the page uses every id, with `bookId` first, and ignores a repeat. Each id has to exist. The page lists every title and every author, so two books by one person and one book by two people both show up. A book with more than one author keeps every name in `authors`.

A blog post that is not itself a review writes the book facts in the file, because there may be no cover to look up:

```markdown
---
slug: getting-started-with-git
title: "Git, Briefly, for People Who Write"
dek: "One sentence under the headline."
book: "The Odyssey"
author: "Homer"
bookPublished: "8th century BCE"
published: "2026-05-25"
genre: fantasy
tags: git, saving, versions, beginners
---
```

The book on a practical post is the one the post is thinking beside. Say so in a sentence, so the fact does not feel pinned on from outside. A post can name more than one genre. Separate them with commas: `genre: fantasy, gothic`. The same shape is used for book records in `src/content/books.ts`, as a list: `genres: ["sci-fi", "gothic"]`. Authors are a list too: `authors: ["Jane Austen"]`, or two names when a book was written together. Names such as `romance`, `romantasy`, and `smut` are ordinary genre labels. Author names are matched as whole strings. A review of several people appears under each of those names.

`slug` is the bit that shows up in the address. Use lowercase words and hyphens, and do not change it after you have shared the link.

`dek` is newspaper slang for the sentence under the headline. Write it for someone who has not decided to read yet.

Separate tags with commas. Use words a reader might actually search: `gothic`, `rereading`, `letters`. The search page looks through either book reviews or blog posts, never both at once. It can take one genre, one author, and one tag. The text field searches the writing and sorts by how often the words appear.

### A visual editor

A visual editor looks like a word processor: you highlight text and press Bold. WordPress, Ghost, Notion, and many “CMS” products (content management systems) work this way. The thing you type is often saved as structured data, not as a Markdown file you can open in a folder.

This is the right choice if you never want to see a file. It is a weaker choice if you want the writing to live in Git, next to the code, where a friend can review it like any other change. You can add a visual editor later, on top of Markdown, without throwing the essays away. Decap CMS is one tool people drop onto a Git-based site for that reason. You do not need it on day one.

### MDX, Markdoc, and other “Markdown plus”

MDX is Markdown that can also contain little islands of website code (a custom pull-quote, an audio player, a spoiler box). Markdoc, used by some documentation sites, is a cousin with stricter rules.

These are wonderful when a developer is building custom components and a writer is willing to type a few tags. They are a bad first step. A book review rarely needs a component. It needs paragraphs. This project stays with ordinary Markdown, plus three small marks the viewer already understands: `:::spoiler` for a collapsed block, `||a hidden phrase||` for a spoiler inside a sentence, and `:::verse` for a poem’s line breaks. Bold and italic still work inside the bars. A new note cannot accidentally embed a program.

### Writing the essay inside the program

You could also write each review as React code: a function that returns headings and paragraphs. That is how some heavily designed sites work. It makes every essay a programming task. This project does not do that. The designs are code. The essays are files in `src/content/`.

## The process in this project

Here is the whole loop, from “I finished a book” to “it is on the site.”

1. **Install the tools once.** Install Node.js (the version in `.nvmrc` or any current Node 22 is fine), then, in this folder, run `npm install`. Node is the program that runs JavaScript on your computer. npm is the tool that downloads the libraries the site needs.
2. **Start the preview.** Run `npm run dev`. Open the address it prints, usually `http://localhost:5173`. Leave that window open. When you save a file, the page refreshes.
3. **Add the book, if it is new.** Open `src/content/books.ts`. Copy one of the existing book blocks and fill in an id (lowercase, hyphens), title, one or more authors, year, and genres. The id is how a review finds its cover. Add every book in a series before you point a review at the set.
4. **Add a cover, if you want one.** On the book record, add a `cover` with a key and a value. Open Library serves the picture. The address is `https://covers.openlibrary.org/b/$key/$value-$size.jpg`. The key can be `isbn`, `olid`, `id` (their cover id), `oclc`, or `lccn`. The shelf asks for a small image in a list, a medium one beside an essay, and a large one on the home tiles. Cover id and OLID are the kinder choices: lookups by ISBN, OCLC, and LCCN are limited to 100 requests from one address every five minutes, and a burst past that comes back forbidden. A missing picture, or a book with no `cover`, falls back to a drawn jacket in `src/components/BookCover.tsx`. The poem uses one of those drawings. A blog post still does not need a cover.
5. **Write the review.** Create a new file in `src/content/reviews/`. The name can match the slug. Copy the front matter pattern above. Write the essay in Markdown underneath. Save.
6. **Read it in Window Seat.** The site is one design now, the one we kept. Open the new essay from the home grid and from the review list. If a paragraph is hard to read, fix the paragraph. A short introduction to Git, if you want one before step 9, is `src/content/guides/getting-started-with-git.md`.
7. **Write a blog post the same way,** in `src/content/guides/`, if the piece is a tutorial rather than a review. Give it a book, an author, a genre, a publication date, and at least one tag. It does not need a `bookId` or a cover.
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
| This project | A React app with one kept design, Window Seat, and a hash address | You already liked this room and want to improve it in small steps | Heavier than a one-page generator, and that is acceptable while the writing and the tools stay in one folder. |

Jekyll, Hugo, Eleventy, and Astro are all “static site generators.” You write Markdown. A command turns the folder into HTML, which is the language browsers already understand. GitHub Pages can host the result. For a finished book blog, one of those generators is often the calmer long-term home. This React project has already chosen its look. Window Seat stays, and the work from here is iterative: a new post, a clearer search, a page that was missing.

## If a friend who builds websites is helping

You can split the work cleanly.

**You can own:**

- Which books get written about, and in what order.
- The essays and the guides, as Markdown.
- The tone: a classroom, a diary, a magazine, a scrapbook.
- Whether a new idea belongs on Window Seat, or belongs in `design/futureenhancements.md` instead.

**A developer can own:**

- Getting the project running, and putting it on GitHub Pages.
- Keeping Window Seat as the only room, and making the next small improvement to it.
- Adjusting type, color, and layout in `src/styles/global.css` and `src/prototypes/catalog.ts`.
- An RSS feed, or a visual editor on top of the Markdown, if you discover you need them. Search and the bio are already here.

Custom does not mean “invent a new system from a blank file.” Reasonable custom paths, from lightest to heaviest:

1. **Use a generator and a theme.** Jekyll or Hugo, a theme you both like, Markdown for every post. Fastest way to a real blog. Least like a designed object.
2. **Use Astro or Eleventy and design one layout.** Your friend builds a single reading page. You never think about components. This is the best “we want it to feel like ours” path for most pairs.
3. **Keep this project.** The navigation, the content folder, and the GitHub Pages setup are already here, and the gallery is already gone. Improve Window Seat one change at a time. Do this if this is the room you want to stay in.
4. **Treat an old sketch as a brief, only if you truly need a different room.** `design/prototypes.md` describes the site you have. A second layout is a large decision, not the default next step.

What you should not do, early, is design a login system, a commenting platform, and a custom database. A book blog can be a stack of pages. Comments can be an email link. Subscriptions can be a newsletter you add when strangers are actually reading.

## Putting it on GitHub Pages

GitHub Pages serves a static folder. This app is built for that in two ways.

- The build command (`npm run build`) writes a `dist/` folder, then copies the JavaScript, CSS, and favicon to the repository root. GitHub Pages is set to deploy from the `main` branch, folder `/ (root)`, and serves those files directly. The workflow in `.github/workflows/pages.yml` rebuilds and commits them when changes land on `main`.
- The address of each page uses a **hash**, the `#` in a URL. `#/reviews` is still the same `index.html` file as far as the server is concerned. The browser, and the state machine in this project, read the part after `#` and decide what to show. That works on GitHub Pages project sites (`https://yourname.github.io/your-repo/`) without a special server rule. The asset paths are relative for the same reason.

A hash address will not give you pretty links like `/reviews/jane-eyre` without extra hosting setup. For a first static blog, that is a fair trade. If you later move to Netlify, Cloudflare Pages, or your own server, a developer can switch the router. The essays would not have to change.

## A checklist for the first real post

- [ ] I finished the book, or I am honest about where I stopped.
- [ ] I have three concrete notes, not just a star rating.
- [ ] The draft opens inside a scene.
- [ ] I quoted less than I talked.
- [ ] The front matter has a slug, title, dek, publication date, and at least one tag.
- [ ] A review names one or more books with `bookId` or `bookIds`. A blog post has a book, an author, and a genre.
- [ ] I read the essay on Window Seat, including the metadata at the top.
- [ ] `npm run build` succeeds.
- [ ] I committed the Markdown file.

Then go read something else. The site can wait. The next book is the point.
