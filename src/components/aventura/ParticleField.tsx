import { useEffect, useRef } from "react";

/**
 * Lightweight canvas overlay: rising neon pixel hearts + sparks.
 */
export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const { clientWidth: w, clientHeight: h } = canvas;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    type P = { x: number; y: number; vy: number; vx: number; c: string; s: number; life: number };
    const colors = ["#ff2ad4", "#26e5ff", "#ffffff"];
    const particles: P[] = [];

    const spawn = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      particles.push({
        x: Math.random() * w,
        y: h + 10,
        vy: -0.5 - Math.random() * 1.2,
        vx: (Math.random() - 0.5) * 0.6,
        c: colors[Math.floor(Math.random() * colors.length)],
        s: 2 + Math.floor(Math.random() * 3),
        life: 220 + Math.random() * 120,
      });
    };

    const step = () => {
      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
      if (particles.length < 60 && Math.random() < 0.4) spawn();
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 1;
        if (p.life <= 0 || p.y < -10) {
          particles.splice(i, 1);
          continue;
        }
        ctx.fillStyle = p.c;
        ctx.shadowColor = p.c;
        ctx.shadowBlur = 8;
        ctx.fillRect(p.x, p.y, p.s, p.s);
      }
      ctx.shadowBlur = 0;
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 w-full h-full"
    />
  );
}
