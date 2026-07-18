import { EnigmaDecoder } from "../puzzles/EnigmaDecoder";

interface Props {
  onNext: () => void;
  onBeep: (k: "click" | "success" | "error") => void;
}

export function Phase02Chocolate({ onNext, onBeep }: Props) {
  return <EnigmaDecoder onSolved={onNext} onBeep={onBeep} />;
}
