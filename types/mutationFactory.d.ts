import type { State } from "galena";
/**
 * Mutation Factory
 *
 * Generates a `useMutation` hook for a given state fragment
 */
export declare function mutationFactory<T>(stateFragment: State<T>): () => (func: (state: T) => void) => void;
