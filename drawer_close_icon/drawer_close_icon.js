"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DrawerCloseIcon = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _reactJss = require("react-jss");

var _reactJss2 = _interopRequireDefault(_reactJss);

var _close = require("../../../assets/images/assets/icons/close.svg");

var _close2 = _interopRequireDefault(_close);

var _drawer_close_icon_styles = require("./drawer_close_icon_styles");

var _drawer_close_icon_styles2 = _interopRequireDefault(_drawer_close_icon_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var DrawerCloseIconComponent = function DrawerCloseIconComponent(_ref) {
  var onClick = _ref.onClick,
      drawerAnchor = _ref.drawerAnchor,
      classes = _ref.classes;
  return _react2["default"].createElement("div", _extends({
    className: (0, _classnames2["default"])(classes.container, drawerAnchor === 'right' && classes.drawerAnchoredRightContainer)
  }, {
    onClick: onClick
  }), _react2["default"].createElement(_close2["default"], null));
};

var DrawerCloseIcon = exports.DrawerCloseIcon = (0, _reactJss2["default"])(_drawer_close_icon_styles2["default"])(DrawerCloseIconComponent);