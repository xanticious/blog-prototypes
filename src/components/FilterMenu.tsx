import { useEffect, useId, useRef, useState } from "react";

function fold(value: string): string {
  return value.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();
}

export function FilterMenu({
  label,
  value,
  options,
  anyLabel,
  searchable = false,
  searchPlaceholder,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  anyLabel: string;
  searchable?: boolean;
  searchPlaceholder?: string;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const labelId = useId();
  const listId = useId();
  const needle = fold(query.trim());
  const shown = needle ? options.filter((option) => fold(option).includes(needle)) : options;

  useEffect(() => {
    if (!open) return;
    searchRef.current?.focus();
    const onPointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function choose(next: string) {
    onChange(next);
    setQuery("");
    setOpen(false);
  }

  return (
    <div className="filter-menu" ref={rootRef}>
      <span className="filter-label" id={labelId}>
        {label}
      </span>
      <button
        type="button"
        className="filter-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-labelledby={labelId}
        onClick={() => {
          setOpen((current) => !current);
          setQuery("");
        }}
      >
        <span>{value || anyLabel}</span>
      </button>
      {open ? (
        <div className="filter-panel">
          {searchable ? (
            <input
              ref={searchRef}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  if (shown.length === 1) choose(shown[0]);
                }
              }}
              placeholder={searchPlaceholder}
              aria-label={`Filter the ${label.toLowerCase()} list`}
              autoComplete="off"
            />
          ) : null}
          <ul id={listId} role="listbox" aria-labelledby={labelId}>
            {needle ? null : (
              <li>
                <button type="button" role="option" aria-selected={value === ""} onClick={() => choose("")}>
                  {anyLabel}
                </button>
              </li>
            )}
            {shown.map((option) => (
              <li key={option}>
                <button
                  type="button"
                  role="option"
                  aria-selected={value === option}
                  onClick={() => choose(option)}
                >
                  {option}
                </button>
              </li>
            ))}
            {shown.length === 0 ? <li className="filter-empty">Nothing matches.</li> : null}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
