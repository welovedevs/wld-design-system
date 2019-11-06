"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tooltip = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactJss = require("react-jss");

var _lodash = require("lodash");

var _reactSpring = require("react-spring");

var _popper_card = require("../popper_card/popper_card");

var _use_opener_state = require("../../../utils/hooks/use_opener_state");

var _tooltip_styles = require("./tooltip_styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useStyles = (0, _reactJss.createUseStyles)(_tooltip_styles.styles);

var fusionFunctions = function fusionFunctions() {
  for (var _len = arguments.length, functions = new Array(_len), _key = 0; _key < _len; _key++) {
    functions[_key] = arguments[_key];
  }

  return function () {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    functions.forEach(function (fn) {
      if (typeof fn === 'function') {
        fn.apply(void 0, args);
      }
    });
  };
};

var TooltipComponent = function TooltipComponent(_ref) {
  var title = _ref.title,
      placement = _ref.placement,
      children = _ref.children;
  var classes = useStyles();
  var anchorReference = (0, _react.useRef)();

  var _useOpenerState = (0, _use_opener_state.useOpenerState)(),
      _useOpenerState2 = _slicedToArray(_useOpenerState, 2),
      open = _useOpenerState2[0],
      eventsHandlerElementProps = _useOpenerState2[1];

  var generateChildProps = (0, _react.useCallback)(function (child) {
    if (!eventsHandlerElementProps) {
      return {};
    }

    var props = child.props;
    return _objectSpread({
      ref: anchorReference
    }, Object.entries(eventsHandlerElementProps).reduce(function (acc, _ref2) {
      var _ref3 = _slicedToArray(_ref2, 2),
          eventKey = _ref3[0],
          eventFn = _ref3[1];

      var newAcc = _objectSpread({}, acc);

      var inPropsFunction = props[eventKey];

      if (inPropsFunction) {
        newAcc[eventKey] = fusionFunctions(inPropsFunction, eventFn);
      } else {
        newAcc[eventKey] = eventFn;
      }

      return newAcc;
    }, props || {}));
  }, [eventsHandlerElementProps, anchorReference]);
  var generateChildChildren = (0, _react.useCallback)(function (child) {
    var childChildren = (0, _lodash.get)(child, 'props.children');
    return _react2["default"].createElement(_react2["default"].Fragment, null, childChildren, _react2["default"].createElement(TooltipPopper, _extends({
      anchorElement: anchorReference.current
    }, {
      title: title,
      open: open,
      placement: placement,
      classes: classes
    })));
  }, [open, anchorReference, title, placement, classes]);
  return (0, _react.cloneElement)(children, generateChildProps(children), generateChildChildren(children));
};

var TooltipPopper = function TooltipPopper(_ref4) {
  var title = _ref4.title,
      open = _ref4.open,
      anchorElement = _ref4.anchorElement,
      classes = _ref4.classes;
  return _react2["default"].createElement(_popper_card.PopperCard, _extends({
    dismissArrow: true
  }, {
    open: open,
    anchorElement: anchorElement
  }, {
    springOptions: {
      config: _reactSpring.config.stiff
    },
    customClasses: {
      popper: classes.popper,
      container: classes.container
    },
    popperProps: {
      placement: 'top',
      modifiers: {
        preventOverflow: {
          boundariesElement: 'viewport'
        },
        arrow: {
          enabled: false
        }
      }
    }
  }), title);
};

var Tooltip = exports.Tooltip = TooltipComponent;