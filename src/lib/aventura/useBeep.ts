import { useCallback, useEffect, useRef } from "react";

type BeepKind = "click" | "error" | "success";

const CONFIG: Record<BeepKind, { freq: number; duration: number; type: OscillatorType }> = {
  click: { freq: 880, duration: 0.06, type: "square" },
  error: { freq: 180, duration: 0.18, type: "sawtooth" },
  success: { freq: 1320, duration: 0.14, type: "triangle" },
};

export function useBeep() {
  const ctxRef = useRef<AudioContext | null>(null);
  const mutedRef = useRef(true);
  const ambientRef = useRef<{
    oscillators: OscillatorNode[];
    lfo: OscillatorNode;
    gain: GainNode;
  } | null>(null);

  const ensureCtx = useCallback(() => {
    if (typeof window === "undefined") return null;
    if (!ctxRef.current) {
      const Ctor =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctor) return null;
      ctxRef.current = new Ctor();
    }
    return ctxRef.current;
  }, []);

  const stopAmbient = useCallback(() => {
    const ambient = ambientRef.current;
    const ctx = ctxRef.current;
    if (!ambient || !ctx) return;
    ambient.gain.gain.cancelScheduledValues(ctx.currentTime);
    ambient.gain.gain.setValueAtTime(Math.max(ambient.gain.gain.value, 0.0001), ctx.currentTime);
    ambient.gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.65);
    window.setTimeout(() => {
      ambient.oscillators.forEach((oscillator) => oscillator.stop());
      ambient.lfo.stop();
    }, 700);
    ambientRef.current = null;
  }, []);

  const startAmbient = useCallback(() => {
    if (mutedRef.current || ambientRef.current) return;
    const ctx = ensureCtx();
    if (!ctx) return;
    void ctx.resume();

    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 420;
    filter.Q.value = 0.7;
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.014, ctx.currentTime + 1.8);
    gain.connect(filter).connect(ctx.destination);

    const oscillators = [55, 82.41, 110].map((frequency, index) => {
      const oscillator = ctx.createOscillator();
      oscillator.type = index === 1 ? "triangle" : "sine";
      oscillator.frequency.value = frequency;
      oscillator.detune.value = index === 2 ? -7 : index * 4;
      oscillator.connect(gain);
      oscillator.start();
      return oscillator;
    });

    const lfo = ctx.createOscillator();
    const lfoDepth = ctx.createGain();
    lfo.frequency.value = 0.08;
    lfoDepth.gain.value = 0.004;
    lfo.connect(lfoDepth).connect(gain.gain);
    lfo.start();
    ambientRef.current = { oscillators, lfo, gain };
  }, [ensureCtx]);

  const setMuted = useCallback(
    (muted: boolean) => {
      mutedRef.current = muted;
      if (muted) stopAmbient();
    },
    [stopAmbient],
  );

  const beep = useCallback(
    (kind: BeepKind = "click") => {
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
    },
    [ensureCtx],
  );

  const playFreq = useCallback(
    (freq: number, duration = 0.12, type: OscillatorType = "sine") => {
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
    },
    [ensureCtx],
  );

  useEffect(
    () => () => {
      stopAmbient();
      if (ctxRef.current && ctxRef.current.state !== "closed") void ctxRef.current.close();
    },
    [stopAmbient],
  );

  return { beep, setMuted, playFreq, startAmbient, stopAmbient };
}
