import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  accent?: "cyan" | "pink";
  className?: string;
}

export function CyberTextBox({ children, accent = "cyan", className = "" }: Props) {
  const color =
    accent === "cyan"
      ? "border-l-[var(--neon-cyan)] shadow-[inset_0_0_10px_oklch(0.86_0.19_200/0.2)] border-[var(--neon-cyan)]/60"
      : "border-l-[var(--neon-pink)] shadow-[inset_0_0_10px_oklch(0.72_0.32_330/0.25)] border-[var(--neon-pink)]/60";
  return (
    <div
      className={[
        "w-full text-left p-4 bg-black/60 border border-l-4 font-terminal",
        "text-lg sm:text-xl leading-snug",
        color,
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
