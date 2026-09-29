import ReactMarkdown from "react-markdown";

type Segment =
  | { kind: "markdown"; text: string }
  | { kind: "spoiler"; text: string }
  | { kind: "verse"; text: string };

const BLOCK_RE = /:::(spoiler|verse)[ \t]*\r?\n([\s\S]*?)\r?\n:::/g;

function splitBlocks(body: string): Segment[] {
  const segments: Segment[] = [];
  let last = 0;
  for (const match of body.matchAll(BLOCK_RE)) {
    const index = match.index ?? 0;
    if (index > last) {
      const text = body.slice(last, index).trim();
      if (text) segments.push({ kind: "markdown", text });
    }
    const label = match[1];
    segments.push({
      kind: label === "spoiler" ? "spoiler" : "verse",
      text: match[2].trim(),
    });
    last = index + match[0].length;
  }
  const rest = body.slice(last).trim();
  if (rest) segments.push({ kind: "markdown", text: rest });
  if (segments.length === 0) segments.push({ kind: "markdown", text: body });
  return segments;
}

function MarkdownChunk({ text }: { text: string }) {
  return (
    <ReactMarkdown
      components={{
        blockquote: ({ children }) => <blockquote className="pull">{children}</blockquote>,
      }}
    >
      {text}
    </ReactMarkdown>
  );
}

function Spoiler({ text }: { text: string }) {
  return (
    <details className="spoiler">
      <summary>
        <span className="spoiler-closed">Spoiler, click to reveal</span>
        <span className="spoiler-open">Hide spoiler</span>
      </summary>
      <div className="spoiler-body">
        <MarkdownChunk text={text} />
      </div>
    </details>
  );
}

export function MarkdownBody({ body }: { body: string }) {
  const segments = splitBlocks(body);
  return (
    <div className="prose">
      {segments.map((segment, index) => {
        if (segment.kind === "spoiler") return <Spoiler key={index} text={segment.text} />;
        if (segment.kind === "verse") {
          return (
            <pre key={index} className="verse">
              {segment.text}
            </pre>
          );
        }
        return <MarkdownChunk key={index} text={segment.text} />;
      })}
    </div>
  );
}
