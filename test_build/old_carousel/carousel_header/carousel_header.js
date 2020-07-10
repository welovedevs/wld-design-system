"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CarouselHeader = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _styles = require("@material-ui/core/styles");

var _carousel_header_styles = require("./carousel_header_styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var useStyles = (0, _styles.makeStyles)(_carousel_header_styles.styles);

var CarouselHeaderComponent = function CarouselHeaderComponent(_ref) {
  var color = _ref.color,
      children = _ref.children,
      _ref$customClasses = _ref.customClasses,
      customClasses = _ref$customClasses === void 0 ? {} : _ref$customClasses;
  var classes = useStyles({
    color: color
  });
  return /*#__PURE__*/_react2["default"].createElement("div", {
    className: (0, _classnames2["default"])(classes.container, customClasses.container)
  }, children);
};

var CarouselHeader = exports.CarouselHeader = CarouselHeaderComponent;