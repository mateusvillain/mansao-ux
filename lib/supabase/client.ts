import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "./database.types";

export type Client = SupabaseClient<Database>;

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Fica `null` quando as variáveis de ambiente não estão configuradas, em vez de
 * lançar no import. Isso é deliberado: o app precisa renderizar (home, infos da
 * casa) mesmo sem banco, e um throw aqui derrubaria a árvore inteira no build.
 * Quem consome usa `requireClient()` e trata a ausência.
 */
export const supabase: Client | null =
  url && anonKey
    ? createClient<Database>(url, anonKey, {
        auth: { persistSession: false },
      })
    : null;

export const isSupabaseConfigured = supabase !== null;

export class SupabaseNotConfiguredError extends Error {
  constructor() {
    super(
      "Supabase não configurado: defina NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY (ver .env.example)."
    );
    this.name = "SupabaseNotConfiguredError";
  }
}

export function requireClient(): Client {
  if (!supabase) throw new SupabaseNotConfiguredError();
  return supabase;
}
