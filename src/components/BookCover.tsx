type Motif =
  | "house"
  | "bolt"
  | "key"
  | "whale"
  | "stairs"
  | "heath"
  | "bat"
  | "ship"
  | "rabbit"
  | "frame"
  | "scales"
  | "mill";

type Jacket = {
  bg: string;
  panel: string;
  ink: string;
  accent: string;
  lines: string[];
  author: string;
  motif: Motif;
};

const jackets: Record<string, Jacket> = {
  "pride-and-prejudice": {
    bg: "#6f2432",
    panel: "#f4e3c4",
    ink: "#2c1c14",
    accent: "#c6a15b",
    lines: ["Pride", "& Prejudice"],
    author: "Jane Austen",
    motif: "house",
  },
  frankenstein: {
    bg: "#1c2830",
    panel: "#d5e2d2",
    ink: "#142028",
    accent: "#d6de6a",
    lines: ["Frankenstein"],
    author: "Mary Shelley",
    motif: "bolt",
  },
  "jane-eyre": {
    bg: "#3d4f73",
    panel: "#f7f1e4",
    ink: "#243044",
    accent: "#b4553c",
    lines: ["Jane Eyre"],
    author: "Charlotte Brontë",
    motif: "key",
  },
  "moby-dick": {
    bg: "#0e3b4c",
    panel: "#e7f0f2",
    ink: "#0e2a36",
    accent: "#e8d7a8",
    lines: ["Moby-Dick"],
    author: "Herman Melville",
    motif: "whale",
  },
  "crime-and-punishment": {
    bg: "#4a2c28",
    panel: "#f0d7c4",
    ink: "#2b1614",
    accent: "#8c2f2f",
    lines: ["Crime and", "Punishment"],
    author: "Fyodor Dostoevsky",
    motif: "stairs",
  },
  "wuthering-heights": {
    bg: "#3c4634",
    panel: "#efe6d2",
    ink: "#243024",
    accent: "#8d4b3a",
    lines: ["Wuthering", "Heights"],
    author: "Emily Brontë",
    motif: "heath",
  },
  dracula: {
    bg: "#2a0e16",
    panel: "#f0d5c8",
    ink: "#2a1014",
    accent: "#6e1024",
    lines: ["Dracula"],
    author: "Bram Stoker",
    motif: "bat",
  },
  "the-odyssey": {
    bg: "#14324a",
    panel: "#f0e2c8",
    ink: "#1a2c3c",
    accent: "#c9843d",
    lines: ["The Odyssey"],
    author: "Homer",
    motif: "ship",
  },
  "alices-adventures": {
    bg: "#1f4d78",
    panel: "#f7f0c8",
    ink: "#1d3148",
    accent: "#d4533a",
    lines: ["Alice"],
    author: "Lewis Carroll",
    motif: "rabbit",
  },
  "dorian-gray": {
    bg: "#1d1a17",
    panel: "#e7dcc4",
    ink: "#1b1714",
    accent: "#b08d57",
    lines: ["Dorian", "Gray"],
    author: "Oscar Wilde",
    motif: "frame",
  },
  "tale-of-two-cities": {
    bg: "#6e1d22",
    panel: "#f6ecd8",
    ink: "#2c1414",
    accent: "#1d1a17",
    lines: ["A Tale of", "Two Cities"],
    author: "Charles Dickens",
    motif: "scales",
  },
  "don-quixote": {
    bg: "#8a4b24",
    panel: "#f6e7c4",
    ink: "#3a2414",
    accent: "#2f4d73",
    lines: ["Don", "Quixote"],
    author: "Miguel de Cervantes",
    motif: "mill",
  },
};

