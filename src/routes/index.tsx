import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { readSavedProgress, TOTAL_PHASES } from "@/lib/aventura/useAventuraState";
import { PLAYER_LABEL } from "@/lib/aventura/experience";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [savedPhase, setSavedPhase] = useState<number | null>(null);

  useEffect(() => {
    setSavedPhase(readSavedProgress()?.phase ?? null);
  }, []);

  const hasProgress = savedPhase !== null && savedPhase > 1;
  const completed = savedPhase === TOTAL_PHASES;

  return (
    <div
      className="shooting-stars relative flex min-h-dvh items-center justify-center overflow-hidden px-4 py-10 font-terminal text-white"
      style={{ backgroundColor: "var(--neon-bg)" }}
    >
      <div className="synthwave-grid" aria-hidden />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-10"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 45%, oklch(0 0 0 / 0.78) 100%)",
        }}
      />

      <main
        className="relative z-20 w-full max-w-md border-2 border-[var(--neon-pink)] bg-black/70 p-6 text-center backdrop-blur-sm sm:p-8"
        style={{ boxShadow: "var(--shadow-neon-pink)" }}
      >
        <p className="mb-4 font-display text-[8px] tracking-[0.28em] text-[var(--neon-cyan)]">
          {PLAYER_LABEL} // CO-OP STORY
        </p>
        <h1 className="animate-title-glitch mb-3 font-display text-xl leading-relaxed neon-text-pink sm:text-2xl">
          NEON VOWS
        </h1>
        <p className="mb-6 text-xl leading-snug text-white/90 sm:text-2xl">
          Uma história que só dois jogadores conseguem completar.
        </p>

        <div className="mb-6 grid grid-cols-3 gap-2 font-display text-[8px] text-[var(--neon-cyan)] sm:text-[9px]">
          <div className="border border-[var(--neon-cyan)]/60 bg-black/60 px-2 py-3">
            <strong className="mb-1 block text-base neon-text-pink">16</strong>
            FASES
          </div>
          <div className="border border-[var(--neon-cyan)]/60 bg-black/60 px-2 py-3">
            <strong className="mb-1 block text-base neon-text-pink">08+</strong>
            ENIGMAS
          </div>
          <div className="border border-[var(--neon-cyan)]/60 bg-black/60 px-2 py-3">
            <strong className="mb-1 block text-base neon-text-pink">∞</strong>
            AMOR
          </div>
        </div>

        <p className="mb-6 min-h-12 text-base leading-relaxed text-[var(--neon-cyan)]">
          {hasProgress
            ? `> save encontrado na fase ${String(savedPhase).padStart(2, "0")}. A jornada continua de onde você parou.`
            : "> memórias, escolhas e sinais escondidos aguardam a Player 2."}
        </p>

        <Link
          to="/aventura"
          className="inline-flex min-h-12 w-full items-center justify-center border-2 border-[var(--neon-cyan)] px-5 py-3 font-display text-[10px] uppercase tracking-widest text-[var(--neon-cyan)] transition-all hover:bg-[var(--neon-cyan)]/10 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          style={{ boxShadow: "var(--shadow-neon-cyan)" }}
        >
          {completed
            ? "[ REVER FINAL ]"
            : hasProgress
              ? "[ CONTINUAR JORNADA ]"
              : "[ INICIAR JORNADA ]"}
        </Link>

        <p className="mt-5 text-sm text-white/45">
          Use fones de ouvido para uma experiência completa.
        </p>
      </main>
    </div>
  );
}
