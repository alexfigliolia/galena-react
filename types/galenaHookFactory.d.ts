import type { State } from "galena";
/**
 * Galena Hook Factory
 *
 * Generates a `useGalenaState` hook for a given state fragment
 */
export declare function galenaHookFactory<T, P = T>(stateFragment: State<T>): (connect: (currentState: T) => P) => P;
