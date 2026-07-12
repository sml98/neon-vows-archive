import type { ButtonHTMLAttributes } from "react";

type Variant = "cyan" | "pink";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  fullWidth?: boolean;
}

export function NeonButton({
  variant = "cyan",
  fullWidth = true,
  className = "",
  children,
  type = "button",
  ...rest
}: Props) {
  const color =
    variant === "cyan"
      ? "text-[var(--neon-cyan)] border-[var(--neon-cyan)] shadow-[var(--shadow-neon-cyan)] hover:bg-[var(--neon-cyan)]/10 active:bg-[var(--neon-cyan)] active:text-black"
      : "text-[var(--neon-pink)] border-[var(--neon-pink)] shadow-[var(--shadow-neon-pink)] hover:bg-[var(--neon-pink)]/10 active:bg-[var(--neon-pink)] active:text-black";

  return (
    <button
      type={type}
      {...rest}
      className={[
        "font-display uppercase tracking-wider",
        "text-[10px] sm:text-xs leading-tight",
        "px-3 py-3 min-h-11",
        "border-2 bg-transparent",
        "transition-transform duration-100 ease-out",
        "active:scale-95",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--neon-bg)] focus-visible:ring-white",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        fullWidth ? "w-full" : "",
        color,
        className,
      ].join(" ")}
    >
      {children}
    </button>
  );
}
