"use client";

import { Button, Card } from "@/components/ui";
import type { RankedTrackWithGuest } from "@/lib/db/tracks";

/**
 * Uma música no ranking. O botão de voto some na própria sugestão — a regra
 * "ninguém vota na própria" (#24) é aplicada aqui, e não escondendo a linha.
 */
export function TrackRow({
  track,
  position,
  voted,
  isMine,
  busy,
  onToggleVote,
}: {
  track: RankedTrackWithGuest;
  position: number;
  voted: boolean;
  isMine: boolean;
  busy: boolean;
  onToggleVote: () => void;
}) {
  return (
    <Card>
      <div className="flex items-center gap-3">
        <span
          aria-hidden
          className="w-6 shrink-0 text-center text-sm font-semibold text-muted"
        >
          {position}
        </span>

        <div className="min-w-0 flex-1">
          <p className="truncate font-medium">{track.title}</p>
          <p className="truncate text-sm text-muted">{track.artist}</p>
          <p className="mt-0.5 truncate text-xs text-muted">
            sugerida por {track.guest.name}
          </p>
        </div>

        <div className="flex shrink-0 flex-col items-center gap-1">
          {isMine ? (
            <span
              className="flex min-h-touch items-center px-2 text-sm text-muted"
              title="Você não vota na própria sugestão"
            >
              sua
            </span>
          ) : (
            <Button
              variant={voted ? "primary" : "secondary"}
              className="px-3"
              disabled={busy}
              aria-pressed={voted}
              aria-label={voted ? `Remover voto em ${track.title}` : `Votar em ${track.title}`}
              onClick={onToggleVote}
            >
              {voted ? "▲ votado" : "▲ votar"}
            </Button>
          )}
          <span className="text-xs text-muted">
            {track.vote_count} {track.vote_count === 1 ? "voto" : "votos"}
          </span>
        </div>
      </div>
    </Card>
  );
}
