import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div
      className="flex min-h-dvh items-center justify-center px-4"
      style={{ backgroundColor: "var(--neon-bg)" }}
    >
      <div
        className="w-full max-w-md p-6 sm:p-8 text-center border-2 border-[var(--neon-pink)] bg-black/60 font-terminal text-white"
        style={{ boxShadow: "var(--shadow-neon-pink)" }}
      >
        <h1
          className="font-display text-sm sm:text-base neon-text-pink leading-relaxed mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          READY PLAYER ONE?
        </h1>
        <p className="text-lg sm:text-xl mb-6 leading-snug">
          &gt; Uma aventura neon em 10 fases aguarda.
        </p>
        <Link
          to="/aventura"
          className="inline-block font-display text-xs uppercase tracking-widest px-5 py-3 border-2 border-[var(--neon-cyan)] text-[var(--neon-cyan)] hover:bg-[var(--neon-cyan)]/10 active:scale-95 transition-transform"
          style={{ boxShadow: "var(--shadow-neon-cyan)" }}
        >
          [ INICIAR ]
        </Link>
      </div>
    </div>
  );
}
