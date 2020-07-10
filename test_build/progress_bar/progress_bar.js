"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProgressBar = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _styles = require("@material-ui/core/styles");

var _reactSpring = require("react-spring");

var _styles2 = require("../styles");

var _progress_bar_styles = require("./progress_bar_styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var useStyles = (0, _styles.makeStyles)(_progress_bar_styles.styles);

var ProgressBar = exports.ProgressBar = function ProgressBar(_ref) {
  var _ref$value = _ref.value,
      progressValue = _ref$value === void 0 ? 0 : _ref$value,
      _ref$color = _ref.color,
      color = _ref$color === void 0 ? 'primary' : _ref$color,
      className = _ref.className,
      barClassName = _ref.barClassName,
      _ref$customClasses = _ref.customClasses,
      customClasses = _ref$customClasses === void 0 ? {} : _ref$customClasses;
  var classes = useStyles();
  var theme = (0, _styles.useTheme)();
  var hexColor = (0, _react.useMemo)(function () {
    return (0, _styles2.getHexFromTheme)(theme, color);
  }, [theme, color]);

  var _useSpring = (0, _reactSpring.useSpring)({
    from: {
      translation: -100
    },
    to: {
      translation: -100 + progressValue
    }
  }),
      translation = _useSpring.translation;

  return /*#__PURE__*/_react2["default"].createElement("div", {
    className: (0, _classnames2["default"])(className, classes.container, customClasses.container)
  }, /*#__PURE__*/_react2["default"].createElement(_reactSpring.animated.div, {
    className: (0, _classnames2["default"])(classes.bar, barClassName, customClasses.bar),
    style: {
      color: (0, _styles2.getComponentColor)(true, hexColor, false),
      transform: translation.to(function (value) {
        return "translate3d(".concat(value, "%, 0, 0)");
      })
    }
  }));
};