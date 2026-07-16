import { useState, useMemo, useCallback } from "react";
import { CyberTextBox } from "../CyberTextBox";
import { NeonButton } from "../NeonButton";

interface Props {
  onNext: () => void;
  onBeep: (k: "click" | "success" | "error") => void;
}

/** Heart-shaped star positions (percentage-based, 0-100). */
const HEART_STARS: { x: number; y: number }[] = [
  { x: 50, y: 82 },  // 0 — bottom point
  { x: 36, y: 68 },  // 1
  { x: 22, y: 52 },  // 2
  { x: 16, y: 36 },  // 3
  { x: 22, y: 22 },  // 4
  { x: 36, y: 16 },  // 5
  { x: 50, y: 28 },  // 6 — top center dip
  { x: 64, y: 16 },  // 7
  { x: 78, y: 22 },  // 8
  { x: 84, y: 36 },  // 9
  { x: 78, y: 52 },  // 10
  { x: 64, y: 68 },  // 11
];

/** The correct click order — traces the heart clockwise from bottom. */
const CORRECT_ORDER = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function generateDecorativeStars(count: number) {
  const rng = seededRandom(42);
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: rng() * 100,
    y: rng() * 100,
    size: 1 + rng() * 2,
    delay: rng() * 3,
    duration: 1.5 + rng() * 2,
  }));
}

