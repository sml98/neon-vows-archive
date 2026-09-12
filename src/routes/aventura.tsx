import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AventuraShell } from "@/components/aventura/AventuraShell";
import { PhaseTransition } from "@/components/aventura/PhaseTransition";
import { Phase01Password } from "@/components/aventura/phases/Phase01Password";
import { Phase02Chocolate } from "@/components/aventura/phases/Phase02Chocolate";
import { Phase03Pact } from "@/components/aventura/phases/Phase03Pact";
import { Phase04Letter } from "@/components/aventura/phases/Phase04Letter";
import { Phase05Memory } from "@/components/aventura/phases/Phase05Memory";
import { Phase04Hack } from "@/components/aventura/phases/Phase04Hack";
import { Phase05Quiz1 } from "@/components/aventura/phases/Phase05Quiz1";
import { Phase06Quiz2 } from "@/components/aventura/phases/Phase06Quiz2";
import { Phase07BodyParts } from "@/components/aventura/phases/Phase07BodyParts";
import { Phase10Constellation } from "@/components/aventura/phases/Phase10Constellation";
import { Phase11PersonalQuiz } from "@/components/aventura/phases/Phase11PersonalQuiz";
import { Phase08LoveMeter } from "@/components/aventura/phases/Phase08LoveMeter";
import { Phase12SafeCracker } from "@/components/aventura/phases/Phase12SafeCracker";
import { Phase13Timeline } from "@/components/aventura/phases/Phase13Timeline";
import { Phase09Poem } from "@/components/aventura/phases/Phase09Poem";
import { Phase15Finale } from "@/components/aventura/phases/Phase15Finale";
import { useAventuraState, type PhaseId } from "@/lib/aventura/useAventuraState";
import { useBeep } from "@/lib/aventura/useBeep";

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

function AventuraPage() {
  const { phase, goTo, achievements, unlock, gift, ready, restart } = useAventuraState();
  const { beep, setMuted, playFreq, startAmbient, stopAmbient } = useBeep();
  const [muted, setMutedState] = useState(true);
  const testMode =
    ready &&
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("test") === "1";

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    setMutedState(next);
    if (next) {
      stopAmbient();
    } else {
      startAmbient();
      beep("success");
    }
  };

  const advance = (from: PhaseId, to: PhaseId) => {
    unlock(from);
    goTo(to);
  };

  const confirmRestart = () => {
    if (window.confirm("Reiniciar toda a jornada e apagar o progresso salvo neste aparelho?")) {
      restart();
      beep("click");
    }
  };

  if (!ready) {
    return (
      <div className="grid min-h-dvh place-items-center bg-[var(--neon-bg)] font-display text-xs text-[var(--neon-cyan)]">
        CARREGANDO SAVE...
      </div>
    );
  }

  return (
    <AventuraShell
      muted={muted}
      onToggleMute={toggleMute}
      gift={gift}
      phase={phase}
      achievementCount={achievements.length}
      onRestart={confirmRestart}
      testMode={testMode}
      onPhaseSelect={goTo}
    >
      <PhaseTransition keyId={phase}>
        {phase === 1 && <Phase01Password onSolved={() => advance(1, 2)} onBeep={beep} />}
        {phase === 2 && <Phase02Chocolate onNext={() => advance(2, 3)} onBeep={beep} />}
        {phase === 3 && <Phase03Pact onNext={() => advance(3, 4)} onBeep={beep} gift={gift} />}
        {phase === 4 && <Phase04Letter onNext={() => advance(4, 5)} onBeep={beep} />}
        {phase === 5 && <Phase05Memory onNext={() => advance(5, 6)} onBeep={beep} />}
        {phase === 6 && (
          <Phase04Hack onNext={() => advance(6, 7)} onBeep={beep} playFreq={playFreq} />
        )}
        {phase === 7 && <Phase05Quiz1 onNext={() => advance(7, 8)} onBeep={beep} />}
        {phase === 8 && <Phase06Quiz2 onNext={() => advance(8, 9)} onBeep={beep} />}
        {phase === 9 && <Phase07BodyParts onNext={() => advance(9, 10)} onBeep={beep} />}
        {phase === 10 && <Phase10Constellation onNext={() => advance(10, 11)} onBeep={beep} />}
        {phase === 11 && <Phase11PersonalQuiz onNext={() => advance(11, 12)} onBeep={beep} />}
        {phase === 12 && <Phase08LoveMeter onNext={() => advance(12, 13)} onBeep={beep} />}
        {phase === 13 && <Phase12SafeCracker onNext={() => advance(13, 14)} onBeep={beep} />}
        {phase === 14 && <Phase13Timeline onNext={() => advance(14, 15)} onBeep={beep} />}
        {phase === 15 && <Phase09Poem onNext={() => advance(15, 16)} onBeep={beep} />}
        {phase === 16 && <Phase15Finale achievements={achievements} />}
      </PhaseTransition>
    </AventuraShell>
  );
}
