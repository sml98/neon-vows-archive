import { useCallback, useEffect, useState } from "react";

export type PhaseId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16;

export const TOTAL_PHASES = 16;
export const AVENTURA_STORAGE_KEY = "neon-vows:progress:v1";

type Gift = "chocolate" | "flor" | "both" | null;

export interface SavedProgress {
  phase: PhaseId;
  achievements: number[];
  gift: Gift;
}

function isPhase(value: unknown): value is PhaseId {
  return (
    typeof value === "number" && Number.isInteger(value) && value >= 1 && value <= TOTAL_PHASES
  );
}

export function readSavedProgress(): SavedProgress | null {
  if (typeof window === "undefined") return null;

  return parseSavedProgress(window.localStorage.getItem(AVENTURA_STORAGE_KEY));
}

export function parseSavedProgress(raw: string | null): SavedProgress | null {
  try {
    if (!raw) return null;
    const saved = JSON.parse(raw) as Partial<SavedProgress>;
    if (!isPhase(saved.phase)) return null;

    const achievements = Array.isArray(saved.achievements)
      ? saved.achievements.filter(
          (id): id is number =>
            typeof id === "number" && Number.isInteger(id) && id >= 1 && id < TOTAL_PHASES,
        )
      : [];
    const gift =
      saved.gift === "chocolate" || saved.gift === "flor" || saved.gift === "both"
        ? saved.gift
        : null;

    return { phase: saved.phase, achievements: [...new Set(achievements)], gift };
  } catch {
    return null;
  }
}

export function useAventuraState() {
  const [phase, setPhase] = useState<PhaseId>(1);
  const [achievements, setAchievements] = useState<number[]>([]);
  const [gift, setGift] = useState<Gift>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = readSavedProgress();
    if (saved) {
      setPhase(saved.phase);
      setAchievements(saved.achievements);
      setGift(saved.gift);
    }

    const params = new URLSearchParams(window.location.search);
    const giftParam = params.get("gift");
    if (giftParam === "chocolate" || giftParam === "flor" || giftParam === "both") {
      setGift(giftParam);
    }

    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const progress: SavedProgress = { phase, achievements, gift };
    window.localStorage.setItem(AVENTURA_STORAGE_KEY, JSON.stringify(progress));
  }, [achievements, gift, phase, ready]);

  const goTo = useCallback((next: PhaseId) => {
    setPhase(next);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    }
  }, []);

  const unlock = useCallback((id: number) => {
    setAchievements((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  const restart = useCallback(() => {
    window.localStorage.removeItem(AVENTURA_STORAGE_KEY);
    setPhase(1);
    setAchievements([]);
  }, []);

  return { phase, goTo, achievements, unlock, gift, ready, restart };
}
