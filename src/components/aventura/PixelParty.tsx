interface PixelPartyProps {
  compact?: boolean;
}

export function PixelParty({ compact = false }: PixelPartyProps) {
  return (
    <figure
      className={`relative overflow-hidden border-2 border-[var(--neon-cyan)] bg-[#09051a] ${
        compact ? "mb-4 w-44" : "mb-6 w-full"
      }`}
      style={{ boxShadow: "4px 4px 0 #2d123f, 0 0 14px oklch(0.78 0.2 205 / 0.35)" }}
    >
      <svg
        viewBox="0 0 160 96"
        role="img"
        aria-label="Samuel e Camila como personagens de um RPG em pixel art"
        className="block w-full"
        style={{ imageRendering: "pixelated" }}
        shapeRendering="crispEdges"
      >
        <rect width="160" height="96" fill="#09051a" />
        <rect y="8" width="160" height="2" fill="#32134f" />
        <rect x="10" y="17" width="3" height="3" fill="#69f6ff" />
        <rect x="142" y="22" width="2" height="2" fill="#ff4fb3" />
        <rect x="126" y="10" width="3" height="3" fill="#ffea80" />
        <rect x="28" y="30" width="2" height="2" fill="#ff4fb3" />
        <path
          d="M0 67h12v-6h12v-5h11v5h13v6h15v-8h12v-5h10v7h15v6h16v-6h12v-6h13v7h19v34H0z"
          fill="#1e1238"
        />
        <rect y="76" width="160" height="20" fill="#130c27" />
        <rect y="76" width="160" height="3" fill="#733d88" />
        <rect x="7" y="85" width="18" height="3" fill="#241846" />
        <rect x="132" y="88" width="21" height="3" fill="#241846" />

        {/* Samuel: cabelo loiro, olhos verdes, barba cheia e jaqueta preta */}
        <g aria-label="Samuel">
          <rect x="34" y="26" width="26" height="5" fill="#e7bd55" />
          <rect x="30" y="31" width="34" height="6" fill="#e7bd55" />
          <rect x="30" y="37" width="5" height="14" fill="#c89435" />
          <rect x="59" y="37" width="5" height="14" fill="#c89435" />
          <rect x="35" y="35" width="24" height="22" fill="#d89b72" />
          <rect x="38" y="42" width="5" height="4" fill="#68df87" />
          <rect x="51" y="42" width="5" height="4" fill="#68df87" />
          <rect x="43" y="50" width="8" height="3" fill="#7d4634" />
          <rect x="35" y="51" width="5" height="8" fill="#70402e" />
          <rect x="54" y="51" width="5" height="8" fill="#70402e" />
          <rect x="40" y="56" width="14" height="6" fill="#70402e" />
          <rect x="32" y="60" width="30" height="18" fill="#11131a" />
          <rect x="37" y="60" width="4" height="18" fill="#454854" />
          <rect x="53" y="60" width="4" height="18" fill="#454854" />
          <rect x="44" y="62" width="6" height="10" fill="#090a0f" />
          <rect x="34" y="78" width="10" height="13" fill="#0b0d13" />
          <rect x="50" y="78" width="10" height="13" fill="#0b0d13" />
          <rect x="30" y="90" width="15" height="4" fill="#343743" />
          <rect x="49" y="90" width="15" height="4" fill="#343743" />
        </g>

        {/* Camila: franja reta, olhos castanhos e reflexos bordô */}
        <g aria-label="Camila">
          <rect x="99" y="25" width="29" height="5" fill="#29151b" />
          <rect x="94" y="30" width="39" height="8" fill="#29151b" />
          <rect x="92" y="37" width="7" height="30" fill="#29151b" />
          <rect x="128" y="37" width="7" height="30" fill="#29151b" />
          <rect x="99" y="34" width="29" height="23" fill="#bd795f" />
          <rect x="99" y="34" width="29" height="7" fill="#29151b" />
          <rect x="99" y="40" width="5" height="4" fill="#29151b" />
          <rect x="105" y="40" width="5" height="3" fill="#29151b" />
          <rect x="111" y="40" width="5" height="4" fill="#29151b" />
          <rect x="117" y="40" width="5" height="3" fill="#29151b" />
          <rect x="123" y="40" width="5" height="4" fill="#29151b" />
          <rect x="102" y="46" width="5" height="4" fill="#6e442e" />
          <rect x="120" y="46" width="5" height="4" fill="#6e442e" />
          <rect x="109" y="53" width="9" height="3" fill="#8e3f51" />
          <rect x="92" y="44" width="4" height="20" fill="#70243f" />
          <rect x="130" y="42" width="4" height="24" fill="#70243f" />
          <rect x="96" y="58" width="35" height="20" fill="#541d3c" />
          <rect x="104" y="58" width="19" height="5" fill="#7c2858" />
          <rect x="100" y="78" width="11" height="13" fill="#1a1225" />
          <rect x="117" y="78" width="11" height="13" fill="#1a1225" />
          <rect x="97" y="90" width="15" height="4" fill="#6f2a55" />
          <rect x="116" y="90" width="15" height="4" fill="#6f2a55" />
        </g>

        <rect x="76" y="35" width="8" height="8" fill="#ff4fb3" />
        <rect x="72" y="31" width="4" height="8" fill="#ff4fb3" />
        <rect x="84" y="31" width="4" height="8" fill="#ff4fb3" />
        <rect x="76" y="43" width="8" height="4" fill="#ff4fb3" />
      </svg>

      <figcaption className="grid grid-cols-2 border-t-2 border-[var(--neon-cyan)] bg-black/90 font-display text-[7px] tracking-wider sm:text-[8px]">
        <span className="border-r border-[var(--neon-cyan)] px-2 py-2 text-[#e7bd55]">
          SAMUEL · P1
        </span>
        <span className="px-2 py-2 text-[#d36b9c]">CAMILA · P2</span>
      </figcaption>
    </figure>
  );
}
