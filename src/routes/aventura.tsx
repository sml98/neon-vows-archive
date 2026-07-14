import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AventuraShell } from "@/components/aventura/AventuraShell";
import { PhaseTransition } from "@/components/aventura/PhaseTransition";
import { Phase01Password } from "@/components/aventura/phases/Phase01Password";
import { Phase02Chocolate } from "@/components/aventura/phases/Phase02Chocolate";
import { Phase03Pact } from "@/components/aventura/phases/Phase03Pact";
import { Phase04Hack } from "@/components/aventura/phases/Phase04Hack";
import { Phase05Quiz1 } from "@/components/aventura/phases/Phase05Quiz1";
import { Phase06Quiz2 } from "@/components/aventura/phases/Phase06Quiz2";
import { Phase07BodyParts } from "@/components/aventura/phases/Phase07BodyParts";
import { Phase08LoveMeter } from "@/components/aventura/phases/Phase08LoveMeter";
import { Phase09Poem } from "@/components/aventura/phases/Phase09Poem";
import { Phase10Finale } from "@/components/aventura/phases/Phase10Finale";
import { useAventuraState, type PhaseId } from "@/lib/aventura/useAventuraState";
import { useBeep } from "@/lib/aventura/useBeep";

export const Route = createFileRoute("/aventura")({
  head: () => ({
    meta: [
      { title: "Aventura Neon — uma jornada 8-bit" },
      {
        name: "description",
        content:
          "Uma jornada interativa em pixel-art neon: 10 fases, enigmas e mensagens escondidas.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AventuraPage,
});

function AventuraPage() {
  const { phase, goTo, achievements, unlock } = useAventuraState();
  const { beep, setMuted } = useBeep();
  const [muted, setMutedState] = useState(false);

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    setMutedState(next);
    if (!next) beep("click");
  };

  const advance = (from: PhaseId, to: PhaseId) => {
    unlock(from);
    goTo(to);
  };

  return (
    <AventuraShell muted={muted} onToggleMute={toggleMute}>
      <PhaseTransition keyId={phase}>
        {phase === 1 && <Phase01Password onSolved={() => advance(1, 2)} onBeep={beep} />}
        {phase === 2 && <Phase02Chocolate onNext={() => advance(2, 3)} onBeep={beep} />}
        {phase === 3 && <Phase03Pact onNext={() => advance(3, 4)} onBeep={beep} />}
        {phase === 4 && <Phase04Hack onNext={() => advance(4, 5)} onBeep={beep} />}
        {phase === 5 && <Phase05Quiz1 onNext={() => advance(5, 6)} onBeep={beep} />}
        {phase === 6 && <Phase06Quiz2 onNext={() => advance(6, 7)} onBeep={beep} />}
        {phase === 7 && <Phase07BodyParts onNext={() => advance(7, 8)} onBeep={beep} />}
        {phase === 8 && <Phase08LoveMeter onNext={() => advance(8, 9)} onBeep={beep} />}
        {phase === 9 && <Phase09Poem onNext={() => advance(9, 10)} onBeep={beep} />}
        {phase === 10 && <Phase10Finale achievements={achievements} />}
      </PhaseTransition>
    </AventuraShell>
  );
}
