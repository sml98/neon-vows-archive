import { useCallback, useEffect, useRef, useState } from "react";

export function useTypewriter(
  text: string,
  speed = 45,
): { output: string; done: boolean; skip: () => void } {
  const [output, setOutput] = useState("");
  const [done, setDone] = useState(false);
  const timerRef = useRef<number | null>(null);

  const skip = useCallback(() => {
    if (timerRef.current !== null) window.clearInterval(timerRef.current);
    timerRef.current = null;
    setOutput(text);
    setDone(true);
  }, [text]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      skip();
      return;
    }

    setOutput("");
    setDone(false);
    let i = 0;
    timerRef.current = window.setInterval(() => {
      i += 1;
      setOutput(text.slice(0, i));
      if (i >= text.length) {
        if (timerRef.current !== null) window.clearInterval(timerRef.current);
        timerRef.current = null;
        setDone(true);
      }
    }, speed);
    return () => {
      if (timerRef.current !== null) window.clearInterval(timerRef.current);
      timerRef.current = null;
    };
  }, [skip, speed, text]);

  return { output, done, skip };
}
