import { useEffect, useState, type ReactNode } from "react";
import { CatSprites } from "./CatSprites";

interface Props {
  children: ReactNode;
  muted: boolean;
  onToggleMute: () => void;
}

export function AventuraShell({ children, muted, onToggleMute }: Props) {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <div
      className="relative min-h-dvh w-full flex items-center justify-center px-3 py-6 font-terminal text-white overflow-hidden"
      style={{
        backgroundColor: "var(--neon-bg)",
        backgroundImage:
          "linear-gradient(transparent 95%, oklch(0.72 0.32 330 / 0.28) 95%), linear-gradient(90deg, transparent 95%, oklch(0.86 0.19 200 / 0.28) 95%)",
        backgroundSize: "28px 28px",
      }}
    >
      {/* CRT scanline overlay */}
      {!reduced && (
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-20"
          style={{
            background:
              "repeating-linear-gradient(to bottom, transparent 0 2px, oklch(0 0 0 / 0.28) 2px 3px)",
            mixBlendMode: "multiply",
          }}
        />
      )}

      {/* Vignette */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-20"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 55%, oklch(0 0 0 / 0.7) 100%)",
        }}
      />

      {/* Mute toggle */}
      <button
        type="button"
        onClick={onToggleMute}
        aria-label={muted ? "Ativar som" : "Silenciar"}
        className="fixed top-3 right-3 z-30 h-11 w-11 grid place-items-center border-2 border-[var(--neon-cyan)] bg-black/70 text-[var(--neon-cyan)] shadow-[var(--shadow-neon-cyan)] font-display text-sm"
      >
        {muted ? "🔇" : "🔊"}
      </button>

      {/* Main frame */}
      <main
        className="relative z-10 w-full max-w-md p-5 sm:p-6 flex flex-col items-center text-center border-2 border-[var(--neon-pink)] bg-[color:var(--neon-surface)] backdrop-blur-sm"
        style={{ boxShadow: "var(--shadow-neon-pink), inset 0 0 18px oklch(0.72 0.32 330 / 0.35)" }}
      >
        <CatSprites />
        {children}
      </main>
    </div>
  );
}
