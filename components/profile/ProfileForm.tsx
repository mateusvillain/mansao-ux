"use client";

import { useState } from "react";

import { Button, Input, Textarea } from "@/components/ui";
import { DbError } from "@/lib/db/errors";
import type { ProfileInput } from "@/lib/db/profiles";

const FUN_FACT_MAX = 200;
const TALK_MAX = 200;

/**
 * Formulário do mini perfil. Serve para criar (#16) e para editar (#18) — o
 * modo de edição é o mesmo formulário com valores iniciais, o que evita duas
 * telas divergirem em validação e rótulos.
 */
export function ProfileForm({
  initial,
  submitLabel,
  onSubmit,
  onCancel,
}: {
  initial?: ProfileInput;
  submitLabel: string;
  onSubmit: (input: ProfileInput) => Promise<void>;
  onCancel?: () => void;
}) {
  const [role, setRole] = useState(initial?.role ?? "");
  const [funFact, setFunFact] = useState(initial?.fun_fact ?? "");
  const [talk, setTalk] = useState(initial?.talk_to_me_about ?? "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    const input: ProfileInput = {
      role: role.trim(),
      fun_fact: funFact.trim(),
      talk_to_me_about: talk.trim(),
    };
    if (!input.role || !input.fun_fact || !input.talk_to_me_about) {
      setError("Preenche os três campos — é rapidinho 🙂");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      await onSubmit(input);
    } catch (err) {
      setError(
        err instanceof DbError && err.isDuplicate
          ? "Você já tem um perfil na casa."
          : "Não consegui salvar agora. Tenta de novo?"
      );
      setBusy(false);
    }
  }

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        void submit();
      }}
    >
      <Input
        label="O que você faz"
        name="role"
        value={role}
        placeholder="Designer de produto, pesquisadora, dev…"
        onChange={(event) => setRole(event.target.value)}
      />
      <Textarea
        label="Um fato curioso sobre você"
        name="fun_fact"
        value={funFact}
        maxLength={FUN_FACT_MAX}
        placeholder="Já morei em 4 países. Ou: faço pão de fermentação natural."
        counter={{ current: funFact.length, max: FUN_FACT_MAX }}
        onChange={(event) => setFunFact(event.target.value)}
      />
      <Textarea
        label="Me chama pra falar sobre..."
        name="talk_to_me_about"
        value={talk}
        maxLength={TALK_MAX}
        placeholder="Design system, escalada, café, séries ruins…"
        counter={{ current: talk.length, max: TALK_MAX }}
        onChange={(event) => setTalk(event.target.value)}
      />
      {error ? <p className="text-sm text-danger">{error}</p> : null}
      <div className="flex gap-2">
        <Button type="submit" full={!onCancel} disabled={busy}>
          {busy ? "Salvando…" : submitLabel}
        </Button>
        {onCancel ? (
          <Button type="button" variant="ghost" onClick={onCancel} disabled={busy}>
            Cancelar
          </Button>
        ) : null}
      </div>
    </form>
  );
}
