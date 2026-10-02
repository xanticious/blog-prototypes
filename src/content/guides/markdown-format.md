---
slug: markdown-format
title: "The Markdown This Shelf Understands"
dek: "The fields at the top of a book review and a blog post, and every mark the page knows how to set."
published: "2026-07-06"
genre: fantasy
tags: markdown, format, writing, beginners
---

A piece on this shelf is a text file. The top of the file is a list of facts. The rest is the writing, with a few marks that mean italic, a heading, a quotation, a hidden sentence. The page reads those marks with a small library called `react-markdown`, plus three extras the shelf added: a spoiler, a verse block, and a cover panel. This note is the list of what that reader accepts.

The files live in two folders. A book review is `src/content/reviews/something.md`. A blog post is `src/content/guides/something.md`. The address uses the slug from the file: `#/book-reviews/jane-eyre` for a review, `#/posts/markdown-format` for a post like this one.

## The header

The file opens with a line of three hyphens, then one fact per line, then another line of three hyphens. The writing starts under that.

```markdown
---
slug: jane-eyre
title: "Book review: Jane Eyre"
dek: "One sentence under the headline."
bookId: jane-eyre
published: "2026-02-02"
spoilers: true
tags: gothic, secrets, romance
---
```

The first colon on a line separates the name from the value. Space around the colon is fine. If the whole value is wrapped in single or double quotes, those quotes are removed. A quote in the middle of a value stays. A blank line in the header is skipped. A name the page does not know is ignored. A required fact that is missing stops the build, and the message names the file.

This is a small reader, not the full YAML language. A value stays on one line. A list is commas on that line, not a column of hyphens under the name.

## A book review

Put the file in `src/content/reviews/`. These are the fields.

- `slug`. Lowercase words and hyphens. This is the last piece of `#/book-reviews/jane-eyre`. If you leave it out, the address becomes the path of the file. Write the slug.
- `title`. The headline.
- `dek`. One sentence under the headline, for someone who has not decided to read yet.
- `bookId`. One or more ids from `src/content/books.ts`, separated by commas.
- `bookIds`. The same kind of list. A review of several books can use either field. If both are present, the ids in `bookId` come first, and a repeated id is kept once.
- `published`. The day the note went up, written `YYYY-MM-DD`.
- `spoilers`. Write `true` to show the line “This review contains spoilers.” Any other value, or no line at all, leaves that warning off.
- `tags`. At least one, separated by commas. A tag cannot contain a comma, because the comma splits the list. Use words a reader might search: `gothic`, `rereading`, `letters`.

At least one book id is required, in either field, and each id has to exist. The book’s title, authors, year, genres, cover, and blurb live on that record. They do not go in the review file. A review of two books lists both ids:

```markdown
---
slug: bronte-novels
title: "Book review: The Brontë novels"
dek: "Jane Eyre and Wuthering Heights, open at the same time."
bookIds: jane-eyre, wuthering-heights
published: "2026-06-20"
spoilers: true
tags: gothic, sisters, comparison
---
```

`bookId: jane-eyre, wuthering-heights` is the same shape. The page lists every title and every author.

## A blog post

Put the file in `src/content/guides/`. The address is `#/posts/` plus the slug.

- `slug`, `title`, `dek`, and `published` do the same work they do on a review.
- `genre`. At least one, separated by commas. The name of the field stays `genre` when there are several: `genre: fantasy, gothic`.
- `tags`. At least one, separated by commas, with the same rule as a review.
- `book`, `author`, and `bookPublished`. Optional, and only as a set. Write all three or leave all three out. A title without an author, or a year without a title, stops the build.

```markdown
---
slug: getting-started-with-git
title: "Git, Briefly, for People Who Write"
dek: "One sentence under the headline."
published: "2026-05-25"
genre: fantasy
tags: git, saving, versions, beginners
---
```

Add a book only when the post is in conversation with one title. The three facts are written in the file, because the book might not be on the shelf and might not have a cover:

```markdown
book: "The Odyssey"
author: "Homer"
bookPublished: "8th century BCE"
```

A post does not take `bookId`, `spoilers`, or a blurb. Genres on a post are the ones you type here. Genres on a review come from the books.

Search reads one kind at a time, reviews or posts. It can take one genre, one author, and one tag. The text field looks through the title, the dek, the book titles and years, the authors, the genres, the tags, and the writing, and sorts by how often the words appear.

