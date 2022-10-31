import type { State } from "galena";

/**
 * Mutation Factory
 *
 * Generates a `useMutation` hook for a given state fragment
 */
export function mutationFactory<T>(stateFragment: State<T>) {
  return function useMutation() {
    return stateFragment.update;
  };
}
