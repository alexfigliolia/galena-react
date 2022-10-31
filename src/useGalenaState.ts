import { useState, useEffect } from "react";
import { Empire } from "galena";

/**
 * Use Galena State
 *
 * Creates a global subscription your specified state fragment
 * and returns it's stateful value
 */
export function useGalenaState<T, P = T>(stateName: string, connect: (state: T) => P, defaultValue?: T) {
  const [state, setState] = useState<P>(connect(Empire.getState<T>(stateName).state || (defaultValue as T)));
  useEffect(() => {
    const ID = Empire.getState<T>(stateName)?.subscribe((stateFragment) => {
      const nextState = connect(stateFragment);
      if (nextState !== state) {
        setState(nextState);
      }
    });
    return () => Empire.getState<T>(stateName)?.unsubscribe(ID);
  }, []);
  return state;
}
