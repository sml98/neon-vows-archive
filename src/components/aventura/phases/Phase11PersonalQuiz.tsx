import { useState } from "react";
import { CyberTextBox } from "../CyberTextBox";
import { NeonButton } from "../NeonButton";

interface Props {
  onNext: () => void;
  onBeep: (k: "success" | "error" | "click") => void;
}

interface Question {
  id: number;
  text: string;
  options: { label: string; correct: boolean; response: string }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Quem de nós dois é o mais ciumento e insuportável de um jeito fofo? 👀",
    options: [
      {
        label: "Eu (Camila)",
        correct: false,
        response: "> Quase! Mas eu sou bem pior kkk tenta de novo.",
      },
      {
        label: "Você (Samuel)",
        correct: true,
        response:
          "> Sabia que você ia votar em mim! Mas confessa: eu sou a sua chatice preferida. 💜",
      },
      {
        label: "Ninguém, somos santos",
        correct: false,
        response: "> Aham, conta outra kkk somos dois chatinhos. Tenta de novo.",
      },
    ],
  },
  {
    id: 2,
    text: "Qual é o nosso principal objetivo na campanha desse co-op da vida? 🎮",
    options: [
      {
        label: "Ficar jogando o dia todo",
        correct: false,
        response: "> Seria bom, mas tem algo muito maior na nossa mira...",
      },
      {
        label:
          "Construir um melhorado e mais lindo futuro juntos, independente das situações, pois ao seu lado tenho a força necessária para lutar por isto!",
        correct: true,
        response: "> Com certeza, meu amor! Mal posso esperar para carregar essa fase ao seu lado.",
      },
      {
        label: "Viajar até cansar",
        correct: false,
        response: "> Legal, mas construir nosso lar é o nosso principal savepoint. Tenta de novo.",
      },
    ],
  },
  {
    id: 3,
    text: "O que acontece comigo quando vejo você sorrir? ✨",
    options: [
      {
        label: "Meu processador dá overclock completo ⚡",
        correct: true,
        response:
          "> Exato, minha vida! Meu sistema inteiro reinicia e o meu coração derrete de amor.",
      },
      {
        label: "Eu fico travado sem reação",
        correct: false,
        response: "> Fico sim, mas tem uma explicação mais nerd/tecnológica pra isso...",
      },
      {
        label: "Eu fico normal",
        correct: false,
        response: "> Mentira! Meu coração bate a mil por hora. Tenta de novo.",
      },
    ],
  },
  {
    id: 4,
    text: "Se o carinho às vezes não consegue virar palavra ou gesto, o que eu quero que você saiba? 💜",
    options: [
      {
        label: "Que o sistema precisa ser formatado",
        correct: false,
        response: "> Nem pensar. Você não é um problema para eu consertar, vida.",
      },
      {
        label: "Que eu quero aprender o seu jeito, sem cobrar uma reação perfeita",
        correct: true,
        response:
          "> É isso. Eu não fiz esta aventura para cobrar carinho; fiz para mostrar que continuo prestando atenção e escolhendo caminhar com você.",
      },
      {
        label: "Que existe uma resposta obrigatória",
        correct: false,
        response:
          "> Aqui não tem prova final de sentimentos. Só verdade, paciência e espaço para nós dois.",
      },
    ],
  },
];

export function Phase11PersonalQuiz({ onNext, onBeep }: Props) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);

  const currentQuestion = QUESTIONS[currentIdx];

  const handleOptionClick = (optIdx: number) => {
    if (isCorrect) return;
    onBeep("click");
    setSelectedOpt(optIdx);
    const opt = currentQuestion.options[optIdx];
    setMessage(opt.response);

    if (opt.correct) {
      onBeep("success");
      setIsCorrect(true);
    } else {
      onBeep("error");
      setIsCorrect(false);
    }
  };

  const handleNext = () => {
    onBeep("click");
    if (currentIdx < QUESTIONS.length - 1) {
      setCurrentIdx((idx) => idx + 1);
      setSelectedOpt(null);
      setMessage(null);
      setIsCorrect(false);
    } else {
      onNext();
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-5 animate-glitch-fade">
      <h2 className="font-display text-xs sm:text-sm neon-text-pink leading-relaxed tracking-wider text-center">
        SINTONIA PESSOAL (PERGUNTA {currentIdx + 1}/{QUESTIONS.length})
      </h2>

      <CyberTextBox accent="cyan">
        <p className="text-left font-terminal text-xs sm:text-sm">
          &gt; Para descriptografar a próxima camada do meu coração, responda:
          <br />
          <br />
          &gt; <span className="text-[var(--neon-cyan)] font-bold">{currentQuestion.text}</span>
        </p>
      </CyberTextBox>

      <div className="flex flex-col gap-3 w-full">
        {currentQuestion.options.map((opt, idx) => {
          const isSelected = selectedOpt === idx;
          const buttonVariant = isSelected ? (opt.correct ? "cyan" : "pink") : "pink";

          return (
            <NeonButton
              key={idx}
              variant={buttonVariant}
              onClick={() => handleOptionClick(idx)}
              disabled={isCorrect && !isSelected}
            >
              {opt.label}
            </NeonButton>
          );
        })}
      </div>

      {message && (
        <CyberTextBox accent={isCorrect ? "cyan" : "pink"}>
          <p
            className={
              isCorrect
                ? "neon-text-cyan text-xs sm:text-sm leading-relaxed text-left font-terminal"
                : "text-[var(--neon-pink)] text-xs sm:text-sm leading-relaxed text-left font-terminal"
            }
          >
            {message}
          </p>
        </CyberTextBox>
      )}

      {isCorrect && (
        <NeonButton variant="cyan" onClick={handleNext}>
          {currentIdx < QUESTIONS.length - 1 ? "[ PRÓXIMA PERGUNTA ]" : "[ AVANÇAR ]"}
        </NeonButton>
      )}
    </div>
  );
}
