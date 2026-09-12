import { useMemo, useState } from "react";
import { CyberTextBox } from "../CyberTextBox";
import { NeonButton } from "../NeonButton";
import { CAESAR_PLAIN, CAESAR_SHIFT, CAESAR_SUCCESS } from "@/lib/aventura/content";

function shiftChar(c: string, s: number): string {
  const code = c.charCodeAt(0);
  if (code >= 65 && code <= 90) {
    return String.fromCharCode(((code - 65 + s + 26) % 26) + 65);
  }
  return c;
}

function applyShift(text: string, s: number): string {
  return text
    .split("")
    .map((c) => shiftChar(c, s))
    .join("");
}

interface Props {
  onSolved: () => void;
  onBeep: (k: "click" | "success" | "error") => void;
}

export function CaesarDecoder({ onSolved, onBeep }: Props) {
  const encrypted = useMemo(() => applyShift(CAESAR_PLAIN, CAESAR_SHIFT), []);
  // user needs shift = -CAESAR_SHIFT to reverse
  const target = -CAESAR_SHIFT;
  const [shift, setShift] = useState(0);
  const [solved, setSolved] = useState(false);

  const current = useMemo(() => applyShift(encrypted, shift), [encrypted, shift]);
  const isMatch = shift === target;

  const bump = (delta: number) => {
    if (solved) return;
    const next = Math.max(-13, Math.min(13, shift + delta));
    setShift(next);
    onBeep("click");
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (solved) return;
    const next = parseInt(e.target.value);
    setShift(next);
    onBeep("click");
  };

  const confirm = () => {
    if (isMatch) {
      setSolved(true);
      onBeep("success");
      window.setTimeout(onSolved, 900);
    } else {
      onBeep("error");
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <h2 className="font-display text-xs sm:text-sm neon-text-cyan leading-relaxed">
        SINAL FRACO — DECODIFICADOR
      </h2>
      <CyberTextBox accent="cyan">
        <p>
          &gt; interceptei uma mensagem criptografada com destino a você.
          <br />
          &gt; ajuste a sintonia (SHIFT) até decodificar a mensagem secreta.
        </p>
      </CyberTextBox>

      {/* Radio Display Screen */}
      <div
        className="relative w-full border-2 p-4 text-center font-display text-sm sm:text-base tracking-widest break-all min-h-[70px] grid place-items-center overflow-hidden transition-all duration-300"
        style={{
          boxShadow: isMatch ? "var(--shadow-neon-cyan)" : "var(--shadow-neon-pink)",
          borderColor: isMatch ? "var(--neon-cyan)" : "var(--neon-pink)",
          backgroundColor: "rgba(0, 0, 0, 0.9)",
        }}
      >
        {/* Dynamic Static Glitch Overlay */}
        {!solved && (
          <div
            className="absolute inset-0 pointer-events-none opacity-20 mix-blend-color-dodge"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, rgba(255,255,255,0.05), rgba(255,255,255,0.05) 1px, transparent 1px, transparent 2px)",
              opacity: Math.min(0.65, Math.abs(shift - target) * 0.06),
            }}
          />
        )}
        <span
          key={shift}
          className={
            isMatch
              ? "neon-text-cyan animate-glitch-fade font-bold font-display"
              : "neon-text-pink animate-glitch-fade opacity-80 font-display"
          }
          style={{
            filter: isMatch ? "none" : `blur(${Math.min(1.5, Math.abs(shift - target) * 0.12)}px)`,
            textShadow: isMatch
              ? "0 0 10px var(--neon-cyan), 0 0 20px var(--neon-cyan)"
              : `${Math.min(5, Math.abs(shift - target) * 0.5)}px 0 rgba(255,0,128,0.6), -${Math.min(5, Math.abs(shift - target) * 0.5)}px 0 rgba(0,255,255,0.6)`,
          }}
        >
          {current}
        </span>
      </div>

      {/* Sintonizer Controls */}
      <div className="w-full flex flex-col gap-2 mt-2">
        <div className="flex items-center justify-between gap-2">
          <NeonButton
            variant="pink"
            fullWidth={false}
            onClick={() => bump(-1)}
            className="px-4 py-2"
          >
            − 1
          </NeonButton>
          <span className="font-display text-xs neon-text-cyan">
            SINTONIA (SHIFT): {shift > 0 ? `+${shift}` : shift}
          </span>
          <NeonButton
            variant="pink"
            fullWidth={false}
            onClick={() => bump(1)}
            className="px-4 py-2"
          >
            + 1
          </NeonButton>
        </div>

        {/* Range Slider for tuning */}
        <input
          type="range"
          min="-13"
          max="13"
          value={shift}
          onChange={handleSliderChange}
          disabled={solved}
          className="w-full h-2 bg-black/60 border border-[var(--neon-pink)] rounded-lg appearance-none cursor-pointer accent-[var(--neon-cyan)] mt-2"
        />
      </div>

      <NeonButton variant="cyan" onClick={confirm} disabled={solved}>
        {solved ? "[ SINAL ESTABILIZADO ]" : "[ CONFIRMAR LEITURA ]"}
      </NeonButton>

      {solved && (
        <CyberTextBox accent="pink">
          <p className="text-[var(--neon-pink)]">{CAESAR_SUCCESS}</p>
        </CyberTextBox>
      )}
    </div>
  );
}
