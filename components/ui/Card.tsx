import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Cabeçalho opcional; use para título + ação no canto. */
  header?: ReactNode;
  className?: string;
};

export function Card({ children, header, className = "" }: Props) {
  return (
    <section
      className={[
        "rounded-card border border-border bg-surface p-4 shadow-card",
        className,
      ].join(" ")}
    >
      {header ? (
        <header className="mb-3 flex items-center justify-between gap-3">{header}</header>
      ) : null}
      {children}
    </section>
  );
}
