import type { State, Empire } from "galena";
/**
 * Empire Hook Factory
 *
 * Generates a `useEmpireState` hook for a given state fragment
 */
export declare function empireHookFactory<P>(empire: Empire): (connect: (empireState: Map<string, State<any>>) => P) => P;
