import { useState } from "react";
import { CyberInput } from "../CyberInput";
import { CyberTextBox } from "../CyberTextBox";
import { NeonButton } from "../NeonButton";
import { PASSWORD_ANSWERS } from "@/lib/aventura/content";
import { normalize } from "@/lib/aventura/normalize";

interface Props {
  onSolved: () => void;
  onBeep: (kind: "click" | "error" | "success") => void;
}

export function Phase01Password({ onSolved, onBeep }: Props) {
  const [value, setValue] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = PASSWORD_ANSWERS.some((a) => normalize(a) === normalize(value));
    if (ok) {
      setError(false);
      onBeep("success");
      onSolved();
    } else {
      setError(true);
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
          &gt; Acesso restrito: apenas Camila.
          <br />
          &gt; Insira o código temporal pra desbloquear a nossa próxima fase:
        </p>
      </CyberTextBox>


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

      {error && (
        <p role="alert" className="text-red-400 font-terminal text-lg">
          ERRO: ACESSO NEGADO.
        </p>
      )}

      <button
        type="button"
        onClick={() => setShowHint((v) => !v)}
        className="text-sm text-[var(--neon-cyan)] hover:text-[var(--neon-pink)] underline underline-offset-4 min-h-9"
      >
        [ {showHint ? "OCULTAR DICA" : "ACCESS HINT"} ]
      </button>

      {showHint && (
        <CyberTextBox accent="pink">
          <p className="italic text-[var(--neon-pink)]">
            "O dia em que apertei START na melhor coop da minha vida... foi com você."
          </p>
        </CyberTextBox>
      )}


      <NeonButton type="submit" variant="cyan" onClick={() => onBeep("click")}>
        [ UNLOCK TERMINAL ]
      </NeonButton>
    </form>
  );
}
