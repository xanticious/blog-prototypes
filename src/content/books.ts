import { coverKeys, type OpenLibraryCover } from "./covers";

export type Book = {
  id: string;
  title: string;
  authors: string[];
  year: string;
  genres: string[];
  /**
   * Jacket copy shown beside the cover. A few paragraphs, separated by a
   * blank line: people, place, and trouble, with the ending left unread.
   */
  blurb: string;
  /** Open Library cover. Prefer `id` or `olid`; ISBN, OCLC, and LCCN are rate-limited. */
  cover?: OpenLibraryCover;
};

export const books: Book[] = [
  {
    id: "pride-and-prejudice",
    title: "Pride and Prejudice",
    authors: ["Jane Austen"],
    year: "1813",
    genres: ["romance"],
    blurb: `Mrs. Bennet has five daughters and one piece of news worth repeating: a single gentleman of good fortune has taken Netherfield Park. Jane, the eldest, is as sweet as the neighborhood hopes. Elizabeth, the next, would rather be amused than agreeable. At the assembly she hears Mr. Darcy decline to dance with her, and she decides, with great satisfaction, that she has the measure of him.

Around them a small country world counts incomes out loud. A charming officer pays the kind of attention a young woman is told to trust. A clergyman proposes as if the answer were a formality. Visits run long, letters arrive at the wrong hour, and everyone is certain they understand everyone else. The comedy lives in the gap.

Jane Austen’s novel is the story of first impressions, told in drawing rooms, on muddy walks, and in sentences people will wish they could take back. Fortunes are public. Feelings are supposed to be practical. Come for the wit, and for a heroine who answers. The season has only just begun.`,
    cover: { key: "id", value: "12645114" }, // Penguin Classics, ISBN 9780141439518
  },
  {
    id: "frankenstein",
    title: "Frankenstein",
    authors: ["Mary Shelley"],
    year: "1818",
    genres: ["sci-fi", "gothic"],
    blurb: `Captain Walton writes to his sister from a ship locked in Arctic ice. Out of the fog his crew pulls a stranger, half-frozen and still pursuing something they only glimpsed on the pack. The man’s name is Victor Frankenstein. The story he tells begins years earlier, in a room in Ingolstadt, with a student who believes he can give life to matter.

He works alone and shuts the door. On a dreary night in November the figure on the table opens its eye, and Victor’s triumph lasts only as long as it takes him to look. He runs. The being he brought into the world is left to learn the weather, human speech, and the sight of people turning away.

Mary Shelley’s novel is a confession folded inside a voyage. It asks what a maker owes the life he started, and it does not let either of them rest. The ice is still closing in. Victor has not come to the end of what he has to say.`,
    cover: { key: "id", value: "109033" }, // Penguin Classics, ISBN 9780141439471
  },
  {
    id: "jane-eyre",
    title: "Jane Eyre",
    authors: ["Charlotte Brontë"],
    year: "1847",
    genres: ["romance", "romantasy"],
    blurb: `Jane Eyre is small, plain, and unwelcome. At her aunt’s house she is punished for telling the truth. At Lowood school she learns endurance, a fierce friendship, and how to live on too little. When she takes a post as governess at Thornfield Hall, she expects a quiet child and a quiet life. She finds the child. She also finds a corridor that laughs after dark, and a master who speaks to her as if her opinion mattered.

Mr. Rochester is abrupt, wealthy, and bad at pretending. The house has more rooms than Jane is invited to enter. What starts between them is as plain as talk by the fire, and as uneasy as a sound behind a door. Jane has been poor and dependent all her life. She is not willing to be either of those things in love.

Charlotte Brontë’s novel is a romance with weather in it. Read it for a voice that answers back, for the candle along the gallery, and for the feeling that Thornfield is keeping a secret. The secret can wait. Jane will not be hurried.`,
    cover: { key: "id", value: "109090" }, // Penguin Classics, ISBN 9780141441146
  },
  {
    id: "wuthering-heights",
    title: "Wuthering Heights",
    authors: ["Emily Brontë"],
    year: "1847",
    genres: ["romance", "gothic"],
    blurb: `Mr. Lockwood, new to the Yorkshire moors, walks up to Wuthering Heights looking for a landlord and a little civility. He gets neither. The dogs are rough, the company is rougher, and in the night a child’s voice comes to the window and will not be reasoned with. By morning he wants the history of the place. The housekeeper at the neighboring grange has been holding it for years.

Nelly Dean begins with two children and two houses. Catherine Earnshaw and Heathcliff grow up on the heights, as wild as the weather, while Thrushcross Grange below them shines with carpets and rules. One world tries to claim Catherine. The other will not let Heathcliff go. Between the kitchen fire and the open moor, a passion starts that no parlor is going to domesticate.

Emily Brontë’s novel is told by the people who watched from the doorway, and the moor keeps finishing their sentences. Come for the wind off the heights, for a love that refuses to learn manners, and for the hand at the glass that Lockwood cannot send away.`,
    cover: { key: "id", value: "109038" }, // Penguin Classics, ISBN 9780141439556
  },
  {
    id: "dracula",
    title: "Dracula",
    authors: ["Bram Stoker"],
    year: "1897",
    genres: ["fantasy", "gothic"],
    blurb: `Jonathan Harker, a solicitor from Exeter, travels east to help a nobleman finish a purchase in London. Count Dracula is courteous. He knows the train tables. He asks intelligent questions about houses and English law. Harker is pleased to be useful, right up until he understands that the castle doors do not open from his side, that his host casts no reflection, and that the count is preparing a journey the solicitor was not meant to share.

The story comes home in pieces. Mina Murray writes letters. Lucy Westenra keeps notes. Dr. Seward records a patient who eats flies and waits by the window. A ship’s log begins. Professor Van Helsing arrives and asks a practical century to believe something it has no form for. Boxes of earth are already moving toward England. The count intends to follow them.

Bram Stoker’s novel is a file of documents, each one dated, sensible, and a little too late. Start on the road to the castle, with the sound of a door. The people who love one another are still only writing to each other. The crossing has not yet reached port.`,
    cover: { key: "id", value: "12216503" }, // Open Library edition OL35373336M
  },
  {
    id: "dorian-gray",
    title: "The Picture of Dorian Gray",
    authors: ["Oscar Wilde"],
    year: "1890",
    genres: ["gothic"],
    blurb: `In a London studio that smells of lilac and paint, Basil Hallward is finishing a portrait and wishing he had never let his friend through the door. Lord Henry Wotton arrives anyway, trailing opinions. He tells the sitter, Dorian Gray, that beauty is brief, that goodness is dull, and that a young man ought to hurry. Dorian looks at the face on the canvas and says aloud that he would give anything if the picture would grow old, and he could stay as he is.

The wish holds. Seasons turn and Dorian does not. He goes out into the city for music, scent, and company, and the portrait goes upstairs under a cloth, where no one is invited to look. Rumors begin to follow him. When he dares to lift the cloth, the painting has started a record his mirror will not keep.

Oscar Wilde’s novel is a fable dressed for dinner: bright talk, beautiful rooms, and a bargain that does not care how charming you are. Come for the sentences. They are a pleasure. Then turn the page, and leave the thing in the schoolroom waiting.`,
    cover: { key: "id", value: "15259210" }, // Penguin Classics, ISBN 9780141439570
  },
];

