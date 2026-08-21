/**
 * Conteúdo da casa — fonte única, editável sem mexer em componente (#14).
 *
 * Os campos marcados como `null` ainda estão em aberto no `mansao-ux.md` e
 * dependem do anfitrião: é exatamente o que a issue #15 vai preencher. A home
 * omite a seção correspondente quando o valor é `null`, em vez de mostrar
 * "[preencher]" para o grupo.
 */
export type Casa = {
  nome: string;
  periodo: { checkIn: string; checkOut: string; horaCheckIn: string | null; horaCheckOut: string | null };
  endereco: string | null;
  mapaUrl: string | null;
  distanciaEvento: string | null;
  anfitriao: string | null;
  wifi: { rede: string; senha: string } | null;
  emergencia: { nome: string; telefone: string } | null;
  comoChegar: { doAeroporto: string | null; doCentroDeConvencoes: string | null; appSugerido: string | null };
  combinados: string[];
  levar: string[];
};

export const casa: Casa = {
  nome: "Mansão UX",
  periodo: {
    checkIn: "24/09",
    checkOut: "27/09",
    horaCheckIn: null,
    horaCheckOut: null,
  },
  endereco: null,
  mapaUrl: null,
  distanciaEvento: null,
  anfitriao: null,
  wifi: null,
  emergencia: null,
  comoChegar: {
    doAeroporto: null,
    doCentroDeConvencoes: null,
    appSugerido: null,
  },
  combinados: [],
  levar: [],
};

/** Campos ainda pendentes — a home usa para avisar em vez de fingir que está pronto. */
export function pendencias(c: Casa): string[] {
  const faltando: string[] = [];
  if (!c.endereco) faltando.push("endereço");
  if (!c.mapaUrl) faltando.push("link do mapa");
  if (!c.distanciaEvento) faltando.push("distância até o evento");
  if (!c.periodo.horaCheckIn || !c.periodo.horaCheckOut) faltando.push("horários de check-in/out");
  if (!c.wifi) faltando.push("wi-fi");
  if (!c.emergencia) faltando.push("contato de emergência");
  if (c.combinados.length === 0) faltando.push("combinados");
  return faltando;
}
