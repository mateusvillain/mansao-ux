"use client";

import { useCallback, useEffect, useState } from "react";

import { useIdentity } from "@/components/identity/IdentityProvider";
import { Button, EmptyState } from "@/components/ui";
import { createNote, deleteNote, listNotes, type NoteWithGuest } from "@/lib/db/notes";
import { subscribeToTable } from "@/lib/db/realtime";
import { isSupabaseConfigured } from "@/lib/supabase/client";

import { NoteCard } from "./NoteCard";
import { NoteComposer } from "./NoteComposer";

export function NoteBoard() {
  const { guest } = useIdentity();
  const [notes, setNotes] = useState<NoteWithGuest[]>([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  const load = useCallback(async () => {
    try {
      setNotes(await listNotes());
      setFailed(false);
    } catch {
      setFailed(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      setFailed(true);
      return;
    }
    void load();
    return subscribeToTable("notes", () => void load());
  }, [load]);

  async function publish(body: string) {
    if (!guest) return;
    await createNote(guest.id, body);
    await load();
  }

  async function remove(id: string) {
    await deleteNote(id);
    await load();
  }

  return (
    <div className="flex flex-col gap-4">
      <NoteComposer onPublish={publish} />

      {loading ? <p className="text-sm text-muted">Carregando recados…</p> : null}

      {failed ? (
        <EmptyState
          title="Não consegui carregar os recados"
          description="Pode ser a conexão. Puxa de novo?"
          action={<Button onClick={() => void load()}>Tentar de novo</Button>}
        />
      ) : null}

      {!loading && !failed && notes.length === 0 ? (
        <EmptyState
          title="Mural vazio"
          description="Nenhum recado ainda. O primeiro post-it é seu."
        />
      ) : null}

      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          mine={note.guest_id === guest?.id}
          onDelete={() => remove(note.id)}
        />
      ))}
    </div>
  );
}
