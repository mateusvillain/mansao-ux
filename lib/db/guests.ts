import { requireClient } from "@/lib/supabase/client";
import type { Guest } from "@/lib/supabase/types";

import { unwrap } from "./errors";

export async function listGuests(): Promise<Guest[]> {
  const client = requireClient();
  return unwrap(await client.from("guests").select("*").order("name"));
}

/**
 * Cria o hóspede ou devolve o existente de mesmo nome. É idempotente de
 * propósito: a #12 chama isso no primeiro acesso e não deve criar duplicata
 * se a pessoa limpar o armazenamento do navegador e voltar.
 */
export async function findOrCreateGuest(name: string): Promise<Guest> {
  const client = requireClient();
  const trimmed = name.trim();

  const existing = await client.from("guests").select("*").eq("name", trimmed).maybeSingle();
  if (existing.data) return existing.data;

  return unwrap(await client.from("guests").insert({ name: trimmed }).select().single());
}

export async function getGuest(id: string): Promise<Guest | null> {
  const client = requireClient();
  const result = await client.from("guests").select("*").eq("id", id).maybeSingle();
  return result.data;
}

/**
 * Renomeia o hóspede. Existe para corrigir um nome digitado errado no primeiro
 * acesso — sem isso ele viraria registro permanente na lista de escolha dos
 * outros (ver migration 20260821012000).
 *
 * Lança `DbError` com `isDuplicate` se o novo nome já pertence a outra pessoa.
 */
export async function renameGuest(id: string, name: string): Promise<Guest> {
  const client = requireClient();
  return unwrap(
    await client.from("guests").update({ name: name.trim() }).eq("id", id).select().single()
  );
}
