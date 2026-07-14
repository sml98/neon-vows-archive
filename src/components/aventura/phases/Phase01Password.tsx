import { useState } from "react";
import { CyberInput } from "../CyberInput";
import { CyberTextBox } from "../CyberTextBox";
import { NeonButton } from "../NeonButton";
import { PASSWORD_ANSWERS, PASSWORD_HINT_FRAGMENTS } from "@/lib/aventura/content";
import { normalize } from "@/lib/aventura/normalize";

interface Props {
  onSolved: () => void;
  onBeep: (kind: "click" | "error" | "success") => void;
}

const MAX_HP = 3;

export function Phase01Password({ onSolved, onBeep }: Props) {
  const [value, setValue] = useState("");
  const [hp, setHp] = useState(MAX_HP);
  const [errors, setErrors] = useState(0);
  const [shake, setShake] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const cluesShown = errors; // 0..3

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = PASSWORD_ANSWERS.some((a) => normalize(a) === normalize(value));
    if (ok) {
      onBeep("success");
      setMessage("> senha aceita... mas eu já sabia que era você desde o primeiro pixel. ❤");
      window.setTimeout(onSolved, 1200);
    } else {
      const nextErrors = Math.min(MAX_HP, errors + 1);
      setErrors(nextErrors);
      setHp(Math.max(0, MAX_HP - nextErrors));
      setShake(true);
      onBeep("error");
      window.setTimeout(() => setShake(false), 400);
    }
  };

  return (
    <form onSubmit={submit} className="w-full flex flex-col items-center gap-4">
      <h1 className="font-display text-sm sm:text-base neon-text-pink leading-relaxed">
        SYSTEM OVERRIDE REQUIRED
      </h1>

      <CyberTextBox accent="cyan">
        <p>
          &gt; acesso restrito: apenas Camila.
          <br />
          &gt; insira o código temporal (DD/MM/AA) pra desbloquear a próxima fase.
        </p>
      </CyberTextBox>

      {/* HP hearts */}
      <div className="flex items-center gap-2 font-display text-xs" aria-label={`tentativas restantes: ${hp}`}>
        <span className="neon-text-cyan">HP:</span>
        {Array.from({ length: MAX_HP }).map((_, i) => (
          <span
            key={i}
            className={i < hp ? "text-[var(--neon-pink)]" : "text-white/20 line-through"}
          >
            ❤
          </span>
        ))}
      </div>

      <div className={shake ? "w-full animate-neon-shake" : "w-full"}>
        <CyberInput
          aria-label="Código temporal (DD/MM/AA)"
          placeholder="DD/MM/AA"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoComplete="off"
          inputMode="numeric"
        />
      </div>

      {cluesShown > 0 && (
        <CyberTextBox accent="pink">
          <div className="space-y-1 italic">
            {PASSWORD_HINT_FRAGMENTS.slice(0, cluesShown).map((frag, i) => (
              <p key={i} className="text-[var(--neon-pink)]">{frag}</p>
            ))}
          </div>
        </CyberTextBox>
      )}

      {message ? (
        <p role="status" aria-live="polite" className="font-terminal text-lg neon-text-cyan">
          {message}
        </p>
      ) : (
        <NeonButton type="submit" variant="cyan" onClick={() => onBeep("click")}>
          [ UNLOCK TERMINAL ]
        </NeonButton>
      )}
    </form>
  );
}
