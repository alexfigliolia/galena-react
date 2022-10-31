import type { State, Empire } from "galena";
import { useState, useEffect } from "react";

/**
 * Empire Hook Factory
 *
 * Generates a `useEmpireState` hook for a given state fragment
 */
export function empireHookFactory<P>(empire: Empire) {
  return function useEmpireState(connect: (empireState: Map<string, State<any>>) => P) {
    const [state, setState] = useState(connect(empire.state));
    useEffect(() => {
      const ID = empire.subscribe((nextState) => {
        const next = connect(nextState);
        if (next !== state) {
          setState(next);
        }
      });
      return () => empire.unsubscribe(ID);
    });
    return state;
  };
}
