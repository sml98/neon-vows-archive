import { useState, useCallback, useEffect, useRef } from "react";
import { CyberTextBox } from "../CyberTextBox";
import { NeonButton } from "../NeonButton";

interface Props {
  onNext: () => void;
  onBeep: (k: "click" | "success" | "error") => void;
}

interface CardData {
  id: number;
  pairId: number;
  emoji: string;
  label: string;
  matchMsg: string;
}

const PAIRS: { emoji: string; label: string; matchMsg: string }[] = [
  {
    emoji: "🍫",
    label: "Chocolate",
    matchMsg:
      "> Doce e irresistível, assim como tu! (mas tem que ser chocolate preto, pois sei que odeia o branco kkk)",
  },
  { emoji: "🌹", label: "Flor", matchMsg: "> cada pétala é uma promessa que te fiz." },
  { emoji: "☕", label: "Café", matchMsg: "> aquele primeiro café na praça de alimentação..." },
  {
    emoji: "🍷",
    label: "Chopp de Vinho",
    matchMsg: "> você achou estranho... mas depois tomou junto. ❤",
  },
  { emoji: "💜", label: "Coração", matchMsg: "> nosso coração em coop mode." },
  { emoji: "🎮", label: "Controle", matchMsg: "> player 1 + player 2 = invencíveis." },
  {
    emoji: "🍝",
    label: "Macarrão",
    matchMsg:
      "> independente do prato, é sempre um momento especial partilhar do momento de lanche com ela, independente do dia.",
  },
  { emoji: "🍿", label: "Pipoca", matchMsg: "> acompanhante oficial das nossas maratonas." },
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildDeck(): CardData[] {
  const cards: CardData[] = [];
  PAIRS.forEach((p, pairId) => {
    cards.push({ id: pairId * 2, pairId, ...p });
    cards.push({ id: pairId * 2 + 1, pairId, ...p });
  });
  return shuffle(cards);
}

export function Phase05Memory({ onNext, onBeep }: Props) {
  const [cards] = useState<CardData[]>(() => buildDeck());
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [lastMatchMsg, setLastMatchMsg] = useState<string | null>(null);
  const [locked, setLocked] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const matchedPairs = matched.size / 2;
  const allDone = matchedPairs === PAIRS.length;

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleClick = useCallback(
    (cardId: number) => {
      if (locked || matched.has(cardId) || flipped.includes(cardId)) return;
      onBeep("click");

      const next = [...flipped, cardId];
      setFlipped(next);

      if (next.length === 2) {
        setLocked(true);
        const [a, b] = next;
        const cardA = cards.find((c) => c.id === a)!;
        const cardB = cards.find((c) => c.id === b)!;

        if (cardA.pairId === cardB.pairId) {
          // Match!
          timeoutRef.current = window.setTimeout(() => {
            onBeep("success");
            setMatched((prev) => {
              const s = new Set(prev);
              s.add(a);
              s.add(b);
              return s;
            });
            setLastMatchMsg(cardA.matchMsg);
            setFlipped([]);
            setLocked(false);
          }, 500);
        } else {
          // No match
          timeoutRef.current = window.setTimeout(() => {
            onBeep("error");
            setFlipped([]);
            setLocked(false);
          }, 800);
        }
      }
    },
    [cards, flipped, locked, matched, onBeep],
  );

  const isFlipped = (id: number) => flipped.includes(id) || matched.has(id);

  return (
    <div className="w-full flex flex-col items-center gap-4 animate-glitch-fade">
      <h2 className="font-display text-xs sm:text-sm neon-text-cyan leading-relaxed text-center">
        MEMÓRIA AFETIVA — DESBLOQUEIO
      </h2>

      <p className="font-display text-xs neon-text-pink">
        Pares: {matchedPairs}/{PAIRS.length}
      </p>

      {/* Card Grid */}
      <div
        className="w-full max-w-md grid gap-2 sm:gap-3"
        style={{
          gridTemplateColumns: "repeat(4, 1fr)",
        }}
      >
        {cards.map((card) => {
          const flippedState = isFlipped(card.id);
          return (
            <button
              key={card.id}
              type="button"
              onClick={() => handleClick(card.id)}
              disabled={locked && !flippedState}
              className="aspect-square cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--neon-cyan)]"
              style={{ perspective: "600px" }}
              aria-label={flippedState ? `${card.emoji} ${card.label}` : "Carta virada"}
            >
              <div
                className="relative w-full h-full transition-transform duration-500"
                style={{
                  transformStyle: "preserve-3d",
                  transform: flippedState ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
              >
                {/* Card Back */}
                <div
                  className="absolute inset-0 flex items-center justify-center rounded-lg border-2 border-[var(--neon-cyan)] bg-[var(--neon-surface)]"
                  style={{
                    backfaceVisibility: "hidden",
                    boxShadow: "0 0 10px oklch(0.86 0.19 200 / 0.3)",
                  }}
                >
                  <span className="text-2xl sm:text-3xl select-none">❓</span>
                </div>
                {/* Card Front */}
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center gap-1 rounded-lg border-2 border-[var(--neon-pink)] bg-[var(--neon-surface)]"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                    boxShadow: matched.has(card.id)
                      ? "0 0 18px oklch(0.72 0.32 330 / 0.5)"
                      : "0 0 10px oklch(0.72 0.32 330 / 0.3)",
                  }}
                >
                  <span className="text-2xl sm:text-3xl select-none">{card.emoji}</span>
                  <span className="font-display text-[8px] sm:text-[9px] text-[var(--neon-pink)] uppercase tracking-wider text-center">
                    {card.label}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Last match message */}
      {lastMatchMsg && !allDone && (
        <CyberTextBox accent="pink">
          <p className="text-sm text-[var(--neon-pink)] italic">{lastMatchMsg}</p>
        </CyberTextBox>
      )}

      {/* Victory state */}
      {allDone && (
        <>
          <CyberTextBox accent="cyan">
            <p className="text-sm neon-text-cyan leading-relaxed">
              &gt; todas as memórias desbloqueadas. cada uma é um pedaço de nós. ❤
            </p>
          </CyberTextBox>
          <NeonButton
            variant="cyan"
            onClick={() => {
              onBeep("success");
              onNext();
            }}
          >
            [ AVANÇAR PARA PRÓXIMA FASE ]
          </NeonButton>
        </>
      )}
    </div>
  );
}
