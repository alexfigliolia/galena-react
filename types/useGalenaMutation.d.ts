/**
 * Use Galena Mutation
 *
 * Returns the `update` method of your specified state fragment
 */
export declare function useGalenaMutation<T = any>(stateName: string): (func: (state: T) => void) => void;
