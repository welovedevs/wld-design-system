"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Button = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _styles = require("@material-ui/core/styles");

var _reactSpring = require("react-spring");

var _typography = require("../typography/typography");

var _styles_utils = require("../styles/utils/styles_utils");

var _styles2 = require("../styles");

var _button_styles = require("./button_styles");

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

var useStyles = (0, _styles.makeStyles)(_button_styles.styles);
var DEFAULT_BRIGHT_LAYER_SPRING_PROPS = {
  opacity: 0,
  config: _reactSpring.config.stiff
};

var ButtonComponent = function ButtonComponent(_ref) {
  var _ref$component = _ref.component,
      Component = _ref$component === void 0 ? _reactSpring.animated.button : _ref$component,
      className = _ref.className,
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
      propsStyle = _ref.style,
      other = _objectWithoutProperties(_ref, ["component", "className", "containerRef", "disabled", "size", "color", "containerProps", "typographyClassName", "variant", "onMouseEnter", "onMouseLeave", "onFocus", "onBlur", "onClick", "children", "customClasses", "style"]);

  var theme = (0, _styles.useTheme)();
  var classes = useStyles();
  var hexColor = (0, _react.useMemo)(function () {
    return (0, _styles2.getHexFromTheme)(theme, color);
  }, [theme, color]);
  var withColor = (0, _react.useMemo)(function () {
    return disabled || color && color !== 'default' && hexColor;
  }, [disabled, hexColor]);

  var _useSpring = (0, _reactSpring.useSpring)(function () {
    return DEFAULT_BRIGHT_LAYER_SPRING_PROPS;
  }),
      _useSpring2 = _slicedToArray(_useSpring, 2),
      brightLayerSpringProps = _useSpring2[0],
      setBrightLayerSpringProps = _useSpring2[1];

  var colorSpring = (0, _reactSpring.useSpring)({
    color: (0, _styles_utils.getComponentColor)(true, hexColor, disabled),
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
  return /*#__PURE__*/_react2["default"].createElement(Component, _extends({
    ref: containerRef,
    className: (0, _classnames2["default"])(className, classes.container, disabled && classes.disabled, withColor && classes.withColor, classes[variant], classes["size_".concat(size)], customClasses.container)
  }, containerProps, {
    style: _objectSpread({}, propsStyle, {}, withColor && colorSpring, {}, containerProps && containerProps.style),
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onClick: handleClick
  }, other), /*#__PURE__*/_react2["default"].createElement(_reactSpring.animated.div, {
    className: classes.brightLayer,
    style: brightLayerSpringProps
  }), /*#__PURE__*/_react2["default"].createElement(_typography.Typography, {
    className: (0, _classnames2["default"])(classes.typography, typographyClassName, customClasses.typography),
    variant: "button"
  }, children));
};

var ContainedButton = function ContainedButton(props) {
  var theme = (0, _styles.useTheme)();
  var color = props.color,
      disabled = props.disabled;
  var springProps = (0, _reactSpring.useSpring)({
    boxShadow: "0 ".concat(color ? 5 : 10, "px ").concat(color ? 15 : 20, "px 0 ").concat((0, _styles_utils.getComponentColor)(Boolean(color), (0, _styles2.getHexFromTheme)(theme, color, 200), disabled)),
    config: _reactSpring.config.stiff
  });
  return /*#__PURE__*/_react2["default"].createElement(ButtonComponent, _extends({}, props, !disabled && {
    style: springProps
  }));
};

var Button = exports.Button = (0, _react.forwardRef)(function (props, containerRef) {
  var _props$variant = props.variant,
      variant = _props$variant === void 0 ? 'text' : _props$variant,
      other = _objectWithoutProperties(props, ["variant"]);

  if (variant === 'contained') {
    return /*#__PURE__*/_react2["default"].createElement(ContainedButton, _extends({
      variant: variant,
      containerRef: containerRef
    }, other));
  }

  return /*#__PURE__*/_react2["default"].createElement(ButtonComponent, _extends({
    variant: variant,
    containerRef: containerRef
  }, other));
});
Button.propTypes = {
  color: _propTypes2["default"].string
};