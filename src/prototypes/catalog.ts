export type Mood = "literary" | "dark" | "editorial" | "educational" | "cozy" | "playful";

export type LayoutId =
  | "column"
  | "stacks"
  | "rail"
  | "broadsheet"
  | "cards"
  | "folio"
  | "catalog"
  | "manuscript"
  | "grid"
  | "scatter"
  | "index"
  | "tiles";

export type ShellId = "sticky" | "static" | "hamburger" | "sidebar";

export type Palette = {
  bg: string;
  ink: string;
  muted: string;
  accent: string;
  accentInk: string;
  surface: string;
  rule: string;
};

export type Prototype = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  about: string;
  mood: Mood;
  layout: LayoutId;
  tone: "light" | "dark";
  shell: ShellId;
  relatedPosts?: boolean;
  displayFont: string;
  textFont: string;
  sansFont: string;
  monoFont: string;
  fontLabel: string;
  palette: Palette;
  featuredSlug: string;
};

export const moodLabels: Record<Mood, string> = {
  literary: "Literary",
  dark: "After dark",
  editorial: "Editorial",
  educational: "For teaching",
  cozy: "Cozy",
  playful: "Playful",
};

export const layoutLabels: Record<LayoutId, string> = {
  column: "Narrow column",
  stacks: "Full-bleed stacks",
  rail: "Sidebar rail",
  broadsheet: "Newspaper",
  cards: "Cover cards",
  folio: "Magazine folio",
  catalog: "Card catalog",
  manuscript: "Manuscript page",
  grid: "Modular grid",
  scatter: "Scattered notes",
  index: "Quiet index",
  tiles: "Cover tiles",
};

export const shellLabels: Record<ShellId, string> = {
  sticky: "Sticky top bar",
  static: "Static top bar",
  hamburger: "Floating menu",
  sidebar: "Side bar",
};

