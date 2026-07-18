import React, { useState } from "react";
import { CyberTextBox } from "../CyberTextBox";
import { NeonButton } from "../NeonButton";

interface EnigmaDecoderProps {
  onSolved: () => void;
  onBeep: (k: "click" | "success" | "error") => void;
}

const RIDDLES = [
  {
    question: "O que eu sinto por ti, que começa com A e não tem fim?",
    options: ["AMO", "AMIZADE", "ANSIEDADE"],
    answer: "AMO",
    targetLength: 3,
  },
  {
    question: "E quanto eu sinto? Mais que pouco, mais que bastante...",
    options: ["POUCO", "MUITO", "MAIS OU MENOS"],
    answer: "MUITO",
    targetLength: 5,
  },
  {
    question: "E quem é a dona de tudo isso? Quem é a razão de cada pixel desta aventura?",
    options: ["ELE", "NINGUÉM", "VOCÊ"],
    answer: "VOCÊ",
    targetLength: 4, // V O C Ê -> 4 chars visually
  },
];

export function EnigmaDecoder({ onSolved, onBeep }: EnigmaDecoderProps) {
  const [step, setStep] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [completed, setCompleted] = useState(false);

  const handleOptionClick = (opt: string) => {
    if (opt === RIDDLES[step].answer) {
      onBeep("success");
      setErrorMsg("");
      if (step === 2) {
        setCompleted(true);
      } else {
        setStep(step + 1);
      }
    } else {
      onBeep("error");
      setErrorMsg("> erro. tenta de novo, meu bem...");
    }
  };

  const getWordDisplay = (index: number) => {
    if (step > index || completed) return RIDDLES[index].answer;
    return "_ ".repeat(RIDDLES[index].targetLength).trim();
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto space-y-6">
      <CyberTextBox>
        <h2 className="font-display text-xl text-[var(--neon-cyan)] mb-2 text-center uppercase">
          ENIGMA INTERCEPTADO
        </h2>
        <p className="text-[var(--neon-cyan)] text-sm mb-4 text-center">
          NÍVEL: SECRETO
        </p>
        
        {/* Display Panel */}
        <div className="flex justify-center space-x-4 mb-6 font-display text-2xl">
          <span className={step > 0 || completed ? "text-[var(--neon-pink)] drop-shadow-[0_0_8px_var(--neon-pink)]" : "text-gray-500"}>{getWordDisplay(0)}</span>
          <span className={step > 1 || completed ? "text-[var(--neon-pink)] drop-shadow-[0_0_8px_var(--neon-pink)]" : "text-gray-500"}>{getWordDisplay(1)}</span>
          <span className={completed ? "text-[var(--neon-pink)] drop-shadow-[0_0_8px_var(--neon-pink)]" : "text-gray-500"}>{getWordDisplay(2)}</span>
        </div>

        {!completed && (
          <div className="flex flex-col space-y-4">
            <p className="text-[var(--neon-cyan)] text-center">
              &gt; {RIDDLES[step].question}
            </p>
            <div className="flex flex-col space-y-3 mt-4">
              {RIDDLES[step].options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleOptionClick(opt)}
                  className="bg-black/50 border border-[var(--neon-cyan)] text-[var(--neon-cyan)] py-2 px-4 rounded hover:bg-[var(--neon-cyan)] hover:text-black hover:shadow-[0_0_10px_var(--neon-cyan)] transition-all uppercase font-terminal"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {errorMsg && !completed && (
          <p className="text-red-500 text-center mt-4 font-terminal animate-pulse">{errorMsg}</p>
        )}

        {completed && (
          <div className="flex flex-col items-center mt-6 animate-fade-in space-y-6">
            <p className="text-[var(--neon-pink)] text-center leading-relaxed drop-shadow-[0_0_5px_var(--neon-pink)]">
              &gt; mensagem descriptografada. e é a mais pura verdade que eu já codifiquei. ❤
            </p>
            <NeonButton variant="pink" onClick={onSolved}>
              [ AVANÇAR ]
            </NeonButton>
          </div>
        )}
      </CyberTextBox>
    </div>
  );
}
