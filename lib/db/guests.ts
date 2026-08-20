import { requireClient } from "@/lib/supabase/client";
import type { Guest } from "@/lib/supabase/database.types";

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
