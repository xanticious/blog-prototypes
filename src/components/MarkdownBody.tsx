import { cloneElement, isValidElement, useState, type ReactElement, type ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import { getBook } from "../content/books";
import { formatNames } from "../content/library";
import { CoverBlurb } from "./CoverBlurb";

type Segment =
  | { kind: "markdown"; text: string }
  | { kind: "spoiler"; text: string }
  | { kind: "verse"; text: string }
  | { kind: "book"; id: string };

const FENCE_RE = /```[\s\S]*?```|~~~[\s\S]*?~~~/g;
const INLINE_CODE_RE = /`[^`\n]+`/g;
const BLOCK_RE = /:::(spoiler|verse)[ \t]*\r?\n([\s\S]*?)\r?\n:::/g;
const BOOK_RE = /^:::book[ \t]+(\S+)[ \t]*\r?$/gm
const INLINE_RE = /\|\|([^\n]+?)\|\|/g;

function mask(text: string, pattern: RegExp, token: string): { text: string; chunks: string[] } {
  const chunks: string[] = [];
  const masked = text.replace(pattern, (block) => {
    const id = chunks.length;
    chunks.push(block);
    return `\u0000${token}${id}\u0000`;
  });
  return { text: masked, chunks };
}

function unmask(text: string, token: string, chunks: string[]): string {
  return text.replace(new RegExp(`\u0000${token}(\\d+)\u0000`, "g"), (_, id: string) => chunks[Number(id)] ?? "");
}

function splitBlocks(body: string): Segment[] {
  const fenced = mask(body, FENCE_RE, "FENCE");
  const marks: { index: number; length: number; segment: Segment }[] = [];

  for (const match of fenced.text.matchAll(BLOCK_RE)) {
    marks.push({
      index: match.index ?? 0,
      length: match[0].length,
      segment: {
        kind: match[1] === "spoiler" ? "spoiler" : "verse",
        text: unmask(match[2].trim(), "FENCE", fenced.chunks),
      },
    });
  }

  for (const match of fenced.text.matchAll(BOOK_RE)) {
    const index = match.index ?? 0;
    const consumed = marks.some((mark) => index >= mark.index && index < mark.index + mark.length);
    if (consumed) continue;
    marks.push({
      index,
      length: match[0].length,
      segment: { kind: "book", id: match[1] },
    });
  }

  marks.sort((a, b) => a.index - b.index);

  const segments: Segment[] = [];
  let last = 0;
  for (const mark of marks) {
    if (mark.index < last) continue;
    if (mark.index > last) {
      const text = unmask(fenced.text.slice(last, mark.index).trim(), "FENCE", fenced.chunks);
      if (text) segments.push({ kind: "markdown", text });
    }
    segments.push(mark.segment);
    last = mark.index + mark.length;
  }
  const rest = unmask(fenced.text.slice(last).trim(), "FENCE", fenced.chunks);
  if (rest) segments.push({ kind: "markdown", text: rest });
  if (segments.length === 0) segments.push({ kind: "markdown", text: body });
  return segments;
}

function encodeInlineSpoilers(text: string): { text: string; spoilers: string[] } {
  const spoilers: string[] = [];
  const coded = mask(text, INLINE_CODE_RE, "CODE");
  const fenced = mask(coded.text, FENCE_RE, "FENCE");
  const encoded = fenced.text.replace(INLINE_RE, (whole, inner: string) => {
    const hidden = inner.trim();
    if (!hidden) return whole;
    const id = spoilers.length;
    spoilers.push(hidden);
    return `@@SPOILER${id}@@`;
  });
  return { text: unmask(unmask(encoded, "FENCE", fenced.chunks), "CODE", coded.chunks), spoilers };
}

function replaceTokens(text: string, keyPrefix: string, spoilers: string[]): ReactNode[] {
  const nodes: ReactNode[] = [];
  const token = /@@SPOILER(\d+)@@/g;
  let last = 0;
  for (const match of text.matchAll(token)) {
    const index = match.index ?? 0;
    if (index > last) nodes.push(text.slice(last, index));
    const spoilerIndex = Number(match[1]);
    nodes.push(
      <InlineSpoiler key={`${keyPrefix}-${index}`} text={spoilers[spoilerIndex] ?? ""} />,
    );
    last = index + match[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

function injectSpoilers(node: ReactNode, spoilers: string[], keyPrefix = "n"): ReactNode {
  if (typeof node === "string") {
    if (!node.includes("@@SPOILER")) return node;
    return replaceTokens(node, keyPrefix, spoilers);
  }
  if (typeof node === "number" || node == null || typeof node === "boolean") return node;
  if (Array.isArray(node)) {
    return node.map((child, index) => injectSpoilers(child, spoilers, `${keyPrefix}-${index}`));
  }
  if (isValidElement<{ children?: ReactNode }>(node)) {
    const element = node as ReactElement<{ children?: ReactNode }>;
    if (element.props.children == null) return element;
    return cloneElement(
      element,
      {},
      injectSpoilers(element.props.children, spoilers, keyPrefix),
    );
  }
  return node;
}

function InlineMarkdown({ text }: { text: string }) {
  return (
    <ReactMarkdown
      components={{
        p: ({ children }) => <>{children}</>,
      }}
    >
      {text}
    </ReactMarkdown>
  );
}

function InlineSpoiler({ text }: { text: string }) {
  const [open, setOpen] = useState(false);
  return (
    <button
      type="button"
      className={open ? "inline-spoiler is-open" : "inline-spoiler"}
      aria-expanded={open}
      onClick={() => setOpen((value) => !value)}
    >
      {open ? <InlineMarkdown text={text} /> : "spoiler"}
    </button>
  );
}

function MarkdownChunk({ text }: { text: string }) {
  const encoded = encodeInlineSpoilers(text);
  const wrap = (children: ReactNode) => injectSpoilers(children, encoded.spoilers);
  return (
    <ReactMarkdown
      components={{
        p: ({ children }) => <p>{wrap(children)}</p>,
        li: ({ children }) => <li>{wrap(children)}</li>,
        blockquote: ({ children }) => <blockquote className="pull">{wrap(children)}</blockquote>,
        em: ({ children }) => <em>{wrap(children)}</em>,
        strong: ({ children }) => <strong>{wrap(children)}</strong>,
        a: ({ children, href }) => <a href={href}>{wrap(children)}</a>,
      }}
    >
      {encoded.text}
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

function BookPanel({ id }: { id: string }) {
  const book = getBook(id);
  if (!book) {
    return <p className="cover-blurb-missing">There is no book with the id “{id}”.</p>;
  }
  return (
    <CoverBlurb
      bookId={book.id}
      title={book.title}
      author={formatNames(book.authors)}
      blurb={book.blurb}
    />
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
        if (segment.kind === "book") return <BookPanel key={index} id={segment.id} />;
        return <MarkdownChunk key={index} text={segment.text} />;
      })}
    </div>
  );
}
