import type { ReactNode } from "react";

/** Moldura comum das telas: largura de leitura, respiro e espaço para a nav fixa. */
export function PageShell({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col gap-4 p-4 pb-[calc(theme(spacing.nav)+1.5rem)]">
      <header className="pt-4">
        <h1 className="text-2xl font-semibold">{title}</h1>
        {description ? <p className="mt-1 text-muted">{description}</p> : null}
      </header>
      {children}
    </main>
  );
}
