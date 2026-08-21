import type { TextareaHTMLAttributes } from "react";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  /** Mostrado abaixo do campo; o limite em si vem de maxLength. */
  counter?: { current: number; max: number };
};

export function Textarea({ label, counter, id, className = "", ...props }: Props) {
  const fieldId = id ?? props.name ?? label.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={fieldId} className="text-sm font-medium text-ink">
        {label}
      </label>
      <textarea
        id={fieldId}
        className={[
          "min-h-[6rem] rounded-card border border-border-strong bg-surface p-4 text-base text-ink",
          "placeholder:text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20",
          className,
        ].join(" ")}
        {...props}
      />
      {counter ? (
        <p className="self-end text-xs text-muted">
          {counter.current}/{counter.max}
        </p>
      ) : null}
    </div>
  );
}
