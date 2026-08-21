"use client";

import { useState } from "react";

import { Button, Card, Textarea } from "@/components/ui";
import { NOTE_MAX_LENGTH } from "@/lib/db/notes";

/** Escrever e publicar um post-it na casa (#19). */
export function NoteComposer({ onPublish }: { onPublish: (body: string) => Promise<void> }) {
  const [body, setBody] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function publish() {
    const trimmed = body.trim();
    if (!trimmed) {
      setError("Escreve alguma coisa primeiro 🙂");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      await onPublish(trimmed);
      setBody("");
    } catch {
      setError("Não consegui publicar agora. Tenta de novo?");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Card>
      <form
        className="flex flex-col gap-3"
        onSubmit={(event) => {
          event.preventDefault();
          void publish();
        }}
      >
        <Textarea
          label="Deixar um recado"
          name="recado"
          value={body}
          maxLength={NOTE_MAX_LENGTH}
          placeholder="Sobrou pizza na geladeira 🍕"
          counter={{ current: body.length, max: NOTE_MAX_LENGTH }}
          onChange={(event) => setBody(event.target.value)}
        />
        {error ? <p className="text-sm text-danger">{error}</p> : null}
        <Button type="submit" full disabled={busy}>
          {busy ? "Publicando…" : "Colar no mural"}
        </Button>
      </form>
    </Card>
  );
}
