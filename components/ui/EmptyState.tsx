import type { ReactNode } from "react";

type Props = {
  title: string;
  /** O que a pessoa deve fazer agora — nunca deixe um vazio sem saída. */
  description: string;
  action?: ReactNode;
};

export function EmptyState({ title, description, action }: Props) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-card border border-dashed border-border px-6 py-10 text-center">
      <p className="text-lg font-medium text-ink">{title}</p>
      <p className="max-w-xs text-sm text-muted">{description}</p>
      {action ? <div className="mt-2">{action}</div> : null}
    </div>
  );
}
