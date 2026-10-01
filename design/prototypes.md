# Window Seat

These notes describe the site as it is now. Read `design/getting-started.md` first if you want the writing workflow. This file is about the one design we kept, and about how a new essay finds its way onto the page.

An earlier version of this repository was a studio: the same reviews, set in many combinations of type, color, layout, and navigation, with a gallery on the home screen for comparing them. That comparison is over. Window Seat is the prototype we liked. From here, change this site in small steps. Do not bring the gallery back unless a decision truly needs a second room.

## What the reader sees

Window Seat is a lamp-warm reading room: clay, sage-brown, and cream. EB Garamond carries the titles and the essays. The home page is a tight grid of covers. Open a piece and the page narrows, and the jacket stays beside the title, because the cover that led you here should still be in the room. A round button in the corner opens the sections. Other posts stay listed beside an essay, a guide, or the poem.

The sections are:

| Hash | Screen |
| --- | --- |
| `#/` | Home |
| `#/reviews` | The review index |
| `#/reviews/jane-eyre` | One review. The last piece is the note’s slug. |
| `#/guides` | The blog posts |
| `#/guides/close-reading` | One post |
| `#/search` | Filter by one genre, one author, one tag, or the text of a piece |
| `#/bio` | Naomi Pell |
| `#/poems/margin-light` | The poem |
| `#/about` | Why the room looks like this |

An older address such as `#/p/window-seat/reviews` still opens the same screen. The bar rewrites it to `#/reviews`.

An unknown section falls back to home. A missing essay stays on its route and shows a short “not on the shelf” message. The machine does not invent content.

## What every post carries

Reviews live in `src/content/reviews/*.md`. Blog posts live in `src/content/guides/*.md`. The poem lives in `src/content/poems/`.

A review names one or more books with `bookId` or `bookIds`. Every id must exist in `src/content/books.ts`. Separate several ids with commas. That is how a series, or a related shelf such as the two Brontë novels, shares one note. Each book record supplies the title, one or more authors, the original year, and one or more genres (`romance`, `sci-fi`, `fantasy`, `romantasy`, `gothic`, and so on). The review file adds a publication date (when the note went up) and one or more tags. `spoilers: true` turns on the warning. Author names are compared as whole strings, so two books by the same person share one name in the author menu, and a note that lists two authors appears under each name.

A blog post does not need a cover. Its own front matter carries the book, the author, the book’s year (`bookPublished`), the publication date, one or more genres, and the tags. The book is the one the post is in conversation with. It can be a novel already on the shelf. Separate extra genres with commas.

```markdown
---
slug: editing-markdown
title: "A Few Tools for Writing in Markdown"
dek: "One sentence for someone who has not decided to read yet."
book: "Alice’s Adventures in Wonderland"
author: "Lewis Carroll"
bookPublished: "1865"
published: "2026-05-18"
genre: fantasy
tags: markdown, writing, tools, beginners
---
```

`slug` is the bit that shows up in the address. Use lowercase words and hyphens, and do not change it after you have shared the link. Tags are separated by commas, and so are genres. At least one of each is required. If a required fact is missing, the build says which file.

Search keeps a piece when it has the genre you picked, the author you picked, and the tag you picked. A review of several books matches if any of those books has the genre, and if any of its authors is the one you picked. Leave a menu on “any” and that fact is not used. Text search looks through the title, the dek, every book title and year, every author, the genres, the tags, and the body. It sorts by how many times the text appears. A tie goes to the newer post. With the text field empty, the list is newest first.

The poem is an article, not a review. It does not carry book metadata, and search does not include it.

Some reviews use a spoiler warning. A whole paragraph can sit in a collapsed block (`:::spoiler` … `:::`). A phrase inside a sentence can be an inline spoiler: `I loved it when ||Elizabeth and Darcy got together||.` The page shows the word “spoiler” until it is clicked, and bold or italic inside the bars still works. The poem uses `:::verse` so line breaks survive. The books are in the public domain. The notes, the posts, and the poem are original sample writing.

Jacket drawings live in `src/components/BookCover.tsx`. They are original drawings, not reproductions of published covers.

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
