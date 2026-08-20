import Link from "next/link";

import { Button, Card } from "@/components/ui";
import { isSupabaseConfigured } from "@/lib/supabase/client";

/**
 * Placeholder da home. O conteúdo real (endereço, wi-fi, combinados) é a
 * issue #14, na Epic #2 — aqui só existe o suficiente para o deploy da #10
 * ter o que servir.
 */
export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col gap-4 p-4">
      <header className="py-6">
        <h1 className="text-2xl font-semibold">🏡 Mansão UX</h1>
        <p className="mt-1 text-muted">Casa compartilhada do UX Conf · 24/09 a 27/09</p>
      </header>

      <Card>
        <h2 className="text-lg font-medium">Fundação no ar</h2>
        <p className="mt-2 text-sm text-muted">
          Stack, banco e deploy configurados. As telas da casa chegam nas próximas Epics.
        </p>
        <p className="mt-3 text-sm">
          Supabase:{" "}
          <strong className={isSupabaseConfigured ? "text-accent" : "text-danger"}>
            {isSupabaseConfigured ? "configurado" : "não configurado"}
          </strong>
        </p>
      </Card>

      <Link href="/ui">
        <Button variant="secondary" full>
          Ver componentes base
        </Button>
      </Link>
    </main>
  );
}
