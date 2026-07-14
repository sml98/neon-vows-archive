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
          &gt; ajuste o deslocamento até a mensagem fazer sentido.
        </p>
      </CyberTextBox>

      <div className="w-full border-2 border-[var(--neon-pink)] bg-black/80 p-4 text-center font-display text-sm sm:text-base tracking-widest break-all min-h-[60px] grid place-items-center">
        <span
          key={shift}
          className={
            isMatch
              ? "neon-text-cyan animate-glitch-fade"
              : "neon-text-pink animate-glitch-fade"
          }
        >
          {current}
        </span>
      </div>

      <div className="w-full flex items-center justify-between gap-2">
        <NeonButton variant="pink" fullWidth={false} onClick={() => bump(-1)} className="px-4">
          − 1
        </NeonButton>
        <span className="font-display text-xs neon-text-cyan">
          SHIFT: {shift > 0 ? `+${shift}` : shift}
        </span>
        <NeonButton variant="pink" fullWidth={false} onClick={() => bump(1)} className="px-4">
          + 1
        </NeonButton>
      </div>

      <NeonButton variant="cyan" onClick={confirm} disabled={solved}>
        {solved ? "[ DECODIFICADO ]" : "[ CONFIRMAR LEITURA ]"}
      </NeonButton>

      {solved && (
        <CyberTextBox accent="pink">
          <p className="text-[var(--neon-pink)]">{CAESAR_SUCCESS}</p>
        </CyberTextBox>
      )}
    </div>
  );
}
