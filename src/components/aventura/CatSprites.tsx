export function CatSprites() {
  return (
    <div className="flex justify-center gap-6 mb-4" aria-hidden>
      <svg
        width="56"
        height="56"
        viewBox="0 0 16 16"
        shapeRendering="crispEdges"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: "drop-shadow(0 0 8px oklch(0.65 0.16 40 / 0.9))" }}
        className="animate-pulse"
      >
        <rect x="2" y="2" width="3" height="3" fill="#b05d21" />
        <rect x="11" y="2" width="3" height="3" fill="#b05d21" />
        <rect x="3" y="3" width="1" height="2" fill="#ffb3b3" />
        <rect x="12" y="3" width="1" height="2" fill="#ffb3b3" />
        <rect x="2" y="5" width="12" height="9" fill="#b05d21" />
        <rect x="3" y="7" width="1" height="1" fill="#4a2511" />
        <rect x="5" y="7" width="1" height="1" fill="#4a2511" />
        <rect x="3" y="8" width="3" height="1" fill="#4a2511" />
        <rect x="4" y="9" width="1" height="1" fill="#4a2511" />
        <rect x="8" y="7" width="1" height="1" fill="#4a2511" />
        <rect x="10" y="7" width="1" height="1" fill="#4a2511" />
        <rect x="8" y="8" width="3" height="1" fill="#4a2511" />
        <rect x="9" y="9" width="1" height="1" fill="#4a2511" />
        <rect x="7" y="11" width="2" height="1" fill="#222" />
      </svg>

      <svg
        width="56"
        height="56"
        viewBox="0 0 16 16"
        shapeRendering="crispEdges"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          filter: "drop-shadow(0 0 8px oklch(0.82 0.16 85 / 0.9))",
          animation: "neon-pulse 2.4s ease-in-out infinite",
        }}
      >
        <rect x="2" y="2" width="3" height="3" fill="#d69e2e" />
        <rect x="11" y="2" width="3" height="3" fill="#d69e2e" />
        <rect x="3" y="3" width="1" height="2" fill="#ffb3b3" />
        <rect x="12" y="3" width="1" height="2" fill="#ffb3b3" />
        <rect x="2" y="5" width="12" height="9" fill="#d69e2e" />
        <rect x="3" y="7" width="1" height="1" fill="#00ff00" />
        <rect x="5" y="7" width="1" height="1" fill="#00ff00" />
        <rect x="3" y="8" width="3" height="1" fill="#00ff00" />
        <rect x="4" y="9" width="1" height="1" fill="#00ff00" />
        <rect x="8" y="7" width="1" height="1" fill="#00ff00" />
        <rect x="10" y="7" width="1" height="1" fill="#00ff00" />
        <rect x="8" y="8" width="3" height="1" fill="#00ff00" />
        <rect x="9" y="9" width="1" height="1" fill="#00ff00" />
        <rect x="7" y="11" width="2" height="1" fill="#222" />
      </svg>
    </div>
  );
}
