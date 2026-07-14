import { useCallback, useEffect, useRef, useState } from "react";
import { CyberTextBox } from "../CyberTextBox";
import { NeonButton } from "../NeonButton";
import { SIMON_SEQUENCE } from "@/lib/aventura/content";

interface Props {
  onSolved: () => void;
  onBeep: (k: "click" | "success" | "error") => void;
}

const PADS = [
  { color: "oklch(0.72 0.32 330)", label: "❤" },
  { color: "oklch(0.86 0.19 200)", label: "◆" },
  { color: "oklch(0.65 0.28 305)", label: "★" },
  { color: "oklch(0.82 0.22 145)", label: "✦" },
];

export function SimonSequence({ onSolved, onBeep }: Props) {
  const seq = SIMON_SEQUENCE;
  const [phase, setPhase] = useState<"idle" | "showing" | "input" | "won">("idle");
  const [flash, setFlash] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<string>("");
  const timers = useRef<number[]>([]);

  const clearTimers = () => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  };

  useEffect(() => clearTimers, []);

  const play = useCallback(() => {
    clearTimers();
    setPhase("showing");
    setStatus("> observe a sequência...");
    setProgress(0);
    seq.forEach((pad, i) => {
      timers.current.push(
        window.setTimeout(() => {
          setFlash(pad);
          onBeep("click");
        }, 500 + i * 650),
      );
      timers.current.push(
        window.setTimeout(() => setFlash(null), 500 + i * 650 + 380),
      );
    });
    timers.current.push(
      window.setTimeout(() => {
        setPhase("input");
        setStatus("> agora repita — sincronize com o meu coração.");
      }, 500 + seq.length * 650 + 200),
    );
  }, [onBeep, seq]);

  const tap = (pad: number) => {
    if (phase !== "input") return;
    setFlash(pad);
    window.setTimeout(() => setFlash(null), 180);
    if (pad === seq[progress]) {
      const next = progress + 1;
      onBeep("click");
      if (next >= seq.length) {
        setPhase("won");
        setStatus("> batimentos sincronizados. ❤");
        onBeep("success");
        window.setTimeout(onSolved, 1000);
      } else {
        setProgress(next);
      }
    } else {
      onBeep("error");
      setStatus("> meu coração bate diferente. tenta de novo.");
      setProgress(0);
      setPhase("idle");
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <h2 className="font-display text-xs sm:text-sm neon-text-pink leading-relaxed">
        SEQUÊNCIA DO CORAÇÃO
      </h2>
      <CyberTextBox accent="cyan">
        <p>
          &gt; pra atravessar o firewall, sincroniza os batimentos com os meus.
          <br />
          &gt; observa a sequência e repete tocando os pads.
        </p>
      </CyberTextBox>

      <div className="grid grid-cols-2 gap-3 w-full">
        {PADS.map((pad, i) => {
          const active = flash === i;
          return (
            <button
              key={i}
              type="button"
              aria-label={`pad ${i + 1}`}
              onClick={() => tap(i)}
              disabled={phase !== "input"}
              className="aspect-square border-2 grid place-items-center font-display text-2xl transition-all duration-100 min-h-20 disabled:cursor-not-allowed"
              style={{
                borderColor: pad.color,
                color: pad.color,
                backgroundColor: active ? pad.color : "transparent",
                boxShadow: active
                  ? `0 0 24px ${pad.color}, inset 0 0 24px ${pad.color}`
                  : `0 0 8px ${pad.color}`,
                filter: active ? "brightness(1.4)" : "none",
              }}
            >
              <span style={{ color: active ? "black" : pad.color }}>{pad.label}</span>
            </button>
          );
        })}
      </div>

      {status && (
        <p role="status" aria-live="polite" className="font-terminal text-lg text-[var(--neon-cyan)]">
          {status}
        </p>
      )}

      {phase === "input" && (
        <p className="font-terminal text-base text-white/70">
          progresso: {progress}/{seq.length}
        </p>
      )}

      {(phase === "idle" || phase === "showing") && phase !== "won" && (
        <NeonButton variant="cyan" onClick={play} disabled={phase === "showing"}>
          {phase === "showing" ? "[ TRANSMITINDO... ]" : "[ INICIAR SEQUÊNCIA ]"}
        </NeonButton>
      )}
    </div>
  );
}
