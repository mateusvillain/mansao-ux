import { requireClient } from "@/lib/supabase/client";
import type { Guest, RankedTrack, Track } from "@/lib/supabase/database.types";

import { unwrap } from "./errors";

export type RankedTrackWithGuest = RankedTrack & { guest: Pick<Guest, "id" | "name"> };

/**
 * Ranking da playlist: mais votados primeiro, sugestão mais antiga como
 * desempate. Lê a view `tracks_ranked`, que já traz a contagem agregada.
 */
export async function listRankedTracks(): Promise<RankedTrackWithGuest[]> {
  const client = requireClient();
  return unwrap(
    await client
      .from("tracks_ranked")
      .select("*, guest:guests(id, name)")
      .order("vote_count", { ascending: false })
      .order("created_at", { ascending: true })
      .returns<RankedTrackWithGuest[]>()
  );
}

/** Lança `DbError` com `isDuplicate` quando título e artista já existem. */
export async function createTrack(
  guestId: string,
  title: string,
  artist: string
): Promise<Track> {
  const client = requireClient();
  return unwrap(
    await client
      .from("tracks")
      .insert({ guest_id: guestId, title: title.trim(), artist: artist.trim() })
      .select()
      .single()
  );
}
