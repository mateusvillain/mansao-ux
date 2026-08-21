import type { Config } from "tailwindcss";

/**
 * Tokens visuais da Mansão UX (issue #11).
 * Cores em CSS custom properties (app/globals.css) para poderem ser lidas
 * fora do Tailwind e para deixar um eventual tema escuro barato depois.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./content/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "rgb(var(--color-bg) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        border: "rgb(var(--color-border) / <alpha-value>)",
        "border-strong": "rgb(var(--color-border-strong) / <alpha-value>)",
        ink: "rgb(var(--color-ink) / <alpha-value>)",
        muted: "rgb(var(--color-muted) / <alpha-value>)",
        brand: "rgb(var(--color-brand) / <alpha-value>)",
        "brand-ink": "rgb(var(--color-brand-ink) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
        danger: "rgb(var(--color-danger) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Escala fechada: telas de celular não precisam de mais que isto.
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.65rem" }],
        xl: ["1.375rem", { lineHeight: "1.85rem" }],
        "2xl": ["1.75rem", { lineHeight: "2.1rem" }],
      },
      borderRadius: {
        card: "0.875rem",
        pill: "999px",
      },
      spacing: {
        // Alvo mínimo de toque (44px) como token, não número mágico.
        touch: "2.75rem",
        // Altura da navegação fixa, usada como padding do conteúdo.
        nav: "4.25rem",
      },
      boxShadow: {
        card: "0 1px 2px rgb(0 0 0 / 0.04), 0 8px 24px -12px rgb(0 0 0 / 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
