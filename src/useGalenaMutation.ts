import { Empire } from "galena";

/**
 * Use Galena Mutation
 *
 * Returns the `update` method of your specified state fragment
 */
export function useGalenaMutation<T = any>(stateName: string) {
  return Empire.getState<T>(stateName).update;
}
