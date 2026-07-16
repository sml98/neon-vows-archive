import { useCallback, useState } from "react";
import { CyberTextBox } from "../CyberTextBox";
import { NeonButton } from "../NeonButton";

interface Props {
  onNext: () => void;
  onBeep: (k: "click" | "success" | "error") => void;
}

const SECRET = [0, 9, 1, 0] as const;

/**
 * A single retro-LCD dial that cycles 0-9 with ▲/▼ buttons.
 */
function Dial({
  value,
  correct,
  locked,
  onChange,
  onBeep,
}: {
  value: number;
  correct: boolean;
  locked: boolean;
  onChange: (v: number) => void;
  onBeep: (k: "click") => void;
}) {
  const spin = (dir: 1 | -1) => {
    if (locked) return;
    onBeep("click");
    onChange((value + dir + 10) % 10);
  };

  return (
    <div className="flex flex-col items-center gap-1">
      {/* Up button */}
      <button
        type="button"
        aria-label="Incrementar"
        disabled={locked}
        onClick={() => spin(1)}
        className="w-12 h-8 sm:w-14 sm:h-9 flex items-center justify-center
                   text-[var(--neon-cyan)] border border-[var(--neon-cyan)]/40
                   bg-black/60 hover:bg-[var(--neon-cyan)]/10
                   active:bg-[var(--neon-cyan)]/20 transition-colors
                   disabled:opacity-30 disabled:cursor-not-allowed
                   font-display text-sm sm:text-base select-none"
      >
        ▲
      </button>

      {/* Digit display */}
      <div
        className="relative w-14 h-16 sm:w-16 sm:h-20 flex items-center justify-center
                    border-2 bg-black/80 transition-all duration-500"
        style={{
          borderColor: correct
            ? "var(--neon-cyan)"
            : "oklch(0.4 0 0 / 0.6)",
          boxShadow: correct
            ? "0 0 12px var(--neon-cyan), inset 0 0 8px oklch(0.86 0.19 200 / 0.15)"
            : "inset 0 0 6px oklch(0 0 0 / 0.5)",
          borderRadius: "6px",
        }}
      >
        {/* Scanline overlay for retro LCD feel */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, transparent 0 2px, oklch(0 0 0 / 0.4) 2px 3px)",
            borderRadius: "4px",
          }}
        />
        <span
          className="relative z-10 font-display text-3xl sm:text-4xl tabular-nums transition-all duration-300"
          style={{
            color: correct ? "var(--neon-cyan)" : "var(--neon-pink)",
            textShadow: correct
              ? "0 0 10px var(--neon-cyan), 0 0 20px var(--neon-cyan)"
              : "0 0 8px var(--neon-pink)",
          }}
        >
          {value}
        </span>
      </div>

      {/* Down button */}
      <button
        type="button"
        aria-label="Decrementar"
        disabled={locked}
        onClick={() => spin(-1)}
        className="w-12 h-8 sm:w-14 sm:h-9 flex items-center justify-center
                   text-[var(--neon-cyan)] border border-[var(--neon-cyan)]/40
                   bg-black/60 hover:bg-[var(--neon-cyan)]/10
                   active:bg-[var(--neon-cyan)]/20 transition-colors
                   disabled:opacity-30 disabled:cursor-not-allowed
                   font-display text-sm sm:text-base select-none"
      >
        ▼
      </button>
    </div>
  );
}

type Stage = "cracking" | "opened";

