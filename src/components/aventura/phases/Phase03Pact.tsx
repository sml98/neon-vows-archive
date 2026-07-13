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
          &gt; Antes de avançar, o sistema exige um juramento sagrado:
          <br />
          <br />
          &gt; Você promete dividir pelo menos UM quadradinho desse chocolate com o Samuka?
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
              &gt; "Errrrouu! kkk mas relaxa — a gente é aquela dupla que mesmo perdendo uma partida, sempre sai vencendo a campanha inteira. Bora junto? ❤"
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
