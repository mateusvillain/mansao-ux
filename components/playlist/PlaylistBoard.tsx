"use client";

import { useCallback, useEffect, useState } from "react";

import { useIdentity } from "@/components/identity/IdentityProvider";
import { Button, EmptyState } from "@/components/ui";
import { DbError } from "@/lib/db/errors";
import { subscribeToTable } from "@/lib/db/realtime";
import { createTrack, listRankedTracks, type RankedTrackWithGuest } from "@/lib/db/tracks";
import { addVote, listVotesByGuest, removeVote } from "@/lib/db/votes";
import { isSupabaseConfigured } from "@/lib/supabase/client";

import { TrackForm } from "./TrackForm";
import { TrackRow } from "./TrackRow";

export function PlaylistBoard() {
  const { guest } = useIdentity();
  const [tracks, setTracks] = useState<RankedTrackWithGuest[]>([]);
  const [myVotes, setMyVotes] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [votingId, setVotingId] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setTracks(await listRankedTracks());
      setFailed(false);
    } catch {
      setFailed(true);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadVotes = useCallback(async () => {
    if (!guest) return;
    try {
      setMyVotes(new Set(await listVotesByGuest(guest.id)));
    } catch {
      // O ranking continua utilizável sem saber em que você votou.
    }
  }, [guest]);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      setFailed(true);
      return;
    }
    void load();
    void loadVotes();
    // Duas subscriptions: uma música nova e um voto novo mudam a mesma lista,
    // porque a ordenação depende da contagem agregada.
    const offTracks = subscribeToTable("tracks", () => void load());
    const offVotes = subscribeToTable("votes", () => void load());
    return () => {
      offTracks();
      offVotes();
    };
  }, [load, loadVotes]);

  async function suggest(title: string, artist: string) {
    if (!guest) return;
    await createTrack(guest.id, title, artist);
    await load();
  }

  async function toggleVote(trackId: string) {
    if (!guest) return;
    const had = myVotes.has(trackId);

    // Atualização otimista: o toque no botão responde na hora, sem esperar
    // a ida ao banco. Se falhar, o reload logo abaixo restaura a verdade.
    setMyVotes((prev) => {
      const next = new Set(prev);
      if (had) next.delete(trackId);
      else next.add(trackId);
      return next;
    });
    setVotingId(trackId);

    try {
      if (had) await removeVote(trackId, guest.id);
      else await addVote(trackId, guest.id);
    } catch (err) {
      // Voto duplicado (corrida entre dois toques) não é erro para o usuário:
      // o estado desejado já está no banco.
      if (!(err instanceof DbError && err.isDuplicate)) await loadVotes();
    } finally {
      setVotingId(null);
      await load();
      await loadVotes();
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <TrackForm onSuggest={suggest} />

      {loading ? <p className="text-sm text-muted">Carregando playlist…</p> : null}

      {failed ? (
        <EmptyState
          title="Não consegui carregar a playlist"
          description="Pode ser a conexão. Puxa de novo?"
          action={<Button onClick={() => void load()}>Tentar de novo</Button>}
        />
      ) : null}

      {!loading && !failed && tracks.length === 0 ? (
        <EmptyState
          title="Playlist vazia"
          description="Sugere a primeira música e deixa o resto da casa votar."
        />
      ) : null}

      {tracks.map((track, index) => (
        <TrackRow
          key={track.id}
          track={track}
          position={index + 1}
          voted={myVotes.has(track.id)}
          isMine={track.guest_id === guest?.id}
          busy={votingId === track.id}
          onToggleVote={() => void toggleVote(track.id)}
        />
      ))}
    </div>
  );
}
