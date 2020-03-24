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

var _styles = require("../styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var useStyles = (0, _reactJss.createUseStyles)(_banner_styles.styles);

var BannerComponent = function BannerComponent(_ref) {
  var _ref$type = _ref.type,
      type = _ref$type === void 0 ? 'warning' : _ref$type,
      receivedIcon = _ref.icon,
      _ref$customClasses = _ref.customClasses,
      customClasses = _ref$customClasses === void 0 ? {} : _ref$customClasses,
      children = _ref.children;
  var theme = (0, _reactJss.useTheme)();

  var _useMemo = (0, _react.useMemo)(function () {
    var typeConfig = _banner_data.BANNER_DATA[type];

    if (!typeConfig) {
      return _banner_data.BANNER_DATA["default"];
    }

    return _objectSpread({}, typeConfig, {
      color: (0, _styles.getComponentColor)(true, (0, _styles.getHexFromTheme)(theme, typeConfig.color), false)
    });
  }, [type, theme]),
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
  }, Icon && _react2["default"].createElement(Icon, null)), children);
};

var Banner = exports.Banner = BannerComponent;