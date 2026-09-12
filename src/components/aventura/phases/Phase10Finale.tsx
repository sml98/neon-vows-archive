import { useEffect, useRef, useState } from "react";
import { CyberTextBox } from "../CyberTextBox";
import { NeonButton } from "../NeonButton";
import { Caret } from "../Caret";
import { AchievementList } from "../AchievementList";
import { POEM } from "@/lib/aventura/content";
import { useTypewriter } from "@/lib/aventura/useTypewriter";
import coupleNight from "@/assets/couple-night.png.asset.json";
import coupleSmile from "@/assets/couple-smile.png.asset.json";
import coupleForest from "@/assets/couple-forest.jpg";

const IMAGES = [
  { url: coupleForest, label: "Aventura ao ar livre 🌿" },
  { url: coupleSmile.url, label: "Nossos melhores sorrisos 😊" },
  { url: coupleNight.url, label: "Luzes da noite ✨" },
];

function HeartFireworks() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    class Particle {
      x: number;
      y: number;
      size: number;
      angle: number;
      speed: number;
      color: string;
      decay: number;
      opacity: number;

      constructor(x: number, y: number, color: string) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 5 + 4;
        this.angle = Math.random() * Math.PI * 2;
        this.speed = Math.random() * 3 + 2;
        this.color = color;
        this.decay = Math.random() * 0.012 + 0.008;
        this.opacity = 1;
      }

      draw() {
        ctx!.save();
        ctx!.beginPath();
        ctx!.translate(this.x, this.y);
        ctx!.scale(this.size / 10, this.size / 10);
        ctx!.moveTo(0, 0);
        ctx!.bezierCurveTo(-5, -5, -10, -2, -10, 3);
        ctx!.bezierCurveTo(-10, 8, -5, 12, 0, 15);
        ctx!.bezierCurveTo(5, 12, 10, 8, 10, 3);
        ctx!.bezierCurveTo(10, -2, 5, -5, 0, 0);
        ctx!.fillStyle = this.color;
        ctx!.globalAlpha = this.opacity;
        ctx!.shadowBlur = 6;
        ctx!.shadowColor = this.color;
        ctx!.fill();
        ctx!.restore();
      }

      update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed + 0.4;
        this.opacity -= this.decay;
      }
    }

    class Firework {
      x: number;
      y: number;
      targetY: number;
      speed: number;
      particles: Particle[];
      color: string;
      exploded: boolean;

      constructor() {
        this.x = Math.random() * width;
        this.y = height + 10;
        this.targetY = Math.random() * (height * 0.5) + 50;
        this.speed = Math.random() * 4 + 6;
        this.color = Math.random() > 0.5 ? "rgb(244, 63, 94)" : "rgb(6, 182, 212)";
        this.particles = [];
        this.exploded = false;
      }

      update() {
        if (!this.exploded) {
          this.y -= this.speed;
          if (this.y <= this.targetY) {
            this.exploded = true;
            for (let i = 0; i < 20; i++) {
              this.particles.push(new Particle(this.x, this.y, this.color));
            }
          }
        } else {
          this.particles.forEach((p) => p.update());
          this.particles = this.particles.filter((p) => p.opacity > 0);
        }
      }

      draw() {
        if (!this.exploded) {
          ctx!.beginPath();
          ctx!.arc(this.x, this.y, 3, 0, Math.PI * 2);
          ctx!.fillStyle = this.color;
          ctx!.shadowBlur = 8;
          ctx!.shadowColor = this.color;
          ctx!.fill();
        } else {
          this.particles.forEach((p) => p.draw());
        }
      }
    }

    let fireworks: Firework[] = [];

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      if (Math.random() < 0.03 && fireworks.length < 5) {
        fireworks.push(new Firework());
      }

      fireworks.forEach((fw) => {
        fw.update();
        fw.draw();
      });

      fireworks = fireworks.filter((fw) => !fw.exploded || fw.particles.length > 0);

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
}

function ImageSlideshow() {
  const [idx, setIdx] = useState(0);

  const next = () => {
    setIdx((i) => (i + 1) % IMAGES.length);
  };

  const prev = () => {
    setIdx((i) => (i - 1 + IMAGES.length) % IMAGES.length);
  };

  return (
    <div className="relative w-full border-2 border-[var(--neon-cyan)] shadow-[var(--shadow-neon-cyan)] overflow-hidden animate-glitch-fade flex flex-col">
      <div className="relative aspect-video w-full overflow-hidden bg-black">
        <img
          src={IMAGES[idx].url}
          alt={IMAGES[idx].label}
          className="block w-full h-full object-cover transition-all duration-300"
          style={{ imageRendering: "pixelated" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, transparent 0 3px, oklch(0 0 0 / 0.32) 3px 4px)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 55%, oklch(0 0 0 / 0.55) 100%)",
          }}
        />
      </div>

      <div className="bg-black/90 p-2 border-t border-[var(--neon-cyan)] flex items-center justify-between text-white font-display text-[9px] tracking-wider z-20">
        <button
          type="button"
          onClick={prev}
          className="px-2 py-1 border border-[var(--neon-cyan)] text-[var(--neon-cyan)] hover:bg-[var(--neon-cyan)]/20 active:scale-95 cursor-pointer"
        >
          &lt;
        </button>
        <span className="truncate max-w-[180px]">{IMAGES[idx].label}</span>
        <button
          type="button"
          onClick={next}
          className="px-2 py-1 border border-[var(--neon-cyan)] text-[var(--neon-cyan)] hover:bg-[var(--neon-cyan)]/20 active:scale-95 cursor-pointer"
        >
          &gt;
        </button>
      </div>
    </div>
  );
}

