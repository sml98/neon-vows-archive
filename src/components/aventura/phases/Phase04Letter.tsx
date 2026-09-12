import { useTypewriter } from "@/lib/aventura/useTypewriter";
import { Caret } from "../Caret";
import { CyberTextBox } from "../CyberTextBox";
import { NeonButton } from "../NeonButton";
import { EXPERIENCE } from "@/lib/aventura/experience";

interface Props {
  onNext: () => void;
  onBeep: (k: "click" | "success") => void;
}

const LETTER_TEXT = `Meu bem, se você chegou até aqui, é porque você é teimosa que nem eu. E é por isso que te amo.

Antes daquele encontro, a gente já tinha conseguido discutir, parar de se falar, voltar por causa de um story no Instagram e discutir outra vez. Nem tínhamos nos visto e já parecíamos dois protagonistas teimosos tentando decidir quem mandava no roteiro.

Então chegou o shopping. Você apareceu com um copinho de café nas mãos e eu lembro como se fosse ontem: a cor da sua pele, o brilho dos seus olhos, o seu corpo, a sua altura. Tudo em você me fascinou antes mesmo que eu entendesse onde aquilo ia dar.

Eu só queria experimentar um ${EXPERIENCE.relationship.firstMeeting.samuelDrink} numa tarde de semana. Você achou uma loucura e chegou a desconfiar que eu fosse alcoólatra. No fim, bebeu comigo. Essa parte ainda me faz rir: você questiona a minha maluquice e, quando eu vejo, já está dividindo ela comigo.

Eu fiquei receoso de tentar te beijar. Mas tomei coragem, você permitiu, correspondeu e me beijou de volta. Naquele instante, a discussão, o orgulho e o medo perderam a conexão. Ficou só aquela sensação boa entre nós.

Depois você voltou de Uber e eu fui a pé para o apartamento. Eu não estava acostumado a caminhar e cheguei a ganhar calos nos pés. Foi o primeiro dano físico oficialmente causado por me apaixonar por você — e eu repetiria todo o caminho.

Nós nos despedimos felizes. E cada dia contigo desde então é uma fase que eu não quero pular. Cada beijo é um save point. Esta aventura é só para te lembrar que eu guardei os detalhes — inclusive os que parecem pequenos demais para qualquer outra pessoa.

Poucos dias depois chegou 09/10/2025, e eu resolvi oficializar o namoro com flores, aliança e... num motel. Porque aparentemente restaurante, praça e pôr do sol estavam em manutenção naquele dia. Eu, meio deslocado naquele ambiente, tentando agir naturalmente com um buquê e uma aliança: uma operação discretíssima, bah. Foi estranho, cômico, diferente, muito bom — e completamente nosso.

Te amo, minha vida. Agora continua — ainda tem surpresa.
— ${EXPERIENCE.playerOne.name}`;

export function Phase04Letter({ onNext, onBeep }: Props) {
  const { output, done, skip } = useTypewriter(LETTER_TEXT, 45);

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

      {!done && (
        <button
          type="button"
          onClick={skip}
          className="min-h-9 font-display text-[8px] text-white/55 underline underline-offset-4 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--neon-cyan)]"
        >
          [ EXIBIR MENSAGEM COMPLETA ]
        </button>
      )}

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
