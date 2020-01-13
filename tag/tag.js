"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tag = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _reactJss = require("react-jss");

var _reactJss2 = _interopRequireDefault(_reactJss);

var _reactSpring = require("react-spring");

var _styles_utils = require("../../styles/utils/styles_utils");

var _typography = require("../typography/typography");

var _tag_styles = require("./tag_styles");

var _tag_styles2 = _interopRequireDefault(_tag_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var TagComponent = function TagComponent(_ref) {
  var _ref$component = _ref.component,
      Component = _ref$component === void 0 ? _reactSpring.animated.div : _ref$component,
      containerRef = _ref.containerRef,
      className = _ref.className,
      _ref$color = _ref.color,
      color = _ref$color === void 0 ? 'default' : _ref$color,
      children = _ref.children,
      typographyProps = _ref.typographyProps,
      _ref$customClasses = _ref.customClasses,
      customClasses = _ref$customClasses === void 0 ? {} : _ref$customClasses,
      classes = _ref.classes,
      other = _objectWithoutProperties(_ref, ["component", "containerRef", "className", "color", "children", "typographyProps", "customClasses", "classes"]);

  var springProps = (0, _reactSpring.useSpring)({
    color: (0, _styles_utils.getComponentColor)(true, color),
    boxShadow: "0 ".concat(color ? 5 : 10, "px ").concat(color ? 15 : 20, "px 0 ").concat((0, _styles_utils.getComponentColor)(Boolean(color), color, false, 200, '#d6d6d6')),
    config: _reactSpring.config.stiff
  });
  var withColor = color && color !== 'default';
  return _react2["default"].createElement(Component, _extends({
    ref: containerRef,
    className: (0, _classnames2["default"])(className, classes.container, customClasses.container),
    style: springProps
  }, other), _react2["default"].createElement(_typography.Typography, _extends({
    className: (0, _classnames2["default"])(classes.typography, customClasses.typography),
    variant: "tag"
  }, withColor && {
    color: '#fff'
  }, typographyProps), children));
};

var Tag = exports.Tag = (0, _reactJss2["default"])(_tag_styles2["default"])(TagComponent);