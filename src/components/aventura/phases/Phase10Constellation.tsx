import React, { useState, useEffect } from "react";
import { CyberTextBox } from "../CyberTextBox";
import { NeonButton } from "../NeonButton";

interface Phase10Props {
  onNext: () => void;
  onBeep: (k: "click" | "success" | "error") => void;
}

const GRID = [
  "SAMORXLP",
  "ATEKFGHI",
  "MCAMILAN",
  "UQRSTUVW",
  "EBEIJOYZ",
  "LDEFGHIJ",
  "KCOOPMNO",
  "PQRSTUVW"
];

const TARGET_WORDS = ["AMOR", "CAMILA", "SAMUEL", "BEIJO", "COOP"];

export function Phase10Constellation({ onNext, onBeep }: Phase10Props) {
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [selectedPath, setSelectedPath] = useState<{r: number, c: number}[]>([]);
  const [foundCells, setFoundCells] = useState<{r: number, c: number}[]>([]);
  
  const isComplete = foundWords.length === TARGET_WORDS.length;

  const isCellInPath = (r: number, c: number, path: {r: number, c: number}[]) => {
    return path.some(p => p.r === r && p.c === c);
  };

  const handleCellClick = (r: number, c: number) => {
    if (isComplete) return;
    
    // Ignore if already found
    if (isCellInPath(r, c, foundCells)) {
      onBeep("error");
      return;
    }
    
    // If clicking the last selected cell, unselect it
    if (selectedPath.length > 0) {
      const last = selectedPath[selectedPath.length - 1];
      if (last.r === r && last.c === c) {
        onBeep("click");
        setSelectedPath(selectedPath.slice(0, -1));
        return;
      }
    }
    
    // Ignore if already in current path (but not last)
    if (isCellInPath(r, c, selectedPath)) {
      onBeep("error");
      return;
    }
    
    const newPath = [...selectedPath, { r, c }];
    const currentStr = newPath.map(p => GRID[p.r][p.c]).join("");
    
    // Check if current string is a full target word
    const matchedWord = TARGET_WORDS.find(w => w === currentStr || w === currentStr.split("").reverse().join(""));
    
    if (matchedWord && !foundWords.includes(matchedWord)) {
      onBeep("success");
      setFoundWords([...foundWords, matchedWord]);
      setFoundCells([...foundCells, ...newPath]);
      setSelectedPath([]);
      return;
    }
    
    // Check if it's a valid prefix for any unfound word
    const isValidPrefix = TARGET_WORDS.some(w => {
      if (foundWords.includes(w)) return false;
      const rev = w.split("").reverse().join("");
      return w.startsWith(currentStr) || rev.startsWith(currentStr);
    });
    
    if (isValidPrefix) {
      onBeep("click");
      setSelectedPath(newPath);
    } else {
      onBeep("error");
      setSelectedPath([]); // Reset path if wrong
    }
  };
  
  const handleClear = () => {
    if (selectedPath.length > 0) {
      onBeep("click");
      setSelectedPath([]);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto space-y-6">
      <CyberTextBox>
        <h2 className="font-display text-xl text-[var(--neon-cyan)] mb-2 text-center uppercase">
          CAÇA-PALAVRAS
        </h2>
        <p className="text-[var(--neon-cyan)] text-sm mb-4 text-center">
          NÍVEL: DECODIFICAÇÃO
        </p>

        {!isComplete ? (
          <p className="text-[var(--neon-pink)] text-center text-sm mb-4 animate-pulse">
            &gt; toque nas letras para formar as palavras.
          </p>
        ) : (
          <p className="text-[var(--neon-pink)] text-center mb-4 leading-relaxed drop-shadow-[0_0_5px_var(--neon-pink)]">
            &gt; todas as palavras encontradas! cada uma carrega um pedaço do que sinto por ti. ❤
          </p>
        )}

        <div className="flex flex-col items-center mb-6">
          <div className="grid grid-cols-8 gap-1 p-2 border-2 border-[var(--neon-cyan)] bg-black/80 rounded shadow-[0_0_15px_rgba(0,255,255,0.2)]">
            {GRID.map((row, r) => (
              row.split("").map((letter, c) => {
                const isFound = isCellInPath(r, c, foundCells);
                const isSelected = isCellInPath(r, c, selectedPath);
                
                let btnClass = "w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center font-display text-lg sm:text-xl rounded transition-all ";
                
                if (isFound) {
                  btnClass += "bg-[var(--neon-pink)] text-black shadow-[0_0_10px_var(--neon-pink)] scale-105 z-10";
                } else if (isSelected) {
                  btnClass += "bg-[var(--neon-cyan)] text-black shadow-[0_0_10px_var(--neon-cyan)] scale-110 z-20";
                } else {
                  btnClass += "text-[var(--neon-cyan)] bg-black/50 border border-transparent hover:border-[var(--neon-cyan)]";
                }

                return (
                  <button
                    key={`${r}-${c}`}
                    onClick={() => handleCellClick(r, c)}
                    className={btnClass}
                  >
                    {letter}
                  </button>
                );
              })
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center w-full space-y-4">
          <div className="flex flex-wrap justify-center gap-3">
            {TARGET_WORDS.map(w => (
              <span
                key={w}
                className={`font-display px-2 py-1 transition-all ${
                  foundWords.includes(w) 
                    ? "text-[var(--neon-pink)] line-through drop-shadow-[0_0_5px_var(--neon-pink)]" 
                    : "text-gray-500"
                }`}
              >
                {w}
              </span>
            ))}
          </div>
          
          {!isComplete && (
            <button 
              onClick={handleClear}
              className="text-xs text-[var(--neon-cyan)] opacity-70 hover:opacity-100 uppercase mt-4"
            >
              [ LIMPAR SELEÇÃO ]
            </button>
          )}

          {isComplete && (
            <div className="mt-4 animate-fade-in w-full flex justify-center">
              <NeonButton variant="pink" onClick={onNext}>
                [ AVANÇAR ]
              </NeonButton>
            </div>
          )}
        </div>
      </CyberTextBox>
    </div>
  );
}
