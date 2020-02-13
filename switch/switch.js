"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Switch = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _reactJss = require("react-jss");

var _reactJss2 = _interopRequireDefault(_reactJss);

var _reactSpring = require("react-spring");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _reactMeasure = require("react-measure");

var _reactMeasure2 = _interopRequireDefault(_reactMeasure);

var _styles_utils = require("../styles/utils/styles_utils");

var _palettes = require("../styles/palettes");

var _switch_styles = require("./switch_styles");

var _switch_styles2 = _interopRequireDefault(_switch_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var useStyles = (0, _reactJss.createUseStyles)(_switch_styles2["default"]);
var DEFAULT_BRIGHT_LAYER_SPRING_PROPS = {
  opacity: 0,
  config: _reactSpring.config.stiff
};

var Switch = exports.Switch = function Switch(_ref) {
  var containerRef = _ref.containerRef,
      _ref$checked = _ref.checked,
      checked = _ref$checked === void 0 ? false : _ref$checked,
      disabled = _ref.disabled,
      color = _ref.color,
      className = _ref.className,
      inputClassName = _ref.inputClassName,
      containerProps = _ref.containerProps,
      onChange = _ref.onChange,
      onFocus = _ref.onFocus,
      onBlur = _ref.onBlur,
      onMouseEnter = _ref.onMouseEnter,
      onMouseLeave = _ref.onMouseLeave,
      size = _ref.size,
      _ref$customClasses = _ref.customClasses,
      customClasses = _ref$customClasses === void 0 ? {} : _ref$customClasses,
      other = _objectWithoutProperties(_ref, ["containerRef", "checked", "disabled", "color", "className", "inputClassName", "containerProps", "onChange", "onFocus", "onBlur", "onMouseEnter", "onMouseLeave", "size", "customClasses"]);

  var theme = (0, _reactJss.useTheme)();
  var classes = useStyles();
  var hexColor = (0, _react.useMemo)(function () {
    return (0, _styles_utils.getHexFromTheme)(theme, color);
  }, [theme, color]);

  var _useSpring = (0, _reactSpring.useSpring)(function () {
    return DEFAULT_BRIGHT_LAYER_SPRING_PROPS;
  }),
      _useSpring2 = _slicedToArray(_useSpring, 2),
      brightLayerSpringProps = _useSpring2[0],
      setBrightLayerSpringProps = _useSpring2[1];

  var containerSpringProps = (0, _reactSpring.useSpring)({
    color: (0, _styles_utils.getComponentColor)(true, hexColor, disabled, (0, _styles_utils.getHexFromTheme)(theme, 'dark', 50))
  });

  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      thumbWidth = _useState2[0],
      setThumbWidth = _useState2[1];

  var thumbContainerSpringProps = (0, _reactSpring.useSpring)({
    translation: checked ? 0 : -100
  });
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
  }, []);
  var dismissBrightLayer = (0, _react.useCallback)(function () {
    return setBrightLayerSpringProps(function () {
      return DEFAULT_BRIGHT_LAYER_SPRING_PROPS;
    });
  }, []);
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
  var handleThumbResize = (0, _react.useCallback)(function (_ref2) {
    var width = _ref2.bounds.width;

    if (width !== thumbWidth) {
      setThumbWidth(width);
    }
  }, [thumbWidth]);
  return _react2["default"].createElement(_reactSpring.animated.div, _extends({
    ref: containerRef,
    className: (0, _classnames2["default"])(className, customClasses.container, classes.container, disabled && classes.disabled, classes["size_".concat(size)]),
    style: _objectSpread({}, (0, _get2["default"])(containerProps, 'style'), {}, containerSpringProps)
  }, containerProps), _react2["default"].createElement(_reactSpring.animated.div, {
    className: classes.thumbContainer,
    style: {
      transform: thumbContainerSpringProps.translation.interpolate(function (value) {
        return "translate3d(calc(".concat(value, "% + ").concat(thumbWidth, "px), 0, 0)");
      }),
      width: "calc(100% - ".concat(thumbWidth, "px)")
    }
  }, _react2["default"].createElement(_reactMeasure2["default"], {
    bounds: true,
    onResize: handleThumbResize
  }, function (_ref3) {
    var measureRef = _ref3.measureRef;
    return _react2["default"].createElement("span", {
      ref: measureRef
    }, _react2["default"].createElement("div", {
      className: classes.thumb
    }));
  })), _react2["default"].createElement(_reactSpring.animated.div, {
    className: classes.brightLayer,
    style: brightLayerSpringProps
  }), _react2["default"].createElement("input", _extends({
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
};