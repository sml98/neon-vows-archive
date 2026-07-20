import { useCallback, useState } from "react";
import { useAventuraState, type PhaseId } from "@/lib/aventura/useAventuraState";
import { useBeep } from "@/lib/aventura/useBeep";

/**
 * Controlador centralizado da aventura
 * Encapsula toda a lógica de gerenciamento de estado e interações
 * Simplifica o componente AventuraPage
 */
export function useAventuraController() {
  const state = useAventuraState();
  const { beep, setMuted, playFreq } = useBeep();
  const [muted, setMutedState] = useState(false);

  /**
   * Alterna o estado de som
   */
  const toggleMute = useCallback(() => {
    const next = !muted;
    setMuted(next);
    setMutedState(next);
    if (!next) beep("click");
  }, [muted, setMuted, beep]);

  /**
   * Avança para a próxima fase e registra achievement da fase atual
   * @param from - ID da fase atual
   * @param to - ID da próxima fase
   */
  const advance = useCallback(
    (from: PhaseId, to: PhaseId) => {
      state.unlock(from);
      state.goTo(to);
    },
    [state]
  );

  return {
    phase: state.phase,
    achievements: state.achievements,
    gift: state.gift,
    muted,
    toggleMute,
    advance,
    beep,
    playFreq,
  };
}
