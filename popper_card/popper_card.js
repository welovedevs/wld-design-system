"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PopperCard = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _reactJss = require("react-jss");

var _reactJss2 = _interopRequireDefault(_reactJss);

var _reactSpring = require("react-spring");

var _core = require("@material-ui/core");

var _card = require("../card/card");

var _popper_card_styles = require("./popper_card_styles");

var _popper_card_styles2 = _interopRequireDefault(_popper_card_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var SpeechBubbleArrow = function SpeechBubbleArrow(props) {
  return /*#__PURE__*/_react2["default"].createElement("svg", props, /*#__PURE__*/_react2["default"].createElement("title", null, "Rectangle Copy@2x (1)"), /*#__PURE__*/_react2["default"].createElement("g", {
    fill: "none",
    fillRule: "evenodd"
  }, /*#__PURE__*/_react2["default"].createElement("path", {
    d: "M9.404 10.823l5.156-9.28a3 3 0 0 1 5.25.01l5.09 9.239a10 10 0 0 0 8.758 5.175H.663a10 10 0 0 0 8.741-5.144z",
    fill: "#000",
    fillRule: "nonzero"
  }), /*#__PURE__*/_react2["default"].createElement("path", {
    d: "M9.404 10.823l5.156-9.28a3 3 0 0 1 5.25.01l5.09 9.239a10 10 0 0 0 8.758 5.175H.663a10 10 0 0 0 8.741-5.144z",
    fill: "#FFF"
  })));
};

SpeechBubbleArrow.defaultProps = {
  width: "34",
  height: "16",
  viewBox: "0 0 34 16",
  xmlns: "http://www.w3.org/2000/svg"
};

var PopperCardComponent = function PopperCardComponent(_ref) {
  var className = _ref.className,
      anchorElement = _ref.anchorElement,
      open = _ref.open,
      onClose = _ref.onClose,
      popperProps = _ref.popperProps,
      structured = _ref.structured,
      onClickAway = _ref.onClickAway,
      _ref$dismissArrow = _ref.dismissArrow,
      dismissArrow = _ref$dismissArrow === void 0 ? false : _ref$dismissArrow,
      _ref$springOptions = _ref.springOptions,
      springOptions = _ref$springOptions === void 0 ? {} : _ref$springOptions,
      _ref$customClasses = _ref.customClasses,
      customClasses = _ref$customClasses === void 0 ? {} : _ref$customClasses,
      classes = _ref.classes,
      _ref$containerProps = _ref.containerProps,
      containerProps = _ref$containerProps === void 0 ? {} : _ref$containerProps,
      other = _objectWithoutProperties(_ref, ["className", "anchorElement", "open", "onClose", "popperProps", "structured", "onClickAway", "dismissArrow", "springOptions", "customClasses", "classes", "containerProps"]);

  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      arrowReference = _useState2[0],
      setArrowReference = _useState2[1];

  return /*#__PURE__*/_react2["default"].createElement(_core.Popper, _extends({
    open: open
  }, containerProps, {
    className: (0, _classnames2["default"])(classes.popper, !open && classes.closedPopper, customClasses.popper, containerProps.className),
    anchorEl: anchorElement
  }, popperProps, {
    modifiers: _objectSpread({
      flip: {
        enabled: true
      },
      preventOverflow: {
        enabled: true,
        boundariesElement: 'scrollParent'
      },
      arrow: {
        enabled: !dismissArrow,
        element: arrowReference
      }
    }, popperProps && popperProps.modifiers),
    transition: true
  }), function (_ref2) {
    var TransitionProps = _ref2.TransitionProps;
    return /*#__PURE__*/_react2["default"].createElement(Fade, _extends({}, TransitionProps, {
      springOptions: springOptions,
      popperProps: popperProps
    }), /*#__PURE__*/_react2["default"].createElement(Content, _objectSpread({
      className: className,
      setArrowReference: setArrowReference,
      structured: structured,
      dismissArrow: dismissArrow,
      onClickAway: onClickAway,
      classes: classes,
      customClasses: customClasses
    }, other)));
  });
};

var Fade = _react2["default"].forwardRef(function (props, ref) {
  var open = props["in"],
      children = props.children,
      onEnter = props.onEnter,
      onExited = props.onExited,
      springOptions = props.springOptions,
      popperProps = props.popperProps,
      other = _objectWithoutProperties(props, ["in", "children", "onEnter", "onExited", "springOptions", "popperProps"]);

  var getTranslationFromPlacement = (0, _react.useCallback)(function (value) {
    var placement = popperProps && popperProps.placement || 'bottom';

    if (['top', 'bottom'].some(function (key) {
      return placement === key;
    })) {
      return "translate3d(0, ".concat(value, "px, 0)");
    }

    return "translate3d(-".concat(value, "px, 0, 0)");
  }, []);
  var style = (0, _reactSpring.useSpring)(_objectSpread({
    from: {
      opacity: 0,
      pointerEvents: 'none',
      transform: getTranslationFromPlacement(20)
    },
    to: {
      opacity: open ? 1 : 0,
      pointerEvents: open ? 'all' : 'none',
      transform: getTranslationFromPlacement(open ? 0 : 20)
    },
    config: _reactSpring.config["default"]
  }, springOptions, {
    onStart: function onStart() {
      // This cause the following error: Cannot update a component from inside the function body of a different component.
      // It is a pattern documented in the Transition section of Material-UI docs, waiting for a possible update.
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: function onRest() {
      if (!open && onExited) {
        onExited();
      }
    }
  }));
  return /*#__PURE__*/_react2["default"].createElement(_reactSpring.animated.div, _extends({
    ref: ref,
    style: style
  }, other), children);
});

var Content = function Content(_ref3) {
  var className = _ref3.className,
      dismissArrow = _ref3.dismissArrow,
      translation = _ref3.translation,
      setArrowReference = _ref3.setArrowReference,
      onClickAway = _ref3.onClickAway,
      structured = _ref3.structured,
      classes = _ref3.classes,
      customClasses = _ref3.customClasses,
      other = _objectWithoutProperties(_ref3, ["className", "dismissArrow", "translation", "setArrowReference", "onClickAway", "structured", "classes", "customClasses"]);

  var handleClickAway = (0, _react.useCallback)(function () {
    if (typeof onClickAway === 'function') {
      onClickAway.apply(void 0, arguments);
    }
  }, [onClickAway]);

  var content = /*#__PURE__*/_react2["default"].createElement("div", {
    className: classes.wrapper
  }, !dismissArrow && /*#__PURE__*/_react2["default"].createElement("div", {
    className: (0, _classnames2["default"])(classes.arrowContainer, customClasses.arrowContainer),
    ref: setArrowReference
  }, /*#__PURE__*/_react2["default"].createElement(SpeechBubbleArrow, null)), /*#__PURE__*/_react2["default"].createElement(_card.Card, _extends({
    className: (0, _classnames2["default"])(className, classes.container, customClasses.container, structured && classes.structured)
  }, other)));

  if (onClickAway) {
    return /*#__PURE__*/_react2["default"].createElement(_core.ClickAwayListener, {
      onClickAway: handleClickAway
    }, content);
  }

  return content;
};

var PopperCard = exports.PopperCard = (0, _reactJss2["default"])(_popper_card_styles2["default"])(PopperCardComponent);