import { CyberTextBox } from "../CyberTextBox";
import { Caret } from "../Caret";
import coupleNight from "@/assets/couple-night.png.asset.json";

export function Phase10Finale() {
  return (
    <div className="w-full flex flex-col items-center gap-4">
      <h2 className="font-display text-xs sm:text-sm neon-text-pink leading-relaxed">
        MAIN FRAME UNLOCKED
      </h2>

      <div className="relative w-full border-2 border-[var(--neon-cyan)] shadow-[var(--shadow-neon-cyan)] overflow-hidden">
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

      <CyberTextBox accent="cyan">
        <p>
          &gt; Nenhuma engine renderiza algo tão perfeito quanto você ao meu lado.
          <br />
          <br />
          &gt; Obrigado por ser a melhor coop que o universo já compilou pra mim. Te amo em todos os pixels, em todos os frames, em todos os finais possíveis. <Caret color="cyan" />
        </p>
      </CyberTextBox>
    </div>
  );
}
