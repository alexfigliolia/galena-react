'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var galena = require('galena');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

/**
 * Use Galena State
 *
 * Creates a global subscription your specified state fragment
 * and returns it's stateful value
 */

function useGalenaState(stateName, connect, defaultValue) {
  var _useState = React.useState(connect(galena.Empire.getState(stateName).state || defaultValue)),
      state = _useState[0],
      setState = _useState[1];

  React.useEffect(function () {
    var _Empire$getState;

    var ID = (_Empire$getState = galena.Empire.getState(stateName)) == null ? void 0 : _Empire$getState.subscribe(function (stateFragment) {
      var nextState = connect(stateFragment);

      if (nextState !== state) {
        setState(nextState);
      }
    });
    return function () {
      var _Empire$getState2;

      return (_Empire$getState2 = galena.Empire.getState(stateName)) == null ? void 0 : _Empire$getState2.unsubscribe(ID);
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
  var _useState = React.useState(connect(galena.Empire.state)),
      state = _useState[0],
      setState = _useState[1];

  React.useEffect(function () {
    var ID = galena.Empire.subscribe(function (state) {
      setState(connect(state));
    });
    return function () {
      return galena.Empire.unsubscribe(ID);
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
  return galena.Empire.getState(stateName).update;
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
        if (!galena.Empire.getState(stateName)) {
            throw new Error(`A state fragment by the name of ${stateName} has not been created yet`);
        }
        this.Context = React.createContext(galena.Empire.getState(stateName).state);
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
        return class ProviderFactory extends React.Component {
            mounted = true;
            subscription;
            constructor(props) {
                super(props);
                this.state = galena.Empire.getState(stateName).state;
                this.subscription = this.initializeSubscription();
            }
            initializeSubscription() {
                return galena.Empire.getState(stateName).subscribe((state) => {
                    if (this.mounted) {
                        this.setState(state);
                    }
                });
            }
            componentWillUnmount() {
                this.mounted = false;
                if (this.subscription) {
                    galena.Empire.getState(stateName).unsubscribe(this.subscription);
                }
            }
            render() {
                return React__default["default"].createElement(Context.Provider, { value: this.state }, this.props.children);
            }
        };
    }
}

exports.ContextFactory = ContextFactory;
exports.useEmpireState = useEmpireState;
exports.useGalenaMutation = useGalenaMutation;
exports.useGalenaState = useGalenaState;
