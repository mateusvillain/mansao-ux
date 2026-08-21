/**
 * Aliases de domínio derivados de `database.types.ts` (que é gerado — não edite
 * aquele arquivo à mão; rode `npm run types:db`). Este aqui é a camada fina que
 * dá nomes de domínio às linhas e resolve a nulabilidade das views.
 */
import type { Database } from "./database.types";

type PublicSchema = Database["public"];
type Row<T extends keyof PublicSchema["Tables"]> = PublicSchema["Tables"][T]["Row"];
type ViewRow<T extends keyof PublicSchema["Views"]> = PublicSchema["Views"][T]["Row"];

export type Guest = Row<"guests">;
export type Profile = Row<"profiles">;
export type Note = Row<"notes">;
export type Track = Row<"tracks">;
export type Vote = Row<"votes">;

export type GuestInsert = PublicSchema["Tables"]["guests"]["Insert"];
export type ProfileInsert = PublicSchema["Tables"]["profiles"]["Insert"];
export type NoteInsert = PublicSchema["Tables"]["notes"]["Insert"];
export type TrackInsert = PublicSchema["Tables"]["tracks"]["Insert"];
export type VoteInsert = PublicSchema["Tables"]["votes"]["Insert"];

type NonNullableFields<T> = { [K in keyof T]-?: NonNullable<T[K]> };

/**
 * O Postgres não consegue provar não-nulidade em colunas de view, então a
 * geração marca todas como nullable. Na prática nenhuma é: as colunas vêm
 * direto de `tracks` (todas NOT NULL) e `vote_count` é um `count()`, que
 * retorna 0, nunca null. Estreitamos aqui, num ponto único e documentado,
 * em vez de espalhar `?? 0` e `!` pela UI.
 */
export type RankedTrack = NonNullableFields<ViewRow<"tracks_ranked">>;

/** Tabelas na publicação `supabase_realtime`. */
export type RealtimeTable = "profiles" | "notes" | "tracks" | "votes";