function Motif({ motif, ink, accent }: { motif: Motif; ink: string; accent: string }) {
  switch (motif) {
    case "house":
      return (
        <g fill="none" stroke={ink} strokeWidth="2">
          <path d="M70 78 L100 56 L130 78 V112 H70 Z" fill={accent} stroke={ink} />
          <path d="M92 112 V94 H108 V112" />
          <path d="M58 84 H142" stroke={accent} />
        </g>
      );
    case "bolt":
      return <path d="M108 48 L86 90 H104 L92 124 L122 78 H104 Z" fill={accent} stroke={ink} strokeWidth="2" />;
    case "key":
      return (
        <g fill="none" stroke={ink} strokeWidth="2.4">
          <circle cx="86" cy="78" r="14" />
          <path d="M100 78 H132" />
          <path d="M120 78 V90 M130 78 V88" />
        </g>
      );
    case "whale":
      return (
        <g fill={accent} stroke={ink} strokeWidth="2">
          <path d="M48 92 C70 70 110 68 132 84 C120 90 118 100 132 108 C100 120 70 114 48 100 C58 98 60 94 48 92 Z" />
          <path d="M120 80 L132 68 L128 86" fill={ink} />
          <circle cx="78" cy="88" r="1.6" fill={ink} stroke="none" />
        </g>
      );
    case "stairs":
      return (
        <path
          d="M62 118 H86 V102 H104 V86 H122 V70 H142"
          fill="none"
          stroke={ink}
          strokeWidth="3"
        />
      );
    case "heath":
      return (
        <g fill="none" stroke={ink} strokeWidth="2">
          <path d="M40 112 C70 90 90 96 100 70 C112 98 130 90 160 112" />
          <path d="M100 112 V74" />
          <path d="M100 86 C88 80 84 70 90 60" stroke={accent} />
        </g>
      );
    case "bat":
      return (
        <path
          d="M100 92 C90 78 70 74 48 86 C70 88 78 96 74 108 C86 96 96 96 100 104 C104 96 114 96 126 108 C122 96 130 88 152 86 C130 74 110 78 100 92 Z"
          fill={ink}
        />
      );
    case "ship":
      return (
        <g fill="none" stroke={ink} strokeWidth="2">
          <path d="M48 108 H152 L140 122 H60 Z" fill={accent} />
          <path d="M100 108 V58" />
          <path d="M100 62 H136 L100 96" fill={accent} />
          <path d="M40 128 H160" />
        </g>
      );
    case "rabbit":
      return (
        <g fill={accent} stroke={ink} strokeWidth="2">
          <ellipse cx="92" cy="58" rx="6" ry="16" />
          <ellipse cx="108" cy="58" rx="6" ry="16" />
          <circle cx="100" cy="90" r="22" />
          <circle cx="92" cy="86" r="2" fill={ink} stroke="none" />
          <circle cx="108" cy="86" r="2" fill={ink} stroke="none" />
        </g>
      );
    case "frame":
      return (
        <g fill="none" stroke={ink} strokeWidth="2">
          <rect x="68" y="52" width="64" height="76" />
          <rect x="76" y="60" width="48" height="60" stroke={accent} />
          <circle cx="100" cy="90" r="10" />
        </g>
      );
    case "scales":
      return (
        <g fill="none" stroke={ink} strokeWidth="2">
          <path d="M100 52 V118" />
          <path d="M64 70 H136" />
          <path d="M64 70 L52 96 H76 Z" fill={accent} />
          <path d="M136 70 L124 96 H148 Z" fill={accent} />
          <path d="M84 118 H116" />
        </g>
      );
    case "mill":
      return (
        <g fill="none" stroke={ink} strokeWidth="2">
          <path d="M86 118 V78 L114 118" />
          <circle cx="100" cy="74" r="6" fill={accent} />
          <path d="M100 74 L100 48 M100 74 L126 86 M100 74 L74 86 M100 74 L100 100" />
        </g>
      );
  }
}

export function BookCover({
  bookId,
  title,
  author,
  size = "md",
}: {
  bookId: string;
  title: string;
  author: string;
  size?: "sm" | "md" | "lg";
}) {
  const jacket = jackets[bookId] ?? {
    bg: "#333",
    panel: "#f4efe4",
    ink: "#222",
    accent: "#888",
    lines: [title],
    author,
    motif: "frame" as Motif,
  };

  return (
    <svg
      className={`cover cover-${size}`}
      viewBox="0 0 200 300"
      role="img"
      aria-label={`Cover of ${title} by ${author}`}
    >
      <rect width="200" height="300" fill={jacket.bg} />
      <rect x="14" y="14" width="172" height="272" fill={jacket.panel} />
      <rect x="14" y="14" width="8" height="272" fill={jacket.accent} />
      <Motif motif={jacket.motif} ink={jacket.ink} accent={jacket.accent} />
      {jacket.lines.map((line, index) => (
        <text
          key={line}
          x="28"
          y={176 + index * 22}
          fill={jacket.ink}
          fontFamily="Georgia, 'Times New Roman', serif"
          fontSize={jacket.lines.length > 1 ? 16 : 18}
          fontWeight="700"
        >
          {line}
        </text>
      ))}
      <text
        x="28"
        y="248"
        fill={jacket.ink}
        opacity="0.75"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="11"
      >
        {jacket.author}
      </text>
      <path d="M28 232 H150" stroke={jacket.accent} strokeWidth="2" />
    </svg>
  );
}