## Marks in the writing

Under the header, the page reads [CommonMark](https://commonmark.org/). A blank line starts a new paragraph. The marks below are the ones worth knowing. A fenced block, the kind that opens and closes with three backticks, shows marks as typed. That is how the samples in this note can include a spoiler bar without hiding the sentence.

### Headings, emphasis, and links

Two hashes and a space make a section heading. Three hashes make a smaller one. The page already has a title, so the writing starts at `##`.

One asterisk makes italic, two make bold: `*quiet*` and `**loud**`. Underscores do the same work, `_quiet_` and `__loud__`. Three marks on each side is bold italic. A backslash before a mark shows the mark: `\*not italic\*`.

A link is a label in brackets and an address in parentheses: `[Open Library](https://openlibrary.org/)`. An address wrapped in angle brackets, `<https://openlibrary.org/>`, becomes a link whose label is the address. A bare address, with no brackets, stays plain text.

A picture is the same shape as a link, with a bang in front: `![A short description](https://example.com/jacket.jpg)`. Reviews on this shelf take their jacket from the book record instead. The picture mark is still available.

### Lists, quotations, and code

A hyphen, a plus, or an asterisk at the start of a line makes a list. A number followed by a period makes an ordered list. Indent a line with spaces to nest it under the item above.

```markdown
- a house
- a locked room
  1. the wedding
  2. the return

> A sentence you are quoting.
```

A line that starts with `>` is a quotation. The page sets the whole quotation as a pull quote: larger type, a bar along the left edge. Keep it to a sentence or two.

A word in single backticks is code, in a monospaced face: `` `bookId` ``. A fence of three backticks holds a longer sample. A word on the opening line, such as `markdown`, names the sample for people reading the file. The page does not print that word as a caption, and it does not color the sample.

Three or more hyphens, asterisks, or underscores on a line of their own become a horizontal rule. The header already uses a line of hyphens, so inside the writing that line is a rule, not a second header.

### Spoilers

A phrase inside a sentence can be hidden. The bars stay on one line. The page shows the word “spoiler” until it is clicked, and bold or italic inside the bars still works.

```markdown
I knew something was wrong when ||the wedding stopped||.
```

This sentence is a live one, so you can try it: the wedding stops because ||Rochester already has a wife||.

A whole passage uses a block. The closing mark is on its own line. The page says “Spoiler, click to reveal,” and “Hide spoiler” once it is open. Headings, lists, quotations, and the inline bars all work inside the block.

```markdown
:::spoiler
Bertha is the wife in the attic. The fire comes later.
:::
```

### Verse

A poem that needs its line breaks uses a verse block. The lines are kept as typed. Marks inside the block stay as characters: an asterisk in a poem is an asterisk, not italic. The sample poem on the shelf is set this way.

```markdown
:::verse
The lamp is on.
The margin is still cold.
:::
```

### A cover and a blurb

A line on its own draws the book panel. The id is the book’s id from `src/content/books.ts`.

```markdown
:::book jane-eyre
```

The panel below is that line, live. The jacket sits at the top left of a gray field. The blurb starts level with the top of the jacket and wraps underneath it.

:::book jane-eyre

The words come from the book’s `blurb`. The picture comes from the book’s `cover`, or from the drawn jacket when there is no picture. The component that draws the panel is `CoverBlurb`, in `src/components/CoverBlurb.tsx`. It takes a title, an author, the blurb, and an optional book id. A review page uses it once for each book on the note. A post uses the `:::book` line.

An id that is not on the shelf leaves a short note in place of the panel. Inside a fenced sample, the line is shown as typed, which is why the sample above did not draw a second panel.

### Marks the page leaves alone

A few things people expect from other editors are not part of this reader.

- A table built from pipes stays a paragraph with pipes in it. There is no table plugin.
- Two tildes on each side, `~~removed~~`, stay tildes. There is no strikethrough.
- A footnote marker such as `[^1]` stays as typed.
- A task box, `- [ ]`, is an ordinary list item with brackets in it.
- An HTML tag is shown as characters. `<em>hello</em>` does not become italic. The page does not run HTML.
- The page does not run MDX. A review cannot embed a program. The cover panel, the spoiler, and the verse block are the three extensions, and they are the ones above.

Bold, italic, a list, a quotation, a heading, a link, a spoiler, and a fence will carry a review. The rest of the file is sentences.
