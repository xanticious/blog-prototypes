import { BookCover } from "./BookCover";

/**
 * Magazine panel: a gray field, the jacket floated at the top left,
 * and the blurb filling the rest of the panel, wrapping underneath the jacket.
 */
export function CoverBlurb({
  bookId,
  title,
  author,
  blurb,
}: {
  bookId?: string;
  title: string;
  author: string;
  blurb: string;
}) {
  const paragraphs = blurb
    .split(/\n\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <aside className="cover-blurb" aria-label={`About ${title}`}>
      <BookCover bookId={bookId ?? ""} title={title} author={author} size="md" />
      {paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </aside>
  );
}
