import type { InputHTMLAttributes } from "react";

export function CyberInput(props: InputHTMLAttributes<HTMLInputElement>) {
  const { className = "", ...rest } = props;
  return (
    <input
      {...rest}
      className={[
        "font-terminal text-lg sm:text-xl w-full px-3 py-3 min-h-11",
        "bg-black/80 border-2 border-[var(--neon-pink)] text-[var(--neon-pink)]",
        "text-center tracking-widest",
        "outline-none",
        "shadow-[inset_0_0_10px_oklch(0.72_0.32_330/0.35)]",
        "focus:border-[var(--neon-cyan)] focus:text-[var(--neon-cyan)]",
        "focus:shadow-[0_0_14px_var(--neon-cyan)]",
        "placeholder:text-[var(--neon-pink)]/40",
        className,
      ].join(" ")}
    />
  );
}
