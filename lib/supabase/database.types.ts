/**
 * Tipos do banco.
 *
 * ATENÇÃO: este arquivo espelha `supabase/migrations/20260820_000001_init.sql` e foi
 * escrito à mão porque o projeto Supabase ainda não existe (issue #7). Assim que ele
 * for provisionado, regenere com `npm run types:db` e substitua este conteúdo — a
 * geração é a fonte da verdade, este arquivo é só a ponte até lá.
 */

type Timestamped = { created_at: string };

export type Guest = Timestamped & {
  id: string;
  name: string;
};

export type Profile = Timestamped & {
  id: string;
  guest_id: string;
  role: string;
  fun_fact: string;
  talk_to_me_about: string;
  updated_at: string;
};

export type Note = Timestamped & {
  id: string;
  guest_id: string;
  body: string;
};

export type Track = Timestamped & {
  id: string;
  guest_id: string;
  title: string;
  artist: string;
};

export type RankedTrack = Track & { vote_count: number };

export type Vote = Timestamped & {
  id: string;
  track_id: string;
  guest_id: string;
};

/** `Relationships` é exigida pelos genéricos do supabase-js, mesmo vazia. */
type Table<Row, Insert, Update = Partial<Row>> = {
  Row: Row;
  Insert: Insert;
  Update: Update;
  Relationships: [];
};

export type Database = {
  public: {
    Tables: {
      guests: Table<Guest, { name: string }>;
      profiles: Table<
        Profile,
        { guest_id: string; role: string; fun_fact: string; talk_to_me_about: string }
      >;
      notes: Table<Note, { guest_id: string; body: string }>;
      tracks: Table<Track, { guest_id: string; title: string; artist: string }>;
      votes: Table<Vote, { track_id: string; guest_id: string }>;
    };
    Views: {
      tracks_ranked: { Row: RankedTrack; Relationships: [] };
    };
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

/** Nomes de tabela com realtime habilitado — restringe o helper de subscription. */
export type RealtimeTable = "profiles" | "notes" | "tracks" | "votes";
