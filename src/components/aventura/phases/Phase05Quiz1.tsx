import { useState } from "react";
import { CyberTextBox } from "../CyberTextBox";
import { NeonButton } from "../NeonButton";

export function Phase05Quiz1({ onNext, onBeep }: { onNext: () => void; onBeep: (k: "success" | "error") => void }) {
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <h2 className="font-display text-xs sm:text-sm neon-text-pink leading-relaxed">
        VERIFICAÇÃO DE MEMÓRIA (1/3)
      </h2>
      <CyberTextBox accent="cyan">
        <p>
          &gt; Pra confirmar que você é mesmo a minha dupla oficial, responde aí:
          <br />
          <br />
          &gt; Quem apaga primeiro no meio de um filme, mesmo tendo escolhido o filme?
        </p>
      </CyberTextBox>


      <div className="flex flex-col gap-3 w-full">
        <NeonButton
          variant="pink"
          onClick={() => {
            onBeep("error");
            setError("> aaaah, não minta pra mim mulher kkkk quem sempre apaga é você e você sabe disso ❤");
          }}
        >
          &gt; SAMUKA
        </NeonButton>
        <NeonButton
          variant="pink"
          onClick={() => {
            onBeep("success");
            onNext();
          }}
        >
          &gt; CAMILA
        </NeonButton>
      </div>
      {error && (
        <p role="alert" aria-live="polite" className="text-[var(--neon-pink)] font-terminal text-lg">
          {error}
        </p>
      )}
    </div>
  );
}
