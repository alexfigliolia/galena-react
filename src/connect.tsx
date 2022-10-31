import React from "react";
import type { ComponentType } from "react";
import { Empire } from "galena";
import type { State } from "galena";

/**
 * Connect
 *
 * Wraps React components while injecting `Galena` state
 */
export function connect<GalenaProps, OwnProps = Record<string, unknown>>(
  useSubscriptionHook: (state: Map<string, State<any>>) => GalenaProps
) {
  function Wrap(Component: ComponentType<GalenaProps & OwnProps>) {
    // @ts-ignore
    function ConnectedState(props: OwnProps = {}) {
      const state = useSubscriptionHook(Empire.state);
      // @ts-ignore
      return <Component {...props} {...state} />;
    }

    return ConnectedState;
  }

  return Wrap;
}
