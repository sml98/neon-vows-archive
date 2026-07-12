import { useState } from "react";
import { CyberTextBox } from "../CyberTextBox";
import { NeonButton } from "../NeonButton";
import { LOVE_MESSAGES } from "@/lib/aventura/content";

const OPTIONS = [25, 50, 75, 100] as const;

export function Phase08LoveMeter({ onNext, onBeep }: { onNext: () => void; onBeep: (k: "click" | "success") => void }) {
  const [pick, setPick] = useState<(typeof OPTIONS)[number] | null>(null);

  const handle = (v: (typeof OPTIONS)[number]) => {
    setPick(v);
    if (v === 100) {
      onBeep("success");
      window.setTimeout(onNext, 2200);
    } else {
      onBeep("click");
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <h2 className="font-display text-xs sm:text-sm neon-text-cyan leading-relaxed">
        SYSTEM DIAGNOSTICS: LOVE %
      </h2>
      <CyberTextBox accent="cyan">
        <p>
          &gt; Você é o glitch mais lindo do meu sistema. Responda rápido: quanto você acha que eu te amo?
        </p>
      </CyberTextBox>

      <div className="grid grid-cols-2 gap-3 w-full">
        {OPTIONS.map((v) => (
          <NeonButton
            key={v}
            variant={v === 100 ? "cyan" : "pink"}
            onClick={() => handle(v)}
          >
            {v}%
          </NeonButton>
        ))}
      </div>

      {pick !== null && (
        <CyberTextBox accent="pink">
          <p className="text-[var(--neon-pink)]">{LOVE_MESSAGES[pick]}</p>
        </CyberTextBox>
      )}
    </div>
  );
}
