export function Caret({ color = "cyan" }: { color?: "cyan" | "pink" }) {
  return (
    <span
      aria-hidden
      className={`inline-block animate-neon-blink ${
        color === "cyan" ? "neon-text-cyan" : "neon-text-pink"
      }`}
    >
      _
    </span>
  );
}
