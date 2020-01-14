"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PopperCardTitle = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _reactJss = require("react-jss");

var _typography = require("../typography/typography");

var _popper_card_title_styles = require("./popper_card_title_styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var useStyles = (0, _reactJss.createUseStyles)(_popper_card_title_styles.styles);

var PopperCardTitleComponent = function PopperCardTitleComponent(_ref) {
  var _ref$customClasses = _ref.customClasses,
      customClasses = _ref$customClasses === void 0 ? {} : _ref$customClasses,
      children = _ref.children;
  var classes = useStyles();
  return _react2["default"].createElement(_typography.Typography, {
    className: (0, _classnames2["default"])(classes.container, customClasses.container),
    variant: "body1",
    component: "h2",
    color: "dark"
  }, children);
};

var PopperCardTitle = exports.PopperCardTitle = PopperCardTitleComponent;