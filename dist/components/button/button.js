"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Button = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _reactJss = require("react-jss");

var _reactJss2 = _interopRequireDefault(_reactJss);

var _reactSpring = require("react-spring");

var _typography = require("../typography/typography");

var _color_utils = require("../../styles/utils/color_utils");

var _palettes = require("../../styles/palettes");

var _palettes2 = _interopRequireDefault(_palettes);

var _button_styles = require("./button_styles");

var _button_styles2 = _interopRequireDefault(_button_styles);

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

var DEFAULT_BRIGHT_LAYER_SPRING_PROPS = {
  opacity: 0,
  config: _reactSpring.config.stiff
};

var ButtonComponent = function ButtonComponent(_ref) {
  var className = _ref.className,
      containerRef = _ref.containerRef,
      disabled = _ref.disabled,
      size = _ref.size,
      _ref$color = _ref.color,
      color = _ref$color === void 0 ? 'default' : _ref$color,
      containerProps = _ref.containerProps,
      typographyClassName = _ref.typographyClassName,
      variant = _ref.variant,
      onMouseEnter = _ref.onMouseEnter,
      onMouseLeave = _ref.onMouseLeave,
      onFocus = _ref.onFocus,
      onBlur = _ref.onBlur,
      onClick = _ref.onClick,
      children = _ref.children,
      _ref$customClasses = _ref.customClasses,
      customClasses = _ref$customClasses === void 0 ? {} : _ref$customClasses,
      classes = _ref.classes,
      other = _objectWithoutProperties(_ref, ["className", "containerRef", "disabled", "size", "color", "containerProps", "typographyClassName", "variant", "onMouseEnter", "onMouseLeave", "onFocus", "onBlur", "onClick", "children", "customClasses", "classes"]);

  var withColor = disabled || color && color !== 'default' && _palettes2["default"][color];

  var _useSpring = (0, _reactSpring.useSpring)(function () {
    return DEFAULT_BRIGHT_LAYER_SPRING_PROPS;
  }),
      _useSpring2 = _slicedToArray(_useSpring, 2),
      brightLayerSpringProps = _useSpring2[0],
      setBrightLayerSpringProps = _useSpring2[1];

  var colorSpring = (0, _reactSpring.useSpring)({
    color: (0, _color_utils.getComponentColor)(true, color, disabled),
    config: _reactSpring.config.stiff
  });
  var showBrightLayer = (0, _react.useCallback)(function () {
    return setBrightLayerSpringProps(function () {
      return {
        opacity: variant !== 'contained' ? 0.1 : 0.2
      };
    });
  });
  var dismissBrightLayer = (0, _react.useCallback)(function () {
    return setBrightLayerSpringProps(function () {
      return DEFAULT_BRIGHT_LAYER_SPRING_PROPS;
    });
  });
  var handleMouseEnter = (0, _react.useCallback)(function () {
    if (typeof onMouseEnter === 'function') {
      onMouseEnter.apply(void 0, arguments);
    }

    showBrightLayer();
  }, [onMouseEnter]);
  var handleMouseLeave = (0, _react.useCallback)(function () {
    if (typeof onMouseLeave === 'function') {
      onMouseLeave.apply(void 0, arguments);
    }

    dismissBrightLayer();
  }, [onMouseLeave]);
  var handleFocus = (0, _react.useCallback)(function () {
    if (typeof onFocus === 'function') {
      onFocus.apply(void 0, arguments);
    }

    showBrightLayer();
  }, [onFocus]);
  var handleBlur = (0, _react.useCallback)(function () {
    if (typeof onBlur === 'function') {
      onBlur.apply(void 0, arguments);
    }

    dismissBrightLayer();
  }, [onBlur]);
  var handleClick = (0, _react.useCallback)(function () {
    if (disabled) {
      return;
    }

    if (typeof onClick === 'function') {
      onClick.apply(void 0, arguments);
    }
  }, [onClick, disabled]);
  return _react2["default"].createElement(_reactSpring.animated.button, _extends({
    ref: containerRef,
    className: (0, _classnames2["default"])(className, classes.container, disabled && classes.disabled, withColor && classes.withColor, classes[variant], classes["size_".concat(size)], customClasses.container)
  }, containerProps, {
    style: _objectSpread({}, withColor && colorSpring, {}, containerProps && containerProps.style),
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onClick: handleClick
  }, other), _react2["default"].createElement(_reactSpring.animated.div, {
    className: classes.brightLayer,
    style: brightLayerSpringProps
  }), _react2["default"].createElement(_typography.Typography, {
    className: (0, _classnames2["default"])(classes.typography, typographyClassName, customClasses.typography),
    variant: "button"
  }, children));
};

var ContainedButton = function ContainedButton(props) {
  var color = props.color,
      disabled = props.disabled,
      style = props.style;
  var springProps = (0, _reactSpring.useSpring)({
    boxShadow: "0 ".concat(color ? 5 : 10, "px ").concat(color ? 15 : 20, "px 0 ").concat((0, _color_utils.getComponentColor)(Boolean(color), color, disabled, 200, '#d6d6d6')),
    config: _reactSpring.config.stiff
  });
  return _react2["default"].createElement(ButtonComponent, _extends({}, props, !disabled && {
    containerProps: _objectSpread({
      style: springProps
    }, style)
  }));
};

var WithVariantButton = function WithVariantButton(_ref2) {
  var _ref2$variant = _ref2.variant,
      variant = _ref2$variant === void 0 ? 'text' : _ref2$variant,
      props = _objectWithoutProperties(_ref2, ["variant"]);

  if (variant === 'contained') {
    return _react2["default"].createElement(ContainedButton, _extends({
      variant: variant
    }, props));
  }

  return _react2["default"].createElement(ButtonComponent, _extends({
    variant: variant
  }, props));
};

var Button = exports.Button = (0, _reactJss2["default"])(_button_styles2["default"])(WithVariantButton);