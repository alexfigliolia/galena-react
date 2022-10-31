/**
 * Use Galena State
 *
 * Creates a global subscription your specified state fragment
 * and returns it's stateful value
 */
export declare function useGalenaState<T, P = T>(stateName: string, connect: (state: T) => P, defaultValue?: T): P;
