import { useEffect, useState, type ReactNode } from "react";
import { CatSprites } from "./CatSprites";
import { PixelParty } from "./PixelParty";
import { TOTAL_PHASES, type PhaseId } from "@/lib/aventura/useAventuraState";
import { EXPERIENCE } from "@/lib/aventura/experience";

interface Props {
  children: ReactNode;
  muted: boolean;
  onToggleMute: () => void;
  gift?: "chocolate" | "flor" | "both" | null;
  phase: PhaseId;
  achievementCount: number;
  onRestart: () => void;
  testMode: boolean;
  onPhaseSelect: (phase: PhaseId) => void;
}

export function AventuraShell({
  children,
  muted,
  onToggleMute,
  gift,
  phase,
  achievementCount,
  onRestart,
  testMode,
  onPhaseSelect,
}: Props) {
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
      className="relative min-h-dvh w-full flex items-center justify-center overflow-x-hidden px-3 py-20 font-terminal text-white shooting-stars sm:py-10"
      style={{
        backgroundColor: "var(--neon-bg)",
      }}
    >
      {/* 3D Synthwave Grid background */}
      {!reduced && <div className="synthwave-grid" />}

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

      {/* Inventory */}
      {gift && (
        <div className="fixed top-3 left-3 z-30 flex flex-col gap-2 max-w-[200px]">
          <div className="border-2 border-[var(--neon-cyan)] bg-black/80 p-2 text-xs font-display text-[var(--neon-cyan)] shadow-[var(--shadow-neon-cyan)]">
            <div className="border-b border-[var(--neon-cyan)] pb-1 mb-1 font-bold text-[9px] tracking-widest text-center">
              [ INVENTÁRIO ]
            </div>
            <div className="flex flex-col gap-1 text-[10px]">
              {(gift === "chocolate" || gift === "both") && (
                <div className="group relative flex items-center gap-1 cursor-help hover:text-white transition-colors py-0.5">
                  <span>🍫</span>
                  <span className="truncate">{EXPERIENCE.gift.itemName}</span>
                  {/* Tooltip */}
                  <div className="absolute top-full left-0 mt-1 w-48 p-2 bg-black border border-[var(--neon-cyan)] text-[9px] leading-relaxed text-white rounded shadow-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-50 normal-case font-terminal">
                    {EXPERIENCE.gift.meaning}
                  </div>
                </div>
              )}
              {(gift === "flor" || gift === "both") && (
                <div className="group relative flex items-center gap-1 cursor-help hover:text-white transition-colors py-0.5">
                  <span>🌹</span>
                  <span className="truncate">Flor do meu amor</span>
                  {/* Tooltip */}
                  <div className="absolute top-full left-0 mt-1 w-48 p-2 bg-black border border-[var(--neon-cyan)] text-[9px] leading-relaxed text-white rounded shadow-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-50 normal-case font-terminal">
                    Flor cibernética eterna, cultivada no meu coração para você.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

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
        <div className="mb-5 w-full border-b border-[var(--neon-cyan)]/50 pb-3 text-left">
          <div className="mb-2 flex items-center justify-between gap-3 font-display text-[8px] tracking-wider text-[var(--neon-cyan)] sm:text-[9px]">
            <span>NEON VOWS // FASE {String(phase).padStart(2, "0")}</span>
            <span>
              {achievementCount}/{TOTAL_PHASES - 1} CONQUISTAS
            </span>
          </div>
          <div
            className="h-2 overflow-hidden border border-[var(--neon-cyan)] bg-black/80"
            role="progressbar"
            aria-label="Progresso da aventura"
            aria-valuenow={phase}
            aria-valuemin={1}
            aria-valuemax={TOTAL_PHASES}
          >
            <div
              className="h-full bg-[var(--neon-pink)] transition-[width] duration-500"
              style={{ width: `${(phase / TOTAL_PHASES) * 100}%` }}
            />
          </div>
          {phase > 1 && (
            <button
              type="button"
              onClick={onRestart}
              className="mt-2 min-h-7 font-display text-[8px] text-white/55 underline-offset-4 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--neon-cyan)]"
            >
              [ REINICIAR JORNADA ]
            </button>
          )}
          {testMode && (
            <label className="mt-2 flex items-center justify-between gap-3 border border-dashed border-[var(--neon-pink)] p-2 font-display text-[8px] text-[var(--neon-pink)]">
              <span>TEST MODE</span>
              <select
                aria-label="Ir diretamente para uma fase"
                value={phase}
                onChange={(event) => onPhaseSelect(Number(event.target.value) as PhaseId)}
                className="min-h-8 border border-[var(--neon-cyan)] bg-black px-2 text-[var(--neon-cyan)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                {Array.from({ length: TOTAL_PHASES }, (_, index) => index + 1).map((id) => (
                  <option key={id} value={id}>
                    FASE {String(id).padStart(2, "0")}
                  </option>
                ))}
              </select>
            </label>
          )}
        </div>
        <PixelParty compact />
        <CatSprites />
        {children}
      </main>
    </div>
  );
}
