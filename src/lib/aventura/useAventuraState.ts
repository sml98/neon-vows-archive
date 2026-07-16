import { useCallback, useEffect, useState } from "react";

export type PhaseId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16;

export function useAventuraState() {
  const [phase, setPhase] = useState<PhaseId>(1);
  const [achievements, setAchievements] = useState<number[]>([]);
  const [gift, setGift] = useState<"chocolate" | "flor" | "both" | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const giftParam = params.get("gift");
      if (giftParam === "chocolate" || giftParam === "flor" || giftParam === "both") {
        setGift(giftParam);
      }
    }
  }, []);

  const goTo = useCallback((next: PhaseId) => {
    setPhase(next);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    }
  }, []);

  const unlock = useCallback((id: number) => {
    setAchievements((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  return { phase, goTo, achievements, unlock, gift };
}
