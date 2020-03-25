"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Slider = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _reactJss = require("react-jss");

var _reactMeasure = require("react-measure");

var _reactMeasure2 = _interopRequireDefault(_reactMeasure);

var _reactSpring = require("react-spring");

var _styles_utils = require("../styles/utils/styles_utils");

var _slider_styles = require("./slider_styles");

var _slider_styles2 = _interopRequireDefault(_slider_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var useStyles = (0, _reactJss.createUseStyles)(_slider_styles2["default"]);

var Slider = exports.Slider = function Slider(_ref) {
  var color = _ref.color,
      disabled = _ref.disabled,
      _ref$value = _ref.value,
      value = _ref$value === void 0 ? 0 : _ref$value,
      _ref$min = _ref.min,
      min = _ref$min === void 0 ? 0 : _ref$min,
      _ref$max = _ref.max,
      max = _ref$max === void 0 ? 100 : _ref$max,
      thumbChildren = _ref.thumbChildren,
      thumbReference = _ref.thumbReference,
      thumbProps = _ref.thumbProps,
      _ref$classes = _ref.classes,
      propsClasses = _ref$classes === void 0 ? {} : _ref$classes,
      other = _objectWithoutProperties(_ref, ["color", "disabled", "value", "min", "max", "thumbChildren", "thumbReference", "thumbProps", "classes"]);

  var theme = (0, _reactJss.useTheme)();
  var classes = useStyles();
  var hexColor = (0, _react.useMemo)(function () {
    return (0, _styles_utils.getHexFromTheme)(theme, color);
  }, [theme, color]);

  var _useState = (0, _react.useState)(0),
      _useState2 = _slicedToArray(_useState, 2),
      containerWidth = _useState2[0],
      setContainerWidth = _useState2[1];

  var _useSpring = (0, _reactSpring.useSpring)({
    translation: containerWidth * ((value - min) * 100 / (max - min) / 100),
    color: (0, _styles_utils.getComponentColor)(true, hexColor, disabled)
  }),
      translation = _useSpring.translation,
      otherRailThumbSpringProps = _objectWithoutProperties(_useSpring, ["translation"]);

  var handleMeasureChange = (0, _react.useCallback)(function (_ref2) {
    var width = _ref2.bounds.width;

    if (width !== containerWidth) {
      setContainerWidth(width);
    }
  }, [containerWidth]);
  return _react2["default"].createElement(_reactMeasure2["default"], {
    bounds: true,
    onResize: handleMeasureChange
  }, function (_ref3) {
    var measureRef = _ref3.measureRef;
    return _react2["default"].createElement("div", {
      ref: measureRef,
      className: (0, _classnames2["default"])(classes.container, disabled && classes.disabled, propsClasses.container)
    }, _react2["default"].createElement("div", {
      className: classes.track
    }, _react2["default"].createElement(_reactSpring.animated.div, {
      className: classes.rail,
      style: _objectSpread({
        transform: translation.to(function (translationValue) {
          return "translate3d(".concat(-containerWidth + translationValue, "px, 0, 0)");
        })
      }, otherRailThumbSpringProps)
    })), _react2["default"].createElement(Thumb, _extends({
      thumbChildren: thumbChildren,
      classes: classes
    }, {
      ref: thumbReference,
      style: _objectSpread({
        transform: translation.to(function (translationValue) {
          return "translate3d(".concat(translationValue, "px, 0, 0)");
        })
      }, otherRailThumbSpringProps)
    }, thumbProps)), _react2["default"].createElement("input", _extends({
      className: classes.input,
      type: "range"
    }, {
      value: value,
      min: min,
      max: max
    }, other)));
  });
};

var Thumb = (0, _react.forwardRef)(function (_ref4, ref) {
  var style = _ref4.style,
      thumbChildren = _ref4.thumbChildren,
      classes = _ref4.classes,
      other = _objectWithoutProperties(_ref4, ["style", "thumbChildren", "classes"]);

  return _react2["default"].createElement(_reactSpring.animated.div, _extends({
    className: classes.thumb
  }, other, {
    style: style
  }), _react2["default"].createElement("div", _extends({
    className: classes.thumbChildrenContainer
  }, {
    ref: ref
  }), thumbChildren));
});