const seenIds = new Set<string>();
for (const book of books) {
  if (seenIds.has(book.id)) throw new Error(`Duplicate book id "${book.id}"`);
  seenIds.add(book.id);
  if (book.authors.length === 0 || book.authors.some((name) => !name.trim())) {
    throw new Error(`Book "${book.id}" needs at least one author`);
  }
  if (book.genres.length === 0 || book.genres.some((genre) => !genre.trim())) {
    throw new Error(`Book "${book.id}" needs at least one genre`);
  }
  if (!book.blurb.trim()) {
    throw new Error(`Book "${book.id}" needs a blurb`);
  }
  if (book.cover && (!coverKeys.includes(book.cover.key) || !book.cover.value.trim())) {
    throw new Error(`Book "${book.id}" needs an Open Library cover key and value`);
  }
}

const byId = new Map(books.map((book) => [book.id, book]));

export function getBook(id: string): Book | undefined {
  return byId.get(id);
}

function uniqueNames(groups: string[][]): string[] {
  const seen = new Set<string>();
  const names: string[] = [];
  for (const group of groups) {
    for (const name of group) {
      const trimmed = name.trim();
      if (!trimmed || seen.has(trimmed)) continue;
      seen.add(trimmed);
      names.push(trimmed);
    }
  }
  return names;
}

export function authorsOf(booksInPiece: Book[]): string[] {
  return uniqueNames(booksInPiece.map((book) => book.authors));
}

export function genresOf(booksInPiece: Book[]): string[] {
  return uniqueNames(booksInPiece.map((book) => book.genres));
}

export function yearsOf(booksInPiece: Book[]): string[] {
  return uniqueNames(booksInPiece.map((book) => [book.year]));
}
