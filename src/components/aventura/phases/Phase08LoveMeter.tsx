import { useState } from "react";
import { CyberTextBox } from "../CyberTextBox";
import { NeonButton } from "../NeonButton";
import {
  BODY_PART_MESSAGES,
  BODY_PART_TRUTH,
  SAMUKA_SELF_OPTIONS,
  type BodyPart,
} from "@/lib/aventura/content";
import coupleSmile from "@/assets/couple-smile.png.asset.json";

const PARTS: { id: BodyPart; label: string; span?: boolean }[] = [
  { id: "cabelo", label: "CABELO" },
  { id: "olhos", label: "OLHOS" },
  { id: "estilo", label: "ESTILO" },
  { id: "curvas", label: "CURVAS" },
  { id: "boca", label: "BOCA", span: true },
];

interface Props {
  onNext: () => void;
  onBeep: (k: "click" | "success") => void;
}

type Stage = "pick" | "revealed" | "truth" | "bonus" | "done";

export function Phase08LoveMeter({ onNext, onBeep }: Props) {
  const [selected, setSelected] = useState<BodyPart | null>(null);
  const [stage, setStage] = useState<Stage>("pick");
  const [bonusMsg, setBonusMsg] = useState<string | null>(null);

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <h2 className="font-display text-xs sm:text-sm neon-text-pink leading-relaxed">
        ANÁLISE DE ATRAÇÃO (3/3)
      </h2>
      <CyberTextBox accent="cyan">
        <p>
          &gt; escolhe uma parte sua que você acha que eu mais amo.
          <br />
          &gt; te conto um segredo depois. 👀
        </p>
      </CyberTextBox>

      <div className="grid grid-cols-2 gap-3 w-full">
        {PARTS.map((p) => {
          const isSel = selected === p.id;
          return (
            <div key={p.id} className={p.span ? "col-span-2" : ""}>
              <NeonButton
                variant={isSel ? "cyan" : "pink"}
                onClick={() => {
                  onBeep("click");
                  setSelected(p.id);
                  setStage("revealed");
                }}
                disabled={stage === "bonus" || stage === "done"}
              >
                {p.label}
              </NeonButton>
            </div>
          );
        })}
      </div>

      {selected && stage === "revealed" && (
        <>
          <CyberTextBox accent="pink">
            <p className="text-[var(--neon-pink)] leading-relaxed">
              {BODY_PART_MESSAGES[selected]}
            </p>
          </CyberTextBox>
          <NeonButton
            variant="cyan"
            onClick={() => {
              onBeep("click");
              setStage("truth");
            }}
          >
            [ VER A VERDADE ]
          </NeonButton>
        </>
      )}

      {stage === "truth" && (
        <>
          <div className="relative w-full border-2 border-[var(--neon-cyan)] shadow-[var(--shadow-neon-cyan)] overflow-hidden">
            <img
              src={coupleSmile.url}
              alt="Nós dois, em pixel art"
              className="block w-full h-auto"
              style={{ imageRendering: "pixelated" }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to bottom, transparent 0 3px, oklch(0 0 0 / 0.28) 3px 4px)",
              }}
            />
          </div>
          <CyberTextBox accent="pink">
            <p className="text-[var(--neon-pink)] leading-relaxed">{BODY_PART_TRUTH}</p>
          </CyberTextBox>
          <NeonButton
            variant="cyan"
            onClick={() => {
              onBeep("click");
              setStage("bonus");
            }}
          >
            [ BÔNUS: E EU? ]
          </NeonButton>
        </>
      )}

      {stage === "bonus" && (
        <>
          <CyberTextBox accent="cyan">
            <p>&gt; e agora: o que VOCÊ acha que EU mais gosto em mim mesmo? kkk</p>
          </CyberTextBox>
          <div className="grid grid-cols-1 gap-3 w-full">
            {SAMUKA_SELF_OPTIONS.map((o) => (
              <NeonButton
                key={o.id}
                variant="pink"
                onClick={() => {
                  onBeep("click");
                  setBonusMsg(o.msg);
                  setStage("done");
                }}
              >
                {o.label}
              </NeonButton>
            ))}
          </div>
        </>
      )}

      {stage === "done" && bonusMsg && (
        <>
          <CyberTextBox accent="pink">
            <p className="text-[var(--neon-pink)]">{bonusMsg}</p>
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
    </div>
  );
}
