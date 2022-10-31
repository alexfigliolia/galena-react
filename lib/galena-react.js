'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var _inheritsLoose = require('@babel/runtime/helpers/inheritsLoose');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _inheritsLoose__default = /*#__PURE__*/_interopDefaultLegacy(_inheritsLoose);

/**
 * Galena Hook Factory
 *
 * Generates a `useGalenaState` hook for a given state fragment
 */

function galenaHookFactory(stateFragment) {
  return function useGalenaState(connect) {
    var _useState = React.useState(connect(stateFragment.state)),
        state = _useState[0],
        setState = _useState[1];

    React.useEffect(function () {
      var ID = stateFragment.subscribe(function (nextState) {
        var next = connect(nextState);

        if (next !== state) {
          setState(next);
        }
      });
      return function () {
        return stateFragment.unsubscribe(ID);
      };
    });
    return state;
  };
}

/**
 * Empire Hook Factory
 *
 * Generates a `useEmpireState` hook for a given state fragment
 */

function empireHookFactory(empire) {
  return function useEmpireState(connect) {
    var _useState = React.useState(connect(empire.state)),
        state = _useState[0],
        setState = _useState[1];

    React.useEffect(function () {
      var ID = empire.subscribe(function (nextState) {
        var next = connect(nextState);

        if (next !== state) {
          setState(next);
        }
      });
      return function () {
        return empire.unsubscribe(ID);
      };
    });
    return state;
  };
}

/**
 * Mutation Factory
 *
 * Generates a `useMutation` hook for a given state fragment
 */
function mutationFactory(stateFragment) {
  return function useMutation() {
    return stateFragment.update;
  };
}

/**
 * Context Factory
 *
 * A Factory for creating contexts from your state fragments.
 * Returns a Context and a ProviderFactory subscribed to your
 * state fragment
 *
 * `const { Context, ProviderFactory } = new ContextFactory(MyState);`
 */

var ContextFactory = /*#__PURE__*/function () {
  function ContextFactory(stateFragment) {
    this.Context = void 0;
    this.ProviderFactory = void 0;
    this.Context = React.createContext(stateFragment.state);
    this.ProviderFactory = this.createProvider(stateFragment);
  }
  /**
   * Create Provider
   *
   * Returns a Context.Provider with a living subscription to your
   * specified state fragment
   */


  var _proto = ContextFactory.prototype;

  _proto.createProvider = function createProvider(stateFragment) {
    var Context = this.Context;
    return /*#__PURE__*/function (_Component) {
      _inheritsLoose__default["default"](ProviderFactory, _Component);

      function ProviderFactory(props) {
        var _this;

        _this = _Component.call(this, props) || this;
        _this.mounted = true;
        _this.subscription = void 0;
        _this.stateFragment = void 0;
        _this.state = stateFragment.state;
        _this.stateFragment = stateFragment;
        _this.subscription = _this.initializeSubscription();
        return _this;
      }

      var _proto2 = ProviderFactory.prototype;

      _proto2.initializeSubscription = function initializeSubscription() {
        var _this2 = this;

        return this.stateFragment.subscribe(function (state) {
          if (_this2.mounted) {
            _this2.setState(state);
          }
        });
      };

      _proto2.componentWillUnmount = function componentWillUnmount() {
        this.mounted = false;

        if (this.subscription) {
          this.stateFragment.unsubscribe(this.subscription);
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
exports.empireHookFactory = empireHookFactory;
exports.galenaHookFactory = galenaHookFactory;
exports.mutationFactory = mutationFactory;
