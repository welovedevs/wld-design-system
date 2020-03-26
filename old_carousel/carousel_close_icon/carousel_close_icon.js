"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CarouselCloseIcon = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactJss = require("react-jss");

var _reactIntl = require("react-intl");

var _reactSpring = require("react-spring");

var _Close = require("@material-ui/icons/Close");

var _Close2 = _interopRequireDefault(_Close);

var _tooltip = require("../../tooltip/tooltip");

var _js = require("../../../../style/js");

var _carousel_close_icon_styles = require("./carousel_close_icon_styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var useStyles = (0, _reactJss.createUseStyles)(_carousel_close_icon_styles.styles);

var CarouselCloseIconComponent = function CarouselCloseIconComponent(_ref) {
  var onClose = _ref.onClose,
      _ref$color = _ref.color,
      color = _ref$color === void 0 ? 'dark' : _ref$color;
  var classes = useStyles();
  var colorSpringProps = (0, _reactSpring.useSpring)({
    color: (0, _js.getComponentColor)(true, color, false, 500, color || '#000')
  });
  return /*#__PURE__*/_react2["default"].createElement(_tooltip.Tooltip, {
    title: /*#__PURE__*/_react2["default"].createElement(_reactIntl.FormattedMessage, {
      id: "Main.lang.close",
      defaultMessage: "Fermer"
    })
  }, /*#__PURE__*/_react2["default"].createElement(_reactSpring.animated.button, {
    className: classes.button,
    type: "button",
    onClick: onClose,
    style: {
      color: colorSpringProps.color
    }
  }, /*#__PURE__*/_react2["default"].createElement(_Close2["default"], {
    className: classes.icon
  })));
};

var CarouselCloseIcon = exports.CarouselCloseIcon = CarouselCloseIconComponent;