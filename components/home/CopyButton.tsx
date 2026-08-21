"use client";

import { useState } from "react";

import { Button } from "@/components/ui";

/** Copiar a senha do wi-fi em um toque, com confirmação visível (#14). */
export function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard bloqueado (contexto inseguro, permissão negada): o valor
      // continua visível na tela para copiar à mão.
    }
  }

  return (
    <Button variant="secondary" onClick={() => void copy()} aria-live="polite">
      {copied ? "Copiado ✓" : label}
    </Button>
  );
}
