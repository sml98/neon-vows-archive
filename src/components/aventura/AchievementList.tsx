import { ACHIEVEMENTS } from "@/lib/aventura/content";

export function AchievementList({ unlocked }: { unlocked: number[] }) {
  const entries = Object.entries(ACHIEVEMENTS).map(([id, label]) => ({
    id: Number(id),
    label,
  }));

  return (
    <div className="w-full border border-[var(--neon-cyan)]/60 bg-black/60 p-3 font-terminal text-left">
      <p className="font-display text-[10px] neon-text-cyan mb-2">ACHIEVEMENTS</p>
      <ul className="space-y-1 text-base sm:text-lg leading-snug">
        {entries.map((e) => {
          const on = unlocked.includes(e.id);
          return (
            <li
              key={e.id}
              className={on ? "text-[var(--neon-cyan)]" : "text-white/30 line-through"}
            >
              {on ? "✔" : "·"} {String(e.id).padStart(2, "0")} — {e.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
