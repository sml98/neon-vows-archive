import { SimonSequence } from "../puzzles/SimonSequence";

interface Props {
  onNext: () => void;
  onBeep: (k: "click" | "success" | "error") => void;
}

export function Phase04Hack({ onNext, onBeep }: Props) {
  return <SimonSequence onSolved={onNext} onBeep={onBeep} />;
}
