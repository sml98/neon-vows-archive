import { useMemo, useState } from "react";
import { CyberTextBox } from "../CyberTextBox";
import { NeonButton } from "../NeonButton";
import { SENTENCE_WORDS, SENTENCE_SUCCESS, SENTENCE_ERROR } from "@/lib/aventura/content";

function shuffle<T>(arr: readonly T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  // guarantee it's not identity
  if (a.every((v, i) => v === arr[i]) && a.length > 1) {
    [a[0], a[1]] = [a[1], a[0]];
  }
  return a;
}

interface Props {
  onSolved: () => void;
  onBeep: (k: "click" | "success" | "error") => void;
}

export function SentenceBuilder({ onSolved, onBeep }: Props) {
  const [pool, setPool] = useState<string[]>(() => shuffle(SENTENCE_WORDS));
  const [picked, setPicked] = useState<string[]>([]);
  const [errorFlash, setErrorFlash] = useState(false);
  const [solved, setSolved] = useState(false);

  const nextExpected = SENTENCE_WORDS[picked.length];

  const target = useMemo(() => SENTENCE_WORDS.join(" "), []);

  const pick = (word: string, idx: number) => {
    if (solved) return;
    if (word !== nextExpected) {
      onBeep("error");
      setErrorFlash(true);
      window.setTimeout(() => {
        setErrorFlash(false);
        setPool(shuffle(SENTENCE_WORDS));
        setPicked([]);
      }, 700);
      return;
    }
    onBeep("click");
    const nextPicked = [...picked, word];
    const nextPool = pool.filter((_, i) => i !== idx);
    setPicked(nextPicked);
    setPool(nextPool);
    if (nextPicked.length === SENTENCE_WORDS.length) {
      setSolved(true);
      onBeep("success");
    }
  };

  const reset = () => {
    onBeep("click");
    setPool(shuffle(SENTENCE_WORDS));
    setPicked([]);
  };

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <h2 className="font-display text-xs sm:text-sm neon-text-pink leading-relaxed">
        RECONSTRUÇÃO DE MENSAGEM
      </h2>
      <CyberTextBox accent="cyan">
        <p>
          &gt; um fragmento da minha memória se despedaçou.
          <br />
          &gt; toca as palavras na ordem certa pra reconstruir a frase.
        </p>
      </CyberTextBox>

      <div
        className={[
          "w-full min-h-14 border-2 p-3 bg-black/70 font-display text-xs sm:text-sm text-center leading-relaxed tracking-wider",
          errorFlash
            ? "border-red-400 text-red-400 animate-neon-shake"
            : "border-[var(--neon-cyan)] neon-text-cyan",
        ].join(" ")}
      >
        {picked.length === 0 ? (
          <span className="opacity-40">[ toque as palavras abaixo ]</span>
        ) : (
          picked.join(" ")
        )}
      </div>

      <div className="grid grid-cols-2 gap-2 w-full">
        {pool.map((w, i) => (
          <button
            key={`${w}-${i}`}
            type="button"
            onClick={() => pick(w, i)}
            disabled={solved}
            className="min-h-11 px-2 py-2 border-2 border-[var(--neon-pink)] text-[var(--neon-pink)] font-display text-[11px] sm:text-xs bg-black/60 shadow-[0_0_10px_var(--neon-pink)] active:scale-95 disabled:opacity-40"
          >
            {w}
          </button>
        ))}
      </div>

      {!solved && picked.length > 0 && (
        <button
          type="button"
          onClick={reset}
          className="text-sm text-[var(--neon-cyan)] underline underline-offset-4 min-h-9"
        >
          [ resetar ]
        </button>
      )}

      {solved && (
        <>
          <CyberTextBox accent="pink">
            <p className="text-[var(--neon-pink)]">
              <span className="neon-text-cyan">"{target}"</span>
              <br />
              <br />
              {SENTENCE_SUCCESS}
            </p>
          </CyberTextBox>
          <NeonButton variant="cyan" onClick={onSolved}>
            [ AVANÇAR ]
          </NeonButton>
        </>
      )}

      {errorFlash && !solved && (
        <p role="alert" className="font-terminal text-lg text-red-400">
          {SENTENCE_ERROR}
        </p>
      )}
    </div>
  );
}
