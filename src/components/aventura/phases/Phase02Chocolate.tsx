import { CyberTextBox } from "../CyberTextBox";
import { NeonButton } from "../NeonButton";

export function Phase02Chocolate({ onNext, onBeep }: { onNext: () => void; onBeep: () => void }) {
  return (
    <div className="w-full flex flex-col items-center gap-4">
      <h1 className="font-display text-sm sm:text-base neon-text-cyan leading-relaxed">
        CONEXÃO ESTABELECIDA
      </h1>
      <CyberTextBox accent="cyan">
        <p>
          &gt; Olá, meu amor.
          <br />
          &gt; Achou que o chocolate seria a melhor parte do seu dia?
          <br />
          <br />
          &gt; Isso foi apenas o começo. Cada dia ao seu lado é como desbloquear a melhor fase da minha vida.
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
