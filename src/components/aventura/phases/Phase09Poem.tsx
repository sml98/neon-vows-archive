import { useState } from "react";
import { CyberTextBox } from "../CyberTextBox";
import { NeonButton } from "../NeonButton";
import { LOVE_MATH_OPTIONS } from "@/lib/aventura/content";

interface Props {
  onNext: () => void;
  onBeep: (k: "click" | "success" | "error") => void;
}

export function Phase09Poem({ onNext, onBeep }: Props) {
  const [selectedOpt, setSelectedOpt] = useState<(typeof LOVE_MATH_OPTIONS)[number] | null>(null);
  const [screenText, setScreenText] = useState("DIGITE SUA RESPOSTA...");
  const [msg, setMsg] = useState<string | null>(null);
  const [solved, setSolved] = useState(false);

  const selectVal = (opt: (typeof LOVE_MATH_OPTIONS)[number]) => {
    if (solved) return;
    onBeep("click");
    setSelectedOpt(opt);
    setScreenText(opt.label);
    setMsg(null);
  };

  const clearCalc = () => {
    if (solved) return;
    onBeep("click");
    setSelectedOpt(null);
    setScreenText("");
    setMsg(null);
  };

  const evaluate = () => {
    if (!selectedOpt || solved) return;
    setMsg(selectedOpt.msg);
    if (selectedOpt.correct) {
      onBeep("success");
      setSolved(true);
      setScreenText(`CORRETO! ${selectedOpt.label}`);
    } else {
      onBeep("error");
      setScreenText("MATH_ERROR");
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <h2 className="font-display text-xs sm:text-sm neon-text-cyan leading-relaxed">
        SYSTEM DIAGNOSTICS: LOVE.EQUATION
      </h2>
      <CyberTextBox accent="cyan">
        <p>
          &gt; resolva a equação do amor para liberar o mainframe:
          <br />
          <br />
          &gt; se eu te amo <span className="neon-text-pink">X</span>,
          <br />
          &gt; e você me ama <span className="neon-text-pink">Y</span>,
          <br />
          &gt; e <span className="neon-text-pink">X = Y × ∞</span>,
          <br />
          <br />
          &gt; quanto vale <span className="neon-text-pink">X</span>?
        </p>
      </CyberTextBox>

      {/* Interactive Calculator Display */}
      <div className="w-full max-w-[280px] border-4 border-gray-800 bg-gray-900 p-4 shadow-2xl rounded-2xl flex flex-col gap-3">
        {/* Screen */}
        <div className="w-full bg-black border-2 border-[var(--neon-cyan)] p-3 text-right font-display text-xs sm:text-sm text-[var(--neon-cyan)] tracking-widest min-h-[48px] flex items-center justify-end shadow-[inset_0_0_10px_var(--neon-cyan)]">
          <span>{screenText}</span>
        </div>

        {/* Buttons Grid */}
        <div className="grid grid-cols-2 gap-2">
          {LOVE_MATH_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => selectVal(opt)}
              disabled={solved}
              className={[
                "p-3 border-2 font-display text-[10px] sm:text-xs transition-all active:scale-95 disabled:opacity-40 cursor-pointer",
                selectedOpt?.id === opt.id
                  ? "border-[var(--neon-cyan)] text-[var(--neon-cyan)] shadow-[0_0_8px_var(--neon-cyan)]"
                  : "border-[var(--neon-pink)] text-[var(--neon-pink)] bg-black/40 hover:bg-[var(--neon-pink)]/10",
              ].join(" ")}
            >
              {opt.label}
            </button>
          ))}
          
          {/* Action keys */}
          <button
            type="button"
            onClick={clearCalc}
            disabled={solved || !selectedOpt}
            className="p-3 border-2 border-red-500 text-red-500 font-display text-[10px] sm:text-xs bg-black/40 hover:bg-red-500/10 active:scale-95 disabled:opacity-40 cursor-pointer"
          >
            CLR (LIMPAR)
          </button>
          <button
            type="button"
            onClick={evaluate}
            disabled={solved || !selectedOpt}
            className="p-3 border-2 border-green-500 text-green-500 font-display text-[10px] sm:text-xs bg-black/40 hover:bg-green-500/10 active:scale-95 disabled:opacity-40 cursor-pointer"
          >
            ENT (ENVIAR)
          </button>
        </div>
      </div>

      {msg && (
        <CyberTextBox accent={solved ? "cyan" : "pink"}>
          <p className={solved ? "neon-text-cyan text-sm leading-relaxed" : "text-[var(--neon-pink)] text-sm leading-relaxed"}>{msg}</p>
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
