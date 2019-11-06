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

var _color_utils = require("../../styles/utils/color_utils");

var _typography_styles = require("./typography_styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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
      _ref$customClasses = _ref.customClasses,
      customClasses = _ref$customClasses === void 0 ? {} : _ref$customClasses,
      other = _objectWithoutProperties(_ref, ["containerRef", "className", "color", "component", "variant", "customClasses"]);

  var classes = useStyles();
  var style = null;

  if (color) {
    var hex = (0, _color_utils.getComponentColor)(true, color, false, 500);

    if (['wld1', 'wld2', 'wld3', 'wld4', 'wld5', 'wld6'].some(function (key) {
      return variant === key;
    })) {
      if (color === 'secondary') {
        style = {
          backgroundColor: hex,
          color: '#fff'
        };
      } else if (color === 'thirdary') {
        style = {
          color: (0, _color_utils.getComponentColor)(true, 'primary', false, 500),
          backgroundColor: hex
        };
      } else {
        style = {
          color: (0, _color_utils.getComponentColor)(true, 'primary', false, 500)
        };
      }
    } else {
      style = {
        color: hex
      };
    }
  }

  return _react2["default"].createElement(Component, _extends({
    ref: containerRef,
    className: (0, _classnames2["default"])(classes.container, classes[color], classes[variant], className, customClasses.container)
  }, {
    style: style
  }, other));
};

var Typography = exports.Typography = TypographyComponent;