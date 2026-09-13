import { useTypewriter } from "@/lib/aventura/useTypewriter";
import { Caret } from "../Caret";
import { CyberTextBox } from "../CyberTextBox";
import { NeonButton } from "../NeonButton";
import { EXPERIENCE } from "@/lib/aventura/experience";

interface Props {
  onNext: () => void;
  onBeep: (k: "click" | "success") => void;
}

const LETTER_TEXT = `Meu bem, se você chegou até aqui, é porque é tão teimosa quanto eu. Talvez seja justamente por isso que a nossa história nunca tenha sido comum.

Antes daquele encontro, nós já tínhamos discutido, parado de nos falar, voltado por causa de um story no Instagram e discutido outra vez. Nem tínhamos nos visto e já parecíamos dois protagonistas teimosos disputando o controle da mesma história.

Então chegou o dia do shopping. Você apareceu com um copinho de café nas mãos, e eu ainda me lembro da sua pele, do brilho dos seus olhos, do seu corpo, da sua altura. Tudo em você me prendeu antes mesmo que eu entendesse onde aquilo iria nos levar.

Eu só queria experimentar um ${EXPERIENCE.relationship.firstMeeting.samuelDrink} numa tarde de semana. Você achou aquilo uma loucura e até desconfiou que eu fosse alcoólatra. No fim, bebeu comigo. Essa lembrança ainda me faz rir: você questiona as minhas ideias e, quando percebo, já está dividindo a maluquice comigo.

Eu tive medo de tentar beijar você. Mas criei coragem, você correspondeu e, naquele instante, a discussão, o orgulho e a insegurança perderam o sinal. Ficou apenas aquela sensação boa entre nós.

Depois, você voltou de Uber e eu fui a pé até o apartamento. Como não estava acostumado a caminhar, ganhei calos nos pés. Foi o primeiro dano físico oficialmente causado por me apaixonar por você — e eu percorreria o mesmo caminho outra vez.

Nós nos despedimos felizes. Desde então, cada dia com você é uma fase que eu não quero pular, e cada beijo virou um save point. Fiz esta aventura para lembrar que guardei os detalhes — até aqueles que pareceriam pequenos demais para qualquer outra pessoa.

Poucos dias depois chegou 09/10/2025, e eu resolvi oficializar o namoro com flores, aliança e... num motel. Porque aparentemente restaurante, praça e pôr do sol estavam em manutenção naquele dia. Eu, meio deslocado naquele ambiente, tentando agir naturalmente com um buquê e uma aliança: uma operação discretíssima, bah. Foi estranho, cômico, diferente, muito bom — e completamente nosso.

Te amo, minha vida. Agora continua — ainda tem mais fases para rir comigo.
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
