import { useCallback, useRef } from "react";

type BeepKind = "click" | "error" | "success";

const CONFIG: Record<BeepKind, { freq: number; duration: number; type: OscillatorType }> = {
  click: { freq: 880, duration: 0.06, type: "square" },
  error: { freq: 180, duration: 0.18, type: "sawtooth" },
  success: { freq: 1320, duration: 0.14, type: "triangle" },
};

export function useBeep() {
  const ctxRef = useRef<AudioContext | null>(null);
  const mutedRef = useRef(false);

  const ensureCtx = () => {
    if (typeof window === "undefined") return null;
    if (!ctxRef.current) {
      const Ctor =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (!Ctor) return null;
      ctxRef.current = new Ctor();
    }
    return ctxRef.current;
  };

  const setMuted = useCallback((muted: boolean) => {
    mutedRef.current = muted;
  }, []);

  const beep = useCallback((kind: BeepKind = "click") => {
    if (mutedRef.current) return;
    const ctx = ensureCtx();
    if (!ctx) return;
    const { freq, duration, type } = CONFIG[kind];
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration + 0.02);
  }, []);

  const playFreq = useCallback((freq: number, duration = 0.12, type: OscillatorType = "sine") => {
    if (mutedRef.current) return;
    const ctx = ensureCtx();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration + 0.02);
  }, []);

  return { beep, setMuted, playFreq };
}
