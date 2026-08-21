"use client";

import { useEffect, useState } from "react";

import { Button, Card, Input } from "@/components/ui";
import { listGuests } from "@/lib/db/guests";
import { DbError } from "@/lib/db/errors";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import type { Guest } from "@/lib/supabase/types";

import { useIdentity } from "./IdentityProvider";

/**
 * Porta de entrada: só libera o app depois que a pessoa diz quem é.
 * Sem senha, sem e-mail, sem cadastro — critério de aceite da #12.
 */
export function IdentityGate({ children }: { children: React.ReactNode }) {
  const { guest, loading, identify } = useIdentity();
  const [guests, setGuests] = useState<Guest[]>([]);
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (guest || loading || !isSupabaseConfigured) return;
    listGuests()
      .then(setGuests)
      .catch(() => setGuests([]));
  }, [guest, loading]);

  // Enquanto lê o storage, mostra o cabeçalho em vez de `null`: no servidor
  // `loading` é sempre true, então retornar null deixaria a primeira pintura
  // em branco até a hidratação.
  if (loading) {
    return (
      <main className="mx-auto flex min-h-dvh max-w-md flex-col justify-center gap-2 p-4">
        <h1 className="text-2xl font-semibold">🏡 Mansão UX</h1>
        <p className="text-muted">Abrindo a casa…</p>
      </main>
    );
  }
  if (guest) return <>{children}</>;

  async function choose(value: string) {
    const trimmed = value.trim();
    if (!trimmed) {
      setError("Escreve teu nome pra gente saber quem é 🙂");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      await identify(trimmed);
    } catch (err) {
      setError(
        err instanceof DbError
          ? "Não consegui salvar agora. Tenta de novo?"
          : "Algo deu errado. Tenta de novo?"
      );
      setBusy(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col justify-center gap-5 p-4">
      <header>
        <h1 className="text-2xl font-semibold">🏡 Mansão UX</h1>
        <p className="mt-1 text-muted">Antes de entrar, quem é você?</p>
      </header>

      <Card>
        <form
          className="flex flex-col gap-4"
          onSubmit={(event) => {
            event.preventDefault();
            void choose(name);
          }}
        >
          <Input
            label="Seu nome"
            name="nome"
            value={name}
            autoComplete="name"
            placeholder="Como te chamam?"
            onChange={(event) => setName(event.target.value)}
            hint="Fica salvo neste aparelho. Dá pra trocar depois."
          />
          {error ? <p className="text-sm text-danger">{error}</p> : null}
          <Button type="submit" full disabled={busy}>
            {busy ? "Entrando…" : "Entrar na casa"}
          </Button>
        </form>
      </Card>

      {guests.length > 0 ? (
        <Card header={<h2 className="text-sm font-medium text-muted">Já entraram antes</h2>}>
          <ul className="flex flex-wrap gap-2">
            {guests.map((item) => (
              <li key={item.id}>
                <Button
                  variant="secondary"
                  disabled={busy}
                  onClick={() => void choose(item.name)}
                >
                  {item.name}
                </Button>
              </li>
            ))}
          </ul>
        </Card>
      ) : null}
    </main>
  );
}
