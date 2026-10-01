export type Book = {
  id: string;
  title: string;
  author: string;
  year: string;
  genres: string[];
};

export const books: Book[] = [
  {
    id: "pride-and-prejudice",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    year: "1813",
    genres: ["romance"],
  },
  {
    id: "frankenstein",
    title: "Frankenstein",
    author: "Mary Shelley",
    year: "1818",
    genres: ["sci-fi", "gothic"],
  },
  {
    id: "jane-eyre",
    title: "Jane Eyre",
    author: "Charlotte Brontë",
    year: "1847",
    genres: ["romance", "romantasy"],
  },
  {
    id: "wuthering-heights",
    title: "Wuthering Heights",
    author: "Emily Brontë",
    year: "1847",
    genres: ["romance", "gothic"],
  },
  {
    id: "dracula",
    title: "Dracula",
    author: "Bram Stoker",
    year: "1897",
    genres: ["fantasy", "gothic"],
  },
  {
    id: "dorian-gray",
    title: "The Picture of Dorian Gray",
    author: "Oscar Wilde",
    year: "1890",
    genres: ["gothic"],
  },
];

const byId = new Map(books.map((book) => [book.id, book]));

export function getBook(id: string): Book | undefined {
  return byId.get(id);
}
