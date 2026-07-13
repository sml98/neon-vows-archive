import { CyberTextBox } from "../CyberTextBox";
import { NeonButton } from "../NeonButton";
import coupleSmile from "@/assets/couple-smile.png.asset.json";

export function Phase02Chocolate({ onNext, onBeep }: { onNext: () => void; onBeep: () => void }) {
  return (
    <div className="w-full flex flex-col items-center gap-4">
      <h1 className="font-display text-sm sm:text-base neon-text-cyan leading-relaxed">
        CONEXÃO ESTABELECIDA
      </h1>

      <div className="relative w-full border-2 border-[var(--neon-cyan)] shadow-[var(--shadow-neon-cyan)] overflow-hidden">
        <img
          src={coupleSmile.url}
          alt="Nós dois, em pixel art"
          className="block w-full h-auto"
          style={{ imageRendering: "pixelated" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, transparent 0 3px, oklch(0 0 0 / 0.28) 3px 4px)",
          }}
        />
      </div>

      <CyberTextBox accent="cyan">
        <p>
          &gt; Oi, meu amor. Achou mesmo que o chocolate seria o melhor da sua semana?
          <br />
          <br />
          &gt; Aquilo foi só o tutorial. A partir daqui começa a jornada de verdade — e a recompensa final é ainda mais doce que qualquer barra da Lacta.
        </p>
      </CyberTextBox>
      <NeonButton
        variant="pink"
        onClick={() => {
          onBeep();
          onNext();
        }}
      >
        [ INICIAR QUEST ]
      </NeonButton>
    </div>
  );
}
