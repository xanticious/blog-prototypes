---
slug: covers-and-blurbs
title: "Where a Cover and a Blurb Can Come From"
dek: "Free pictures, paid catalogs, and jackets you make yourself, including the two sources this shelf already uses."
published: "2026-07-20"
genre: historical
tags: covers, blurbs, images, design
---

A review wants two things beside the essay: a picture of the book, and jacket copy that tells a reader what kind of story they are about to walk into. The picture is the cover. The copy is the blurb. Both are easy to want and awkward to borrow, because the interesting jackets and the smooth flap copy usually belong to someone else.

This is the panel the review page uses. The jacket is at the top left. The blurb fills the rest of the gray field, starting level with the top of the jacket and wrapping underneath.

:::book jane-eyre

The rest of this note is a tour of where that picture and that jacket copy can come from. It includes the free options, the paid ones, and the homemade ones, and it starts with the two this shelf already depends on.

## What this shelf already uses

The first source is the [Open Library Covers API](https://openlibrary.org/dev/docs/api/covers). Open Library is a catalog kept by the Internet Archive. A book record in `src/content/books.ts` can name a cover with a key and a value:

```markdown
cover: { key: "id", value: "109090" }
```

The page asks for a picture at an address like this:

```text
https://covers.openlibrary.org/b/id/109090-M.jpg?default=false
```

The key can be `id` (their cover id), `olid` (an edition id such as `OL7440033M`), `isbn`, `oclc`, or `lccn`. The letter before `.jpg` is the size: `S`, `M`, or `L`. A list on this site asks for small, an essay asks for medium, and the home tiles ask for large. `default=false` means a missing picture comes back as “not found,” so the page can draw its own jacket instead of a blank rectangle.

Cover id and OLID are the kinder lookups. ISBN, OCLC, and LCCN are limited to 100 requests from one address every five minutes. A burst past that comes back forbidden. The request itself is free. You do not need an account to show the image.

The second source is a drawing. `src/components/BookCover.tsx` holds a small set of jackets made from type, two colors, and a motif: a house, a key, a bat, a lamp. If a book has no `cover`, or the Open Library picture fails, or the file that comes back is only a pixel or two, the page uses the drawing. The poem uses one of those drawings on purpose. A blog post does not need either kind.

The words in the panel are a third field on the same book record, `blurb`. They were written for this shelf. They are not copied from a flap.

## Free pictures

Open Library is the free catalog this site already calls. Many of the files there were uploaded by libraries and by readers. That is a gift, and it is also a reason to look at what you were given. A novel can be in the public domain while the painting on a 2008 paperback is still a living illustrator’s work. The API will serve the painting anyway. For a review of an old book, an old edition’s jacket, or a cover id you have checked, is the calmer choice. The records on this shelf point at particular Open Library cover ids for that reason.

[Wikimedia Commons](https://commons.wikimedia.org/) is the other large free pile. Search the title with the word “cover,” or search the artist. Commons asks you to filter by license. It is a good home for nineteenth-century bindings, frontispieces, and illustrations whose copyright has run out. Read the file page. “Public domain” and a Creative Commons license are different promises, and both are written there.

The [Internet Archive](https://archive.org/) scans whole books. A title page or a frontispiece from an edition old enough to be out of copyright can become a jacket. You are taking a picture of a page, not downloading a publisher’s current marketing file. Cite the item you took it from, so the next person can find the scan.

Museums are the route if you would rather start from a painting than from a book. The National Gallery of Art, the Metropolitan Museum, the Art Institute of Chicago, and a long list of others release many images with no restrictions, often under the CC0 deed. [Standard Ebooks](https://standardebooks.org/contribute/how-tos/how-to-choose-and-create-a-cover-image) builds its jackets this way: a painting that is in the public domain in the United States, or a museum image explicitly marked CC0, with the title set in type on top. Their how-to is public, and it is strict about proof. A painting you found on a blog is not the same thing as a painting with a deed. Their method is a good one to copy if you want the shelf to look designed and still sleep at night.

The [Library of Congress](https://www.loc.gov/free-to-use/) publishes large sets of prints and photographs that are free to use, with the rights spelled out on each collection. Useful when the book is tied to a place, a war, a city, a face, and you want a document rather than a dust jacket.

Google Books will show you a thumbnail. The picture is often small, and the terms are about displaying Google’s image, not about saving a copy into your own project and keeping it there for years. Fine for a glance while you are deciding which edition you read. A poor archive.

Your public library’s catalog will also show a cover. Looking is free. The file is usually rented by the library from a vendor. Seeing it on their page is not the same as having permission to serve it from yours.

## Paid pictures, and pictures with a license

Some of the best files are free of charge and still not yours to do anything with. A publisher’s press page often has “download the cover” next to a credit line they want printed. Take the file, print the credit, and stop there. That is a license, even when the invoice is zero.

[NetGalley](https://www.netgalley.com/) and [Edelweiss](https://www.edelweiss.plus/) are the advance-copy desks. A campaign gives reviewers a jacket file and a block of marketing copy, and it says how they want it cited. The rules are per book. Read the campaign before you paste.

Bookstores and libraries buy metadata. Ingram distributes covers along with catalog records. Bowker’s Books In Print and Nielsen BookData sell the same kind of record: title, contributors, subjects, and a jacket. A subscription is priced for a shop, not for a person with twelve reviews. If you ever do pay for one, the contract is the part that says whether the image may live on your server or only pass through their address.

Amazon’s Product Advertising API, the one tied to their associates program, can return a cover image. The program rules have long opinions about storing the image, changing it, and whether Amazon’s link has to sit nearby. Read the agreement you are actually under. It changes, and a blog that saves every thumbnail into its own folder is the kind of use those rules were written to refuse.

Then there is the straightforward fee. Hire an illustrator, or a jacket designer, for one book or for a whole shelf. You pay for the work, and the agreement says whether you own the file or license it. Small presses do this for every season. A blog can do it for the books that matter enough to have a picture nobody else has. Stock sites sit one step back from that: you pay for a texture, a photograph of a table, a pattern, and you build the jacket yourself. You are buying an ingredient. You are not buying the right to reproduce someone else’s edition.

## Make the jacket yourself

Most book blogs end up here, at least for some of the shelf. A homemade cover is ordinary, and it is often the only cover you can honestly serve.

The simplest version is type. A rectangle in the proportion of a book, about two wide by three tall, a color, the title, the author. That is what the drawn jackets on this shelf are. They happen to be drawn in code, with a small symbol, because the site is a program. The same idea in [Canva](https://www.canva.com/), Affinity, InDesign, or a slides app is the same idea. Plenty of small presses make the entire jacket in one of those tools. A consistent family of colors will look more like a shelf than twelve unrelated paintings.

Photograph the copy in the room. Daylight, a table, the book standing or lying open at the first sentence. You made the exposure. If the art on the jacket is still under copyright, a photograph beside a review is how most book blogs show the object they are talking about. Keep it a picture of the object. Don’t cut the artwork out and turn it into a logo for the site.

Draw it, if that is the voice of the blog. Pencil, ink, a scan. One motif per book, the way this shelf uses a key for Jane and a bat for the count, is enough to recognize the title across the room.

Or take the Standard Ebooks path above: a public-domain painting, your own type, a credit to the museum or the scan. That is DIY in the same way a quilt from old cloth is DIY. The cloth has a history. The stitching is yours.

A post that is not about one edition can skip the photograph. The poem on this shelf uses the drawn lamp, and it does not pretend to be a paperback.

## Where a blurb can come from

The panel wants the back of the book, not a plot from start to finish. A few paragraphs is the right length. Name the people, the place, and the trouble, and stop before the ending. A reader should be able to tell this book from the one beside it, and should want to open it.

Write it. This is the option this shelf chose. Each book in `src/content/books.ts` has a `blurb`, written here, and `CoverBlurb` prints it. A blank line starts a new paragraph. A review can go on, and it can spoil if it warns. The blurb cannot. It is the copy you would put on the jacket if someone picked the book up while you were still finding the page. Writing it yourself also means you are not storing someone else’s advertisement in your repository.

Open Library’s book records often include a `description`. Sometimes a volunteer wrote it. Sometimes it is the first paragraph of a scan. Sometimes it is a publisher’s text that arrived with the catalog record. Read it. If it is good, let it teach you what the book is keen to emphasize, and then write your own. If you quote their sentence, link the Open Library page.

A library catalog has a summary field, the MARC 520. Catalogers write some of them. Publishers supply others. A sentence from a catalog you trust, with the library named, is a fair borrowing. The whole summary, uncredited, is just an unsigned flap.

For a public-domain book you have more raw material that is actually free. A line from the preface. A notice in a newspaper old enough that its copyright has expired. The novel’s own first paragraph, quoted short, which is sometimes a better lure than any blurb ever written. *Dracula* begins with a travel journal. You can say so in your own words, or you can quote the date and the place and stop.

Publisher jacket copy, and the description on Amazon or Goodreads, are usually one advertisement wearing different clothes. Quote a line if the line is good, and say whose line it is. The whole flap is a paragraph they paid a person to write. Your review is the place for your paragraph.

NetGalley and Edelweiss, again, hand you marketing copy with the advance file. They tell you the credit they want. Use their sentence under their rule, or write past it.

An author’s own site is different when they wrote the description in order to share it. If the page is clearly a press kit, treat it as the publisher’s copy. If you are unsure, ask. A yes is a short email. A pasted biography you were not offered is a different thing.

Wikipedia’s opening paragraph is a summary with a license attached: Creative Commons Attribution-ShareAlike. It reads like an encyclopedia, which is a useful job and a poor lure. If you reuse their wording, keep their credit and their share-alike terms. If you only needed to remember the year and the city, close the tab and write the blurb from the book.

The review magazines, Kirkus, Publishers Weekly, Booklist, Library Journal, sell the right to reprint their sentences. A line on a finished cover usually means someone paid. A blog can link to the review. Reprinting it is a separate conversation, and the conversation has a price.

## A practical order

Start with what you can stand behind. On this shelf that is an Open Library cover id when we have one we trust, a drawn jacket when we do not, and a blurb written in the book record. A post can show the same panel with one line, `:::book jane-eyre`, which is how the panel at the top of this note got here.

If the book is new and still under copyright, write the blurb, and either photograph your copy or ask the publisher for the jacket file and the credit line. If the book is old, you can go further: a scan, a museum painting, a Commons file with the license read. Pay for a picture when you want one that does not already exist. The drawn rectangle is always allowed, and it has the advantage of matching the other drawn rectangles.

The field names, and the `:::book` line, are written out in [The Markdown This Shelf Understands](#/posts/markdown-format). The cover keys are in `src/content/covers.ts`. The drawings are in `src/components/BookCover.tsx`.
