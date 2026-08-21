import { CopyButton } from "@/components/home/CopyButton";
import { IdentityBadge } from "@/components/identity/IdentityBadge";
import { Card, PageShell } from "@/components/ui";
import { casa, pendencias } from "@/content/casa";

export default function HomePage() {
  const faltando = pendencias(casa);

  return (
    <PageShell
      title={`🏡 ${casa.nome}`}
      description={`Casa do UX Conf · ${casa.periodo.checkIn} a ${casa.periodo.checkOut}`}
    >
      <Card>
        <IdentityBadge />
      </Card>

      {casa.endereco ? (
        <Card header={<h2 className="text-lg font-medium">Onde fica</h2>}>
          <p className="text-ink">{casa.endereco}</p>
          {casa.distanciaEvento ? (
            <p className="mt-1 text-sm text-muted">{casa.distanciaEvento} até o evento</p>
          ) : null}
          {casa.mapaUrl ? (
            <a
              href={casa.mapaUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex min-h-touch items-center font-medium text-accent underline"
            >
              Abrir no mapa
            </a>
          ) : null}
        </Card>
      ) : null}

      <Card header={<h2 className="text-lg font-medium">Wi-Fi</h2>}>
        {casa.wifi?.senha ? (
          <>
            <dl className="flex flex-col gap-1 text-sm">
              {casa.wifi.rede ? (
                <div className="flex gap-2">
                  <dt className="text-muted">Rede</dt>
                  <dd className="font-medium">{casa.wifi.rede}</dd>
                </div>
              ) : null}
              <div className="flex gap-2">
                <dt className="text-muted">Senha</dt>
                <dd className="font-mono font-medium">{casa.wifi.senha}</dd>
              </div>
            </dl>
            <div className="mt-3">
              <CopyButton value={casa.wifi.senha} label="Copiar senha" />
            </div>
          </>
        ) : (
          <p className="text-sm text-muted">
            Ainda não sabemos a senha — a casa informa na chegada.
          </p>
        )}
      </Card>

      <Card header={<h2 className="text-lg font-medium">Estadia</h2>}>
        <dl className="flex flex-col gap-1 text-sm">
          <div className="flex gap-2">
            <dt className="text-muted">Entrada</dt>
            <dd className="font-medium">{casa.periodo.checkIn}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-muted">Saída</dt>
            <dd className="font-medium">{casa.periodo.checkOut}</dd>
          </div>
          {casa.anfitriao ? (
            <div className="flex gap-2">
              <dt className="text-muted">Anfitrião</dt>
              <dd className="font-medium">{casa.anfitriao}</dd>
            </div>
          ) : null}
        </dl>
      </Card>

      {faltando.length > 0 ? (
        <Card className="border-dashed">
          <p className="text-sm text-muted">Ainda falta: {faltando.join(", ")}.</p>
        </Card>
      ) : null}
    </PageShell>
  );
}
