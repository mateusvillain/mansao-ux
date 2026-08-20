import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";

const variants: Record<Variant, string> = {
  primary: "bg-brand text-brand-ink hover:opacity-90",
  secondary: "bg-surface text-ink border border-border hover:bg-bg",
  ghost: "bg-transparent text-muted hover:text-ink",
  danger: "bg-transparent text-danger border border-danger/30 hover:bg-danger/5",
};

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  full?: boolean;
};

export function Button({ variant = "primary", full = false, className = "", ...props }: Props) {
  return (
    <button
      className={[
        "inline-flex min-h-touch items-center justify-center gap-2 rounded-pill px-5 text-base font-medium",
        "transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        "disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        full ? "w-full" : "",
        className,
      ].join(" ")}
      {...props}
    />
  );
}
