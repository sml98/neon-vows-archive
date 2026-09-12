import { useState, useCallback } from "react";
import { CyberTextBox } from "../CyberTextBox";
import { NeonButton } from "../NeonButton";
import { EXPERIENCE } from "@/lib/aventura/experience";

interface Props {
  onNext: () => void;
  onBeep: (k: "click" | "success" | "error") => void;
}

interface TimelineEvent {
  id: number;
  text: string;
  order: number;
}

const EVENTS: TimelineEvent[] = [
  ...EXPERIENCE.relationship.originStory.map((text, index) => ({
    id: index + 1,
    text,
    order: index + 1,
  })),
];

// Helper to shuffle array
function shuffle<T extends { order: number }>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  // Make sure it is shuffled (not in correct order)
  if (a.every((item, idx) => item.order === idx + 1)) {
    a.reverse();
  }
  return a;
}

export function Phase13Timeline({ onNext, onBeep }: Props) {
  const [pool, setPool] = useState<TimelineEvent[]>(() => shuffle(EVENTS));
  const [timeline, setTimeline] = useState<(TimelineEvent | null)[]>(() =>
    Array(EVENTS.length).fill(null),
  );
  const [isSuccess, setIsSuccess] = useState(false);
  const [flashError, setFlashError] = useState(false);

  const handlePoolTap = useCallback(
    (event: TimelineEvent) => {
      if (isSuccess || flashError) return;
      onBeep("click");

      // Find first empty slot in timeline
      const emptyIndex = timeline.indexOf(null);
      if (emptyIndex === -1) return; // Timeline is full

      setTimeline((prev) => {
        const next = [...prev];
        next[emptyIndex] = event;
        return next;
      });

      setPool((prev) => prev.filter((e) => e.id !== event.id));
    },
    [isSuccess, flashError, timeline, onBeep],
  );

  const handleTimelineTap = useCallback(
    (index: number) => {
      if (isSuccess || flashError) return;
      const event = timeline[index];
      if (!event) return;

      onBeep("click");

      // Remove from timeline
      setTimeline((prev) => {
        const next = [...prev];
        next[index] = null;
        return next;
      });

      // Add back to pool
      setPool((prev) => [...prev, event]);
    },
    [isSuccess, flashError, timeline, onBeep],
  );

  const checkTimeline = () => {
    if (isSuccess || flashError) return;

    // Check if timeline is full
    if (timeline.some((item) => item === null)) {
      onBeep("error");
      return;
    }

    // Check correctness
    const correct = timeline.every((item, idx) => item && item.order === idx + 1);

    if (correct) {
      onBeep("success");
      setIsSuccess(true);
    } else {
      onBeep("error");
      setFlashError(true);
      setTimeout(() => {
        // Reset everything back to pool
        setPool(shuffle(EVENTS));
        setTimeline(Array(EVENTS.length).fill(null));
        setFlashError(false);
      }, 1500);
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-5">
      <h2 className="font-display text-xs sm:text-sm neon-text-pink leading-relaxed tracking-wider text-center">
        LINHA DO TEMPO — RECONSTRUÇÃO
      </h2>

      <CyberTextBox accent="cyan">
        <p className="text-sm">
          &gt; ordene os momentos marcantes do nosso namoro em ordem cronológica.
          <br />
          &gt; clique nos balões para colocá-los nos slots da linha do tempo.
        </p>
      </CyberTextBox>

      {/* Event Pool */}
      {!isSuccess && pool.length > 0 && (
        <div className="w-full flex flex-wrap gap-2 justify-center py-2 border-2 border-dashed border-[var(--neon-cyan)]/20 p-3 bg-black/40 rounded-lg animate-glitch-fade">
          {pool.map((event) => (
            <button
              key={event.id}
              type="button"
              onClick={() => handlePoolTap(event)}
              className="px-3 py-2 border border-[var(--neon-cyan)] text-[var(--neon-cyan)] hover:bg-[var(--neon-cyan)]/15 active:scale-95 transition-all text-xs font-display cursor-pointer"
              style={{
                boxShadow: "0 0 6px oklch(0.86 0.19 200 / 0.2)",
              }}
            >
              {event.text}
            </button>
          ))}
        </div>
      )}

      {/* Timeline Board */}
      <div
        className={[
          "relative w-full max-w-sm flex flex-col gap-4 py-4 px-2 bg-black/50 rounded-lg border-2 transition-all duration-300",
          isSuccess
            ? "border-[var(--neon-pink)] shadow-[0_0_15px_var(--neon-pink)]"
            : flashError
              ? "border-red-500 shadow-[0_0_15px_rgba(255,0,0,0.5)]"
              : "border-[var(--neon-cyan)]/30",
        ].join(" ")}
      >
        {/* Timeline connecting line */}
        <div
          className="absolute left-6 top-6 bottom-6 w-0.5"
          style={{
            borderLeft: "2px dashed",
            borderColor: isSuccess ? "var(--neon-pink)" : "var(--neon-cyan)",
            opacity: 0.5,
          }}
        />

        {timeline.map((event, idx) => (
          <div key={idx} className="flex items-center gap-4 relative z-10">
            {/* Number circle indicator */}
            <div
              className="w-6 h-6 rounded-full border-2 flex items-center justify-center font-display text-xs select-none transition-colors"
              style={{
                borderColor: isSuccess ? "var(--neon-pink)" : "var(--neon-cyan)",
                backgroundColor: isSuccess
                  ? "var(--neon-pink)"
                  : event
                    ? "var(--neon-cyan)"
                    : "black",
                color: isSuccess ? "black" : event ? "black" : "white",
                boxShadow: event
                  ? `0 0 8px ${isSuccess ? "var(--neon-pink)" : "var(--neon-cyan)"}`
                  : "none",
              }}
            >
              {idx + 1}
            </div>

            {/* Event slot / Card */}
            <div className="flex-1">
              {event ? (
                <button
                  type="button"
                  onClick={() => handleTimelineTap(idx)}
                  disabled={isSuccess || flashError}
                  className={[
                    "w-full text-left p-3 border rounded transition-all text-xs font-display cursor-pointer",
                    isSuccess
                      ? "border-[var(--neon-pink)] text-[var(--neon-pink)] bg-black/60 shadow-[0_0_8px_var(--neon-pink)]"
                      : flashError
                        ? "border-red-400 text-red-400 bg-red-950/20"
                        : "border-[var(--neon-cyan)] text-white bg-black/80 hover:border-white",
                  ].join(" ")}
                >
                  {event.text}
                </button>
              ) : (
                <div className="w-full p-3 border border-dashed border-white/20 text-white/30 text-xs font-display select-none">
                  [ Vazio ]
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      {!isSuccess && (
        <NeonButton
          variant="pink"
          onClick={checkTimeline}
          disabled={timeline.some((item) => item === null)}
        >
          [ VALIDAR LINHA DO TEMPO ]
        </NeonButton>
      )}

      {/* Success View */}
      {isSuccess && (
        <>
          <CyberTextBox accent="pink">
            <p className="text-sm text-[var(--neon-pink)] leading-relaxed">
              &gt; nossa história, na ordem certa. e o melhor capítulo? é o próximo. porque ele é
              com você, meu amor. ❤
            </p>
          </CyberTextBox>
          <NeonButton variant="pink" onClick={onNext}>
            [ AVANÇAR ]
          </NeonButton>
        </>
      )}
    </div>
  );
}
