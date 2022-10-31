import React, { useState, useEffect, createContext, Component } from 'react';
import { Empire } from 'galena';

/**
 * Use Galena State
 *
 * Creates a global subscription your specified state fragment
 * and returns it's stateful value
 */

function useGalenaState(stateName, connect, defaultValue) {
  var _useState = useState(connect(Empire.getState(stateName).state || defaultValue)),
      state = _useState[0],
      setState = _useState[1];

  useEffect(function () {
    var _Empire$getState;

    var ID = (_Empire$getState = Empire.getState(stateName)) == null ? void 0 : _Empire$getState.subscribe(function (stateFragment) {
      var nextState = connect(stateFragment);

      if (nextState !== state) {
        setState(nextState);
      }
    });
    return function () {
      var _Empire$getState2;

      return (_Empire$getState2 = Empire.getState(stateName)) == null ? void 0 : _Empire$getState2.unsubscribe(ID);
    };
  }, []);
  return state;
}

/**
 * Use Empire State
 *
 * Creates a global subscription to the `Empire` state and
 * returns it's value
 */

function useEmpireState(connect) {
  var _useState = useState(connect(Empire.state)),
      state = _useState[0],
      setState = _useState[1];

  useEffect(function () {
    var ID = Empire.subscribe(function (state) {
      setState(connect(state));
    });
    return function () {
      return Empire.unsubscribe(ID);
    };
  }, []);
  return state;
}

/**
 * Use Galena Mutation
 *
 * Returns the `update` method of your specified state fragment
 */

function useGalenaMutation(stateName) {
  return Empire.getState(stateName).update;
}

/**
 * Context Factory
 *
 * A Factory for creating contexts from your state fragments.
 * Returns a Context and a ProviderFactory subscribed to your]
 * state fragment
 *
 * `const { Context, ProviderFactory } = new ContextFactory("state-name");`
 */
class ContextFactory {
    Context;
    ProviderFactory;
    constructor(stateName) {
        if (!Empire.getState(stateName)) {
            throw new Error(`A state fragment by the name of ${stateName} has not been created yet`);
        }
        this.Context = createContext(Empire.getState(stateName).state);
        this.ProviderFactory = this.createProvider(stateName);
    }
    /**
     * Create Provider
     *
     * Returns a Context.Provider with a living subscription to your
     * specified state fragment
     */
    createProvider(stateName) {
        const { Context } = this;
        return class ProviderFactory extends Component {
            mounted = true;
            subscription;
            constructor(props) {
                super(props);
                this.state = Empire.getState(stateName).state;
                this.subscription = this.initializeSubscription();
            }
            initializeSubscription() {
                return Empire.getState(stateName).subscribe((state) => {
                    if (this.mounted) {
                        this.setState(state);
                    }
                });
            }
            componentWillUnmount() {
                this.mounted = false;
                if (this.subscription) {
                    Empire.getState(stateName).unsubscribe(this.subscription);
                }
            }
            render() {
                return React.createElement(Context.Provider, { value: this.state }, this.props.children);
            }
        };
    }
}

export { ContextFactory, useEmpireState, useGalenaMutation, useGalenaState };
