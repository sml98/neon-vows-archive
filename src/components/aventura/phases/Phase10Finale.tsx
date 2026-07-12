import { CyberTextBox } from "../CyberTextBox";
import { Caret } from "../Caret";
import { ParticleField } from "../ParticleField";

export function Phase10Finale() {
  return (
    <div className="w-full flex flex-col items-center gap-4">
      <h2 className="font-display text-xs sm:text-sm neon-text-pink leading-relaxed">
        MAIN FRAME UNLOCKED
      </h2>

      <div className="relative w-full aspect-[4/3] border-2 border-[var(--neon-cyan)] shadow-[var(--shadow-neon-cyan)] overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "conic-gradient(from 0deg at 50% 50%, oklch(0.72 0.32 330 / 0.9), oklch(0.86 0.19 200 / 0.9), oklch(0.72 0.32 330 / 0.9))",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, transparent 0 3px, oklch(0 0 0 / 0.35) 3px 4px)",
          }}
        />
        <ParticleField />
        <div className="absolute inset-x-0 bottom-2 text-center font-terminal text-lg text-white/90 drop-shadow">
          {"// insira nossa foto aqui //"}
        </div>
      </div>

      <CyberTextBox accent="cyan">
        <p>
          &gt; Nenhuma engine de última geração renderiza algo tão perfeito quanto você. Eu te amo infinitamente, Camila.
          <br />
          <br />
          &gt; Obrigado por ser a melhor dupla que o universo codificou para mim. <Caret color="cyan" />
        </p>
      </CyberTextBox>
    </div>
  );
}
