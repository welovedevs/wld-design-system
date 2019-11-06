"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListItem = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _reactJss = require("react-jss");

var _reactJss2 = _interopRequireDefault(_reactJss);

var _reactSpring = require("react-spring");

var _typography = require("../typography/typography");

var _list_item_styles = require("./list_item_styles");

var _list_item_styles2 = _interopRequireDefault(_list_item_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var DEFAULT_SPRING_PROPS = Object.freeze({
  backgroundColor: 'rgba(0, 0, 0, 0)'
});

var ListItemComponent = function ListItemComponent(_ref) {
  var _ref$component = _ref.component,
      Component = _ref$component === void 0 ? _reactSpring.animated.li : _ref$component,
      className = _ref.className,
      typographyClassName = _ref.typographyClassName,
      button = _ref.button,
      style = _ref.style,
      onMouseEnter = _ref.onMouseEnter,
      onMouseLeave = _ref.onMouseLeave,
      classes = _ref.classes,
      children = _ref.children,
      other = _objectWithoutProperties(_ref, ["component", "className", "typographyClassName", "button", "style", "onMouseEnter", "onMouseLeave", "classes", "children"]);

  var _useSpring = (0, _reactSpring.useSpring)(function () {
    return DEFAULT_SPRING_PROPS;
  }),
      _useSpring2 = _slicedToArray(_useSpring, 2),
      springProps = _useSpring2[0],
      setSpringProps = _useSpring2[1];

  var handleMouseEnter = (0, _react.useCallback)(function () {
    if (typeof onMouseEnter === 'function') {
      onMouseEnter.apply(void 0, arguments);
    }

    setSpringProps(function () {
      return {
        backgroundColor: 'rgba(0, 0, 0, .075)'
      };
    });
  }, [onMouseEnter]);
  var handleMouseLeave = (0, _react.useCallback)(function () {
    if (typeof onMouseLeave === 'function') {
      onMouseLeave.apply(void 0, arguments);
    }

    setSpringProps(DEFAULT_SPRING_PROPS);
  }, [onMouseLeave]);
  return _react2["default"].createElement(Component, _extends({
    className: (0, _classnames2["default"])(classes.container, button && classes.button, className),
    style: _objectSpread({}, style, {}, springProps),
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave
  }, button && {
    role: 'button'
  }, other), _react2["default"].createElement(_typography.Typography, {
    className: (0, _classnames2["default"])(classes.typography, className),
    color: "dark"
  }, children));
};

var ListItem = exports.ListItem = (0, _reactJss2["default"])(_list_item_styles2["default"])(ListItemComponent);