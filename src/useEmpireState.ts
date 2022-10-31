import { useState, useEffect } from "react";
import { Empire } from "galena";
import type { State } from "galena";

/**
 * Use Empire State
 *
 * Creates a global subscription to the `Empire` state and
 * returns it's value
 */
export function useEmpireState<T>(connect: (state: Map<string, State<any>>) => T) {
  const [state, setState] = useState(connect(Empire.state));
  useEffect(() => {
    const ID = Empire.subscribe((state) => {
      setState(connect(state));
    });
    return () => Empire.unsubscribe(ID);
  }, []);
  return state;
}
