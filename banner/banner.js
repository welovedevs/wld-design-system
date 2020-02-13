"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Banner = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _reactJss = require("react-jss");

var _banner_data = require("./banner_data");

var _banner_styles = require("./banner_styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var useStyles = (0, _reactJss.createUseStyles)(_banner_styles.styles);

var BannerComponent = function BannerComponent(_ref) {
  var _ref$type = _ref.type,
      type = _ref$type === void 0 ? 'warning' : _ref$type,
      receivedIcon = _ref.icon,
      _ref$customClasses = _ref.customClasses,
      customClasses = _ref$customClasses === void 0 ? {} : _ref$customClasses,
      children = _ref.children;

  var _useMemo = (0, _react.useMemo)(function () {
    return _banner_data.BANNER_DATA[type] || {};
  }, [type]),
      icon = _useMemo.icon,
      color = _useMemo.color;

  var classes = useStyles({
    type: type
  });
  var Icon = receivedIcon || icon;
  return _react2["default"].createElement("div", {
    className: (0, _classnames2["default"])(classes.container, customClasses.container),
    style: {
      color: color
    }
  }, _react2["default"].createElement("span", {
    className: classes.iconContainer
  }, _react2["default"].createElement(Icon, null)), children);
};

var Banner = exports.Banner = BannerComponent;