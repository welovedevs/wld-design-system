"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StructuredCarouselStep = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _reactJss = require("react-jss");

var _structured_carousel_step_styles = require("./structured_carousel_step_styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var useStyles = (0, _reactJss.createUseStyles)(_structured_carousel_step_styles.styles);

var StructuredCarouselStepComponent = function StructuredCarouselStepComponent(_ref) {
  var fullScreen = _ref.fullScreen,
      children = _ref.children,
      _ref$customClasses = _ref.customClasses,
      customClasses = _ref$customClasses === void 0 ? {} : _ref$customClasses;
  var classes = useStyles();
  return /*#__PURE__*/_react2["default"].createElement("div", {
    className: (0, _classnames2["default"])(classes.container, fullScreen && classes.fullScreen, customClasses.container)
  }, children);
};

var StructuredCarouselStep = exports.StructuredCarouselStep = StructuredCarouselStepComponent;