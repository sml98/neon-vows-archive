import { useState } from "react";
import { CyberTextBox } from "../CyberTextBox";
import { NeonButton } from "../NeonButton";
import { Caret } from "../Caret";
import { AchievementList } from "../AchievementList";
import { POEM } from "@/lib/aventura/content";
import { useTypewriter } from "@/lib/aventura/useTypewriter";
import coupleNight from "@/assets/couple-night.png.asset.json";

interface Props {
  achievements: number[];
}

export function Phase10Finale({ achievements }: Props) {
  const [revealed, setRevealed] = useState(false);
  const { output, done } = useTypewriter(POEM, 42);

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <h2 className="font-display text-xs sm:text-sm neon-text-pink leading-relaxed">
        MAIN FRAME UNLOCKED
      </h2>

      <CyberTextBox accent="cyan" className="min-h-[200px]">
        <p className="whitespace-pre-line text-[var(--neon-cyan)] leading-relaxed">
          {output}
          <Caret color="cyan" />
        </p>
      </CyberTextBox>

      {done && !revealed && (
        <NeonButton variant="pink" onClick={() => setRevealed(true)}>
          [ ABRIR MEMÓRIA FINAL ]
        </NeonButton>
      )}

      {revealed && (
        <>
          <div className="relative w-full border-2 border-[var(--neon-cyan)] shadow-[var(--shadow-neon-cyan)] overflow-hidden animate-glitch-fade">
            <img
              src={coupleNight.url}
              alt="Nós dois, sob as luzes da noite"
              className="block w-full h-auto"
              style={{ imageRendering: "pixelated" }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to bottom, transparent 0 3px, oklch(0 0 0 / 0.32) 3px 4px)",
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at center, transparent 55%, oklch(0 0 0 / 0.55) 100%)",
              }}
            />
          </div>

          <CyberTextBox accent="pink">
            <p className="text-[var(--neon-pink)]">
              &gt; nenhuma engine renderiza algo tão perfeito quanto você ao meu lado.
              <br />
              <br />
              &gt; obrigado por atravessar cada fase comigo. te amo em todos os pixels, em todos os frames, em todos os finais possíveis. <Caret color="pink" />
            </p>
          </CyberTextBox>

          <AchievementList unlocked={achievements} />
        </>
      )}
    </div>
  );
}
