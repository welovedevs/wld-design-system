"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DrawerLogo = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require("react-router-dom");

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _reactJss = require("react-jss");

var _reactJss2 = _interopRequireDefault(_reactJss);

var _W3D_logo = require("../../../assets/images/W3D_logo.svg");

var _W3D_logo2 = _interopRequireDefault(_W3D_logo);

var _drawer_logo_styles = require("./drawer_logo_styles");

var _drawer_logo_styles2 = _interopRequireDefault(_drawer_logo_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var DrawerLogoComponent = function DrawerLogoComponent(_ref) {
  var drawerAnchor = _ref.drawerAnchor,
      classes = _ref.classes;
  return _react2["default"].createElement(_reactRouterDom.Link, {
    to: "/",
    className: (0, _classnames2["default"])(classes.container, drawerAnchor === 'right' && classes.drawerAnchoredRightContainer)
  }, _react2["default"].createElement(_W3D_logo2["default"], null));
};

var DrawerLogo = exports.DrawerLogo = (0, _reactJss2["default"])(_drawer_logo_styles2["default"])(DrawerLogoComponent);