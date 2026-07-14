import { useState } from "react";
import { CyberInput } from "../CyberInput";
import { CyberTextBox } from "../CyberTextBox";
import { NeonButton } from "../NeonButton";
import { MEETING_ANSWERS, MEETING_CLUES } from "@/lib/aventura/content";
import { normalize } from "@/lib/aventura/normalize";

interface Props {
  onNext: () => void;
  onBeep: (k: "success" | "error" | "click") => void;
}

export function Phase06Quiz2({ onNext, onBeep }: Props) {
  const [value, setValue] = useState("");
  const [cluesShown, setCluesShown] = useState(1);
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const revealNext = () => {
    if (cluesShown >= MEETING_CLUES.length) return;
    onBeep("click");
    setCluesShown((n) => n + 1);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = MEETING_ANSWERS.some((a) => normalize(value).includes(normalize(a)));
    if (ok) {
      onBeep("success");
      onNext();
    } else {
      setError(true);
      setShake(true);
      onBeep("error");
      window.setTimeout(() => setShake(false), 400);
    }
  };

  return (
    <form onSubmit={submit} className="w-full flex flex-col items-center gap-4">
      <h2 className="font-display text-xs sm:text-sm neon-text-pink leading-relaxed">
        VERIFICAÇÃO DE MEMÓRIA (2/3)
      </h2>
      <CyberTextBox accent="cyan">
        <p>&gt; decifre o cenário do nosso primeiro encontro. use as pistas se precisar.</p>
      </CyberTextBox>

      <CyberTextBox accent="pink">
        <div className="space-y-1">
          {MEETING_CLUES.slice(0, cluesShown).map((c, i) => (
            <p key={i} className="text-[var(--neon-pink)]">{c}</p>
          ))}
        </div>
      </CyberTextBox>

      {cluesShown < MEETING_CLUES.length && (
        <button
          type="button"
          onClick={revealNext}
          className="text-sm text-[var(--neon-cyan)] underline underline-offset-4 min-h-9"
        >
          [ próxima pista ({cluesShown}/{MEETING_CLUES.length}) ]
        </button>
      )}

      <div className={shake ? "w-full animate-neon-shake" : "w-full"}>
        <CyberInput
          aria-label="Local do primeiro encontro"
          placeholder="uma palavra basta..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoComplete="off"
        />
      </div>

      <NeonButton type="submit" variant="cyan">
        [ ENVIAR RESPOSTA ]
      </NeonButton>

      {error && (
        <p role="alert" aria-live="polite" className="text-[var(--neon-pink)] font-terminal text-lg">
          &gt; hmmm... não foi ali. tenta uma nova pista?
        </p>
      )}
    </form>
  );
}
