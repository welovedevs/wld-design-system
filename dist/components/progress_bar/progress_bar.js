"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProgressBar = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _reactJss = require("react-jss");

var _reactJss2 = _interopRequireDefault(_reactJss);

var _reactSpring = require("react-spring");

var _styles = require("../../styles/");

var _progress_bar_styles = require("./progress_bar_styles");

var _progress_bar_styles2 = _interopRequireDefault(_progress_bar_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ProgressBarComponent = function ProgressBarComponent(_ref) {
  var _ref$value = _ref.value,
      progressValue = _ref$value === void 0 ? 0 : _ref$value,
      _ref$color = _ref.color,
      color = _ref$color === void 0 ? 'primary' : _ref$color,
      className = _ref.className,
      barClassName = _ref.barClassName,
      _ref$customClasses = _ref.customClasses,
      customClasses = _ref$customClasses === void 0 ? {} : _ref$customClasses,
      classes = _ref.classes;

  var _useSpring = (0, _reactSpring.useSpring)({
    from: {
      translation: -100
    },
    to: {
      translation: -100 + progressValue
    }
  }),
      translation = _useSpring.translation;

  return _react2["default"].createElement("div", {
    className: (0, _classnames2["default"])(className, classes.container, customClasses.container)
  }, _react2["default"].createElement(_reactSpring.animated.div, {
    className: (0, _classnames2["default"])(classes.bar, barClassName, customClasses.bar),
    style: {
      color: (0, _styles.getComponentColor)(true, color, false, 300),
      transform: translation.interpolate(function (value) {
        return "translate3d(".concat(value, "%, 0, 0)");
      })
    }
  }));
};

var ProgressBar = exports.ProgressBar = (0, _reactJss2["default"])(_progress_bar_styles2["default"])(ProgressBarComponent);