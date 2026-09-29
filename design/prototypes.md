# Design notes for the twenty-one blog prototypes

These notes describe the sample site in this repository: a static React app that shows the same book blog twenty-one ways. Read `design/getting-started.md` first if you want the writing workflow and the other tools people use to publish. This file is about the designs themselves, and about how the app is put together so a new design has somewhere to live.

## What the prototypes are for

Choosing a blog design from empty rectangles is hard. Choosing from full pages is easier. Every prototype below renders the same twelve reviews, the same four reading guides, and the same short poem. If one page feels calm and another feels loud, the difference is the room, not the essay.

The home screen of the app is not one of the twenty-one. It is a comparison table: a specimen of type and color, the font names, the mood, the layout family, and the navigation shell. Filters narrow that table. They are application state, not a separate website address, so the filter resets only when you refresh.

Nothing here is a finished brand. Several prototypes are deliberately plain (Chapbook, Quiet Index) so the set includes a minimum, not only costumes.

## What every prototype shares

- **The same essays**, loaded from `src/content/reviews/*.md`, `src/content/guides/*.md`, and `src/content/poems/*.md`.
- **The same books and covers.** Book facts live in `src/content/books.ts`. Jacket drawings live in `src/components/BookCover.tsx`. Covers do not change when the room changes. A book should stay recognizable across the comparison. The poem has its own small jacket, drawn the same way.
- **The same sections.** Home, Reviews, a single review, Guides, a single guide, the poem, and About this design.
- **One state machine** for that navigation and for the rest of the UI state. The chrome around the sections is not identical: each prototype picks a shell.

The About page of each prototype repeats, in the site itself, the short rationale you will also find in the catalog below.

## Navigation, and where the state lives

