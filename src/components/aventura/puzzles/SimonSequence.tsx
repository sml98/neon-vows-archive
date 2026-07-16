import { useCallback, useEffect, useRef, useState } from "react";
import { CyberTextBox } from "../CyberTextBox";
import { NeonButton } from "../NeonButton";
import { SIMON_SEQUENCE } from "@/lib/aventura/content";

interface Props {
  onSolved: () => void;
  onBeep: (k: "click" | "success" | "error") => void;
  playFreq?: (f: number, d?: number, t?: OscillatorType) => void;
}

const PADS = [
  { color: "oklch(0.72 0.32 330)", label: "❤", freq: 261.63 }, // C4
  { color: "oklch(0.86 0.19 200)", label: "❤", freq: 329.63 }, // E4
  { color: "oklch(0.82 0.22 85)", label: "❤", freq: 392.00 },  // G4
  { color: "oklch(0.65 0.28 305)", label: "❤", freq: 523.25 }, // C5
];

export function SimonSequence({ onSolved, onBeep, playFreq }: Props) {
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
          if (playFreq) {
            playFreq(PADS[pad].freq, 0.35, "sine");
          } else {
            onBeep("click");
          }
        }, 500 + i * 650)
      );
      timers.current.push(
        window.setTimeout(() => setFlash(null), 500 + i * 650 + 380)
      );
    });
    timers.current.push(
      window.setTimeout(() => {
        setPhase("input");
        setStatus("> agora repita — sincronize com o meu coração.");
      }, 500 + seq.length * 650 + 200)
    );
  }, [onBeep, playFreq, seq]);

  const tap = (pad: number) => {
    if (phase !== "input") return;
    setFlash(pad);
    window.setTimeout(() => setFlash(null), 180);
    if (playFreq) {
      playFreq(PADS[pad].freq, 0.22, "sine");
    }
    if (pad === seq[progress]) {
      const next = progress + 1;
      if (!playFreq) onBeep("click");
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
          &gt; observa a sequência e repete tocando os corações.
        </p>
      </CyberTextBox>

      <div className="grid grid-cols-2 gap-4 w-full max-w-[280px]">
        {PADS.map((pad, i) => {
          const active = flash === i;
          return (
            <button
              key={i}
              type="button"
              aria-label={`pad ${i + 1}`}
              onClick={() => tap(i)}
              disabled={phase !== "input"}
              className="aspect-square border-2 rounded-2xl grid place-items-center font-display text-3xl transition-all duration-150 min-h-24 disabled:cursor-not-allowed cursor-pointer"
              style={{
                borderColor: pad.color,
                color: pad.color,
                backgroundColor: active ? pad.color : "transparent",
                boxShadow: active
                  ? `0 0 24px ${pad.color}, inset 0 0 24px ${pad.color}`
                  : `0 0 8px ${pad.color}`,
                filter: active ? "brightness(1.3)" : "none",
                transform: active ? "scale(1.12)" : "scale(1)",
              }}
            >
              <span style={{ color: active ? "black" : pad.color }} className="select-none">
                {pad.label}
              </span>
            </button>
          );
        })}
      </div>

      {status && (
        <p role="status" aria-live="polite" className="font-terminal text-lg text-[var(--neon-cyan)] min-h-[28px] mt-2">
          {status}
        </p>
      )}

      {phase === "input" && (
        <p className="font-terminal text-base text-white/70">
          sincronia: {progress}/{seq.length}
        </p>
      )}

      {(phase === "idle" || phase === "showing") && (
        <NeonButton variant="cyan" onClick={play} disabled={phase === "showing"}>
          {phase === "showing" ? "[ TRANSMITINDO... ]" : "[ SINCRONIZAR BATIMENTOS ]"}
        </NeonButton>
      )}
    </div>
  );
}
