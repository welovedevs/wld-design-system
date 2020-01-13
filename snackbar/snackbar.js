"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Snackbar = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _reactJss = require("react-jss");

var _reactJss2 = _interopRequireDefault(_reactJss);

var _reactSpring = require("react-spring");

var _lodash = require("lodash");

var _core = require("@material-ui/core");

var _snackbars_context = require("../../design_system_utils/design_system_context/components_contexts/snackbars_context");

var _snackbar_styles = require("./snackbar_styles");

var _snackbar_styles2 = _interopRequireDefault(_snackbar_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var VIEWPORT_SPACING = 30;
var SNACKBARS_SPACING = 20;
var DEFAULT_ANCHOR_ORIGIN = {
  vertical: 'bottom',
  horizontal: 'left'
};

var getDefaultSpringProps = function getDefaultSpringProps(isBottomPositionned) {
  return {
    translateX: 0,
    translateY: isBottomPositionned === 'bottom' ? 50 : -50,
    pointerEvents: 'none',
    opacity: 0,
    config: _reactSpring.config.slow
  };
};

var ENTER_SPRING_PROPS = {
  translateY: 0,
  opacity: 1,
  pointerEvents: 'all'
};

var getLeavingTranslateX = function getLeavingTranslateX(isLeftPositionned) {
  if (isLeftPositionned) {
    return -VIEWPORT_SPACING;
  }

  return VIEWPORT_SPACING;
};

var getLeavingTranslateY = function getLeavingTranslateY(isBottomPositionned) {
  if (isBottomPositionned) {
    return VIEWPORT_SPACING;
  }

  return -VIEWPORT_SPACING;
};

var getLeavingSpringProps = function getLeavingSpringProps(_ref) {
  var isBottomPositionned = _ref.isBottomPositionned,
      isLeftPositionned = _ref.isLeftPositionned,
      isSingle = _ref.isSingle;
  return _objectSpread({
    opacity: 0,
    pointerEvents: 'none'
  }, !isSingle && {
    translateX: getLeavingTranslateX(isLeftPositionned)
  }, {}, isSingle && {
    translateY: getLeavingTranslateY(isBottomPositionned)
  });
};

var getStackedSpringProps = function getStackedSpringProps(snackbarsBeforeEntries) {
  return {
    translateY: snackbarsBeforeEntries.reduce(function (total, _ref2) {
      var _ref3 = _slicedToArray(_ref2, 2),
          value = _ref3[1];

      var _ref4 = value.dimensions || {},
          _ref4$height = _ref4.height,
          height = _ref4$height === void 0 ? 0 : _ref4$height;

      return total + height + SNACKBARS_SPACING;
    }, 0)
  };
};

var SnackbarComponent = function SnackbarComponent(_ref5) {
  var className = _ref5.className,
      _ref5$open = _ref5.open,
      open = _ref5$open === void 0 ? false : _ref5$open,
      _ref5$anchorOrigin = _ref5.anchorOrigin,
      anchorOrigin = _ref5$anchorOrigin === void 0 ? DEFAULT_ANCHOR_ORIGIN : _ref5$anchorOrigin,
      onClose = _ref5.onClose,
      autoHideDuration = _ref5.autoHideDuration,
      children = _ref5.children,
      classes = _ref5.classes;

  var _useContext = (0, _react.useContext)(_snackbars_context.SnackbarsContext),
      snackbars = _useContext.snackbars,
      setSnackbars = _useContext.setSnackbars;

  var snackbarId = (0, _react.useRef)(new Date().getTime());
  var containerReference = (0, _react.useRef)();
  var autoHideTimeout = (0, _react.useRef)();

  var _useSpring = (0, _reactSpring.useSpring)(function () {
    return getDefaultSpringProps(anchorOrigin.vertical);
  }),
      _useSpring2 = _slicedToArray(_useSpring, 2),
      _useSpring2$ = _useSpring2[0],
      translateX = _useSpring2$.translateX,
      translateY = _useSpring2$.translateY,
      otherSpringProps = _objectWithoutProperties(_useSpring2$, ["translateX", "translateY"]),
      setSpringProps = _useSpring2[1];

  var handleClose = (0, _react.useCallback)(function () {
    if (typeof onClose === 'function') {
      onClose();
    }
  }, [onClose]);
  var registerSnackbar = (0, _react.useCallback)(function () {
    if (!containerReference.current) {
      return;
    }

    var _containerReference$c = containerReference.current.getBoundingClientRect(),
        height = _containerReference$c.height,
        width = _containerReference$c.width;

    var dimensions = {
      height: height,
      width: width
    };
    setSnackbars(_objectSpread({}, snackbars, _defineProperty({}, snackbarId.current, {
      open: open,
      anchorOrigin: anchorOrigin,
      dimensions: dimensions
    })));
  }, [snackbars, setSnackbars, containerReference.current]);
  var unregisterSnackbar = (0, _react.useCallback)(function () {
    var newSnackbars = _objectSpread({}, snackbars);

    delete newSnackbars[snackbarId];
    setSnackbars(newSnackbars);
  });
  var calculateSpringProps = (0, _react.useCallback)(function () {
    if (!snackbars) {
      return;
    }

    var implicatedSnackbarsEntries = Object.entries(snackbars).filter(function (_ref6) {
      var _ref7 = _slicedToArray(_ref6, 2),
          id = _ref7[0],
          value = _ref7[1];

      if (!value || id === snackbarId.current) {
        return false;
      }

      return value.open && (0, _lodash.isEqual)(value.anchorOrigin, anchorOrigin);
    });
    var isSingle = !implicatedSnackbarsEntries || !implicatedSnackbarsEntries.length;

    if (!open && (0, _lodash.get)(snackbars, "".concat(snackbarId.current, ".open"))) {
      setSpringProps(function () {
        return getLeavingSpringProps({
          isBottomPositionned: anchorOrigin.vertical === 'bottom',
          isLeftPositionned: anchorOrigin.horizontal === 'left',
          isSingle: isSingle
        });
      });
    }

    if (!open) {
      return;
    }

    var isFirst = isSingle || !implicatedSnackbarsEntries.some(function (_ref8) {
      var _ref9 = _slicedToArray(_ref8, 1),
          id = _ref9[0];

      return id > snackbarId.current;
    });

    if (isFirst) {
      setSpringProps(function () {
        return ENTER_SPRING_PROPS;
      });
      return;
    }

    var snackbarsBeforeEntries = implicatedSnackbarsEntries.filter(function (_ref10) {
      var _ref11 = _slicedToArray(_ref10, 1),
          id = _ref11[0];

      return id < snackbarId.current;
    });
    setSpringProps(function () {
      return getStackedSpringProps(snackbarsBeforeEntries);
    });
  }, [snackbars, open]);
  var handleSnackbarChange = (0, _react.useCallback)(function () {
    setSnackbars(_objectSpread({}, snackbars, _defineProperty({}, snackbarId.current, _objectSpread({}, snackbars[snackbarId.current], {
      open: open,
      anchorOrigin: anchorOrigin
    }))));
  }, [snackbars, open, anchorOrigin]);
  (0, _react.useEffect)(function () {
    calculateSpringProps();
  }, [snackbars, open]);
  (0, _react.useEffect)(function () {
    registerSnackbar();
    return function () {
      return unregisterSnackbar();
    };
  }, []);
  (0, _react.useEffect)(function () {
    handleSnackbarChange();
  }, [open, anchorOrigin]);
  (0, _react.useEffect)(function () {
    if (autoHideDuration) {
      autoHideTimeout.current = setTimeout(handleClose, autoHideDuration);
      return function () {
        clearTimeout(autoHideTimeout.current);
        autoHideTimeout.current = null;
      };
    }
  }, [autoHideDuration]);
  return _react2["default"].createElement(_core.Portal, null, _react2["default"].createElement("span", {
    ref: containerReference
  }, _react2["default"].createElement(_reactSpring.animated.div, {
    className: (0, _classnames2["default"])(classes.container, open && classes.opened, (0, _lodash.isEqual)(anchorOrigin, {
      vertical: 'bottom',
      horizontal: 'left'
    }) && classes.bottomLeft, (0, _lodash.isEqual)(anchorOrigin, {
      vertical: 'bottom',
      horizontal: 'right'
    }) && classes.bottomRight, (0, _lodash.isEqual)(anchorOrigin, {
      vertical: 'top',
      horizontal: 'left'
    }) && classes.topLeft, (0, _lodash.isEqual)(anchorOrigin, {
      vertical: 'top',
      horizontal: 'right'
    }) && classes.topRight, className),
    style: _objectSpread({
      transform: (0, _reactSpring.interpolate)([translateX, translateY], function (x, y) {
        return "translate3d(".concat(x, "px, ").concat(y, "px, 0)");
      })
    }, otherSpringProps)
  }, children)));
};

var WithStylesSnackbar = (0, _reactJss2["default"])(_snackbar_styles2["default"])(SnackbarComponent);

var WithProviderParentSnackbar = function WithProviderParentSnackbar(props) {
  return _react2["default"].createElement(_snackbars_context.SnackbarsProvider, null, _react2["default"].createElement(WithStylesSnackbar, props));
};

var Snackbar = exports.Snackbar = WithProviderParentSnackbar;