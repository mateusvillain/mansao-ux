import type { RealtimeTable } from "@/lib/supabase/database.types";
import { supabase } from "@/lib/supabase/client";

/**
 * Assina mudanças de uma tabela e chama `onChange` a cada evento.
 * Retorna a função de cleanup — use direto no `useEffect` das listagens
 * ao vivo (#17, #20, #23).
 *
 * Sem Supabase configurado vira no-op: a lista simplesmente não atualiza
 * sozinha, em vez de quebrar a página.
 */
export function subscribeToTable(table: RealtimeTable, onChange: () => void): () => void {
  // Capturado em uma const local: o TS não mantém o narrowing de um binding
  // importado dentro do closure de cleanup.
  const client = supabase;
  if (!client) return () => {};

  const channel = client
    .channel(`realtime:${table}`)
    .on("postgres_changes", { event: "*", schema: "public", table }, onChange)
    .subscribe();

  return () => {
    void client.removeChannel(channel);
  };
}
