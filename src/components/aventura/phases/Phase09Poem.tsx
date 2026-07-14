import { useState } from "react";
import { CyberTextBox } from "../CyberTextBox";
import { NeonButton } from "../NeonButton";
import { LOVE_MATH_OPTIONS } from "@/lib/aventura/content";

interface Props {
  onNext: () => void;
  onBeep: (k: "click" | "success" | "error") => void;
}

// Fase 09 — enigma matemático romântico (love math).
export function Phase09Poem({ onNext, onBeep }: Props) {
  const [msg, setMsg] = useState<string | null>(null);
  const [solved, setSolved] = useState(false);

  const pick = (opt: (typeof LOVE_MATH_OPTIONS)[number]) => {
    setMsg(opt.msg);
    if (opt.correct) {
      onBeep("success");
      setSolved(true);
    } else {
      onBeep("error");
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <h2 className="font-display text-xs sm:text-sm neon-text-cyan leading-relaxed">
        SYSTEM DIAGNOSTICS: LOVE.EQUATION
      </h2>
      <CyberTextBox accent="cyan">
        <p>
          &gt; resolve rapidinho, moça:
          <br />
          <br />
          &gt; se eu te amo <span className="neon-text-pink">X</span>,
          <br />
          &gt; e você me ama <span className="neon-text-pink">Y</span>,
          <br />
          &gt; e <span className="neon-text-pink">X = Y × ∞</span>,
          <br />
          <br />
          &gt; então <span className="neon-text-pink">X</span> vale...?
        </p>
      </CyberTextBox>

      <div className="grid grid-cols-2 gap-3 w-full">
        {LOVE_MATH_OPTIONS.map((opt) => (
          <NeonButton
            key={opt.id}
            variant={opt.correct ? "cyan" : "pink"}
            onClick={() => pick(opt)}
            disabled={solved}
          >
            {opt.label}
          </NeonButton>
        ))}
      </div>

      {msg && (
        <CyberTextBox accent={solved ? "cyan" : "pink"}>
          <p className={solved ? "neon-text-cyan" : "text-[var(--neon-pink)]"}>{msg}</p>
        </CyberTextBox>
      )}

      {solved && (
        <NeonButton
          variant="cyan"
          onClick={() => {
            onBeep("click");
            onNext();
          }}
        >
          [ CARREGAR RECOMPENSA FINAL ]
        </NeonButton>
      )}
    </div>
  );
}
