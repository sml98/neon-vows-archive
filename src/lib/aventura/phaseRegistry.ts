import type { ComponentType, FC } from "react";
import type { PhaseId } from "./useAventuraState";
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

/**
 * Props comuns para todos os componentes de fase
 */
export interface PhaseProps {
  onNext?: () => void;
  onSolved?: () => void;
  onBeep: (type: "click" | "success" | "error") => void;
  playFreq?: (freq: number, duration: number) => void;
  gift?: "chocolate" | "flor" | "both" | null;
  achievements?: number[];
}

/**
 * Registry centralizado de todas as fases
 * Facilita manutenção e evita imports espalhados
 */
export const PHASES_REGISTRY: Record<PhaseId, ComponentType<PhaseProps>> = {
  1: Phase01Password,
  2: Phase02Chocolate,
  3: Phase03Pact,
  4: Phase04Letter,
  5: Phase05Memory,
  6: Phase04Hack,
  7: Phase05Quiz1,
  8: Phase06Quiz2,
  9: Phase07BodyParts,
  10: Phase10Constellation,
  11: Phase11PersonalQuiz,
  12: Phase08LoveMeter,
  13: Phase12SafeCracker,
  14: Phase13Timeline,
  15: Phase09Poem,
  16: Phase15Finale,
};

/**
 * Obtém o componente de fase pelo ID
 * @param phaseId - ID da fase
 * @returns Componente React ou null se não encontrado
 */
export function getPhaseComponent(phaseId: PhaseId): ComponentType<PhaseProps> | null {
  return PHASES_REGISTRY[phaseId] ?? null;
}