The app does not use a routing library. It uses [XState](https://stately.ai/docs) (version 5) and the browser’s hash.

XState is a way of writing down the states a page can be in, and the events that move it. Here the machine is small on purpose. There is one state, `bookBlog`, and the interesting information sits in the context:

| Piece of context | What it means |
| --- | --- |
| `route` | Either the prototype gallery, or one prototype plus the section inside it. |
| `menuOpen` | Whether the section links are open. On a narrow screen this is the Menu button. On a floating-menu shell it is the hamburger. |
| `sidebarMode` | For side-bar shells: `collapsed`, `icons`, or `text`. Cycling does not change the address and does not scroll. |
| `galleryFilter` | Which mood is selected on the comparison table. `all` shows every prototype. |

Events are the only way those values change:

| Event | Who sends it | What it does |
| --- | --- | --- |
| `OPEN_PROTOTYPE` | A card on the gallery | Enters that prototype’s home and updates the hash. |
| `OPEN_VIEW` | A section link, a review, or a guide | Changes the section inside the current prototype. Ignored if you are somehow not inside one. |
| `GO_GALLERY` | “All prototypes” | Returns to the comparison table. |
| `HASH_CHANGED` | The browser, when the address hash changes | Re-reads the address. This is how the Back button works. |
| `TOGGLE_MENU` / `CLOSE_MENU` | The Menu button, the floating hamburger, and the Escape key | Opens or closes the section list. |
| `CYCLE_SIDEBAR` | The control on a side-bar shell | Moves that shell through collapsed, icons only, and text labels. |
| `SET_FILTER` | A filter chip | Changes the gallery filter without touching the address. |

When the machine changes the route, an action writes the matching hash (`#/p/folio/reviews/...`) if the address is not already that hash. When the visitor uses Back, the browser changes the hash, the machine receives `HASH_CHANGED`, and the screen follows. The machine is the source the screen reads. The hash is the source the browser remembers. They are kept in step so a refresh restores the same page, which is what makes the site legal on a static host.

Addresses look like this:

| Hash | Screen |
| --- | --- |
| `#/` | The comparison table |
| `#/p/inkwell` | That prototype’s home |
| `#/p/inkwell/reviews` | The review index |
| `#/p/inkwell/reviews/jane-eyre` | One review. The last piece is the essay’s slug. |
| `#/p/inkwell/guides` | The guide index |
| `#/p/inkwell/guides/close-reading` | One guide |
| `#/p/inkwell/poems/margin-light` | The poem |
| `#/p/inkwell/about` | Why this prototype looks the way it does |

An unknown prototype id, or a nonsense section, falls back to the gallery or to that prototype’s home. A missing essay slug stays on the review route and shows a short “not on the shelf” message with a way back. The machine does not invent content.

The screen scrolls to the top when the route changes. Opening the menu or changing a filter does not scroll. That split is deliberate: menu and filter are state, but they are not navigation.

The code lives in `src/machine/appMachine.ts`, `src/machine/routes.ts`, and `src/machine/AppState.tsx`. Components send events through `useApp()`. Links still have real `href`s, so command-click and middle-click keep working. An ordinary click is handed to the machine instead of letting the browser be the only one who heard it.

## How a prototype is defined

A prototype is data, in `src/prototypes/catalog.ts`, not a separate application. Each entry records:

- **id**, used in the hash.
- **name, tagline, description, about.** The about text is the design rationale shown on the About page.
- **mood**, used by the gallery filter: literary, dark, editorial, educational, cozy, playful.
- **layout**, one of twelve page structures.
- **shell**, one of four app frames: a sticky top bar, a top bar that scrolls away, a floating hamburger, or a left side bar with three widths.
- **relatedPosts**, optional. When set, an individual article gets a right-hand list of other posts. Reading Nook, Storybook Hour, Chapbook, and Window Seat do not use it.
- **tone**, light or dark, which sets the browser’s form and scrollbar color scheme.
- **fonts**, as CSS font-family stacks, plus a human label for the gallery.
- **palette**, seven colors: page background, ink, muted text, accent, text on the accent, a surface (cards, paper), and a rule (hairlines and borders).
- **featuredSlug**, which review leads the home page.

The shell paints those values as CSS variables on one wrapper: `--bg`, `--ink`, `--display`, and so on. `src/styles/global.css` does the rest. Layouts share one HTML structure for a review, so an essay cannot drift out of date in one theme and not another. Home pages share a structure too: an introduction, a featured review, the shelf, and the guides. The layout attribute changes the grid, the scale of the type, and what is allowed to be loud.

A few prototypes add a `data-id` tweak on top of their layout. Chapbook and Inkwell are both narrow columns; Chapbook hides the covers and the excerpts. Folio and Salt & Page are both magazine spreads; Salt is airier and less uppercase. That is cheaper, and more honest, than copying twenty-one folders.

### The four shells

The essay HTML stays shared. The frame around it does not.

| Shell id | What the visitor sees | Where to look |
| --- | --- | --- |
| `sticky` | The current top bar. It stays pinned while the page scrolls. | Window Seat, Inkwell, Chapbook, Reading Nook, Seminar, Storybook Hour |
| `static` | The same top bar, but it scrolls away with the page. | Night Stacks, Broadsheet, Lantern, Salt & Page, Salon |
| `hamburger` | No bar. A round button floats at the top left and opens the sections. | The Margin, Manuscript, Botanical Press, Velvet Circle, Atlas |
| `sidebar` | A left column with three states: collapsed, icons only, and text labels. A button in the column cycles them. | Folio, Card Catalog, Grid & Rule, Ephemera, Quiet Index |

Inkwell, Night Stacks, and Grid & Rule also show a right-hand list of other posts when you open an article, a guide, or the poem. That panel is not part of Reading Nook, Storybook Hour, Chapbook, or Window Seat.

### The twelve layouts

| Layout id | What the visitor sees |
| --- | --- |
| `column` | A narrow measure, like a printed book. Titles centered or nearly so. |
| `stacks` | A tall featured panel, then a sideways-scrolling shelf of covers. |
| `rail` | A list of books fixed to the side, and, on a review, a facts card in the margin. |
| `broadsheet` | A newspaper masthead and a multi-column front page. |
| `cards` | Rounded or framed cards with the cover as the picture. |
| `folio` | A magazine spread. The headline is the poster. |
| `catalog` | Manila cards with a hole punch and a monospace number. |
| `manuscript` | One ruled sheet on a desk, set in a typewriter face. |
| `grid` | A strict modular grid, thick rules, big index numbers, no covers on the index. |
| `scatter` | Notes tilted a degree or two, like papers on a table. |
| `index` | Rows: number, title, meta. The control group. |
| `tiles` | A tight grid of square covers, like a photo app. The essay page narrows to a chapbook measure and keeps the cover. |

On a narrow screen the columns become one column, the side rail becomes a sideways list, and the section links collapse behind a Menu button. The Menu button’s open or closed value is the machine’s `menuOpen` flag.

## The shelf the designs are dressed with

Twelve reviews, each a long essay with a scene, a closer look, and a reservation or a way in:

| Book | Essay |
| --- | --- |
| *Pride and Prejudice*, Jane Austen | The Intelligence of Manners |
| *Frankenstein*, Mary Shelley | The Creature Who Learned to Read |
| *Jane Eyre*, Charlotte Brontë | A Voice That Will Not Shrink |
| *Moby-Dick*, Herman Melville | The Ship That Contains a World |
| *Crime and Punishment*, Fyodor Dostoevsky | Fever, Theory, and a Staircase |
| *Wuthering Heights*, Emily Brontë | Weather as a Moral Force |
| *Dracula*, Bram Stoker | Many Voices, One Hunger |
| *The Odyssey*, Homer | Getting Home Is the Whole Story |
| *Alice’s Adventures in Wonderland*, Lewis Carroll | The Logic of Nonsense |
| *The Picture of Dorian Gray*, Oscar Wilde | A Portrait That Keeps the Score |
| *A Tale of Two Cities*, Charles Dickens | The Private Cost of Public History |
| *Don Quixote*, Miguel de Cervantes | When Reading Rewrites the World |

Four guides: how to write a review, a three-pass close reading, a reading journal you will keep, and how to talk about a book with friends.

One poem, “Margin Light,” sits on the home shelf with the reviews. It is an article, not a review of a book. Its address is under `poems/`.

Some essays, not all of them, carry extra marks so the prototypes can be compared with real article furniture:

- A spoiler warning (“This review contains spoilers”) on the reviews that discuss an ending.
- A collapsed spoiler block. The control reads “Spoiler, click to reveal.” Opening it shows the hidden paragraphs. The fence in the Markdown file is `:::spoiler` … `:::`.
- A pull quote, a numbered list, a bulleted list, and a few words in italics or bold. No single essay is required to use every one of these.

The poem uses a `:::verse` fence so line breaks survive. Wuthering Heights is one of the essays left without a spoiler or a list, on purpose.

The books are in the public domain. The essays and the poem are original sample writing, written so the layouts have real paragraphs, pull quotes, and subheadings to shape. They are not a claim that these are the only books a blog should cover. Replace them.

## The twenty-one

Numbers match the gallery.

### 01 · Window Seat

Cozy cover tiles. The palette is Reading Nook’s clay and cream. The type is Chapbook’s EB Garamond. Home is a square grid of jackets, in the spirit of Storybook Hour’s covers and tighter, like a photo grid. Open an essay and the page becomes Chapbook’s narrow centered column, with the cover kept above the title. The top bar stays sticky. There is no related-posts panel.

### 02 · Inkwell

Literary narrow column. Fraunces for titles, Source Serif 4 for the essays, oxblood only as a second ink. Cream paper, hairline rules, a drop cap on the first paragraph. Choose this when the writing should be louder than the chrome. It is the “quarterly” end of the set.

### 03 · Night Stacks

Dark stacks layout. Cormorant Garamond and Outfit, gold used the way a spine stamp uses gold. The featured book occupies the first screen; the rest of the shelf scrolls sideways. A closed library, not a newspaper.

### 04 · The Margin

Educational rail. Literata, which was designed for long reading, plus Public Sans. The rail is navy. The facts card on a review is the yellow of a student’s note. Built for a site that will collect cross-references.

### 05 · Broadsheet

Editorial newspaper. Newsreader and Archivo, a red kicker, a full-width masthead, three columns on a wide screen. The front page believes in headlines. The essay page still gives the paragraph a measure it can live in.

### 06 · Chapbook

Literary narrow column, pushed toward a minimum. EB Garamond only, almost no accent, covers hidden on the index, excerpts hidden. Huge margins. This is the prototype you look at when the others feel busy. If Chapbook is the one you like, you like reading more than browsing.

### 07 · Reading Nook

Cozy cards. Lora and Nunito, clay and sage and cream, soft corners. A bookshop table. A personal blog that wants to feel inhabited can start here without looking like a template from a children’s app.

### 08 · Folio

Editorial magazine. Bodoni Moda and Jost. Black, white, and one red. The home title is enormous and uppercase; the featured headline is a poster beside the cover. Confident writing survives this frame. Timid writing looks dressed up.

### 09 · Card Catalog

Literary catalog. Libre Baskerville for titles, IBM Plex Mono for the numbers, manila and oak and a stamp red. Each essay is a card with a punched hole. Better for an archive than for a single featured post. The index is the design.

### 10 · Lantern

Dark column, but not Night Stacks. Spectral, inside a warm sheet of paper, with the rest of the room falling off into brown-black. One lamp. No carousel. Night reading without a poster.

### 11 · Manuscript

Literary manuscript page. Courier Prime on blue ruling, centered on a desk-colored ground. Navigation looks like the header of a student paper. A reminder that essays begin as drafts. Handmade on purpose.

### 12 · Botanical Press

Cozy cards, different climate from Reading Nook. Crimson Pro, moss and cream, berry used as a field-guide label. Cards are square-cornered and outlined, like plates, not pillows.

### 13 · Salt & Page

Editorial folio with the volume turned down. Fraunces and Outfit, sea-glass and sand. The headline is large but not shouted. A spread for a long afternoon. Pick this if you liked Folio’s structure and not its severity.

### 14 · Velvet Circle

Dark column for a book club that dresses for the meeting. Playfair Display, burgundy, blush, a gold line. Titles in italic. Centered openings, left-aligned essays. Reads like a members’ letter.

### 15 · Seminar

Educational rail aimed at the guides as much as the reviews. Source Serif 4 with Source Sans 3, a matched textbook pair. Kickers sit on a yellow highlight. The rail is a numbered lesson list. Start here if the blog’s job is to teach reading, not only to recommend books.

### 16 · Salon

Literary column with more perfume than Inkwell. Cormorant Garamond italics for titles, Cardo for the body, powder and rose. It wants first-person essays and after-dinner talk. The drop cap comes back.

### 17 · Atlas

Educational rail as a map legend. Alegreya and Outfit, map cream, ink blue, compass red. The side list is a dark legend. Good when reviews are long and people need to jump.

### 18 · Storybook Hour

Playful cards. Fraunces and Nunito, butter yellow and sky blue, covers large, cards outlined in ink with uneven corners. The essays are still adult criticism. The room is the one that would welcome a read-aloud club without talking down.

### 19 · Grid & Rule

Editorial modular grid. Syne and Archivo. Thick black rules, a red numeral, no covers on the index. The anti-ornament option. Look at it when the cozy prototypes feel like they are apologizing.

### 20 · Ephemera

Playful scatter. Libre Baskerville for the actual reading, Patrick Hand for the little labels, kraft paper, notes rotated a degree. The mess is the design. The essay measure stays serious so the scrapbook does not eat the paragraph.

### 21 · Quiet Index

Literary index, and the control group. Manrope for the interface, Newsreader only once you are inside an essay. Rows instead of cards. An olive accent, rarely. Look at this one after the others. It shows how little interface a blog needs.

## Adding another prototype

1. Add an object to the `prototypes` array in `src/prototypes/catalog.ts`. Reuse a `layout` unless the new idea truly needs a new structure.
2. If the fonts are not already loaded, add them to the Google Fonts links in `index.html`. Do not add a font for one heading if an existing face will do.
3. If you need a tweak that would spoil the shared layout, scope it with `.prototype[data-id="your-id"]` in `src/styles/global.css`. Prefer variables (color, type) over a new HTML structure.
4. Give it a `featuredSlug` that already exists, so the home page has something to lead with.
5. Open the gallery and compare it with its nearest neighbor. If you cannot tell them apart in five seconds, they should not both stay.

A new layout, if you truly need one, means a new `LayoutId`, a branch in the shell only if the navigation chrome changes (the rail is the example), and a block of CSS. Keep the review HTML stable.

## What this set leaves out on purpose

- Accounts, comments, and likes. A static site can link to an email or a newsletter when those become real needs.
- A database. The content is the repository.
- Search. Twenty-one prototypes and a short shelf do not need it. A generator such as Eleventy or a small client-side index can add it later.
- Distinct essays per prototype. Sharing the text is the experiment. A production blog would keep one design and let the writing be the thing that changes.

When you have chosen, delete the gallery or hide it, keep the content folder, and let the site become a blog instead of a studio. The machine can stay. A blog still has pages, and the hash will still behave on GitHub Pages.
