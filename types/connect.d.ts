import type { ComponentType } from "react";
import type { State } from "galena";
/**
 * Connect
 *
 * Wraps React components while injecting `Galena` state
 */
export declare function connect<GalenaProps, OwnProps = Record<string, unknown>>(useSubscriptionHook: (state: Map<string, State<any>>) => GalenaProps): (Component: ComponentType<GalenaProps & OwnProps>) => (props?: OwnProps) => JSX.Element;
