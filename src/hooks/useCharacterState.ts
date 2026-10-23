import { useCallback, useEffect, useRef, useState } from 'react';
import type { CharacterState } from '../types';

/**
 * Gère l'humeur du personnage : une humeur de fond (base) et des humeurs
 * passagères (flash) qui reviennent automatiquement à la base.
 */
export function useCharacterState(initial: CharacterState = 'idle') {
  const [baseState, setBaseState] = useState<CharacterState>(initial);
  const [state, setState] = useState<CharacterState>(initial);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setState(baseState);
  }, [baseState]);

  const flash = useCallback(
    (next: CharacterState, duration = 1800) => {
      if (timer.current) clearTimeout(timer.current);
      setState(next);
      timer.current = setTimeout(() => setState(baseState), duration);
    },
    [baseState],
  );

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  return { state, flash, setBaseState };
}