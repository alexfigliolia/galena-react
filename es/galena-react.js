import React, { useState, useEffect, Component, createContext } from 'react';
import { Empire } from 'galena';
import _inheritsLoose from '@babel/runtime/helpers/esm/inheritsLoose';

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

var ContextFactory = /*#__PURE__*/function () {
  function ContextFactory(stateName) {
    this.Context = void 0;
    this.ProviderFactory = void 0;

    if (!Empire.getState(stateName)) {
      throw new Error("A state fragment by the name of " + stateName + " has not been created yet");
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


  var _proto = ContextFactory.prototype;

  _proto.createProvider = function createProvider(stateName) {
    var Context = this.Context;
    return /*#__PURE__*/function (_Component) {
      _inheritsLoose(ProviderFactory, _Component);

      function ProviderFactory(props) {
        var _this;

        _this = _Component.call(this, props) || this;
        _this.mounted = true;
        _this.subscription = void 0;
        _this.state = Empire.getState(stateName).state;
        _this.subscription = _this.initializeSubscription();
        return _this;
      }

      var _proto2 = ProviderFactory.prototype;

      _proto2.initializeSubscription = function initializeSubscription() {
        var _this2 = this;

        return Empire.getState(stateName).subscribe(function (state) {
          if (_this2.mounted) {
            _this2.setState(state);
          }
        });
      };

      _proto2.componentWillUnmount = function componentWillUnmount() {
        this.mounted = false;

        if (this.subscription) {
          Empire.getState(stateName).unsubscribe(this.subscription);
        }
      };

      _proto2.render = function render() {
        return React.createElement(Context.Provider, {
          value: this.state
        }, this.props.children);
      };

      return ProviderFactory;
    }(Component);
  };

  return ContextFactory;
}();

export { ContextFactory, useEmpireState, useGalenaMutation, useGalenaState };
