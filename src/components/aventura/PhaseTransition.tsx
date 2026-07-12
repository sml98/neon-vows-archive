import type { ReactNode } from "react";

export function PhaseTransition({
  keyId,
  children,
}: {
  keyId: string | number;
  children: ReactNode;
}) {
  return (
    <div key={keyId} className="w-full flex flex-col items-center animate-glitch-fade">
      {children}
    </div>
  );
}
