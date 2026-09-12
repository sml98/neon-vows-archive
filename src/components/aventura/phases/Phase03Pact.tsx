import { useState } from "react";
import { CyberTextBox } from "../CyberTextBox";
import { NeonButton } from "../NeonButton";
import { EXPERIENCE } from "@/lib/aventura/experience";

type Choice = "aceitar" | "clausulas" | "negociar";

interface Props {
  onNext: () => void;
  onBeep: (k: "click" | "success") => void;
  gift?: "chocolate" | "flor" | "both" | null;
}

export function Phase03Pact({ onNext, onBeep, gift }: Props) {
  const [choice, setChoice] = useState<Choice | null>(null);

  const pick = (c: Choice) => {
    setChoice(c);
    onBeep(c === "clausulas" ? "success" : "click");
  };

  const getResponseText = (c: Choice) => {
    switch (c) {
      case "aceitar":
        if (gift === "both" || !gift) {
          return "> EULA assinada com sucesso! O sistema registra: dupla oficial de co-op vitalício confirmada. Buffs de Chocolate e Flor ativados no nível máximo. ❤";
        }
        if (gift === "flor") {
          return "> Contrato assinado! A flor foi registrada como Item Lendário de proteção. Seu amor eterno foi salvo na nuvem com sucesso! ❤";
        }
        return `> Licença aceita! O chocolate físico trouxe a chave secreta: ${EXPERIENCE.gift.favoriteFruit}, sua fruta preferida. Poção de Cura +100% HP catalogada. ❤`;

      case "clausulas":
        return "> CLÁUSULA EXTRA DE BEIJOS DETECTADA: Fica estabelecida a cobrança diária de no mínimo 10 beijos na testa e cafuné ilimitado. Easter egg desbloqueado! (Você aceitou sem ler kkk). ❤";

      case "negociar":
        return "> NEGOCIAÇÃO INICIADA: Você tenta barganhar mais cafuné e eu aceito imediatamente (sem surpresas aqui, você sempre ganha as negociações kkk). ❤";
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <h2 className="font-display text-xs sm:text-sm neon-text-pink leading-relaxed text-center">
        CO-OP PROTOCOL — CONTRATO DE LICENÇA (EULA)
      </h2>

      <CyberTextBox accent="cyan">
        <p className="text-left text-xs leading-relaxed font-terminal">
          &gt; Para prosseguir, o sistema exige a assinatura do Contrato de Co-op Vitalício. Leia os
          termos abaixo:
        </p>
      </CyberTextBox>

      {/* Retro EULA Box */}
      <div
        className="w-full max-h-48 overflow-y-auto border-2 border-[var(--neon-cyan)] bg-black/80 p-3 text-left font-terminal text-[10px] sm:text-xs leading-relaxed text-white/90 shadow-[inset_0_0_10px_rgba(6,182,212,0.2)]"
        style={{ scrollbarWidth: "thin" }}
      >
        <p className="font-bold text-[var(--neon-cyan)] mb-2 font-display uppercase tracking-widest text-center">
          ★ TERMOS DE RELACIONAMENTO CO-OP ★
        </p>
        <p className="mb-2">
          <span className="text-[var(--neon-pink)] font-bold">CLÁUSULA 1:</span> Você concorda em
          ser o meu save point oficial, garantindo cafuné e cura de HP sempre que o sistema estiver
          instável.
        </p>
        {(gift === "chocolate" || gift === "both" || !gift) && (
          <p className="mb-2">
            <span className="text-[var(--neon-pink)] font-bold">CLÁUSULA 2:</span> O chocolate
            físico recebido concede Buff de Felicidade de +100%. A cereja não está ali por acaso: é
            a fruta preferida da Player 2 e a pista que conecta o presente a esta aventura.
          </p>
        )}
        {(gift === "flor" || gift === "both" || !gift) && (
          <p className="mb-2">
            <span className="text-[var(--neon-pink)] font-bold">CLÁUSULA 3:</span> A flor física é
            declarada como um "Artefato Lendário Nível 99", devendo ser cultivada com carinho para
            aumentar o escudo de amor eterno.
          </p>
        )}
        <p>
          <span className="text-[var(--neon-pink)] font-bold">CLÁUSULA 4:</span> Ambas as partes
          concordam que bugs, chatices e ciúmes bobos serão resolvidos com abraços apertados, sem
          necessidade de patch de correção.
        </p>
      </div>

      {!choice ? (
        <div className="flex flex-col gap-3 w-full">
          <NeonButton variant="cyan" onClick={() => pick("aceitar")}>
            &gt; ACEITAR E ASSINAR
          </NeonButton>
          <NeonButton variant="pink" onClick={() => pick("clausulas")}>
            &gt; VER CLÁUSULAS EXTRA
          </NeonButton>
          <NeonButton variant="pink" onClick={() => pick("negociar")}>
            &gt; NEGOCIAR TERMOS
          </NeonButton>
        </div>
      ) : (
        <div className="w-full flex flex-col gap-3">
          <CyberTextBox accent="pink">
            <p className="text-[var(--neon-pink)] text-xs sm:text-sm leading-relaxed text-left font-terminal">
              {getResponseText(choice)}
            </p>
          </CyberTextBox>
          <NeonButton
            variant="cyan"
            onClick={() => {
              onBeep("success");
              onNext();
            }}
          >
            [ INICIAR JORNADA CONJUNTA ]
          </NeonButton>
        </div>
      )}
    </div>
  );
}
