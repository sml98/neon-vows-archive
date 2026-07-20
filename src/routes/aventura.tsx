import { createFileRoute } from "@tanstack/react-router";
import { AventuraShell } from "@/components/aventura/AventuraShell";
import { PhaseTransition } from "@/components/aventura/PhaseTransition";
import { useAventuraController } from "@/hooks/useAventuraController";
import { getPhaseComponent } from "@/lib/aventura/phaseRegistry";
import type { PhaseId } from "@/lib/aventura/useAventuraState";

export const Route = createFileRoute("/aventura")({
  head: () => ({
    meta: [
      { title: "Aventura Neon — uma jornada 8-bit" },
      {
        name: "description",
        content:
          "Uma jornada interativa em pixel-art neon: 16 fases, enigmas e mensagens escondidas.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AventuraPage,
});

/**
 * Página principal da aventura
 * Utiliza o registry de fases e controller centralizado
 */
function AventuraPage() {
  const { phase, achievements, gift, muted, toggleMute, advance, beep, playFreq } =
    useAventuraController();

  const PhaseComponent = getPhaseComponent(phase as PhaseId);

  if (!PhaseComponent) {
    return (
      <AventuraShell muted={muted} onToggleMute={toggleMute} gift={gift}>
        <div className="text-center text-red-500">
          <p>❌ Fase não encontrada: {phase}</p>
        </div>
      </AventuraShell>
    );
  }

  return (
    <AventuraShell muted={muted} onToggleMute={toggleMute} gift={gift}>
      <PhaseTransition keyId={phase}>
        <PhaseComponent
          onNext={() => advance(phase as PhaseId, ((phase + 1) as PhaseId))}
          onSolved={() => advance(phase as PhaseId, ((phase + 1) as PhaseId))}
          onBeep={beep}
          playFreq={playFreq}
          gift={gift}
          achievements={achievements}
        />
      </PhaseTransition>
    </AventuraShell>
  );
}
