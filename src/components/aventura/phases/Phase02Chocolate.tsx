import { CaesarDecoder } from "../puzzles/CaesarDecoder";

interface Props {
  onNext: () => void;
  onBeep: (k: "click" | "success" | "error") => void;
}

export function Phase02Chocolate({ onNext, onBeep }: Props) {
  return <CaesarDecoder onSolved={onNext} onBeep={onBeep} />;
}
