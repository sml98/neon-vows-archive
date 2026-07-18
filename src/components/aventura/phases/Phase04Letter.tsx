import { useTypewriter } from "@/lib/aventura/useTypewriter";
import { Caret } from "../Caret";
import { CyberTextBox } from "../CyberTextBox";
import { NeonButton } from "../NeonButton";

interface Props {
  onNext: () => void;
  onBeep: (k: "click" | "success") => void;
}

const LETTER_TEXT = `Meu bem, se você chegou até aqui, é porque você é teimosa que nem eu. E é por isso que te amo.

Lembra do nosso primeiro encontro? Eu ali, querendo tomar um chopp de vinho no shopping, e você me olhando com aquela cara de 'esse cara é maluco'. Mas no final, você bebeu junto. E é assim que a gente funciona: eu sou o maluco, e você é a pessoa que torna a maluquice bonita.

Cada dia contigo é uma fase nova que eu não quero pular. Cada beijo é um save point. E essa aventura? É só pra te lembrar que eu pensei em cada detalhe, como eu penso em você cada segundo.

Te amo, minha vida. Agora continua — ainda tem surpresa.
— Samuel`;

export function Phase04Letter({ onNext, onBeep }: Props) {
  const { output, done } = useTypewriter(LETTER_TEXT, 45);

  return (
    <div className="w-full flex flex-col items-center gap-5">
      <h2 className="font-display text-xs sm:text-sm neon-text-pink leading-relaxed text-center">
        MENSAGEM INTERCEPTADA — NÍVEL: PESSOAL
      </h2>

      <CyberTextBox accent="pink">
        <p className="whitespace-pre-wrap text-sm sm:text-base leading-relaxed text-[var(--neon-pink)]">
          {output}
          {!done && <Caret color="pink" />}
        </p>
      </CyberTextBox>

      {done && (
        <div
          className="w-full transition-opacity duration-700 ease-in"
          style={{
            animation: "fadeIn 700ms ease-in forwards",
          }}
        >
          <NeonButton
            variant="pink"
            onClick={() => {
              onBeep("success");
              onNext();
            }}
          >
            [ CONTINUAR A AVENTURA ]
          </NeonButton>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
