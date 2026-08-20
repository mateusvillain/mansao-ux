import { requireClient } from "@/lib/supabase/client";
import type { Guest, Note } from "@/lib/supabase/database.types";

import { unwrap } from "./errors";

/** Espelha a constraint `notes_body_max_length` do banco. */
export const NOTE_MAX_LENGTH = 280;

export type NoteWithGuest = Note & { guest: Pick<Guest, "id" | "name"> };

export async function listNotes(): Promise<NoteWithGuest[]> {
  const client = requireClient();
  return unwrap(
    await client
      .from("notes")
      .select("*, guest:guests(id, name)")
      .order("created_at", { ascending: false })
      .returns<NoteWithGuest[]>()
  );
}

export async function createNote(guestId: string, body: string): Promise<Note> {
  const client = requireClient();
  return unwrap(
    await client.from("notes").insert({ guest_id: guestId, body: body.trim() }).select().single()
  );
}

export async function deleteNote(id: string): Promise<void> {
  const client = requireClient();
  const { error } = await client.from("notes").delete().eq("id", id);
  if (error) throw error;
}