export function Phase10Constellation({ onNext, onBeep }: Props) {
  const [progress, setProgress] = useState<number[]>([]);
  const [flashError, setFlashError] = useState(false);
  const [complete, setComplete] = useState(false);

  const decorativeStars = useMemo(() => generateDecorativeStars(30), []);

  const nextExpected = progress.length;

  const handleStarClick = useCallback(
    (starIdx: number) => {
      if (complete) return;

      if (starIdx === CORRECT_ORDER[nextExpected]) {
        // Correct star!
        onBeep("click");
        const next = [...progress, starIdx];
        setProgress(next);

        if (next.length === CORRECT_ORDER.length) {
          onBeep("success");
          setComplete(true);
        }
      } else {
        // Wrong star — reset
        onBeep("error");
        setFlashError(true);
        setProgress([]);
        window.setTimeout(() => setFlashError(false), 400);
      }
    },
    [complete, nextExpected, onBeep, progress],
  );

  // Build SVG lines between connected stars
  const lines = progress
    .map((starIdx, i) => {
      if (i === 0) return null;
      const prev = HEART_STARS[progress[i - 1]];
      const curr = HEART_STARS[starIdx];
      return { x1: prev.x, y1: prev.y, x2: curr.x, y2: curr.y, key: i };
    })
    .filter(Boolean) as { x1: number; y1: number; x2: number; y2: number; key: number }[];

  // Close the heart on completion
  const closingLine =
    complete && progress.length > 1
      ? {
          x1: HEART_STARS[progress[progress.length - 1]].x,
          y1: HEART_STARS[progress[progress.length - 1]].y,
          x2: HEART_STARS[progress[0]].x,
          y2: HEART_STARS[progress[0]].y,
        }
      : null;

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <h2 className="font-display text-xs sm:text-sm neon-text-cyan leading-relaxed text-center">
        CONSTELAÇÃO DO AMOR
      </h2>

      <CyberTextBox accent="cyan">
        <p className="text-sm">
          &gt; conecte as estrelas na ordem correta para revelar a constelação escondida.
          <br />
          &gt; clique na estrela que brilha mais fraca primeiro (a de baixo) e siga o caminho do coração.
        </p>
      </CyberTextBox>

      {/* Star field container */}
      <div
        className={[
          "relative w-full max-w-md rounded-lg overflow-hidden border-2",
          flashError
            ? "border-red-500 shadow-[0_0_20px_rgba(255,0,0,0.5)]"
            : "border-[var(--neon-cyan)]/30",
          "transition-all duration-300",
        ].join(" ")}
        style={{
          aspectRatio: "1",
          background: "linear-gradient(135deg, #0a0a2e 0%, #0d0d1a 50%, #0a0a2e 100%)",
        }}
      >
        {/* Decorative stars */}
        {decorativeStars.map((star) => (
          <div
            key={`deco-${star.id}`}
            className="absolute rounded-full bg-white/60"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite alternate`,
            }}
          />
        ))}

        {/* SVG overlay for lines */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <filter id="neonGlow">
              <feGaussianBlur stdDeviation="0.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {lines.map((l) => (
            <line
              key={l.key}
              x1={l.x1}
              y1={l.y1}
              x2={l.x2}
              y2={l.y2}
              stroke="var(--neon-pink)"
              strokeWidth="0.5"
              strokeLinecap="round"
              filter="url(#neonGlow)"
              opacity="0.9"
            />
          ))}
          {closingLine && (
            <line
              x1={closingLine.x1}
              y1={closingLine.y1}
              x2={closingLine.x2}
              y2={closingLine.y2}
              stroke="var(--neon-pink)"
              strokeWidth="0.5"
              strokeLinecap="round"
              filter="url(#neonGlow)"
              opacity="0.9"
            />
          )}
        </svg>

        {/* Clickable heart stars */}
        {HEART_STARS.map((star, idx) => {
          const isConnected = progress.includes(idx);
          const isNext = idx === CORRECT_ORDER[nextExpected];
          return (
            <button
              key={`star-${idx}`}
              type="button"
              onClick={() => handleStarClick(idx)}
              disabled={complete}
              className={[
                "absolute rounded-full -translate-x-1/2 -translate-y-1/2",
                "transition-all duration-300 cursor-pointer",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
                isConnected
                  ? "w-4 h-4 sm:w-5 sm:h-5"
                  : "w-3 h-3 sm:w-4 sm:h-4",
              ].join(" ")}
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                background: isConnected
                  ? "var(--neon-pink)"
                  : isNext
                    ? "var(--neon-cyan)"
                    : "rgba(255,255,255,0.5)",
                boxShadow: isConnected
                  ? "0 0 12px var(--neon-pink), 0 0 24px var(--neon-pink)"
                  : isNext
                    ? "0 0 8px var(--neon-cyan), 0 0 16px var(--neon-cyan)"
                    : "0 0 4px rgba(255,255,255,0.3)",
                animation: isNext && !complete ? "pulseHint 1.5s ease-in-out infinite" : undefined,
              }}
              aria-label={`Estrela ${idx + 1}${isConnected ? " (conectada)" : isNext ? " (próxima)" : ""}`}
            />
          );
        })}

        {/* Completion pulse overlay */}
        {complete && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              animation: "heartPulse 2s ease-in-out infinite",
            }}
          />
        )}
      </div>

      {/* Progress indicator */}
      {!complete && (
        <p className="font-display text-xs neon-text-pink">
          Estrelas: {progress.length}/{CORRECT_ORDER.length}
        </p>
      )}

      {/* Completion message */}
      {complete && (
        <>
          <CyberTextBox accent="pink">
            <p
              className="text-sm text-[var(--neon-pink)] leading-relaxed"
              style={{ animation: "fadeIn 800ms ease-in forwards" }}
            >
              &gt; você acabou de desenhar nosso amor no céu. e ele brilha mais que qualquer estrela. ❤
            </p>
          </CyberTextBox>
          <NeonButton
            variant="pink"
            onClick={() => {
              onBeep("success");
              onNext();
            }}
          >
            [ CONTEMPLAR AS ESTRELAS ]
          </NeonButton>
        </>
      )}

      <style>{`
        @keyframes twinkle {
          0%   { opacity: 0.2; transform: scale(0.8); }
          100% { opacity: 1;   transform: scale(1.2); }
        }
        @keyframes pulseHint {
          0%, 100% { transform: translate(-50%, -50%) scale(1);   opacity: 0.7; }
          50%      { transform: translate(-50%, -50%) scale(1.4); opacity: 1; }
        }
        @keyframes heartPulse {
          0%, 100% { box-shadow: inset 0 0 30px rgba(255, 0, 128, 0.1); }
          50%      { box-shadow: inset 0 0 60px rgba(255, 0, 128, 0.25); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
