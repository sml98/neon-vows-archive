import { useState } from "react";
import { CyberInput } from "../CyberInput";
import { CyberTextBox } from "../CyberTextBox";
import { NeonButton } from "../NeonButton";
import { PASSWORD_ANSWERS, PASSWORD_HINT_FRAGMENTS } from "@/lib/aventura/content";
import { normalize } from "@/lib/aventura/normalize";
import { EXPERIENCE } from "@/lib/aventura/experience";

interface Props {
  onSolved: () => void;
  onBeep: (kind: "click" | "error" | "success") => void;
  gift?: "chocolate" | "flor" | "both" | null;
}

const MAX_HP = 3;

export function Phase01Password({ onSolved, onBeep, gift }: Props) {
  const [value, setValue] = useState("");
  const [hp, setHp] = useState(MAX_HP);
  const [errors, setErrors] = useState(0);
  const [shake, setShake] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const cluesShown = errors; // 0..3

  const handleKeypadPress = (char: string) => {
    if (message) return;
    onBeep("click");
    if (char === "DEL") {
      setValue((prev) => prev.slice(0, -1));
    } else {
      if (value.length < 10) {
        setValue((prev) => prev + char);
      }
    }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = PASSWORD_ANSWERS.some((a) => normalize(a) === normalize(value));
    if (ok) {
      onBeep("success");
      setMessage(
        "> acesso liberado. Mas, para ser sincero, meu coração reconheceu você antes mesmo da senha. ❤",
      );
      window.setTimeout(onSolved, 3000);
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
          &gt; SISTEMA CARREGANDO...
          <br />
          &gt; presença detectada... {EXPERIENCE.playerTwo.nickname} reconhecida.
          <br />
          {(gift === "chocolate" || gift === "both") && (
            <>
              &gt; artefato detectado: chocolate com {EXPERIENCE.gift.favoriteFruit}, sua fruta
              preferida.
              <br />
            </>
          )}
          &gt; arquivo carregado: diversão romântica, memórias e algumas decisões questionáveis.
          <br />
          &gt; nível de amor: ACIMA DO MÁXIMO PERMITIDO.
          <br />
          &gt; para entrar, digite a data em que a nossa história saiu da tela e começou de verdade.
        </p>
      </CyberTextBox>

      {/* HP hearts */}
      <div
        className="flex items-center gap-2 font-display text-xs"
        aria-label={`tentativas restantes: ${hp}`}
      >
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
          aria-label="Código secreto"
          placeholder="_ _ _ _ _ _"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoComplete="off"
          inputMode="numeric"
          className="text-center font-display tracking-widest text-lg"
          readOnly
        />
      </div>

      {/* Retro Hacking Keypad */}
      {!message && (
        <div className="grid grid-cols-3 gap-2 w-full max-w-[260px] my-2">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9", "/", "0", "DEL"].map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => handleKeypadPress(k)}
              className="border-2 border-[var(--neon-cyan)] text-[var(--neon-cyan)] bg-black/60 font-display text-xs p-3 hover:bg-[var(--neon-cyan)]/20 active:scale-95 transition-all"
              style={{ boxShadow: "0 0 6px oklch(0.86 0.19 200 / 0.3)" }}
            >
              {k === "DEL" ? "⌫" : k}
            </button>
          ))}
        </div>
      )}

      {cluesShown > 0 && (
        <CyberTextBox accent="pink">
          <div className="space-y-1 italic text-xs">
            {PASSWORD_HINT_FRAGMENTS.slice(0, cluesShown).map((frag, i) => (
              <p key={i} className="text-[var(--neon-pink)]">
                {frag}
              </p>
            ))}
          </div>
        </CyberTextBox>
      )}

      {message ? (
        <p role="status" aria-live="polite" className="font-terminal text-lg neon-text-cyan">
          {message}
        </p>
      ) : (
        <NeonButton type="submit" variant="cyan">
          [ UNLOCK TERMINAL ]
        </NeonButton>
      )}
    </form>
  );
}
