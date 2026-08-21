"use client";

import { useState } from "react";

import { Button, Input } from "@/components/ui";
import { DbError } from "@/lib/db/errors";

import { useIdentity } from "./IdentityProvider";

/** Mostra quem você é e permite corrigir o nome ou trocar de identidade. */
export function IdentityBadge() {
  const { guest, rename, signOut } = useIdentity();
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(guest?.name ?? "");
  const [error, setError] = useState<string | null>(null);

  if (!guest) return null;

  async function save() {
    const trimmed = value.trim();
    if (!trimmed) return setError("O nome não pode ficar vazio.");
    try {
      await rename(trimmed);
      setEditing(false);
      setError(null);
    } catch (err) {
      setError(
        err instanceof DbError && err.isDuplicate
          ? "Já tem alguém com esse nome na casa."
          : "Não consegui salvar agora."
      );
    }
  }

  if (editing) {
    return (
      <div className="flex flex-col gap-2">
        <Input
          label="Seu nome"
          name="novo-nome"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
        {error ? <p className="text-sm text-danger">{error}</p> : null}
        <div className="flex gap-2">
          <Button onClick={() => void save()}>Salvar</Button>
          <Button variant="ghost" onClick={() => { setEditing(false); setError(null); }}>
            Cancelar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between gap-3">
      <p className="text-sm text-muted">
        Você é <strong className="text-ink">{guest.name}</strong>
      </p>
      <div className="flex gap-1">
        <Button variant="ghost" className="px-3" onClick={() => { setValue(guest.name); setEditing(true); }}>
          Editar
        </Button>
        <Button variant="ghost" className="px-3" onClick={signOut}>
          Trocar
        </Button>
      </div>
    </div>
  );
}
