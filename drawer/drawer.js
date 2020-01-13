"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Drawer = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require("react-router-dom");

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _reactJss = require("react-jss");

var _reactJss2 = _interopRequireDefault(_reactJss);

var _reactSpring = require("react-spring");

var _core = require("@material-ui/core");

var _card = require("../card/card");

var _drawer_styles = require("./drawer_styles");

var _drawer_styles2 = _interopRequireDefault(_drawer_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ANIMATED_INDEX_ATTRIBUTE = 'data-drawer-animated-index';

var getDirectAnimatableChildrenFromDrawer = function getDirectAnimatableChildrenFromDrawer(drawerNode) {
  if (!drawerNode) {
    return null;
  }

  return Array.from(drawerNode.querySelectorAll("*[".concat(ANIMATED_INDEX_ATTRIBUTE, "]"))).sort(function (a, b) {
    return (a.getAttribute(ANIMATED_INDEX_ATTRIBUTE) || 0) - (b.getAttribute(ANIMATED_INDEX_ATTRIBUTE) || 0);
  });
};

var DrawerComponent = function DrawerComponent(_ref) {
  var _ref$anchor = _ref.anchor,
      anchor = _ref$anchor === void 0 ? 'left' : _ref$anchor,
      open = _ref.open,
      onClose = _ref.onClose,
      classes = _ref.classes,
      location = _ref.location,
      children = _ref.children,
      listenToClickAway = _ref.listenToClickAway,
      _ref$customClasses = _ref.customClasses,
      customClasses = _ref$customClasses === void 0 ? {} : _ref$customClasses;
  var drawerReference = (0, _react.useRef)();
  var overflowTimeout = (0, _react.useRef)();
  (0, _react.useEffect)(function () {
    document.body.style.overflow = 'unset';
  }, []);
  (0, _react.useEffect)(function () {
    if (overflowTimeout.current) {
      clearTimeout(overflowTimeout.current);
    }

    overflowTimeout.current = setTimeout(function () {
      document.body.style.overflow = open ? 'hidden' : 'unset';
    }, 500);
  }, [open]);
  var oldPathname = (0, _react.useRef)();
  (0, _react.useEffect)(function () {
    if (!location || !location.pathname) {
      return;
    }

    var pathname = location.pathname;

    if (pathname !== oldPathname.current) {
      if (onClose) {
        onClose();
      }

      oldPathname.current = pathname;
    }
  }, [location]);
  (0, _react.useEffect)(function () {
    if (drawerReference && drawerReference.current) {
      var animatableChildren = getDirectAnimatableChildrenFromDrawer(drawerReference.current);

      if (!animatableChildren) {
        return;
      }

      animatableChildren.forEach(function (element, index) {
        if (open) {
          Object.entries({
            opacity: 0,
            animation: "fade-in-translate-".concat(anchor, "-50 1s"),
            animationFillMode: 'forwards',
            animationDelay: "".concat(index * 60, "ms")
          }).forEach(function (_ref2) {
            var _ref3 = _slicedToArray(_ref2, 2),
                key = _ref3[0],
                value = _ref3[1];

            element.style[key] = value;
          });
        } else {
          Object.keys(element.style).forEach(function (key) {
            element.style.removeProperty(key);
          });
        }
      });
    }
  }, [open, drawerReference && drawerReference.current]);
  var closedMenuStyles = {
    translation: anchor === 'right' ? 0 : -100,
    pointerEvents: 'none'
  };
  var openedMenuStyles = {
    translation: anchor === 'right' ? -100 : 0,
    pointerEvents: 'all'
  };
  var menuStyles = (0, _reactSpring.useSpring)(_objectSpread({}, !open && closedMenuStyles, {}, open && openedMenuStyles, {
    config: _reactSpring.config["default"]
  }));
  var parentContainerStyles = (0, _reactSpring.useSpring)({
    opacity: open ? 1 : 0,
    pointerEvents: open ? 'all' : 'none'
  });
  var opacity = menuStyles.opacity,
      translation = menuStyles.translation,
      pointerEvents = menuStyles.pointerEvents;
  var handleClickAway = (0, _react.useCallback)(function () {
    if (!open) {
      return;
    }

    if (typeof onClose === 'function') {
      onClose();
    }
  }, [open, onClose]);

  var card = _react2["default"].createElement(_card.Card, {
    containerRef: drawerReference,
    className: (0, _classnames2["default"])(classes.drawer, anchor === 'right' && classes.rightAnchoredDrawer, customClasses.drawer),
    style: {
      opacity: opacity,
      pointerEvents: pointerEvents,
      transform: translation.interpolate(function (value) {
        return "translate3d(".concat(value, "%, 0, 0)");
      })
    },
    elevation: "drawer"
  }, _react2["default"].Children.map(children, function (child) {
    return (0, _react.cloneElement)(child, {
      drawerAnchor: anchor
    });
  }));

  var content = null;

  if (open && listenToClickAway) {
    content = _react2["default"].createElement(_core.ClickAwayListener, {
      onClickAway: handleClickAway
    }, _react2["default"].createElement("div", null, card));
  } else {
    content = card;
  }

  return _react2["default"].createElement(_core.Portal, null, _react2["default"].createElement(_reactSpring.animated.div, {
    className: classes.container,
    style: parentContainerStyles
  }, content));
};

var Drawer = exports.Drawer = (0, _reactRouterDom.withRouter)((0, _reactJss2["default"])(_drawer_styles2["default"])(DrawerComponent));