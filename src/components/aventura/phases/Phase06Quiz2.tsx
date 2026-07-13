import { useState } from "react";
import { CyberInput } from "../CyberInput";
import { CyberTextBox } from "../CyberTextBox";
import { NeonButton } from "../NeonButton";
import { MEETING_ANSWERS } from "@/lib/aventura/content";
import { normalize } from "@/lib/aventura/normalize";

export function Phase06Quiz2({ onNext, onBeep }: { onNext: () => void; onBeep: (k: "success" | "error") => void }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

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
        <p>&gt; Onde foi o cenário do nosso primeiro encontro? (uma palavra basta, meu amor)</p>
      </CyberTextBox>


      <div className={shake ? "w-full animate-neon-shake" : "w-full"}>
        <CyberInput
          aria-label="Local do primeiro encontro"
          placeholder="Digite aqui..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoComplete="off"
        />
      </div>

      <NeonButton type="submit" variant="cyan">
        [ ENVIAR ]
      </NeonButton>

      {error && (
        <p role="alert" aria-live="polite" className="text-[var(--neon-pink)] font-terminal text-lg">
          &gt; hmmm... vamos exercitar essa memória, moça! dica: tinha vitrine, tinha praça de alimentação, e tinha um cara nervoso te esperando 😅
        </p>
      )}
    </form>
  );
}
