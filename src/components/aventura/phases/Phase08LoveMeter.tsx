import { useEffect, useRef, useState } from "react";
import { CyberTextBox } from "../CyberTextBox";
import { NeonButton } from "../NeonButton";
import {
  BODY_PART_MESSAGES,
  BODY_PART_TRUTH,
  SAMUEL_SELF_OPTIONS,
  type BodyPart,
} from "@/lib/aventura/content";
import coupleForest from "@/assets/couple-forest.jpg";

const PARTS: { id: BodyPart; label: string; span?: boolean }[] = [
  { id: "cabelo", label: "CABELO" },
  { id: "olhos", label: "OLHOS" },
  { id: "estilo", label: "ESTILO" },
  { id: "curvas", label: "CURVAS" },
  { id: "boca", label: "BOCA", span: true },
];

function HeartExplosion() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const particles: {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
    }[] = [];

    // Resize canvas
    canvas.width = canvas.parentElement?.clientWidth || 300;
    canvas.height = canvas.parentElement?.clientHeight || 200;

    // Create particles
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: canvas.height + Math.random() * 20,
        size: Math.random() * 8 + 6,
        speedY: -(Math.random() * 1.5 + 0.8),
        speedX: Math.random() * 1 - 0.5,
        opacity: Math.random() * 0.5 + 0.5,
      });
    }

    const drawHeart = (x: number, y: number, size: number, opacity: number) => {
      ctx.save();
      ctx.beginPath();
      ctx.translate(x, y);
      ctx.scale(size / 10, size / 10);
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-5, -5, -10, -2, -10, 3);
      ctx.bezierCurveTo(-10, 8, -5, 12, 0, 15);
      ctx.bezierCurveTo(5, 12, 10, 8, 10, 3);
      ctx.bezierCurveTo(10, -2, 5, -5, 0, 0);
      ctx.fillStyle = `rgba(244, 63, 94, ${opacity})`;
      ctx.shadowBlur = 10;
      ctx.shadowColor = "rgba(244, 63, 94, 0.8)";
      ctx.fill();
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      particles.forEach((p) => {
        if (p.opacity > 0.01) {
          alive = true;
          p.y += p.speedY;
          p.x += p.speedX;
          p.opacity -= 0.0035; // slow fade
          drawHeart(p.x, p.y, p.size, p.opacity);
        }
      });
      if (alive) {
        animationId = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => cancelAnimationFrame(animationId);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10" />;
}

interface Props {
  onNext: () => void;
  onBeep: (k: "click" | "success") => void;
}

type Stage = "pick" | "revealed" | "truth" | "bonus" | "done";

export function Phase08LoveMeter({ onNext, onBeep }: Props) {
  const [selected, setSelected] = useState<BodyPart | null>(null);
  const [stage, setStage] = useState<Stage>("pick");
  const [bonusMsg, setBonusMsg] = useState<string | null>(null);

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <h2 className="font-display text-xs sm:text-sm neon-text-pink leading-relaxed">
        ANÁLISE DE ATRAÇÃO (3/3)
      </h2>
      <CyberTextBox accent="cyan">
        <p>
          &gt; escolhe uma parte sua que você acha que eu mais amo.
          <br />
          &gt; depois eu te conto qual foi a minha resposta. 👀
        </p>
      </CyberTextBox>

      <div className="grid grid-cols-2 gap-3 w-full">
        {PARTS.map((p) => {
          const isSel = selected === p.id;
          return (
            <div key={p.id} className={p.span ? "col-span-2" : ""}>
              <NeonButton
                variant={isSel ? "cyan" : "pink"}
                onClick={() => {
                  onBeep("click");
                  setSelected(p.id);
                  setStage("revealed");
                }}
                disabled={stage === "bonus" || stage === "done"}
              >
                {p.label}
              </NeonButton>
            </div>
          );
        })}
      </div>

      {selected && stage === "revealed" && (
        <>
          <CyberTextBox accent="pink">
            <p className="text-[var(--neon-pink)] leading-relaxed">
              {BODY_PART_MESSAGES[selected]}
            </p>
          </CyberTextBox>
          <NeonButton
            variant="cyan"
            onClick={() => {
              onBeep("click");
              setStage("truth");
            }}
          >
            [ VER A VERDADE ]
          </NeonButton>
        </>
      )}

      {stage === "truth" && (
        <>
          <div className="relative w-full border-2 border-[var(--neon-cyan)] shadow-[var(--shadow-neon-cyan)] overflow-hidden">
            <HeartExplosion />
            <img
              src={coupleForest}
              alt="Nós dois, em pixel art"
              className="block w-full h-auto"
              style={{ imageRendering: "pixelated" }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to bottom, transparent 0 3px, oklch(0 0 0 / 0.28) 3px 4px)",
              }}
            />
          </div>
          <CyberTextBox accent="pink">
            <p className="text-[var(--neon-pink)] leading-relaxed">{BODY_PART_TRUTH}</p>
          </CyberTextBox>
          <NeonButton
            variant="cyan"
            onClick={() => {
              onBeep("click");
              setStage("bonus");
            }}
          >
            [ BÔNUS: E EU? ]
          </NeonButton>
        </>
      )}

      {stage === "bonus" && (
        <>
          <CyberTextBox accent="cyan">
            <p>&gt; e agora: o que VOCÊ acha que EU mais gosto em mim mesmo? kkk</p>
          </CyberTextBox>
          <div className="grid grid-cols-1 gap-3 w-full">
            {SAMUEL_SELF_OPTIONS.map((o) => (
              <NeonButton
                key={o.id}
                variant="pink"
                onClick={() => {
                  onBeep("click");
                  setBonusMsg(o.msg);
                  setStage("done");
                }}
              >
                {o.label}
              </NeonButton>
            ))}
          </div>
        </>
      )}

      {stage === "done" && bonusMsg && (
        <>
          <CyberTextBox accent="pink">
            <p className="text-[var(--neon-pink)]">{bonusMsg}</p>
          </CyberTextBox>
          <NeonButton
            variant="cyan"
            onClick={() => {
              onBeep("success");
              onNext();
            }}
          >
            [ AVANÇAR ]
          </NeonButton>
        </>
      )}
    </div>
  );
}
