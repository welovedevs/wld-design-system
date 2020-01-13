"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ErrorCode = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require("react-router-dom");

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _reactJss = require("react-jss");

var _reactJss2 = _interopRequireDefault(_reactJss);

var _reactIntl = require("react-intl");

var _reactSpring = require("react-spring");

var _core = require("@material-ui/core");

var _icons = require("@material-ui/icons");

var _default_error_codes_messages = require("./default_error_codes_messages");

var _button = require("../button/button");

var _typography = require("../typography/typography");

var _popper_card = require("../popper_card/popper_card");

var _tooltip = require("../tooltip/tooltip");

var _avatars_utils = require("../../../utils/avatars/avatars_utils");

var _avatar = require("../../developer/smallviews/avatar/avatar");

var _error_code_styles = require("./error_code_styles");

var _error_code_styles2 = _interopRequireDefault(_error_code_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var getTypographyVariants = function getTypographyVariants(_ref) {
  var isMedium = _ref.isMedium,
      isSmall = _ref.isSmall,
      isExtraSmall = _ref.isExtraSmall;

  if (isExtraSmall) {
    return {
      code: 'wld3',
      shortMessage: 'wld5'
    };
  }

  if (isSmall) {
    return {
      code: 'wld2',
      shortMessage: 'wld4'
    };
  }

  if (isMedium) {
    return {
      code: 'wld3',
      shortMessage: 'wld5'
    };
  }

  return {
    code: 'wld1',
    shortMessage: 'wld3'
  };
};

var ErrorCodeComponent = function ErrorCodeComponent(_ref2) {
  var _ref2$code = _ref2.code,
      code = _ref2$code === void 0 ? 'unknown' : _ref2$code,
      classes = _ref2.classes;

  var _useIntl = (0, _reactIntl.useIntl)(),
      formatMessage = _useIntl.formatMessage;

  var _ref3 = _default_error_codes_messages.DEFAULT_ERROR_CODES_MESSAGES[code] || _default_error_codes_messages.DEFAULT_ERROR_CODES_MESSAGES.unknown,
      shortMessage = _ref3.shortMessage,
      longMessage = _ref3.longMessage;

  var mouthElementReference = (0, _react.useRef)();
  var containerReference = (0, _react.useRef)();
  var timeoutReference = (0, _react.useRef)();

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      openPopper = _useState2[0],
      setPopperOpenState = _useState2[1];

  var avatar = (0, _react.useMemo)(function () {
    return (0, _avatars_utils.getRandomPreconfiguredAvatar)();
  }, []);
  var springProps = (0, _reactSpring.useSpring)({
    from: {
      opacity: 0
    },
    to: {
      opacity: 1
    }
  });
  var isMedium = (0, _core.useMediaQuery)('(max-width: 750px)');
  var isSmall = (0, _core.useMediaQuery)('(max-width: 550px)');
  var isExtraSmall = (0, _core.useMediaQuery)('(max-width: 420px)');
  (0, _react.useEffect)(function () {
    if (!containerReference.current) {
      return null;
    }

    timeoutReference.current = setTimeout(function () {
      var mouthsElements = containerReference.current.querySelectorAll(".".concat(classes.avatar, " #").concat(isExtraSmall ? 'Avataaar' : 'Mouth\\/Disbelief'));

      if (mouthsElements) {
        var _mouthsElements = _slicedToArray(mouthsElements, 1);

        mouthElementReference.current = _mouthsElements[0];
      }

      setPopperOpenState(true);
      timeoutReference.current = null;
    }, 500);
    return function () {
      clearTimeout(timeoutReference.current);
      timeoutReference.current = null;
      setPopperOpenState(false);
    };
  }, [containerReference.current, isExtraSmall]);

  var _useMemo = (0, _react.useMemo)(function () {
    return getTypographyVariants({
      isMedium: isMedium,
      isSmall: isSmall,
      isExtraSmall: isExtraSmall
    });
  }, [isMedium, isSmall, isExtraSmall]),
      codeVariant = _useMemo.code,
      shortMessageVariant = _useMemo.shortMessage;

  return _react2["default"].createElement(_reactSpring.animated.div, {
    ref: containerReference,
    style: springProps,
    className: (0, _classnames2["default"])(classes.container, isMedium && classes.isMedium, isSmall && classes.isSmall, isExtraSmall && classes.isExtraSmall)
  }, _react2["default"].createElement(_avatar.W3DDevAvatar, {
    className: classes.avatar,
    config: _objectSpread({}, avatar, {
      mouthType: 'Disbelief'
    })
  }), _react2["default"].createElement("div", {
    className: classes.texts
  }, _react2["default"].createElement(_typography.Typography, {
    className: classes.code,
    color: "secondary",
    variant: codeVariant
  }, code), _react2["default"].createElement(_typography.Typography, {
    className: classes.shortMessage,
    color: "thirdary",
    variant: shortMessageVariant
  }, formatMessage(shortMessage), _react2["default"].createElement(_tooltip.Tooltip, {
    title: formatMessage(longMessage)
  }, _react2["default"].createElement("button", {
    type: "button",
    className: classes.informationIconButton
  }, _react2["default"].createElement(_icons.Info, {
    className: classes.informationIcon
  }))))), _react2["default"].createElement(_popper_card.PopperCard, {
    className: classes.popperCard,
    customClasses: {
      popper: (0, _classnames2["default"])(classes.popper, isExtraSmall && classes.withMarginPopper)
    },
    open: openPopper,
    anchorElement: mouthElementReference.current,
    popperProps: {
      placement: isExtraSmall ? 'top' : 'right',
      modifiers: {
        preventOverflow: {
          boundariesElement: 'viewport'
        }
      }
    }
  }, _react2["default"].createElement(GoHomeButton, {
    classes: classes
  }), _react2["default"].createElement(ContactUsButton, {
    classes: classes
  })));
};

var GoHomeButton = function GoHomeButton(_ref4) {
  var classes = _ref4.classes;
  return _react2["default"].createElement(_reactRouterDom.Link, {
    className: classes.link,
    to: "/"
  }, _react2["default"].createElement(_button.Button, {
    className: classes.button,
    color: "primary",
    variant: "outlined",
    size: "small"
  }, _react2["default"].createElement(_reactIntl.FormattedMessage, {
    id: "Main.lang.home",
    defaultMessage: "Retour \xE0 l'accueil"
  })));
};

var ContactUsButton = function ContactUsButton(_ref5) {
  var classes = _ref5.classes;
  var handleClick = (0, _react.useCallback)(function () {
    if (talkus) {
      talkus('open');
    }
  }, []);
  return _react2["default"].createElement(_button.Button, {
    className: classes.button,
    onClick: handleClick,
    color: "secondary",
    variant: "outlined",
    size: "small"
  }, _react2["default"].createElement(_reactIntl.FormattedMessage, {
    id: "Main.lang.contactUs",
    defaultMessage: "Nous contacter"
  }));
};

var ErrorCode = exports.ErrorCode = (0, _reactJss2["default"])(_error_code_styles2["default"])((0, _react.memo)(ErrorCodeComponent));