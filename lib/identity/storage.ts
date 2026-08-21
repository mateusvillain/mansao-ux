/**
 * Persistência da identidade no dispositivo.
 *
 * Toda leitura e escrita é protegida: em aba anônima, com cookies de terceiros
 * bloqueados ou com o storage cheio, o acesso ao localStorage lança. O app tem
 * que continuar renderizando nesse caso — vira só "pergunta o nome de novo",
 * nunca uma tela branca (critério de aceite da #12).
 */
const KEY = "mansao-ux:guest";

export type StoredGuest = { id: string; name: string };

export function readStoredGuest(): StoredGuest | null {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (
      typeof parsed === "object" &&
      parsed !== null &&
      typeof (parsed as StoredGuest).id === "string" &&
      typeof (parsed as StoredGuest).name === "string"
    ) {
      return parsed as StoredGuest;
    }
    return null;
  } catch {
    return null;
  }
}

export function writeStoredGuest(guest: StoredGuest): void {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(guest));
  } catch {
    // Sem persistência a sessão continua funcionando; só não sobrevive ao reload.
  }
}

export function clearStoredGuest(): void {
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    // Nada a fazer — a identidade em memória já foi limpa por quem chamou.
  }
}
