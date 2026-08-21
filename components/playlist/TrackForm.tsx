"use client";

import { useState } from "react";

import { Button, Card, Input } from "@/components/ui";
import { DbError } from "@/lib/db/errors";

/** Sugerir uma música para a playlist da casa (#22). */
export function TrackForm({
  onSuggest,
}: {
  onSuggest: (title: string, artist: string) => Promise<void>;
}) {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function suggest() {
    const t = title.trim();
    const a = artist.trim();
    if (!t || !a) {
      setError("Preenche título e artista 🙂");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      await onSuggest(t, a);
      setTitle("");
      setArtist("");
    } catch (err) {
      setError(
        err instanceof DbError && err.isDuplicate
          ? "Essa música já está na playlist — vota nela ali embaixo."
          : "Não consegui adicionar agora. Tenta de novo?"
      );
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
          void suggest();
        }}
      >
        <Input
          label="Música"
          name="titulo"
          value={title}
          placeholder="Título"
          onChange={(event) => setTitle(event.target.value)}
        />
        <Input
          label="Artista"
          name="artista"
          value={artist}
          placeholder="Quem canta"
          onChange={(event) => setArtist(event.target.value)}
        />
        {error ? <p className="text-sm text-danger">{error}</p> : null}
        <Button type="submit" full disabled={busy}>
          {busy ? "Adicionando…" : "Sugerir música"}
        </Button>
      </form>
    </Card>
  );
}
