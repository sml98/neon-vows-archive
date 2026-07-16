import { SimonSequence } from "../puzzles/SimonSequence";

interface Props {
  onNext: () => void;
  onBeep: (k: "click" | "success" | "error") => void;
  playFreq?: (f: number, d?: number, t?: OscillatorType) => void;
}

export function Phase04Hack({ onNext, onBeep, playFreq }: Props) {
  return <SimonSequence onSolved={onNext} onBeep={onBeep} playFreq={playFreq} />;
}
