"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PopperCardContent = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _reactJss = require("react-jss");

var _popper_card_content_styles = require("./popper_card_content_styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var useStyles = (0, _reactJss.createUseStyles)(_popper_card_content_styles.styles);

var PopperCardContentComponent = function PopperCardContentComponent(_ref) {
  var _ref$customClasses = _ref.customClasses,
      customClasses = _ref$customClasses === void 0 ? {} : _ref$customClasses,
      children = _ref.children;
  var classes = useStyles();
  return /*#__PURE__*/_react2["default"].createElement("div", {
    className: (0, _classnames2["default"])(classes.container, customClasses.container)
  }, children);
};

var PopperCardContent = exports.PopperCardContent = PopperCardContentComponent;