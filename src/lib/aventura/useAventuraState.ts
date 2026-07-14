import { useCallback, useState } from "react";

export type PhaseId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export function useAventuraState() {
  const [phase, setPhase] = useState<PhaseId>(1);
  const [achievements, setAchievements] = useState<number[]>([]);

  const goTo = useCallback((next: PhaseId) => {
    setPhase(next);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    }
  }, []);

  const unlock = useCallback((id: number) => {
    setAchievements((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  return { phase, goTo, achievements, unlock };
}
