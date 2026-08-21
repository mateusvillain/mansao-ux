import { CopyButton } from "@/components/home/CopyButton";
import { IdentityBadge } from "@/components/identity/IdentityBadge";
import { Card, PageShell } from "@/components/ui";
import { casa, pendencias } from "@/content/casa";

export default function HomePage() {
  const faltando = pendencias(casa);

  return (
    <PageShell title={`🏡 ${casa.nome}`} description={`Casa do UX Conf · ${casa.periodo.checkIn} a ${casa.periodo.checkOut}`}>
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

      {casa.wifi ? (
        <Card header={<h2 className="text-lg font-medium">Wi-Fi</h2>}>
          <dl className="flex flex-col gap-1 text-sm">
            <div className="flex gap-2">
              <dt className="text-muted">Rede</dt>
              <dd className="font-medium">{casa.wifi.rede}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-muted">Senha</dt>
              <dd className="font-mono font-medium">{casa.wifi.senha}</dd>
            </div>
          </dl>
          <div className="mt-3">
            <CopyButton value={casa.wifi.senha} label="Copiar senha" />
          </div>
        </Card>
      ) : null}

      <Card header={<h2 className="text-lg font-medium">Check-in e check-out</h2>}>
        <dl className="flex flex-col gap-1 text-sm">
          <div className="flex gap-2">
            <dt className="text-muted">Entrada</dt>
            <dd className="font-medium">
              {casa.periodo.checkIn}
              {casa.periodo.horaCheckIn ? ` · ${casa.periodo.horaCheckIn}` : ""}
            </dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-muted">Saída</dt>
            <dd className="font-medium">
              {casa.periodo.checkOut}
              {casa.periodo.horaCheckOut ? ` · ${casa.periodo.horaCheckOut}` : ""}
            </dd>
          </div>
        </dl>
      </Card>

      {casa.emergencia ? (
        <Card header={<h2 className="text-lg font-medium">Emergência</h2>}>
          <p className="text-sm text-muted">{casa.emergencia.nome}</p>
          <a
            href={`tel:${casa.emergencia.telefone.replace(/[^\d+]/g, "")}`}
            className="mt-1 inline-flex min-h-touch items-center text-lg font-medium text-accent underline"
          >
            {casa.emergencia.telefone}
          </a>
        </Card>
      ) : null}

      {casa.combinados.length > 0 ? (
        <Card header={<h2 className="text-lg font-medium">Combinados da casa</h2>}>
          <ul className="flex list-disc flex-col gap-1 pl-4 text-sm">
            {casa.combinados.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Card>
      ) : null}

      {faltando.length > 0 ? (
        <Card className="border-dashed">
          <p className="text-sm text-muted">
            Ainda faltam no cadastro da casa: {faltando.join(", ")}. (issue #15)
          </p>
        </Card>
      ) : null}
    </PageShell>
  );
}
