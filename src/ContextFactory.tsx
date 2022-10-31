import React, { Component, createContext } from "react";
import type { Context, ComponentType } from "react";
import { State } from "galena";

/**
 * Context Factory
 *
 * A Factory for creating contexts from your state fragments.
 * Returns a Context and a ProviderFactory subscribed to your
 * state fragment
 *
 * `const { Context, ProviderFactory } = new ContextFactory(MyState);`
 */
export class ContextFactory<T> {
  Context: Context<T>;
  ProviderFactory: ComponentType<T>;
  constructor(stateFragment: State<T>) {
    this.Context = createContext<T>(stateFragment.state);
    this.ProviderFactory = this.createProvider(stateFragment);
  }

  /**
   * Create Provider
   *
   * Returns a Context.Provider with a living subscription to your
   * specified state fragment
   */
  createProvider(stateFragment: State<T>) {
    const { Context } = this;
    return class ProviderFactory extends Component<any, T> {
      mounted = true;
      subscription: string;
      stateFragment: State<T>;
      constructor(props: any) {
        super(props);
        this.state = stateFragment.state;
        this.stateFragment = stateFragment;
        this.subscription = this.initializeSubscription();
      }

      initializeSubscription() {
        return this.stateFragment.subscribe((state) => {
          if (this.mounted) {
            this.setState(state);
          }
        });
      }

      componentWillUnmount() {
        this.mounted = false;
        if (this.subscription) {
          this.stateFragment.unsubscribe(this.subscription);
        }
      }

      render() {
        return <Context.Provider value={this.state}>{this.props.children}</Context.Provider>;
      }
    };
  }
}
