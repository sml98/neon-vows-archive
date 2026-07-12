import { useState } from "react";
import { CyberTextBox } from "../CyberTextBox";
import { NeonButton } from "../NeonButton";
import { ProgressBar } from "../ProgressBar";
import { HACK_CLICKS_REQUIRED } from "@/lib/aventura/content";

export function Phase04Hack({ onNext, onBeep }: { onNext: () => void; onBeep: (k: "click" | "success") => void }) {
  const [clicks, setClicks] = useState(0);
  const done = clicks >= HACK_CLICKS_REQUIRED;
  const progress = Math.min(100, (clicks / HACK_CLICKS_REQUIRED) * 100);

  const click = () => {
    if (done) return;
    const next = clicks + 1;
    setClicks(next);
    if (next >= HACK_CLICKS_REQUIRED) {
      onBeep("success");
      window.setTimeout(onNext, 800);
    } else {
      onBeep("click");
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <h2 className="font-display text-xs sm:text-sm neon-text-cyan leading-relaxed">
        FIREWALL DETECTADO
      </h2>
      <CyberTextBox accent="cyan">
        <p>
          &gt; O sistema exige uma prova de esforço.
          <br />
          &gt; Clique no botão rapidamente para encher a barra de energia e hackear a próxima fase!
        </p>
      </CyberTextBox>

      <ProgressBar value={progress} segments={HACK_CLICKS_REQUIRED} />

      <NeonButton
        variant="cyan"
        onClick={click}
        disabled={done}
        className={done ? "neon-text-cyan" : ""}
      >
        {done ? "[ HACK CONCLUÍDO ]" : "[ SOBRECARREGAR SISTEMA ]"}
      </NeonButton>
    </div>
  );
}