export const prototypes: Prototype[] = [
  {
    id: "window-seat",
    name: "Window Seat",
    tagline: "A tiled shelf, and then just the page.",
    description:
      "Reading Nook’s clay and cream, covers packed like an Instagram grid, and Chapbook’s quiet measure once an essay opens — with the jacket kept beside the title.",
    about:
      "Window Seat borrows three rooms and refuses to blend them into a fourth costume. The colors are Reading Nook’s: clay, sage-brown, and a lamp-warm surface. The home page is a tight grid of covers, the way Storybook Hour trusts the jacket to be the picture, only squared and edge to edge. The type is Chapbook’s EB Garamond, and the essay page is that same narrow, centered column — except the cover stays, because a tile that led you here should still be in the room. The top bar stays put, the way those three prototypes already do.",
    mood: "cozy",
    layout: "tiles",
    tone: "light",
    shell: "sticky",
    displayFont: '"EB Garamond", serif',
    textFont: '"EB Garamond", serif',
    sansFont: '"EB Garamond", serif',
    monoFont: '"IBM Plex Mono", monospace',
    fontLabel: "EB Garamond",
    palette: {
      bg: "#f3e6d4",
      ink: "#3a261c",
      muted: "#6d5144",
      accent: "#c4653a",
      accentInk: "#fff8f2",
      surface: "#fff8ef",
      rule: "#e2cbb3",
    },
    featuredSlug: "jane-eyre",
  },
  {
    id: "inkwell",
    name: "Inkwell",
    tagline: "A quarterly that trusts the paragraph.",
    description: "Cream paper, a long measure, and a drop cap. Inkwell is the classic literary journal: one essay at a time, with hairline rules instead of cards.",
    about:
      "Inkwell is the prototype to choose when the writing should be louder than the chrome. The column is narrow on purpose, close to the width of a printed book, so lines do not stretch across a monitor. Fraunces carries the titles; Source Serif carries the essays. Oxblood is used only for small marks, the way a journal uses a second ink.",
    mood: "literary",
    layout: "column",
    tone: "light",
    shell: "sticky",
    relatedPosts: true,
    displayFont: '"Fraunces", serif',
    textFont: '"Source Serif 4", serif',
    sansFont: '"Public Sans", sans-serif',
    monoFont: '"IBM Plex Mono", monospace',
    fontLabel: "Fraunces + Source Serif 4",
    palette: {
      bg: "#f6f1e7",
      ink: "#1c1915",
      muted: "#5e564c",
      accent: "#7a2e2e",
      accentInk: "#f8f1e6",
      surface: "#fffaf2",
      rule: "#d9cbb6",
    },
    featuredSlug: "pride-and-prejudice",
  },
  {
    id: "night-stacks",
    name: "Night Stacks",
    tagline: "The library after the lamps are low.",
    description: "A dark reading room. The featured book fills the first screen, and the rest of the shelf sits in a horizontal row you can scroll.",
    about:
      "Night Stacks treats the blog like a closed library. Gold is the only bright color, used the way a spine stamp uses it. Cormorant Garamond is tall and a little theatrical; Outfit keeps the navigation from becoming costume. The home page leads with one cover at hero scale so the choice of what to read feels like an event.",
    mood: "dark",
    layout: "stacks",
    tone: "dark",
    shell: "static",
    relatedPosts: true,
    displayFont: '"Cormorant Garamond", serif',
    textFont: '"Cormorant Garamond", serif',
    sansFont: '"Outfit", sans-serif',
    monoFont: '"IBM Plex Mono", monospace',
    fontLabel: "Cormorant Garamond + Outfit",
    palette: {
      bg: "#12100e",
      ink: "#f3eadc",
      muted: "#b6aa98",
      accent: "#d4a853",
      accentInk: "#1a140c",
      surface: "#1d1a16",
      rule: "#3a342c",
    },
    featuredSlug: "frankenstein",
  },
  {
    id: "the-margin",
    name: "The Margin",
    tagline: "An essay with its notes still showing.",
    description: "A persistent side rail lists the shelf while the essay runs beside it. Book facts sit in the margin, like a student’s pencil.",
    about:
      "The Margin is for readers who want context without leaving the page. Literata, a font designed for long reading, carries the essay. The rail is navy, the margin notes are a pale yellow, and nothing important is only a color: the same facts are also in the text. This is a good prototype if the blog will grow a lot of cross-references.",
    mood: "educational",
    layout: "rail",
    tone: "light",
    shell: "hamburger",
    displayFont: '"Literata", serif',
    textFont: '"Literata", serif',
    sansFont: '"Public Sans", sans-serif',
    monoFont: '"IBM Plex Mono", monospace',
    fontLabel: "Literata + Public Sans",
    palette: {
      bg: "#f7f5f1",
      ink: "#1d2430",
      muted: "#526071",
      accent: "#1e3a5f",
      accentInk: "#f7f5f1",
      surface: "#fffdf8",
      rule: "#d5dbe3",
    },
    featuredSlug: "crime-and-punishment",
  },
  {
    id: "broadsheet",
    name: "Broadsheet",
    tagline: "A front page for people who finish articles.",
    description: "Masthead, dateline, a lead story in large type, and the rest of the shelf set in columns like a newspaper that still believes in paragraphs.",
    about:
      "Broadsheet borrows the habits of a city paper: a loud masthead, a small dateline, kickers above headlines, and a multi-column home page. Newsreader is a contemporary news face with enough contrast to feel printed. The accent is a straight red, used for section labels rather than buttons. On a phone the columns stack; the masthead stays.",
    mood: "editorial",
    layout: "broadsheet",
    tone: "light",
    shell: "static",
    displayFont: '"Newsreader", serif',
    textFont: '"Newsreader", serif',
    sansFont: '"Archivo", sans-serif',
    monoFont: '"IBM Plex Mono", monospace',
    fontLabel: "Newsreader + Archivo",
    palette: {
      bg: "#f3efe6",
      ink: "#161616",
      muted: "#4e4a44",
      accent: "#b42318",
      accentInk: "#fff8f4",
      surface: "#fbf8f2",
      rule: "#1c1c1c",
    },
    featuredSlug: "tale-of-two-cities",
  },
  {
    id: "chapbook",
    name: "Chapbook",
    tagline: "Almost nothing but the words.",
    description: "A small-press page: huge margins, no cards, titles set like a pamphlet. The quietest of the set.",
    about:
      "Chapbook assumes the reader came to read. EB Garamond is an old-style face with a small x-height, set with generous line height. There is no accent color worth mentioning. If a decoration does not help you find the next essay, it is not on the page. Choose this when you want the prototypes to include a near-minimum.",
    mood: "literary",
    layout: "column",
    tone: "light",
    shell: "sticky",
    displayFont: '"EB Garamond", serif',
    textFont: '"EB Garamond", serif',
    sansFont: '"EB Garamond", serif',
    monoFont: '"IBM Plex Mono", monospace',
    fontLabel: "EB Garamond",
    palette: {
      bg: "#fbfbf8",
      ink: "#22211e",
      muted: "#6a675f",
      accent: "#22211e",
      accentInk: "#fbfbf8",
      surface: "#ffffff",
      rule: "#e4e2dc",
    },
    featuredSlug: "the-odyssey",
  },
  {
    id: "reading-nook",
    name: "Reading Nook",
    tagline: "A chair, a lamp, a stack of covers.",
    description: "Rounded cards, warm clay and sage, and covers you can browse the way you browse a bookshop table.",
    about:
      "Reading Nook is the cozy end of the shelf. Lora gives the titles a soft old-book feeling; Nunito keeps the interface friendly without looking like a toy. Corners are rounded, shadows are faint, and the home page is a table of covers. It is a good match for a personal blog that wants to feel inhabited.",
    mood: "cozy",
    layout: "cards",
    tone: "light",
    shell: "sticky",
    displayFont: '"Lora", serif',
    textFont: '"Lora", serif',
    sansFont: '"Nunito", sans-serif',
    monoFont: '"IBM Plex Mono", monospace',
    fontLabel: "Lora + Nunito",
    palette: {
      bg: "#f3e6d4",
      ink: "#3a261c",
      muted: "#6d5144",
      accent: "#c4653a",
      accentInk: "#fff8f2",
      surface: "#fff8ef",
      rule: "#e2cbb3",
    },
    featuredSlug: "jane-eyre",
  },
  {
    id: "folio",
    name: "Folio",
    tagline: "A magazine that leads with type.",
    description: "Enormous titles, a fashion-editorial split, and a single electric accent. The cover is a prop; the headline is the poster.",
    about:
      "Folio is for a blog that wants to feel edited, even a little severe. Bodoni Moda supplies the high-contrast fashion headlines; Jost is the cool sans underneath. The layout is asymmetric: a giant title on one side, the cover and deck on the other. Black, white, and one red. If the writing is confident, this frame will not apologize for it.",
    mood: "editorial",
    layout: "folio",
    tone: "light",
    shell: "sidebar",
    displayFont: '"Bodoni Moda", serif',
    textFont: '"Bodoni Moda", serif',
    sansFont: '"Jost", sans-serif',
    monoFont: '"IBM Plex Mono", monospace',
    fontLabel: "Bodoni Moda + Jost",
    palette: {
      bg: "#f4f4f2",
      ink: "#111111",
      muted: "#5c5c5c",
      accent: "#e10600",
      accentInk: "#ffffff",
      surface: "#ffffff",
      rule: "#111111",
    },
    featuredSlug: "dorian-gray",
  },
  {
    id: "card-catalog",
    name: "Card Catalog",
    tagline: "Every essay is a drawer you can pull.",
    description: "Manila cards, a monospace call number, and the pleasure of a library that still uses wood and stamps.",
    about:
      "Card Catalog turns the index into the design. Each essay is a manila card with a typed call number, a red stamp, and a hole punch. Libre Baskerville carries the titles; IBM Plex Mono carries the metadata, because metadata should look like metadata. The palette is oak, manila, and stamp red. It suits a large archive more than a single featured post.",
    mood: "literary",
    layout: "catalog",
    tone: "light",
    shell: "sidebar",
    displayFont: '"Libre Baskerville", serif',
    textFont: '"Libre Baskerville", serif',
    sansFont: '"Public Sans", sans-serif',
    monoFont: '"IBM Plex Mono", monospace',
    fontLabel: "Libre Baskerville + IBM Plex Mono",
    palette: {
      bg: "#e7d3b0",
      ink: "#2b2118",
      muted: "#6a5340",
      accent: "#9d2c2c",
      accentInk: "#f8efd8",
      surface: "#f4e6c8",
      rule: "#c3a57a",
    },
    featuredSlug: "don-quixote",
  },
  {
    id: "lantern",
    name: "Lantern",
    tagline: "One pool of light, and the page inside it.",
    description: "An evening theme. The essay sits in a warm frame, as if the only lamp in the room were pointed at the paper.",
    about:
      "Lantern is dark, but it is not Night Stacks. There is no hero carousel. Spectral, a book face with a slightly inky color, sits inside a glowing panel of amber paper. The rest of the room falls away. Use it if you want night reading without turning the blog into a poster.",
    mood: "dark",
    layout: "column",
    tone: "dark",
    shell: "static",
    displayFont: '"Spectral", serif',
    textFont: '"Spectral", serif',
    sansFont: '"Outfit", sans-serif',
    monoFont: '"IBM Plex Mono", monospace',
    fontLabel: "Spectral + Outfit",
    palette: {
      bg: "#24160f",
      ink: "#f6edd8",
      muted: "#d9c4a2",
      accent: "#e7a04a",
      accentInk: "#2a160c",
      surface: "#3a2616",
      rule: "#6b4a2a",
    },
    featuredSlug: "dracula",
  },
  {
    id: "manuscript",
    name: "Manuscript",
    tagline: "Typed, corrected, still a little warm.",
    description: "A blue-ruled sheet and a typewriter face. Reviews look like fair copies; the navigation looks like the header of a student paper.",
    about:
      "Manuscript uses Courier Prime, a typewriter face with real italics, on paper ruled like a notebook. It is a reminder that essays begin as drafts. The layout is a single sheet centered on a desk. It will not be the most ‘designed’ option, and that is the point: some blogs should feel handmade.",
    mood: "literary",
    layout: "manuscript",
    tone: "light",
    shell: "hamburger",
    displayFont: '"Courier Prime", monospace',
    textFont: '"Courier Prime", monospace',
    sansFont: '"Courier Prime", monospace',
    monoFont: '"Courier Prime", monospace',
    fontLabel: "Courier Prime",
    palette: {
      bg: "#d9e3ea",
      ink: "#1c2430",
      muted: "#3d4c5f",
      accent: "#1d4e89",
      accentInk: "#f4f8fb",
      surface: "#f7fbfe",
      rule: "#c5d4e2",
    },
    featuredSlug: "moby-dick",
  },
  {
    id: "botanical",
    name: "Botanical Press",
    tagline: "A field journal that happens to review novels.",
    description: "Moss, cream, and berry, with covers set like pressed specimens and headings that feel lettered into a notebook.",
    about:
      "Botanical Press is a nature-journal cousin of Reading Nook: same card layout, a different climate. Crimson Pro is a crisp old-style serif; the greens do the decorating so the type can stay calm. Berry red is reserved for the small labels, the way a field guide marks a plate. Good for a blog that wants warmth without clutter.",
    mood: "cozy",
    layout: "cards",
    tone: "light",
    shell: "hamburger",
    displayFont: '"Crimson Pro", serif',
    textFont: '"Crimson Pro", serif',
    sansFont: '"Nunito", sans-serif',
    monoFont: '"IBM Plex Mono", monospace',
    fontLabel: "Crimson Pro + Nunito",
    palette: {
      bg: "#e7efe4",
      ink: "#1d2b22",
      muted: "#4d6354",
      accent: "#8e3d4a",
      accentInk: "#f7f3ea",
      surface: "#f7f3ea",
      rule: "#c5d4c4",
    },
    featuredSlug: "wuthering-heights",
  },
  {
    id: "salt-and-page",
    name: "Salt & Page",
    tagline: "Wide margins, sea-glass color, a long afternoon.",
    description: "An airy magazine spread. Lots of paper, a low horizon line, and type that does not hurry.",
    about:
      "Salt & Page uses the folio layout with a coastal palette: sand, foam, and a deep tide accent. Fraunces is set a little lighter here than in Inkwell, paired with Outfit for a clean modern navigation. The home page feels horizontal — a spread, not a scroll of cards. Choose it when you want editorial structure without fashion severity.",
    mood: "editorial",
    layout: "folio",
    tone: "light",
    shell: "static",
    displayFont: '"Fraunces", serif',
    textFont: '"Source Serif 4", serif',
    sansFont: '"Outfit", sans-serif',
    monoFont: '"IBM Plex Mono", monospace',
    fontLabel: "Fraunces + Outfit",
    palette: {
      bg: "#e7f1ef",
      ink: "#16323a",
      muted: "#4d6b72",
      accent: "#0f6e78",
      accentInk: "#f3fffe",
      surface: "#f7fffe",
      rule: "#b7d4d2",
    },
    featuredSlug: "alices-adventures",
  },
  {
    id: "velvet-circle",
    name: "Velvet Circle",
    tagline: "A private club for one book at a time.",
    description: "Burgundy, blush, and a gold hairline. The tone of a book club that dresses for the meeting and then actually discusses the chapter.",
    about:
      "Velvet Circle is a dark, formal column. Playfair Display brings the club-invitation feeling; the text stays in the same family so the page feels upholstered rather than mixed. Gold lines do the work that cards would do elsewhere. It is a natural fit for a members’ letter or a slow book-a-month blog.",
    mood: "dark",
    layout: "column",
    tone: "dark",
    shell: "hamburger",
    displayFont: '"Playfair Display", serif',
    textFont: '"Playfair Display", serif',
    sansFont: '"Jost", sans-serif',
    monoFont: '"IBM Plex Mono", monospace',
    fontLabel: "Playfair Display + Jost",
    palette: {
      bg: "#3b0f22",
      ink: "#f8e8ea",
      muted: "#e2c3c8",
      accent: "#e4b15a",
      accentInk: "#2b0c16",
      surface: "#54162f",
      rule: "#8a4a5c",
    },
    featuredSlug: "dorian-gray",
  },
  {
    id: "seminar",
    name: "Seminar",
    tagline: "A class that assigns the reading, then talks.",
    description: "Clear steps, a table of contents, and tutorial essays treated as lessons. The most practical of the prototypes.",
    about:
      "Seminar is built for the reading guides as much as for the reviews. Source Serif and Source Sans are a matched pair, the kind of pairing a textbook can live with. The rail lists every piece with a number. Highlight yellow appears behind key labels, never behind whole paragraphs. If the blog’s job is to teach people how to read, start here.",
    mood: "educational",
    layout: "rail",
    tone: "light",
    shell: "sticky",
    displayFont: '"Source Serif 4", serif',
    textFont: '"Source Serif 4", serif',
    sansFont: '"Source Sans 3", sans-serif',
    monoFont: '"IBM Plex Mono", monospace',
    fontLabel: "Source Serif 4 + Source Sans 3",
    palette: {
      bg: "#ffffff",
      ink: "#172033",
      muted: "#44516a",
      accent: "#1d4ed8",
      accentInk: "#ffffff",
      surface: "#f4f7fb",
      rule: "#d6deea",
    },
    featuredSlug: "jane-eyre",
  },
  {
    id: "salon",
    name: "Salon",
    tagline: "Conversation, italics, and a rose rule.",
    description: "A Parisian sitting room: centered titles, a script-like italic, and ornaments that behave themselves.",
    about:
      "Salon is a literary column with more perfume than Inkwell. Cormorant Garamond’s italics carry the titles; Cardo, a face with Venetian roots, carries the body. Powder, ink, and a rose accent. Ornamental dividers replace cards. It suits reviews written in the first person, the kind of essay that sounds like talk after dinner.",
    mood: "literary",
    layout: "column",
    tone: "light",
    shell: "static",
    displayFont: '"Cormorant Garamond", serif',
    textFont: '"Cardo", serif',
    sansFont: '"Jost", sans-serif',
    monoFont: '"IBM Plex Mono", monospace',
    fontLabel: "Cormorant Garamond + Cardo",
    palette: {
      bg: "#f7eef0",
      ink: "#241c22",
      muted: "#6d5964",
      accent: "#9c3d55",
      accentInk: "#fff7f8",
      surface: "#fff8f9",
      rule: "#e4cdd3",
    },
    featuredSlug: "wuthering-heights",
  },
  {
    id: "atlas",
    name: "Atlas",
    tagline: "Essays with coordinates.",
    description: "A mapmaker’s blog: numbered sections, a compass-red accent, and the rail treated like a legend.",
    about:
      "Atlas uses the rail layout as a legend for the essay. Alegreya, a contemporary text face with Spanish book ancestry, is a quiet nod to a long reading tradition. The palette is map cream, ink blue, and a small compass red. Sections are numbered. It is a strong choice if reviews will be long and readers will want to jump.",
    mood: "educational",
    layout: "rail",
    tone: "light",
    shell: "hamburger",
    displayFont: '"Alegreya", serif',
    textFont: '"Alegreya", serif',
    sansFont: '"Outfit", sans-serif',
    monoFont: '"IBM Plex Mono", monospace',
    fontLabel: "Alegreya + Outfit",
    palette: {
      bg: "#f4efe2",
      ink: "#1c2c3a",
      muted: "#5c6b78",
      accent: "#b6402c",
      accentInk: "#fff7f2",
      surface: "#fffaf1",
      rule: "#d9d0b8",
    },
    featuredSlug: "the-odyssey",
  },
  {
    id: "storybook",
    name: "Storybook Hour",
    tagline: "Large covers, clear type, no baby talk.",
    description: "A story-hour table: butter yellow, sky blue, and covers big enough to hold up for a room. Playful, and still a place for long essays.",
    about:
      "Storybook Hour is the playful prototype that still respects a long paragraph. Fraunces is bouncy at display sizes; Nunito labels the cards. The palette is butter, ink, and sky, with covers as the main pictures. It is not a site for small children — the essays are adult criticism — but it is the one that would welcome a read-aloud club.",
    mood: "playful",
    layout: "cards",
    tone: "light",
    shell: "sticky",
    displayFont: '"Fraunces", serif',
    textFont: '"Nunito", sans-serif',
    sansFont: '"Nunito", sans-serif',
    monoFont: '"IBM Plex Mono", monospace',
    fontLabel: "Fraunces + Nunito",
    palette: {
      bg: "#fff4cc",
      ink: "#1e2433",
      muted: "#4c5366",
      accent: "#2f6fed",
      accentInk: "#ffffff",
      surface: "#ffffff",
      rule: "#f0d98a",
    },
    featuredSlug: "alices-adventures",
  },
  {
    id: "grid-and-rule",
    name: "Grid & Rule",
    tagline: "A modernist index with a red bar.",
    description: "Bauhaus habits: a strict grid, blunt numbers, black rules, and a single red. Type does the decorating.",
    about:
      "Grid & Rule is the anti-ornament prototype. Syne, a slightly stubborn display sans, shouts the titles. Archivo does the small print. The home page is a numbered modular grid, not a set of cozy cards. Rules are black and thick. Red is a bar, not a mood. Choose it if the other prototypes feel too dressed.",
    mood: "editorial",
    layout: "grid",
    tone: "light",
    shell: "sidebar",
    relatedPosts: true,
    displayFont: '"Syne", sans-serif',
    textFont: '"Archivo", sans-serif',
    sansFont: '"Archivo", sans-serif',
    monoFont: '"IBM Plex Mono", monospace',
    fontLabel: "Syne + Archivo",
    palette: {
      bg: "#efefef",
      ink: "#111111",
      muted: "#444444",
      accent: "#e10600",
      accentInk: "#ffffff",
      surface: "#ffffff",
      rule: "#111111",
    },
    featuredSlug: "tale-of-two-cities",
  },
  {
    id: "ephemera",
    name: "Ephemera",
    tagline: "Clippings, tape, and a desk you can see.",
    description: "A scrapbook. Notes tilt a few degrees, kraft paper shows at the edges, and handwriting labels the tape.",
    about:
      "Ephemera is the messiest prototype, on purpose. Cards rotate slightly, like papers that were put down in a hurry. Libre Baskerville still carries the essays — the reading itself stays serious — while Patrick Hand labels the scraps. Kraft, cream, and two washi colors. It is a good reminder that a blog can feel collected rather than published.",
    mood: "playful",
    layout: "scatter",
    tone: "light",
    shell: "sidebar",
    displayFont: '"Libre Baskerville", serif',
    textFont: '"Libre Baskerville", serif',
    sansFont: '"Patrick Hand", cursive',
    monoFont: '"IBM Plex Mono", monospace',
    fontLabel: "Libre Baskerville + Patrick Hand",
    palette: {
      bg: "#d7b48a",
      ink: "#2a2118",
      muted: "#5c4634",
      accent: "#2f6b5a",
      accentInk: "#f6f0e4",
      surface: "#f6f0e4",
      rule: "#c49a6c",
    },
    featuredSlug: "frankenstein",
  },
  {
    id: "quiet-index",
    name: "Quiet Index",
    tagline: "A list, a number, and no ceremony.",
    description: "Swiss-ish and nearly silent. Every essay is a row: number, title, author, year. The fastest way to compare the shelf.",
    about:
      "Quiet Index is the control group. Manrope, a plain contemporary sans, does almost everything, with Newsreader appearing only inside the essay so long reading still has a book face. Rows instead of cards. An olive accent, used sparingly. If you are comparing the full set, look at this one last: it shows how little interface a blog actually needs.",
    mood: "literary",
    layout: "index",
    tone: "light",
    shell: "sidebar",
    displayFont: '"Manrope", sans-serif',
    textFont: '"Newsreader", serif',
    sansFont: '"Manrope", sans-serif',
    monoFont: '"IBM Plex Mono", monospace',
    fontLabel: "Manrope + Newsreader",
    palette: {
      bg: "#f5f4f1",
      ink: "#1a1c19",
      muted: "#5d615c",
      accent: "#3f5c3a",
      accentInk: "#f5f4f1",
      surface: "#ffffff",
      rule: "#dddbd4",
    },
    featuredSlug: "moby-dick",
  },
];

const byId = new Map(prototypes.map((prototype) => [prototype.id, prototype]));

export function getPrototype(id: string): Prototype | undefined {
  return byId.get(id);
}

export function isPrototypeId(id: string): boolean {
  return byId.has(id);
}
