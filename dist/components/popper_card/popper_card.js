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

var _speech_bubble_arrow = require("../../../assets/images/assets/icons/speech_bubble_arrow.svg");

var _speech_bubble_arrow2 = _interopRequireDefault(_speech_bubble_arrow);

var _popper_card_styles = require("./popper_card_styles");

var _popper_card_styles2 = _interopRequireDefault(_popper_card_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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

  var _useSpring = (0, _reactSpring.useSpring)(_objectSpread({
    opacity: open ? 1 : 0,
    pointerEvents: open ? 'all' : 'none',
    translation: open ? 0 : 20,
    config: _reactSpring.config["default"]
  }, springOptions)),
      opacity = _useSpring.opacity,
      pointerEvents = _useSpring.pointerEvents,
      translation = _useSpring.translation;

  var getTranslationInterpolationFromPlacement = (0, _react.useCallback)(function (value) {
    var placement = popperProps && popperProps.placement || 'bottom';

    if (['top', 'bottom'].some(function (key) {
      return placement === key;
    })) {
      return "translate3d(0, ".concat(value, "px, 0)");
    }

    return "translate3d(-".concat(value, "px, 0, 0)");
  });
  return _react2["default"].createElement(_core.Popper, _extends({
    open: true
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
    }, popperProps && popperProps.modifiers)
  }), _react2["default"].createElement(Content, _objectSpread({
    className: className,
    opacity: opacity,
    pointerEvents: pointerEvents,
    getTranslationInterpolationFromPlacement: getTranslationInterpolationFromPlacement,
    translation: translation,
    setArrowReference: setArrowReference,
    structured: structured,
    dismissArrow: dismissArrow,
    onClickAway: onClickAway,
    classes: classes,
    customClasses: customClasses
  }, other)));
};

var Content = function Content(_ref2) {
  var className = _ref2.className,
      opacity = _ref2.opacity,
      pointerEvents = _ref2.pointerEvents,
      getTranslationInterpolationFromPlacement = _ref2.getTranslationInterpolationFromPlacement,
      dismissArrow = _ref2.dismissArrow,
      translation = _ref2.translation,
      setArrowReference = _ref2.setArrowReference,
      onClickAway = _ref2.onClickAway,
      structured = _ref2.structured,
      classes = _ref2.classes,
      customClasses = _ref2.customClasses,
      other = _objectWithoutProperties(_ref2, ["className", "opacity", "pointerEvents", "getTranslationInterpolationFromPlacement", "dismissArrow", "translation", "setArrowReference", "onClickAway", "structured", "classes", "customClasses"]);

  var handleClickAway = (0, _react.useCallback)(function () {
    if (typeof onClickAway === 'function') {
      onClickAway.apply(void 0, arguments);
    }
  }, [onClickAway]);

  var content = _react2["default"].createElement(_reactSpring.animated.div, {
    className: classes.wrapper,
    style: {
      opacity: opacity,
      pointerEvents: pointerEvents,
      transform: translation.interpolate(getTranslationInterpolationFromPlacement)
    }
  }, !dismissArrow && _react2["default"].createElement("div", {
    className: classes.arrowContainer,
    ref: setArrowReference
  }, _react2["default"].createElement(_speech_bubble_arrow2["default"], null)), _react2["default"].createElement(_card.Card, _extends({
    className: (0, _classnames2["default"])(className, classes.container, customClasses.container, structured && classes.structured)
  }, other)));

  if (onClickAway) {
    return _react2["default"].createElement(_core.ClickAwayListener, {
      onClickAway: handleClickAway
    }, content);
  }

  return content;
};

var PopperCard = exports.PopperCard = (0, _reactJss2["default"])(_popper_card_styles2["default"])(PopperCardComponent);