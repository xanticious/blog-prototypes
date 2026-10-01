import { cloneElement, isValidElement, useState, type ReactElement, type ReactNode } from "react";
import ReactMarkdown from "react-markdown";

type Segment =
  | { kind: "markdown"; text: string }
  | { kind: "spoiler"; text: string }
  | { kind: "verse"; text: string };

const BLOCK_RE = /:::(spoiler|verse)[ \t]*\r?\n([\s\S]*?)\r?\n:::/g;
const INLINE_RE = /\|\|([^\n]+?)\|\|/g;

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

function encodeInlineSpoilers(text: string): { text: string; spoilers: string[] } {
  const spoilers: string[] = [];
  const encoded = text.replace(INLINE_RE, (whole, inner: string) => {
    const hidden = inner.trim();
    if (!hidden) return whole;
    const id = spoilers.length;
    spoilers.push(hidden);
    return `@@SPOILER${id}@@`;
  });
  return { text: encoded, spoilers };
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
