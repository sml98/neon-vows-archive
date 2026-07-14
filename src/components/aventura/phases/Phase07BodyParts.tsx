import { SentenceBuilder } from "../puzzles/SentenceBuilder";

interface Props {
  onNext: () => void;
  onBeep: (k: "click" | "success" | "error") => void;
}

// Fase 07 now hosts the SentenceBuilder puzzle. The body-parts content moved to Phase 08.
export function Phase07BodyParts({ onNext, onBeep }: Props) {
  return <SentenceBuilder onSolved={onNext} onBeep={onBeep} />;
}
