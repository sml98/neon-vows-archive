import { useState } from "react";
import { CyberTextBox } from "../CyberTextBox";
import { NeonButton } from "../NeonButton";

export function Phase03Pact({ onNext, onBeep }: { onNext: () => void; onBeep: (k: "click" | "success") => void }) {
  const [refused, setRefused] = useState(false);
  return (
    <div className="w-full flex flex-col items-center gap-4">
      <h2 className="font-display text-xs sm:text-sm neon-text-pink leading-relaxed">
        CO-OP PROTOCOL INITIATED
      </h2>
      <CyberTextBox accent="cyan">
        <p>
          &gt; Antes de avançarmos, um juramento é necessário:
          <br />
          <br />
          &gt; Você promete dividir pelo menos um quadradinho desse chocolate com o Samuka?
        </p>
      </CyberTextBox>

      {!refused ? (
        <div className="flex flex-col gap-3 w-full">
          <NeonButton
            variant="cyan"
            onClick={() => {
              onBeep("success");
              onNext();
            }}
          >
            &gt; SIM, ACEITO O PACTO
          </NeonButton>
          <NeonButton
            variant="pink"
            onClick={() => {
              onBeep("click");
              setRefused(true);
            }}
          >
            &gt; NEGAR
          </NeonButton>
        </div>
      ) : (
        <div className="w-full flex flex-col gap-3">
          <CyberTextBox accent="pink">
            <p className="text-[var(--neon-pink)]">
              &gt; "Você errou, que maldade! Mas como já sabe, podemos aprender um com o outro e tentar mesmo assim... e juntos, sendo a melhor dupla, acertamos sempre o nosso futuro! ❤"
            </p>
          </CyberTextBox>
          <NeonButton
            variant="cyan"
            onClick={() => {
              onBeep("success");
              onNext();
            }}
          >
            &gt; AVANÇAR JUNTOS
          </NeonButton>
        </div>
      )}
    </div>
  );
}
