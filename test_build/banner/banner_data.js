"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BANNER_DATA = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _CheckCircle = require("@material-ui/icons/CheckCircle");

var _CheckCircle2 = _interopRequireDefault(_CheckCircle);

var _Error = require("@material-ui/icons/Error");

var _Error2 = _interopRequireDefault(_Error);

var _Info = require("@material-ui/icons/Info");

var _Info2 = _interopRequireDefault(_Info);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var WarningIcon = function WarningIcon(props) {
  return /*#__PURE__*/_react2["default"].createElement("svg", props, /*#__PURE__*/_react2["default"].createElement("title", null, "Warning icon"), /*#__PURE__*/_react2["default"].createElement("desc", null, "Warning - WeLoveDevs"), /*#__PURE__*/_react2["default"].createElement("g", {
    fill: "none",
    fillRule: "evenodd"
  }, /*#__PURE__*/_react2["default"].createElement("path", {
    d: "M-1-3h32v32H-1z"
  }), /*#__PURE__*/_react2["default"].createElement("path", {
    d: "M1.731 25H28.27a1 1 0 0 0 .866-1.5L15.866.501a1 1 0 0 0-1.732 0l-13.269 23A1 1 0 0 0 1.731 25zm14.633-4.105h-2.728v-2.737h2.728v2.737zm0-5.474h-2.728V9.947h2.728v5.474z",
    fill: "#000",
    fillRule: "nonzero"
  })));
};

WarningIcon.defaultProps = {
  width: "30",
  height: "25",
  viewBox: "0 0 30 25",
  xmlns: "http://www.w3.org/2000/svg"
};
var BANNER_DATA = exports.BANNER_DATA = Object.freeze({
  warning: {
    color: 'warn',
    icon: WarningIcon
  },
  error: {
    color: 'danger',
    icon: _Error2["default"]
  },
  success: {
    color: 'safe',
    icon: _CheckCircle2["default"]
  },
  info: {
    color: 'primary',
    icon: _Info2["default"]
  },
  "default": {
    color: 'primary',
    icon: null
  }
});