"use client";

import { useState } from "react";

import { Button, Card } from "@/components/ui";
import type { NoteWithGuest } from "@/lib/db/notes";
import { relativeTime } from "@/lib/time";

/**
 * Um recado no mural. A remoção pede confirmação inline em vez de `confirm()`:
 * o diálogo nativo é feio no celular e alguns navegadores o bloqueiam.
 */
export function NoteCard({
  note,
  mine,
  onDelete,
}: {
  note: NoteWithGuest;
  mine: boolean;
  onDelete: () => Promise<void>;
}) {
  const [confirming, setConfirming] = useState(false);
  const [busy, setBusy] = useState(false);

  async function remove() {
    setBusy(true);
    try {
      await onDelete();
    } finally {
      setBusy(false);
      setConfirming(false);
    }
  }

  return (
    <Card
      header={
        <>
          <p className="text-sm">
            <strong>{note.guest.name}</strong>
            <span className="text-muted"> · {relativeTime(note.created_at)}</span>
          </p>
          {mine && !confirming ? (
            <Button variant="ghost" className="px-3" onClick={() => setConfirming(true)}>
              Remover
            </Button>
          ) : null}
        </>
      }
    >
      <p className="whitespace-pre-wrap break-words">{note.body}</p>

      {confirming ? (
        <div className="mt-3 flex items-center gap-2 border-t border-border pt-3">
          <p className="flex-1 text-sm text-muted">Remover este recado?</p>
          <Button variant="danger" disabled={busy} onClick={() => void remove()}>
            {busy ? "Removendo…" : "Remover"}
          </Button>
          <Button variant="ghost" disabled={busy} onClick={() => setConfirming(false)}>
            Cancelar
          </Button>
        </div>
      ) : null}
    </Card>
  );
}
