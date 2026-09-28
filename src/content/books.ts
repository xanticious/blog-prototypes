export type Book = {
  id: string;
  title: string;
  author: string;
  year: string;
  genre: string;
};

export const books: Book[] = [
  {
    id: "pride-and-prejudice",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    year: "1813",
    genre: "Novel of manners",
  },
  {
    id: "frankenstein",
    title: "Frankenstein",
    author: "Mary Shelley",
    year: "1818",
    genre: "Gothic novel",
  },
  {
    id: "jane-eyre",
    title: "Jane Eyre",
    author: "Charlotte Brontë",
    year: "1847",
    genre: "Gothic romance",
  },
  {
    id: "moby-dick",
    title: "Moby-Dick",
    author: "Herman Melville",
    year: "1851",
    genre: "Sea novel",
  },
  {
    id: "crime-and-punishment",
    title: "Crime and Punishment",
    author: "Fyodor Dostoevsky",
    year: "1866",
    genre: "Psychological novel",
  },
  {
    id: "wuthering-heights",
    title: "Wuthering Heights",
    author: "Emily Brontë",
    year: "1847",
    genre: "Gothic novel",
  },
  {
    id: "dracula",
    title: "Dracula",
    author: "Bram Stoker",
    year: "1897",
    genre: "Epistolary horror",
  },
  {
    id: "the-odyssey",
    title: "The Odyssey",
    author: "Homer",
    year: "8th century BCE",
    genre: "Epic poem",
  },
  {
    id: "alices-adventures",
    title: "Alice’s Adventures in Wonderland",
    author: "Lewis Carroll",
    year: "1865",
    genre: "Literary nonsense",
  },
  {
    id: "dorian-gray",
    title: "The Picture of Dorian Gray",
    author: "Oscar Wilde",
    year: "1890",
    genre: "Philosophical novel",
  },
  {
    id: "tale-of-two-cities",
    title: "A Tale of Two Cities",
    author: "Charles Dickens",
    year: "1859",
    genre: "Historical novel",
  },
  {
    id: "don-quixote",
    title: "Don Quixote",
    author: "Miguel de Cervantes",
    year: "1605",
    genre: "Comic epic",
  },
];

const byId = new Map(books.map((book) => [book.id, book]));

export function getBook(id: string): Book | undefined {
  return byId.get(id);
}
