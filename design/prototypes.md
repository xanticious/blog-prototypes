# Window Seat

These notes describe the site as it is now. Read `design/getting-started.md` first if you want the writing workflow. This file is about the one design we kept, and about how a new essay finds its way onto the page.

An earlier version of this repository was a studio: the same reviews, set in many combinations of type, color, layout, and navigation, with a gallery on the home screen for comparing them. That comparison is over. Window Seat is the prototype we liked. From here, change this site in small steps. Do not bring the gallery back unless a decision truly needs a second room.

## What the reader sees

Window Seat is a lamp-warm reading room: clay, sage-brown, and cream. EB Garamond carries the titles and the essays. The home page is a tight grid of covers. Open a review and the page narrows. The jacket sits at the top left of a gray panel, and a short blurb wraps beside it, because the cover that led you here should still be in the room. A round button in the corner opens the sections. Other posts stay listed beside an essay, a post, or the poem.

The sections are:

| Hash | Screen |
| --- | --- |
| `#/` | Home |
| `#/book-reviews` | The review index |
| `#/book-reviews/jane-eyre` | One review. The last piece is the note’s slug. |
| `#/posts` | The blog posts |
| `#/posts/close-reading` | One post |
| `#/search` | Search book reviews or blog posts, by one genre, one author, one tag, or the text of a piece |
| `#/bio` | Naomi Pell |
| `#/poems/margin-light` | The poem |
| `#/about` | Why the room looks like this |

An older address such as `#/reviews`, `#/guides`, or `#/p/window-seat/reviews` still opens the same screen. The bar rewrites it to `#/book-reviews` or `#/posts`.

An unknown section falls back to home. A missing essay stays on its route and shows a short “not on the shelf” message. The machine does not invent content.

## What every post carries

Reviews live in `src/content/reviews/*.md`. Blog posts live in `src/content/guides/*.md`. The poem lives in `src/content/poems/`.

A review names one or more books with `bookId` or `bookIds`. Every id must exist in `src/content/books.ts`. Separate several ids with commas. That is how a series, or a related shelf such as the two Brontë novels, shares one note. Each book record supplies the title, one or more authors, the original year, and one or more genres (`romance`, `sci-fi`, `fantasy`, `romantasy`, `gothic`, and so on). The review file adds a publication date (when the note went up) and one or more tags. `spoilers: true` turns on the warning. Author names are compared as whole strings, so two books by the same person share one name in the author menu, and a note that lists two authors appears under each name.

A blog post does not need a cover, and it does not need a book. Its front matter carries the publication date, one or more genres, and the tags. A book is optional. When you add one, give `book`, `author`, and `bookPublished` together. The book is the one the post is in conversation with. It can be a novel already on the shelf, or one that is not. Separate extra genres with commas. The posts on the site now do not name a book.

```markdown
---
slug: editing-markdown
title: "A Few Tools for Writing in Markdown"
dek: "One sentence for someone who has not decided to read yet."
published: "2026-05-18"
genre: fantasy
tags: markdown, writing, tools, beginners
---
```

`slug` is the bit that shows up in the address. Use lowercase words and hyphens, and do not change it after you have shared the link. Tags are separated by commas, and so are genres. At least one of each is required. If a required fact is missing, the build says which file. A blog post that starts a book and leaves out the author or the year fails the same way.

Search looks through book reviews or blog posts, and never both at once. It keeps a piece when it has the genre you picked, the author you picked, and the tag you picked. A review of several books matches if any of those books has the genre, and if any of its authors is the one you picked. A blog post with no book does not match an author. Leave a menu on “any” and that fact is not used. The genre, author, and tag menus list only the kind you are searching. Text search looks through the title, the dek, every book title and year, every author, the genres, the tags, and the body. It sorts by how many times the text appears. A tie goes to the newer post. With the text field empty, the list is newest first. Switching kinds drops a genre, author, or tag that the other kind does not have.

The poem is an article, not a review. It does not carry book metadata, and search does not include it.

Some reviews use a spoiler warning. A whole paragraph can sit in a collapsed block (`:::spoiler` … `:::`). A phrase inside a sentence can be an inline spoiler: `I loved it when ||Elizabeth and Darcy got together||.` The page shows the word “spoiler” until it is clicked, and bold or italic inside the bars still works. The poem uses `:::verse` so line breaks survive. The books are in the public domain. The notes, the posts, and the poem are original sample writing.

A book can name an Open Library cover in `src/content/books.ts`: `cover: { key: "id", value: "12645114" }`. The key may be `id`, `olid`, `isbn`, `oclc`, or `lccn`. Home tiles request the large image, a panel requests the medium one, and a list requests the small one. ISBN, OCLC, and LCCN lookups are rate-limited; cover id and OLID are not. If the image is missing, or the book has no cover, the page uses the drawn jacket in `src/components/BookCover.tsx`. The poem keeps its drawing.

Each book also has a `blurb`, a short paragraph written for this shelf. On a review, `CoverBlurb` (`src/components/CoverBlurb.tsx`) sets the jacket at the top left of a gray panel and lets the blurb fill the rest, wrapping under the jacket. A post can ask for the same panel with a line on its own: `:::book jane-eyre`. The fields and the rest of the marks are listed in the post `markdown-format`.

## Navigation, and where the state lives

The app does not use a routing library. It uses [XState](https://stately.ai/docs) (version 5) and the browser’s hash. There is one state, `bookBlog`, and the interesting information sits in the context:

| Piece of context | What it means |
| --- | --- |
| `route` | Window Seat, plus the section inside it. |
| `menuOpen` | Whether the section links are open. |
| `sidebarMode` | Kept for a side-bar shell, if a later tweak needs one. Window Seat uses the floating menu instead. |

| Event | Who sends it | What it does |
| --- | --- | --- |
| `OPEN_VIEW` | A section link, a review, a post, or a search result | Changes the section and updates the hash. |
| `HASH_CHANGED` | The browser, when the address hash changes | Re-reads the address. This is how the Back button works. |
| `TOGGLE_MENU` / `CLOSE_MENU` | The round button, and the Escape key | Opens or closes the section list. |
| `OPEN_PROTOTYPE` | A recovery link | Returns to Window Seat’s home. |
| `CYCLE_SIDEBAR` | Unused by the current shell | Cycles a side bar through collapsed, icons, and labels. |

When the machine changes the route, an action writes the matching hash if the address is not already that hash. The machine is the source the screen reads. The hash is the source the browser remembers. A refresh restores the same page, which is what makes the site legal on a static host.

The screen scrolls to the top when the route changes. Opening the menu does not scroll. Search choices live in the search page itself. They reset when you leave, because they are a tool, not a place you need to bookmark yet.

The code lives in `src/machine/appMachine.ts`, `src/machine/routes.ts`, and `src/machine/AppState.tsx`. Links still have real `href`s, so command-click and middle-click keep working.

## Changing the room

Window Seat is data in `src/prototypes/catalog.ts` (`sitePrototypeId` is `window-seat`) plus CSS in `src/styles/global.css`. Prefer a color, a measure, or a type tweak over a new HTML structure. The review page and the post page share one article shape, so an essay cannot drift out of date in one place and not another.

A new section, such as the bio or search, needs a `View` kind in `src/machine/routes.ts`, a hash in both directions, a label, and a branch in `PrototypeApp`. Add it to the menu in `internalNav`.

`design/futureenhancements.md` is a brainstorm of one hundred directions, sorted so we can also see the ones we may never want. It is not a plan.
