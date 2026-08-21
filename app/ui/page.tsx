import { Button, Card, EmptyState, Input, Textarea } from "@/components/ui";

/** Amostra dos componentes base — critério de aceite da issue #11. */
export default function UiSamplePage() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col gap-6 p-4">
      <header className="py-4">
        <h1 className="text-2xl font-semibold">Componentes base</h1>
        <p className="mt-1 text-sm text-muted">
          Tokens e componentes reutilizados por todas as telas da Mansão UX.
        </p>
      </header>

      <Card header={<h2 className="text-lg font-medium">Botões</h2>}>
        <div className="flex flex-col gap-3">
          <Button full>Primário</Button>
          <Button variant="secondary" full>
            Secundário
          </Button>
          <Button variant="ghost" full>
            Ghost
          </Button>
          <Button variant="danger" full>
            Remover
          </Button>
          <Button full disabled>
            Desabilitado
          </Button>
        </div>
      </Card>

      <Card header={<h2 className="text-lg font-medium">Campos</h2>}>
        <div className="flex flex-col gap-4">
          <Input label="Seu nome" name="nome" placeholder="Como te chamam?" />
          <Input
            label="Música"
            name="musica"
            placeholder="Título"
            hint="Depois a gente pergunta o artista."
          />
          <Textarea
            label="Recado"
            name="recado"
            placeholder="Sobrou pizza na geladeira 🍕"
            counter={{ current: 0, max: 280 }}
          />
        </div>
      </Card>

      <Card header={<h2 className="text-lg font-medium">Estado vazio</h2>}>
        <EmptyState
          title="Nenhum recado ainda"
          description="Seja a primeira pessoa a deixar um post-it na casa."
          action={<Button>Escrever recado</Button>}
        />
      </Card>
    </main>
  );
}
