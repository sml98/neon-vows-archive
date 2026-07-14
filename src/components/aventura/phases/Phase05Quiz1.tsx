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

  const pick = (opt: (typeof QUIZ1_OPTIONS)[number]) => {
    if (opt.correct) {
      onBeep("success");
      setError(null);
      window.setTimeout(onNext, 300);
    } else {
      onBeep("error");
      setError(opt.msg ?? null);
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <h2 className="font-display text-xs sm:text-sm neon-text-pink leading-relaxed">
        VERIFICAÇÃO DE MEMÓRIA (1/3)
      </h2>
      <CyberTextBox accent="cyan">
        <p>
          &gt; pra confirmar que você é minha dupla oficial:
          <br />
          <br />
          &gt; quem apaga primeiro no meio de um filme, mesmo tendo escolhido o filme?
        </p>
      </CyberTextBox>

      <div className="grid grid-cols-1 gap-3 w-full">
        {QUIZ1_OPTIONS.map((opt) => (
          <NeonButton key={opt.id} variant="pink" onClick={() => pick(opt)}>
            &gt; {opt.label}
          </NeonButton>
        ))}
      </div>

      {error && (
        <p role="alert" aria-live="polite" className="text-[var(--neon-pink)] font-terminal text-lg">
          {error}
        </p>
      )}
    </div>
  );
}
