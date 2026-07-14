import { useState } from "react";
import { CyberTextBox } from "../CyberTextBox";
import { NeonButton } from "../NeonButton";
import { PACT_RESPONSES } from "@/lib/aventura/content";

type Choice = keyof typeof PACT_RESPONSES;

interface Props {
  onNext: () => void;
  onBeep: (k: "click" | "success") => void;
}

export function Phase03Pact({ onNext, onBeep }: Props) {
  const [choice, setChoice] = useState<Choice | null>(null);

  const pick = (c: Choice) => {
    setChoice(c);
    onBeep(c === "depende" ? "success" : "click");
  };

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <h2 className="font-display text-xs sm:text-sm neon-text-pink leading-relaxed">
        CO-OP PROTOCOL — PACTO
      </h2>
      <CyberTextBox accent="cyan">
        <p>
          &gt; antes de avançar, o sistema exige um juramento:
          <br />
          <br />
          &gt; você promete dividir pelo menos UM quadradinho de chocolate com o Samuka?
        </p>
      </CyberTextBox>

      {!choice ? (
        <div className="flex flex-col gap-3 w-full">
          <NeonButton variant="cyan" onClick={() => pick("sim")}>
            &gt; SIM, DIVIDO
          </NeonButton>
          <NeonButton variant="pink" onClick={() => pick("nao")}>
            &gt; NÃO DIVIDO
          </NeonButton>
          <NeonButton variant="pink" onClick={() => pick("depende")}>
            &gt; DEPENDE DO SABOR
          </NeonButton>
        </div>
      ) : (
        <div className="w-full flex flex-col gap-3">
          <CyberTextBox accent="pink">
            <p className="text-[var(--neon-pink)]">{PACT_RESPONSES[choice]}</p>
          </CyberTextBox>
          <NeonButton
            variant="cyan"
            onClick={() => {
              onBeep("success");
              onNext();
            }}
          >
            [ AVANÇAR JUNTOS ]
          </NeonButton>
        </div>
      )}
    </div>
  );
}
