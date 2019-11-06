"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClickableTextField = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _reactJss = require("react-jss");

var _reactJss2 = _interopRequireDefault(_reactJss);

var _reactSpring = require("react-spring");

var _icons = require("@material-ui/icons");

var _text_field = require("../text_field/text_field");

var _text_field_icon = require("../text_field_icon/text_field_icon");

var _clickable_text_field_styles = require("./clickable_text_field_styles");

var _clickable_text_field_styles2 = _interopRequireDefault(_clickable_text_field_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var ClickableTextFieldComponent = function ClickableTextFieldComponent(_ref) {
  var interactionsLayerRef = _ref.interactionsLayerRef,
      onClick = _ref.onClick,
      textFieldIconProps = _ref.textFieldIconProps,
      _ref$customClasses = _ref.customClasses,
      customClasses = _ref$customClasses === void 0 ? {} : _ref$customClasses,
      _ref$arrowRotation = _ref.arrowRotation,
      arrowRotation = _ref$arrowRotation === void 0 ? 0 : _ref$arrowRotation,
      classes = _ref.classes,
      other = _objectWithoutProperties(_ref, ["interactionsLayerRef", "onClick", "textFieldIconProps", "customClasses", "arrowRotation", "classes"]);

  var _useSpring = (0, _reactSpring.useSpring)({
    rotation: arrowRotation
  }),
      rotationSpring = _useSpring.rotation;

  return _react2["default"].createElement(_text_field.TextField, _extends({
    readOnly: true,
    className: (0, _classnames2["default"])(classes.container, customClasses.container)
  }, other), _react2["default"].createElement(_reactSpring.animated.span, {
    style: {
      transform: rotationSpring.interpolate(function (value) {
        return "rotate(".concat(value, "deg)");
      })
    }
  }, _react2["default"].createElement(_text_field_icon.TextFieldIcon, textFieldIconProps, _react2["default"].createElement(_icons.KeyboardArrowDown, null))), _react2["default"].createElement("button", _extends({
    ref: interactionsLayerRef,
    className: (0, _classnames2["default"])(classes.handleInteractionsLayer, customClasses.handleInteractionsLayer),
    type: "button"
  }, {
    onClick: onClick
  })));
};

var ClickableTextField = exports.ClickableTextField = (0, _reactJss2["default"])(_clickable_text_field_styles2["default"])(ClickableTextFieldComponent);