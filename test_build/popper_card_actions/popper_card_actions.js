"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PopperCardActions = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _styles = require("@material-ui/core/styles");

var _popper_card_actions_styles = require("./popper_card_actions_styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var useStyles = (0, _styles.makeStyles)(_popper_card_actions_styles.styles);

var PopperCardActionsComponent = function PopperCardActionsComponent(_ref) {
  var children = _ref.children,
      _ref$customClasses = _ref.customClasses,
      customClasses = _ref$customClasses === void 0 ? {} : _ref$customClasses;
  var classes = useStyles();
  return /*#__PURE__*/_react2["default"].createElement("div", {
    className: (0, _classnames2["default"])(classes.container, customClasses.container)
  }, children);
};

var PopperCardActions = exports.PopperCardActions = PopperCardActionsComponent;