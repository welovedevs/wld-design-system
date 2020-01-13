"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Select = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactJss = require("react-jss");

var _reactJss2 = _interopRequireDefault(_reactJss);

var _core = require("@material-ui/core");

var _clickable_text_field = require("../clickable_text_field/clickable_text_field");

var _select_styles = require("./select_styles");

var _select_styles2 = _interopRequireDefault(_select_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function getValueFromChildren(children, value) {
  var selectedChild = children.map(function (child) {
    return child.props || {};
  }).find(function (childProps) {
    return childProps.value === value;
  });

  if (selectedChild && typeof selectedChild.children === 'string') {
    return selectedChild.children;
  }

  return value;
}

var SelectComponent = function SelectComponent(_ref) {
  var disabled = _ref.disabled,
      fullWidth = _ref.fullWidth,
      className = _ref.className,
      value = _ref.value,
      onChange = _ref.onChange,
      onClose = _ref.onClose,
      _onMouseOver = _ref.onMouseOver,
      _onFocus = _ref.onFocus,
      textFieldProps = _ref.textFieldProps,
      textFieldIconProps = _ref.textFieldIconProps,
      children = _ref.children,
      id = _ref.id;

  var _useState = (0, _react.useState)(),
      _useState2 = _slicedToArray(_useState, 2),
      anchorElement = _useState2[0],
      setAnchorElement = _useState2[1];

  var handleClose = (0, _react.useCallback)(function () {
    if (onClose) {
      onClose();
    }

    return setAnchorElement(null);
  }, []);
  var setAnchorElementCallback = (0, _react.useCallback)(function (e) {
    return !disabled && setAnchorElement(e.currentTarget);
  }, [disabled]);
  var selectedChildValue = getValueFromChildren(children, value);
  return _react2["default"].createElement(_react2["default"].Fragment, null, _react2["default"].createElement(_core.Menu, {
    anchorEl: anchorElement,
    keepMounted: true,
    open: Boolean(anchorElement),
    onClose: handleClose
  }, _react2["default"].Children.map(children, function (child) {
    return (0, _react.cloneElement)(child, {
      onClick: function onClick() {
        if (onChange) {
          onChange(child.props.value);
        }

        setAnchorElement(null);
      },
      onMouseOver: function onMouseOver() {
        if (_onMouseOver) {
          _onMouseOver(child.props.value);
        }
      },
      onFocus: function onFocus() {
        if (_onFocus) {
          _onFocus(child.props.value);
        }
      }
    });
  })), _react2["default"].createElement(_clickable_text_field.ClickableTextField, _extends({
    customClasses: {
      container: className
    },
    value: selectedChildValue,
    onClick: setAnchorElementCallback,
    arrowRotation: anchorElement ? -90 : 0
  }, {
    id: id,
    textFieldIconProps: textFieldIconProps,
    fullWidth: fullWidth,
    disabled: disabled
  }, textFieldProps)));
};

var Select = exports.Select = (0, _reactJss2["default"])(_select_styles2["default"])(SelectComponent);