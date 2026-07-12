import { useState } from "react";
import { CyberTextBox } from "../CyberTextBox";
import { NeonButton } from "../NeonButton";
import { BODY_PART_MESSAGES, BODY_PART_TRUTH, type BodyPart } from "@/lib/aventura/content";

const PARTS: { id: BodyPart; label: string; span?: boolean }[] = [
  { id: "cabelo", label: "CABELO" },
  { id: "olhos", label: "OLHOS" },
  { id: "estilo", label: "ESTILO" },
  { id: "curvas", label: "CURVAS" },
  { id: "boca", label: "BOCA", span: true },
];

export function Phase07BodyParts({ onNext, onBeep }: { onNext: () => void; onBeep: (k: "click" | "success") => void }) {
  const [selected, setSelected] = useState<BodyPart | null>(null);
  const [truthShown, setTruthShown] = useState(false);

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <h2 className="font-display text-xs sm:text-sm neon-text-pink leading-relaxed">
        ANÁLISE DE ATRAÇÃO (3/3)
      </h2>
      <CyberTextBox accent="cyan">
        <p>&gt; Qual é a parte que eu mais gosto em você?</p>
      </CyberTextBox>

      <div className="grid grid-cols-2 gap-3 w-full">
        {PARTS.map((p) => (
          <div key={p.id} className={p.span ? "col-span-2" : ""}>
            <NeonButton
              variant="pink"
              onClick={() => {
                onBeep("click");
                setSelected(p.id);
                setTruthShown(false);
              }}
            >
              {p.label}
            </NeonButton>
          </div>
        ))}
      </div>

      {selected && (
        <CyberTextBox accent="pink">
          <p className="text-[var(--neon-pink)] leading-relaxed">
            {truthShown ? BODY_PART_TRUTH : BODY_PART_MESSAGES[selected]}
          </p>
        </CyberTextBox>
      )}

      {selected && !truthShown && (
        <NeonButton
          variant="cyan"
          onClick={() => {
            onBeep("click");
            setTruthShown(true);
          }}
        >
          [ VER A VERDADE ]
        </NeonButton>
      )}

      {selected && truthShown && (
        <NeonButton
          variant="cyan"
          onClick={() => {
            onBeep("success");
            onNext();
          }}
        >
          [ AVANÇAR ]
        </NeonButton>
      )}
    </div>
  );
}