function ArcadeTicket() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-sm mt-6 border-4 border-dashed border-[var(--neon-pink)] bg-black p-5 text-center font-display text-white shadow-[var(--shadow-neon-pink)] animate-glitch-fade select-none relative overflow-hidden printable-ticket">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-6 h-6 rounded-full bg-[oklch(0.12_0.06_300)] border-r-4 border-dashed border-[var(--neon-pink)] -ml-3" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-6 h-6 rounded-full bg-[oklch(0.12_0.06_300)] border-l-4 border-dashed border-[var(--neon-pink)] -mr-3" />

      <h3 className="text-xs neon-text-pink tracking-widest font-bold mb-3 uppercase">
        ★ TICKET DE CONQUISTA ★
      </h3>
      <div className="border-t border-b border-[var(--neon-cyan)] py-2 my-3 text-[10px] sm:text-xs text-[var(--neon-cyan)] flex justify-between px-2">
        <span>TICKET NO: 091025</span>
        <span>LEVEL: 99 (MAX)</span>
      </div>

      <div className="flex flex-col gap-2 text-left text-[9px] tracking-wide my-4 font-mono">
        <div>
          <span className="text-[var(--neon-pink)]">PLAYER 1:</span> SAMUEL (SAMUKA)
        </div>
        <div>
          <span className="text-[var(--neon-pink)]">PLAYER 2:</span> CAMILA
        </div>
        <div>
          <span className="text-[var(--neon-pink)]">JORNADA:</span> CO-OP VITALÍCIA
        </div>
        <div>
          <span className="text-[var(--neon-pink)]">STATUS:</span> AMOR INFINITO HABILITADO
        </div>
        <div>
          <span className="text-[var(--neon-pink)]">EASTER EGGS:</span> ENCONTRO NO SHOPPING
          DESBLOQUEADO
        </div>
      </div>

      <div className="border-t border-[var(--neon-pink)] pt-4 mt-4">
        <div className="h-8 flex items-center justify-center gap-[2px] opacity-75">
          {[1, 3, 2, 1, 4, 2, 1, 3, 2, 4, 1, 2, 3, 1, 2, 4, 1, 3, 2, 1, 4].map((w, idx) => (
            <div key={idx} className="bg-[var(--neon-cyan)] h-full" style={{ width: `${w}px` }} />
          ))}
        </div>
        <div className="text-[8px] text-[var(--neon-cyan)] mt-1 font-mono">
          * CAMILA-E-SAMUKA-PARA-SEMPRE *
        </div>
      </div>

      <button
        type="button"
        onClick={handlePrint}
        className="mt-4 px-3 py-1.5 border border-[var(--neon-cyan)] text-[var(--neon-cyan)] hover:bg-[var(--neon-cyan)]/20 active:scale-95 text-[9px] tracking-widest font-display cursor-pointer"
      >
        [ IMPRIMIR / SALVAR ]
      </button>
    </div>
  );
}

interface Props {
  achievements: number[];
}

export function Phase10Finale({ achievements }: Props) {
  const [revealed, setRevealed] = useState(false);
  const { output, done } = useTypewriter(POEM, 42);

  return (
    <div className="w-full flex flex-col items-center gap-4">
      {revealed && <HeartFireworks />}

      <h2 className="font-display text-xs sm:text-sm neon-text-pink leading-relaxed">
        MAIN FRAME UNLOCKED
      </h2>

      <CyberTextBox accent="cyan" className="min-h-[200px] z-10">
        <p className="whitespace-pre-line text-[var(--neon-cyan)] leading-relaxed">
          {output}
          <Caret color="cyan" />
        </p>
      </CyberTextBox>

      {done && !revealed && (
        <NeonButton variant="pink" onClick={() => setRevealed(true)}>
          [ ABRIR MEMÓRIA FINAL ]
        </NeonButton>
      )}

      {revealed && (
        <div className="w-full flex flex-col items-center gap-4 z-10">
          <ImageSlideshow />

          <CyberTextBox accent="pink">
            <p className="text-[var(--neon-pink)]">
              &gt; nenhuma engine renderiza algo tão perfeito quanto você ao meu lado.
              <br />
              <br />
              &gt; obrigado por atravessar cada fase comigo. te amo em todos os pixels, em todos os
              frames, em todos os finais possíveis. <Caret color="pink" />
            </p>
          </CyberTextBox>

          <ArcadeTicket />

          <AchievementList unlocked={achievements} />
        </div>
      )}
    </div>
  );
}
