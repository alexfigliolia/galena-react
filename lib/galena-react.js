'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var galena = require('galena');
var _inheritsLoose = require('@babel/runtime/helpers/inheritsLoose');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _inheritsLoose__default = /*#__PURE__*/_interopDefaultLegacy(_inheritsLoose);

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

var ContextFactory = /*#__PURE__*/function () {
  function ContextFactory(stateName) {
    this.Context = void 0;
    this.ProviderFactory = void 0;

    if (!galena.Empire.getState(stateName)) {
      throw new Error("A state fragment by the name of " + stateName + " has not been created yet");
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


  var _proto = ContextFactory.prototype;

  _proto.createProvider = function createProvider(stateName) {
    var Context = this.Context;
    return /*#__PURE__*/function (_Component) {
      _inheritsLoose__default["default"](ProviderFactory, _Component);

      function ProviderFactory(props) {
        var _this;

        _this = _Component.call(this, props) || this;
        _this.mounted = true;
        _this.subscription = void 0;
        _this.state = galena.Empire.getState(stateName).state;
        _this.subscription = _this.initializeSubscription();
        return _this;
      }

      var _proto2 = ProviderFactory.prototype;

      _proto2.initializeSubscription = function initializeSubscription() {
        var _this2 = this;

        return galena.Empire.getState(stateName).subscribe(function (state) {
          if (_this2.mounted) {
            _this2.setState(state);
          }
        });
      };

      _proto2.componentWillUnmount = function componentWillUnmount() {
        this.mounted = false;

        if (this.subscription) {
          galena.Empire.getState(stateName).unsubscribe(this.subscription);
        }
      };

      _proto2.render = function render() {
        return React__default["default"].createElement(Context.Provider, {
          value: this.state
        }, this.props.children);
      };

      return ProviderFactory;
    }(React.Component);
  };

  return ContextFactory;
}();

exports.ContextFactory = ContextFactory;
exports.useEmpireState = useEmpireState;
exports.useGalenaMutation = useGalenaMutation;
exports.useGalenaState = useGalenaState;
