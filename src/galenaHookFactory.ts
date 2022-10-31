import type { State } from "galena";
import { useState, useEffect } from "react";

/**
 * Galena Hook Factory
 *
 * Generates a `useGalenaState` hook for a given state fragment
 */
export function galenaHookFactory<T, P = T>(stateFragment: State<T>) {
  return function useGalenaState(connect: (currentState: T) => P) {
    const [state, setState] = useState(connect(stateFragment.state));
    useEffect(() => {
      const ID = stateFragment.subscribe((nextState) => {
        const next = connect(nextState);
        if (next !== state) {
          setState(next);
        }
      });
      return () => stateFragment.unsubscribe(ID);
    });
    return state;
  };
}
