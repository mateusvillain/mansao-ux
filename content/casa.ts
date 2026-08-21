/**
 * Conteúdo da casa — fonte única, editável sem mexer em componente (#14, #15).
 *
 * Campos `null` seguem em aberto. A home omite a seção correspondente em vez de
 * mostrar "[preencher]" para o grupo, e `pendencias()` lista só o que de fato
 * ainda é esperado — o que o anfitrião dispensou não entra na lista.
 */
export type Casa = {
  nome: string;
  periodo: { checkIn: string; checkOut: string };
  endereco: string | null;
  mapaUrl: string | null;
  distanciaEvento: string | null;
  anfitriao: string | null;
  wifi: { rede: string | null; senha: string | null } | null;
};

export const casa: Casa = {
  nome: "Mansão UX",
  periodo: {
    checkIn: "24/09",
    checkOut: "27/09",
  },
  endereco: "Tv. Luís Rosseti, 3-47 — Azenha, Porto Alegre - RS, 90130-070",
  mapaUrl: "https://maps.app.goo.gl/KXTXz8XErwHHFD157",
  distanciaEvento: "11 min de carro",
  anfitriao: "Thoz",
  // Rede e senha ainda desconhecidas — a casa informa na chegada.
  wifi: null,
};

/**
 * O que ainda falta preencher. Só entra aqui o que o grupo espera ver: contato
 * de emergência, instruções de como chegar e combinados da casa foram
 * dispensados pelo anfitrião nesta iteração, então não contam como pendência.
 */
export function pendencias(c: Casa): string[] {
  const faltando: string[] = [];
  if (!c.endereco) faltando.push("endereço");
  if (!c.mapaUrl) faltando.push("link do mapa");
  if (!c.distanciaEvento) faltando.push("distância até o evento");
  if (!c.wifi?.senha) faltando.push("senha do wi-fi");
  return faltando;
}
