"use client";

import { useCallback, useEffect, useState } from "react";

import { useIdentity } from "@/components/identity/IdentityProvider";
import { Button, Card, EmptyState } from "@/components/ui";
import {
  createProfile,
  listProfiles,
  updateProfile,
  type ProfileInput,
  type ProfileWithGuest,
} from "@/lib/db/profiles";
import { subscribeToTable } from "@/lib/db/realtime";
import { isSupabaseConfigured } from "@/lib/supabase/client";

import { ProfileCard } from "./ProfileCard";
import { ProfileForm } from "./ProfileForm";

export function ProfileWall() {
  const { guest } = useIdentity();
  const [profiles, setProfiles] = useState<ProfileWithGuest[]>([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [editing, setEditing] = useState(false);

  const load = useCallback(async () => {
    try {
      setProfiles(await listProfiles());
      setFailed(false);
    } catch {
      setFailed(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      setFailed(true);
      return;
    }
    void load();
    // Um perfil novo de outra pessoa aparece sem recarregar a página.
    return subscribeToTable("profiles", () => void load());
  }, [load]);

  const mine = guest ? profiles.find((p) => p.guest_id === guest.id) : undefined;
  const others = mine ? profiles.filter((p) => p.id !== mine.id) : profiles;

  async function save(input: ProfileInput) {
    if (!guest) return;
    if (mine) await updateProfile(guest.id, input);
    else await createProfile(guest.id, input);
    setEditing(false);
    await load();
  }

  if (loading) return <p className="text-sm text-muted">Carregando perfis…</p>;

  if (failed) {
    return (
      <EmptyState
        title="Não consegui carregar os perfis"
        description="Pode ser a conexão. Puxa de novo?"
        action={<Button onClick={() => void load()}>Tentar de novo</Button>}
      />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {!mine || editing ? (
        <Card
          header={
            <h2 className="text-lg font-medium">
              {mine ? "Editar seu perfil" : "Seu perfil relâmpago"}
            </h2>
          }
        >
          <ProfileForm
            initial={
              mine
                ? {
                    role: mine.role,
                    fun_fact: mine.fun_fact,
                    talk_to_me_about: mine.talk_to_me_about,
                  }
                : undefined
            }
            submitLabel={mine ? "Salvar" : "Publicar no mural"}
            onSubmit={save}
            onCancel={mine ? () => setEditing(false) : undefined}
          />
        </Card>
      ) : (
        <ProfileCard
          profile={mine}
          action={
            <Button variant="ghost" className="px-3" onClick={() => setEditing(true)}>
              Editar
            </Button>
          }
        />
      )}

      {others.length === 0 ? (
        <EmptyState
          title={mine ? "Só você por enquanto" : "Ninguém preencheu ainda"}
          description={
            mine
              ? "Cutuca o pessoal no grupo — o mural fica bem melhor com todo mundo."
              : "Preenche o seu ali em cima e puxa o primeiro assunto da casa."
          }
        />
      ) : (
        others.map((profile) => <ProfileCard key={profile.id} profile={profile} />)
      )}
    </div>
  );
}
