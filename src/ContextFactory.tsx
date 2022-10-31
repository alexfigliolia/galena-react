import { Empire } from "galena";
import React, { Component, createContext } from "react";
import type { Context, ComponentType } from "react";

/**
 * Context Factory
 *
 * A Factory for creating contexts from your state fragments.
 * Returns a Context and a ProviderFactory subscribed to your]
 * state fragment
 *
 * `const { Context, ProviderFactory } = new ContextFactory("state-name");`
 */
export class ContextFactory<T> {
  Context: Context<T>;
  ProviderFactory: ComponentType<T>;
  constructor(stateName: string) {
    if (!Empire.getState<T>(stateName)) {
      throw new Error(`A state fragment by the name of ${stateName} has not been created yet`);
    }
    this.Context = createContext<T>(Empire.getState<T>(stateName).state);
    this.ProviderFactory = this.createProvider(stateName);
  }

  /**
   * Create Provider
   *
   * Returns a Context.Provider with a living subscription to your
   * specified state fragment
   */
  createProvider(stateName: string) {
    const { Context } = this;
    return class ProviderFactory extends Component<any, T> {
      mounted = true;
      subscription: string;
      constructor(props: any) {
        super(props);
        this.state = Empire.getState<T>(stateName).state;
        this.subscription = this.initializeSubscription();
      }

      initializeSubscription() {
        return Empire.getState<T>(stateName).subscribe((state) => {
          if (this.mounted) {
            this.setState(state);
          }
        });
      }

      componentWillUnmount() {
        this.mounted = false;
        if (this.subscription) {
          Empire.getState<T>(stateName).unsubscribe(this.subscription);
        }
      }

      render() {
        return <Context.Provider value={this.state}>{this.props.children}</Context.Provider>;
      }
    };
  }
}
