import { requireClient } from "@/lib/supabase/client";
import type { Vote } from "@/lib/supabase/database.types";

import { unwrap } from "./errors";

/** Ids das músicas em que este hóspede já votou — alimenta o estado do botão. */
export async function listVotesByGuest(guestId: string): Promise<string[]> {
  const client = requireClient();
  const rows = unwrap(await client.from("votes").select("track_id").eq("guest_id", guestId));
  return rows.map((row) => row.track_id);
}

/** Lança `DbError` com `isDuplicate` se o hóspede já votou nessa música. */
export async function addVote(trackId: string, guestId: string): Promise<Vote> {
  const client = requireClient();
  return unwrap(
    await client.from("votes").insert({ track_id: trackId, guest_id: guestId }).select().single()
  );
}

export async function removeVote(trackId: string, guestId: string): Promise<void> {
  const client = requireClient();
  const { error } = await client
    .from("votes")
    .delete()
    .eq("track_id", trackId)
    .eq("guest_id", guestId);
  if (error) throw error;
}
