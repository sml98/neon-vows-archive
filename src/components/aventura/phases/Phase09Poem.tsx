import { CyberTextBox } from "../CyberTextBox";
import { NeonButton } from "../NeonButton";
import { Caret } from "../Caret";
import { POEM } from "@/lib/aventura/content";
import { useTypewriter } from "@/lib/aventura/useTypewriter";

export function Phase09Poem({ onNext, onBeep }: { onNext: () => void; onBeep: () => void }) {
  const { output, done } = useTypewriter(POEM, 45);

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <h2 className="font-display text-xs sm:text-sm neon-text-pink leading-relaxed">
        DESCRIPTOGRAFANDO MENSAGEM
      </h2>
      <CyberTextBox accent="cyan" className="min-h-[200px]">
        <p className="whitespace-pre-line text-[var(--neon-cyan)] leading-relaxed">
          {output}
          <Caret color="cyan" />
        </p>
      </CyberTextBox>

      {done && (
        <NeonButton
          variant="cyan"
          onClick={() => {
            onBeep();
            onNext();
          }}
        >
          [ VER RECOMPENSA FINAL ]
        </NeonButton>
      )}
    </div>
  );
}
