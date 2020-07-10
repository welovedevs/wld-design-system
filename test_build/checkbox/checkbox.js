"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Checkbox = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _styles = require("@material-ui/core/styles");

var _reactSpring = require("react-spring");

var _styles_utils = require("../styles/utils/styles_utils");

var _palettes = require("../styles/palettes");

var _checkbox_styles = require("./checkbox_styles");

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

var useStyles = (0, _styles.makeStyles)(_checkbox_styles.styles);
var DEFAULT_BRIGHT_LAYER_SPRING_PROPS = {
  opacity: 0,
  config: _reactSpring.config.stiff
};
var CheckboxComponent = (0, _react.forwardRef)(function (_ref, ref) {
  var _ref$component = _ref.component,
      Component = _ref$component === void 0 ? _reactSpring.animated.div : _ref$component,
      checked = _ref.checked,
      disabled = _ref.disabled,
      color = _ref.color,
      propsDefaultColor = _ref.defaultColor,
      className = _ref.className,
      inputClassName = _ref.inputClassName,
      containerProps = _ref.containerProps,
      onChange = _ref.onChange,
      onFocus = _ref.onFocus,
      onBlur = _ref.onBlur,
      onMouseEnter = _ref.onMouseEnter,
      onMouseLeave = _ref.onMouseLeave,
      variant = _ref.variant,
      isRadio = _ref.isRadio,
      other = _objectWithoutProperties(_ref, ["component", "checked", "disabled", "color", "defaultColor", "className", "inputClassName", "containerProps", "onChange", "onFocus", "onBlur", "onMouseEnter", "onMouseLeave", "variant", "isRadio"]);

  var theme = (0, _styles.useTheme)();
  var classes = useStyles();
  var hexColor = (0, _react.useMemo)(function () {
    return (0, _styles_utils.getHexFromTheme)(theme, color);
  }, [theme, color]);
  var defaultColor = (0, _react.useMemo)(function () {
    return propsDefaultColor || (0, _styles_utils.getHexFromTheme)(theme, 'dark', 500);
  }, [propsDefaultColor, theme]);

  var _useSpring = (0, _reactSpring.useSpring)(function () {
    return DEFAULT_BRIGHT_LAYER_SPRING_PROPS;
  }),
      _useSpring2 = _slicedToArray(_useSpring, 2),
      brightLayerSpringProps = _useSpring2[0],
      setBrightLayerSpringProps = _useSpring2[1];

  var _useSpring3 = (0, _reactSpring.useSpring)({
    color: (0, _styles_utils.getComponentColor)(checked, hexColor, disabled, defaultColor),
    config: _reactSpring.config.stiff
  }),
      colorSpring = _useSpring3.color;

  var handleChange = (0, _react.useCallback)(function () {
    if (disabled) {
      return;
    }

    if (typeof onChange === 'function') {
      onChange.apply(void 0, arguments);
    }
  }, [disabled, onChange]);
  var showBrightLayer = (0, _react.useCallback)(function () {
    return setBrightLayerSpringProps(function () {
      return {
        opacity: 0.3
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
  return /*#__PURE__*/_react2["default"].createElement(Component, _extends({
    className: (0, _classnames2["default"])(className, classes.container, checked && classes.checked, disabled && classes.disabled, isRadio && classes.isRadio, classes[variant])
  }, containerProps, {
    style: _objectSpread({
      color: colorSpring
    }, containerProps && containerProps.style)
  }, {
    ref: ref
  }), /*#__PURE__*/_react2["default"].createElement(CheckIcon, {
    checked: checked,
    classes: classes
  }), /*#__PURE__*/_react2["default"].createElement(_reactSpring.animated.div, {
    className: classes.brightLayer,
    style: brightLayerSpringProps
  }), /*#__PURE__*/_react2["default"].createElement("input", _extends({
    className: (0, _classnames2["default"])(classes.input, inputClassName),
    type: "checkbox",
    onChange: handleChange,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onFocus: handleFocus,
    onBlur: handleBlur
  }, {
    checked: checked
  }, other)));
});
var DEFAULT_ICON_SPRING_PROPS = {
  scale: 0.5,
  opacity: 0,
  config: _reactSpring.config.wobbly
};
var CHECKED_ICON_SPRING_PROPS = {
  scale: 1,
  opacity: 1
};

var CheckIcon = function CheckIcon(_ref2) {
  var checked = _ref2.checked,
      classes = _ref2.classes;

  var _useSpring4 = (0, _reactSpring.useSpring)(function () {
    return DEFAULT_ICON_SPRING_PROPS;
  }),
      _useSpring5 = _slicedToArray(_useSpring4, 2),
      springProps = _useSpring5[0],
      setSpringProps = _useSpring5[1];

  (0, _react.useEffect)(function () {
    setSpringProps(function () {
      return checked ? CHECKED_ICON_SPRING_PROPS : DEFAULT_ICON_SPRING_PROPS;
    });
  }, [checked]);
  return /*#__PURE__*/_react2["default"].createElement(_reactSpring.animated.svg, {
    className: classes.checkIcon,
    viewBox: "0 0 24 24",
    fill: "#fff",
    style: _objectSpread({
      transform: springProps.scale.to(function (value) {
        return "scale3d(".concat(value, ", ").concat(value, ", ").concat(value, ")");
      })
    }, springProps)
  }, /*#__PURE__*/_react2["default"].createElement("g", null, /*#__PURE__*/_react2["default"].createElement("path", {
    d: "M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
  })));
};

var RaisedCheckbox = function RaisedCheckbox(props) {
  var theme = (0, _styles.useTheme)();
  var checked = props.checked,
      color = props.color,
      disabled = props.disabled;
  var springProps = (0, _reactSpring.useSpring)({
    boxShadow: "0 ".concat(checked ? 5 : 10, "px ").concat(checked ? 15 : 20, "px 0 ").concat((0, _styles_utils.getComponentColor)(checked, (0, _styles_utils.getHexFromTheme)(theme, color, 200), disabled, '#d6d6d6')),
    config: _reactSpring.config.stiff
  });
  return /*#__PURE__*/_react2["default"].createElement(CheckboxComponent, _extends({
    containerProps: {
      style: _objectSpread({}, springProps)
    },
    defaultColor: "#fff"
  }, props));
};

var WithVariantCheckbox = function WithVariantCheckbox(props) {
  var _props$variant = props.variant,
      variant = _props$variant === void 0 ? 'raised' : _props$variant;

  if (variant === 'raised') {
    return /*#__PURE__*/_react2["default"].createElement(RaisedCheckbox, _extends({
      variant: variant
    }, props));
  }

  return /*#__PURE__*/_react2["default"].createElement(CheckboxComponent, _extends({
    variant: variant
  }, props));
};

var Checkbox = exports.Checkbox = WithVariantCheckbox;