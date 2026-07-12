interface Props {
  value: number; // 0..100
  segments?: number;
}

export function ProgressBar({ value, segments = 10 }: Props) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div
      className="relative w-full h-7 border-2 border-[var(--neon-cyan)] bg-black/80 overflow-hidden"
      role="progressbar"
      aria-valuenow={Math.round(clamped)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full bg-[var(--neon-pink)] shadow-[0_0_14px_var(--neon-pink)] transition-[width] duration-100"
        style={{ width: `${clamped}%` }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 grid"
        style={{ gridTemplateColumns: `repeat(${segments}, 1fr)` }}
      >
        {Array.from({ length: segments }).map((_, i) => (
          <div
            key={i}
            className="border-r border-black/70 last:border-r-0"
          />
        ))}
      </div>
    </div>
  );
}
