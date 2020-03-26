"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextField = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _reactJss = require("react-jss");

var _reactJss2 = _interopRequireDefault(_reactJss);

var _reactSpring = require("react-spring");

var _text_field_styles = require("./text_field_styles");

var _text_field_styles2 = _interopRequireDefault(_text_field_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var useStyles = (0, _reactJss.createUseStyles)(_text_field_styles2["default"]);
var DEFAULT_SPRING_PROPS = {
  boxShadow: '0 7.5px 15px 0 #e4e4e4'
}; // Variant should be one of the following : ['raised', 'flat', 'underlined'].

var TextFieldComponent = function TextFieldComponent(_ref) {
  var _ref$containerElement = _ref.containerElement,
      ContainerElement = _ref$containerElement === void 0 ? 'div' : _ref$containerElement,
      containerProps = _ref.containerProps,
      className = _ref.className,
      inputClassName = _ref.inputClassName,
      fullWidth = _ref.fullWidth,
      inputRef = _ref.inputRef,
      containerRef = _ref.containerRef,
      _ref$beforeChildren = _ref.beforeChildren,
      beforeChildren = _ref$beforeChildren === void 0 ? null : _ref$beforeChildren,
      multiline = _ref.multiline,
      rows = _ref.rows,
      children = _ref.children,
      _ref$variant = _ref.variant,
      variant = _ref$variant === void 0 ? 'raised' : _ref$variant,
      _ref$type = _ref.type,
      type = _ref$type === void 0 ? 'text' : _ref$type,
      disabled = _ref.disabled,
      _ref$customClasses = _ref.customClasses,
      customClasses = _ref$customClasses === void 0 ? {} : _ref$customClasses,
      classes = _ref.classes,
      other = _objectWithoutProperties(_ref, ["containerElement", "containerProps", "className", "inputClassName", "fullWidth", "inputRef", "containerRef", "beforeChildren", "multiline", "rows", "children", "variant", "type", "disabled", "customClasses", "classes"]);

  var InputComponent = multiline ? 'textarea' : 'input';
  return /*#__PURE__*/_react2["default"].createElement(ContainerElement, _extends({
    ref: containerRef,
    className: (0, _classnames2["default"])(className, customClasses.container, classes.container, fullWidth && classes.fullWidth, multiline && classes.multilineContainer, classes[variant], disabled && classes["".concat(variant, "Disabled")])
  }, containerProps && containerProps.style && {
    style: containerProps.style
  }, containerProps), beforeChildren, /*#__PURE__*/_react2["default"].createElement(InputComponent, _extends({
    ref: inputRef,
    className: (0, _classnames2["default"])(inputClassName, classes.input, multiline && classes.multiline)
  }, {
    rows: rows,
    type: type,
    disabled: disabled
  }, other)), children);
};

var RaisedTextField = function RaisedTextField(_ref2) {
  var onFocus = _ref2.onFocus,
      onBlur = _ref2.onBlur,
      containerProps = _ref2.containerProps,
      other = _objectWithoutProperties(_ref2, ["onFocus", "onBlur", "containerProps"]);

  var _useSpring = (0, _reactSpring.useSpring)(function () {
    return DEFAULT_SPRING_PROPS;
  }),
      _useSpring2 = _slicedToArray(_useSpring, 2),
      springProps = _useSpring2[0],
      setSpringProps = _useSpring2[1];

  var handleFocus = (0, _react.useCallback)(function () {
    if (typeof onFocus === 'function') {
      onFocus.apply(void 0, arguments);
    }

    setSpringProps(function () {
      return {
        boxShadow: '0 10px 20px 0 #dadada'
      };
    });
  }, [onFocus]);
  var handleBlur = (0, _react.useCallback)(function () {
    if (typeof onBlur === 'function') {
      onBlur.apply(void 0, arguments);
    }

    setSpringProps(function () {
      return DEFAULT_SPRING_PROPS;
    });
  }, [onBlur]);
  return /*#__PURE__*/_react2["default"].createElement(TextFieldComponent, _extends({
    containerElement: _reactSpring.animated.div,
    containerProps: _objectSpread({}, containerProps, {
      style: _objectSpread({}, containerProps && containerProps.style, {}, springProps)
    }),
    onFocus: handleFocus,
    onBlur: handleBlur
  }, other));
};

var WithVariantTextField = function WithVariantTextField(_ref3) {
  var _ref3$variant = _ref3.variant,
      variant = _ref3$variant === void 0 ? 'raised' : _ref3$variant,
      other = _objectWithoutProperties(_ref3, ["variant"]);

  var classes = useStyles();

  if (variant === 'raised') {
    return /*#__PURE__*/_react2["default"].createElement(RaisedTextField, _extends({
      variant: variant
    }, other, {
      classes: classes
    }));
  }

  return /*#__PURE__*/_react2["default"].createElement(TextFieldComponent, _extends({
    variant: variant
  }, other, {
    classes: classes
  }));
};

var TextField = exports.TextField = WithVariantTextField;