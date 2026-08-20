import { requireClient } from "@/lib/supabase/client";
import type { Guest, Profile } from "@/lib/supabase/database.types";

import { unwrap } from "./errors";

export type ProfileInput = {
  role: string;
  fun_fact: string;
  talk_to_me_about: string;
};

export type ProfileWithGuest = Profile & { guest: Pick<Guest, "id" | "name"> };

export async function listProfiles(): Promise<ProfileWithGuest[]> {
  const client = requireClient();
  return unwrap(
    await client
      .from("profiles")
      .select("*, guest:guests(id, name)")
      .order("created_at", { ascending: true })
      .returns<ProfileWithGuest[]>()
  );
}

export async function getProfileByGuest(guestId: string): Promise<Profile | null> {
  const client = requireClient();
  const result = await client.from("profiles").select("*").eq("guest_id", guestId).maybeSingle();
  return result.data;
}

export async function createProfile(guestId: string, input: ProfileInput): Promise<Profile> {
  const client = requireClient();
  return unwrap(
    await client.from("profiles").insert({ guest_id: guestId, ...input }).select().single()
  );
}

export async function updateProfile(guestId: string, input: ProfileInput): Promise<Profile> {
  const client = requireClient();
  return unwrap(
    await client
      .from("profiles")
      .update({ ...input, updated_at: new Date().toISOString() })
      .eq("guest_id", guestId)
      .select()
      .single()
  );
}
