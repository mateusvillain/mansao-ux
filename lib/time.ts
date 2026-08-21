/**
 * Horário relativo em pt-BR ("agora", "há 5 min", "ontem").
 *
 * Usa Intl.RelativeTimeFormat em vez de uma biblioteca: são poucas unidades e
 * o mural precisa de precisão de minuto, não de gramática elaborada.
 */
const rtf = new Intl.RelativeTimeFormat("pt-BR", { numeric: "auto" });

const UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ["year", 365 * 24 * 60 * 60],
  ["month", 30 * 24 * 60 * 60],
  ["day", 24 * 60 * 60],
  ["hour", 60 * 60],
  ["minute", 60],
];

export function relativeTime(iso: string, now: Date = new Date()): string {
  const seconds = (new Date(iso).getTime() - now.getTime()) / 1000;
  const abs = Math.abs(seconds);
  if (abs < 45) return "agora";
  for (const [unit, size] of UNITS) {
    if (abs >= size) return rtf.format(Math.round(seconds / size), unit);
  }
  return "agora";
}
