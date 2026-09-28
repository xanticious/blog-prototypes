import ReactMarkdown from "react-markdown";

export function MarkdownBody({ body }: { body: string }) {
  return (
    <div className="prose">
      <ReactMarkdown
        components={{
          blockquote: ({ children }) => <blockquote className="pull">{children}</blockquote>,
        }}
      >
        {body}
      </ReactMarkdown>
    </div>
  );
}
