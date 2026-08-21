"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import { findOrCreateGuest, renameGuest } from "@/lib/db/guests";
import {
  clearStoredGuest,
  readStoredGuest,
  writeStoredGuest,
  type StoredGuest,
} from "@/lib/identity/storage";

type IdentityState = {
  guest: StoredGuest | null;
  /** `true` até terminar a leitura do storage — evita piscar a tela de escolha. */
  loading: boolean;
  identify: (name: string) => Promise<void>;
  rename: (name: string) => Promise<void>;
  signOut: () => void;
};

const IdentityContext = createContext<IdentityState | null>(null);

export function IdentityProvider({ children }: { children: React.ReactNode }) {
  const [guest, setGuest] = useState<StoredGuest | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setGuest(readStoredGuest());
    setLoading(false);
  }, []);

  const identify = useCallback(async (name: string) => {
    const row = await findOrCreateGuest(name);
    const stored: StoredGuest = { id: row.id, name: row.name };
    writeStoredGuest(stored);
    setGuest(stored);
  }, []);

  const rename = useCallback(
    async (name: string) => {
      if (!guest) return;
      const row = await renameGuest(guest.id, name);
      const stored: StoredGuest = { id: row.id, name: row.name };
      writeStoredGuest(stored);
      setGuest(stored);
    },
    [guest]
  );

  const signOut = useCallback(() => {
    clearStoredGuest();
    setGuest(null);
  }, []);

  const value = useMemo<IdentityState>(
    () => ({ guest, loading, identify, rename, signOut }),
    [guest, loading, identify, rename, signOut]
  );

  return <IdentityContext.Provider value={value}>{children}</IdentityContext.Provider>;
}

export function useIdentity(): IdentityState {
  const ctx = useContext(IdentityContext);
  if (!ctx) throw new Error("useIdentity precisa estar dentro de <IdentityProvider>.");
  return ctx;
}