export function Phase12SafeCracker({ onNext, onBeep }: Props) {
  const [digits, setDigits] = useState([0, 0, 0, 0]);
  const [stage, setStage] = useState<Stage>("cracking");
  const [attempts, setAttempts] = useState(0);
  const [shaking, setShaking] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [vaultOpening, setVaultOpening] = useState(false);

  const isCorrect = digits.every((d, i) => d === SECRET[i]);

  const updateDigit = useCallback(
    (index: number, value: number) => {
      setDigits((prev) => {
        const next = [...prev];
        next[index] = value;
        return next;
      });
    },
    [],
  );

  const handleSubmit = () => {
    if (stage !== "cracking") return;

    if (isCorrect) {
      // Victory!
      onBeep("success");
      setErrorMsg(null);
      setVaultOpening(true);

      // Wait for vault animation then show message
      setTimeout(() => {
        setStage("opened");
      }, 1200);
    } else {
      // Failure
      onBeep("error");
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      setShaking(true);

      if (newAttempts >= 4) {
        setErrorMsg(
          "> dica final: pensa no dia e no mês que a gente começou, Bombom. 😉",
        );
      } else if (newAttempts >= 2) {
        setErrorMsg(
          "> pista: são 4 números que marcam o início de tudo...",
        );
      } else {
        setErrorMsg(
          "> combinação incorreta. o que esses números significam pra nós?",
        );
      }

      setTimeout(() => setShaking(false), 600);
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-5">
      <h2 className="font-display text-xs sm:text-sm neon-text-pink leading-relaxed tracking-wider text-center">
        COFRE SECRETO — NÍVEL MÁXIMO
      </h2>

      <CyberTextBox accent="cyan">
        <p className="text-left font-terminal text-xs sm:text-sm">
          &gt; Esse cofre guarda o meu segredo mais bem protegido.
          <br />
          &gt; Decifre a chave temporal de 4 dígitos [A][B][C][D]:
          <br />
          &gt; - [A]: Dezena do dia em que começamos.
          <br />
          &gt; - [B]: Unidade do dia em que começamos.
          <br />
          &gt; - [C]: Dezena do mês em que começamos.
          <br />
          &gt; - [D]: Unidade do mês em que começamos.
          <br />
          &gt; Nenhum brute-force vai funcionar aqui… só o nosso amor. 💜
        </p>
      </CyberTextBox>

      {/* ─── Vault Door ─── */}
      <div
        className="relative flex items-center justify-center"
        style={{
          width: "min(320px, 90vw)",
          height: "min(320px, 90vw)",
        }}
      >
        {/* Vault opening animation wrapper */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-all"
          style={{
            transform: vaultOpening ? "scale(1.1)" : "scale(1)",
            opacity: vaultOpening ? 0 : 1,
            transitionDuration: "1.2s",
            transitionTimingFunction: "ease-in-out",
          }}
        >
          {/* Outer ring */}
          <div
            className="absolute rounded-full"
            style={{
              width: "100%",
              height: "100%",
              border: "3px solid var(--neon-cyan)",
              boxShadow:
                "0 0 20px var(--neon-cyan), inset 0 0 20px oklch(0.86 0.19 200 / 0.1)",
              background:
                "radial-gradient(circle, oklch(0.15 0 0) 40%, oklch(0.08 0 0) 100%)",
            }}
          />

          {/* Middle ring */}
          <div
            className="absolute rounded-full"
            style={{
              width: "85%",
              height: "85%",
              border: "2px solid var(--neon-pink)",
              boxShadow: "0 0 12px var(--neon-pink)",
              opacity: 0.6,
            }}
          />

          {/* Inner ring */}
          <div
            className="absolute rounded-full"
            style={{
              width: "70%",
              height: "70%",
              border: "1px solid var(--neon-cyan)",
              boxShadow: "0 0 8px var(--neon-cyan)",
              opacity: 0.3,
            }}
          />

          {/* Handle (horizontal bar) */}
          <div
            className="absolute"
            style={{
              width: "35%",
              height: "4px",
              background: "var(--neon-cyan)",
              boxShadow: "0 0 8px var(--neon-cyan)",
              top: "25%",
              left: "50%",
              transform: "translateX(-50%)",
              borderRadius: "2px",
              opacity: 0.5,
            }}
          />
          <div
            className="absolute"
            style={{
              width: "4px",
              height: "35%",
              background: "var(--neon-cyan)",
              boxShadow: "0 0 8px var(--neon-cyan)",
              top: "10%",
              left: "50%",
              transform: "translateX(-50%)",
              borderRadius: "2px",
              opacity: 0.5,
            }}
          />

          {/* Dials container (centered) */}
          <div
            className={`relative z-10 flex items-center gap-2 sm:gap-3 ${shaking ? "animate-shake" : ""}`}
          >
            {digits.map((d, i) => (
              <Dial
                key={i}
                value={d}
                correct={d === SECRET[i]}
                locked={stage === "opened"}
                onChange={(v) => updateDigit(i, v)}
                onBeep={onBeep}
              />
            ))}
          </div>
        </div>

        {/* Vault opened overlay (appears when vault opens) */}
        {stage === "opened" && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              animation: "fadeInScale 0.8s ease-out forwards",
            }}
          >
            <div
              className="text-6xl sm:text-8xl"
              style={{
                textShadow: "0 0 30px var(--neon-pink), 0 0 60px var(--neon-pink)",
              }}
            >
              ❤
            </div>
          </div>
        )}
      </div>

      {/* ─── Submit button ─── */}
      {stage === "cracking" && !vaultOpening && (
        <NeonButton variant="pink" onClick={handleSubmit}>
          [ ABRIR COFRE ]
        </NeonButton>
      )}

      {/* ─── Error / hint message ─── */}
      {errorMsg && stage === "cracking" && (
        <CyberTextBox accent="pink">
          <p className="text-[var(--neon-pink)] leading-relaxed">{errorMsg}</p>
        </CyberTextBox>
      )}

      {/* ─── Success message ─── */}
      {stage === "opened" && (
        <>
          <CyberTextBox accent="pink">
            <p className="text-[var(--neon-pink)] leading-relaxed">
              &gt; cofre aberto! dentro havia o que eu mais protejo no mundo: o
              meu amor por você, Bombom. guardado a sete chaves, mas sempre
              seu. ❤
            </p>
          </CyberTextBox>
          <NeonButton
            variant="cyan"
            onClick={() => {
              onBeep("success");
              onNext();
            }}
          >
            [ AVANÇAR ]
          </NeonButton>
        </>
      )}

      {/* ─── Inline keyframe + shake animation ─── */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-6px); }
          20%, 40%, 60%, 80% { transform: translateX(6px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.3);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
