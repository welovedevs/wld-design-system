"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Typography = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _reactJss = require("react-jss");

var _styles_utils = require("../styles/utils/styles_utils");

var _typography_styles = require("./typography_styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var useStyles = (0, _reactJss.createUseStyles)(_typography_styles.styles);

var TypographyComponent = function TypographyComponent(_ref) {
  var containerRef = _ref.containerRef,
      className = _ref.className,
      color = _ref.color,
      _ref$component = _ref.component,
      Component = _ref$component === void 0 ? 'span' : _ref$component,
      _ref$variant = _ref.variant,
      variant = _ref$variant === void 0 ? 'body1' : _ref$variant,
      receivedStyle = _ref.style,
      _ref$customClasses = _ref.customClasses,
      customClasses = _ref$customClasses === void 0 ? {} : _ref$customClasses,
      other = _objectWithoutProperties(_ref, ["containerRef", "className", "color", "component", "variant", "style", "customClasses"]);

  var classes = useStyles();
  var theme = (0, _reactJss.useTheme)();
  var style = (0, _react.useMemo)(function () {
    if (color) {
      var hex = (0, _styles_utils.getComponentColor)(true, (0, _styles_utils.getHexFromTheme)(theme, color), false);

      if (['wld1', 'wld2', 'wld3', 'wld4', 'wld5', 'wld6'].some(function (key) {
        return variant === key;
      })) {
        if (color === 'secondary') {
          return {
            backgroundColor: hex,
            color: '#fff'
          };
        }

        if (color === 'tertiary') {
          return {
            color: (0, _styles_utils.getComponentColor)(true, (0, _styles_utils.getHexFromTheme)(theme, 'primary'), false),
            backgroundColor: hex
          };
        }

        return {
          color: (0, _styles_utils.getComponentColor)(true, (0, _styles_utils.getHexFromTheme)(theme, 'primary'), false)
        };
      }

      return {
        color: hex
      };
    }
  }, [variant, theme, color]);
  return _react2["default"].createElement(Component, _extends({
    ref: containerRef,
    className: (0, _classnames2["default"])(classes.container, classes[color], classes[variant], className, customClasses.container),
    style: _objectSpread({}, receivedStyle, {}, style)
  }, other));
};

var Typography = exports.Typography = TypographyComponent;