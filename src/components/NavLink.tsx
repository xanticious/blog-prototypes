import type { MouseEvent, ReactNode } from "react";
import { useApp } from "../machine/AppState";
import type { AppEvent } from "../machine/appMachine";

export function NavLink({
  href,
  event,
  current = false,
  className,
  children,
}: {
  href: string;
  event: AppEvent;
  current?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const { send } = useApp();
  const onClick = (mouseEvent: MouseEvent<HTMLAnchorElement>) => {
    if (
      mouseEvent.metaKey ||
      mouseEvent.ctrlKey ||
      mouseEvent.shiftKey ||
      mouseEvent.altKey ||
      mouseEvent.button !== 0
    ) {
      return;
    }
    mouseEvent.preventDefault();
    send(event);
  };

  return (
    <a href={href} className={className} aria-current={current ? "page" : undefined} onClick={onClick}>
      {children}
    </a>
  );
}
