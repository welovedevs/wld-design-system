"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DrawerButton = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _reactJss = require("react-jss");

var _reactJss2 = _interopRequireDefault(_reactJss);

var _rounded_button = require("../../smallviews/rounded_button/rounded_button");

var _rounded_button2 = _interopRequireDefault(_rounded_button);

var _drawer_button_styles = require("./drawer_button_styles");

var _drawer_button_styles2 = _interopRequireDefault(_drawer_button_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var DrawerButtonComponent = function DrawerButtonComponent(_ref) {
  var classes = _ref.classes,
      active = _ref.active,
      other = _objectWithoutProperties(_ref, ["classes", "active"]);

  return _react2["default"].createElement(_rounded_button2["default"], _extends({
    className: (0, _classnames2["default"])(classes.container, active && classes.active)
  }, other));
};

var DrawerButton = exports.DrawerButton = (0, _reactJss2["default"])(_drawer_button_styles2["default"])(DrawerButtonComponent);