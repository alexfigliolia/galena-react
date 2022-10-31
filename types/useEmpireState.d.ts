import type { State } from "galena";
/**
 * Use Empire State
 *
 * Creates a global subscription to the `Empire` state and
 * returns it's value
 */
export declare function useEmpireState<T>(connect: (state: Map<string, State<any>>) => T): T;
