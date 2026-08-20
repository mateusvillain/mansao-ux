import { PostgrestError } from "@supabase/supabase-js";

/** Erro de violação de unicidade no Postgres — duplicata de música, voto repetido. */
export const UNIQUE_VIOLATION = "23505";

export class DbError extends Error {
  readonly code: string | undefined;

  constructor(message: string, code?: string) {
    super(message);
    this.name = "DbError";
    this.code = code;
  }

  get isDuplicate(): boolean {
    return this.code === UNIQUE_VIOLATION;
  }
}

/** Normaliza o retorno `{ data, error }` do Supabase em valor ou exceção tipada. */
export function unwrap<T>(result: { data: T | null; error: PostgrestError | null }): T {
  if (result.error) throw new DbError(result.error.message, result.error.code);
  if (result.data === null) throw new DbError("Consulta não retornou dados.");
  return result.data;
}
