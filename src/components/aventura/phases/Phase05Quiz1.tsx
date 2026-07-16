import { useState } from "react";
import { CyberTextBox } from "../CyberTextBox";
import { NeonButton } from "../NeonButton";
import { QUIZ1_OPTIONS } from "@/lib/aventura/content";

interface Props {
  onNext: () => void;
  onBeep: (k: "success" | "error" | "click") => void;
}

export function Phase05Quiz1({ onNext, onBeep }: Props) {
  const [error, setError] = useState<string | null>(null);
  const [correct, setCorrect] = useState(false);

  const pick = (opt: (typeof QUIZ1_OPTIONS)[number]) => {
    if (opt.correct) {
      onBeep("success");
      setError(null);
      setCorrect(true);
      window.setTimeout(onNext, 2500);
    } else {
      onBeep("error");
      setError(opt.msg ?? null);
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-4 animate-glitch-fade">
      <h2 className="font-display text-xs sm:text-sm neon-text-pink leading-relaxed">
        VERIFICAÇÃO DE MEMÓRIA (1/3)
      </h2>
      <CyberTextBox accent="cyan">
        <p className="text-left font-terminal text-xs sm:text-sm">
          &gt; Para confirmar que você é a minha dupla de co-op oficial:
          <br />
          <br />
          &gt; Quem dorme primeiro no meio do filme, mesmo tendo escolhido o filme?
        </p>
      </CyberTextBox>

      <div className="grid grid-cols-1 gap-3 w-full">
        {QUIZ1_OPTIONS.map((opt) => (
          <NeonButton key={opt.id} variant="pink" onClick={() => pick(opt)} disabled={correct}>
            &gt; {opt.label}
          </NeonButton>
        ))}
      </div>

      {error && !correct && (
        <p role="alert" aria-live="polite" className="text-[var(--neon-pink)] font-terminal text-lg">
          {error}
        </p>
      )}

      {correct && (
        <p role="status" aria-live="polite" className="text-[var(--neon-cyan)] font-terminal text-lg animate-glitch-fade">
          &gt; Resposta exata! Você apaga antes mesmo dos trailers terminarem kkk. Te amo, minha dorminhoca preferida. ❤
        </p>
      )}
    </div>
  );
}
