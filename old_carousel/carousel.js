"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Carousel = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _reactJss = require("react-jss");

var _reactSlick = require("react-slick");

var _reactSlick2 = _interopRequireDefault(_reactSlick);

var _reactEmojiRender = require("react-emoji-render");

var _reactSpring = require("react-spring");

var _core = require("@material-ui/core");

var _button = require("../button/button");

var _typography = require("../typography/typography");

var _carousel_styles = require("./carousel_styles");

require("./override_nuka.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var SwipeIcon = function SwipeIcon(props) {
  return _react2["default"].createElement("svg", props, _react2["default"].createElement("title", null, "gesture swipe horizontal 3 (From Streamline App : https://app.streamlineicons.com)"), _react2["default"].createElement("path", {
    d: "M10.608 20.748l-3.789-3.093a1.638 1.638 0 1 1 1.755-2.744l1.174.587v-6.75a1.5 1.5 0 0 1 3 0v4.5l1.993.333a3 3 0 0 1 2.507 2.959v4.208",
    stroke: "#000",
    fill: "none",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), _react2["default"].createElement("g", {
    stroke: "#000",
    fill: "none",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, _react2["default"].createElement("path", {
    d: "M.748 7.248h5.25M4.498 3.498l-3.75 3.75 3.75 3.75M15.748 7.248h7.5M19.498 3.498l3.75 3.75-3.75 3.75"
  })));
};

SwipeIcon.defaultProps = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  height: "24",
  width: "24"
};

var ArrowIcon = function ArrowIcon(props) {
  return _react2["default"].createElement("svg", props, _react2["default"].createElement("title", null, "8EF129AF-95B1-4C07-9122-3A6270D59E16@2x"), _react2["default"].createElement("path", {
    d: "M20 3L4 19.5 20 36",
    stroke: "#FFF",
    strokeWidth: "5.2",
    fill: "none",
    fillRule: "evenodd",
    strokeLinecap: "round"
  }));
};

ArrowIcon.defaultProps = {
  width: "23",
  height: "39",
  viewBox: "0 0 23 39",
  xmlns: "http://www.w3.org/2000/svg"
};
var useStyles = (0, _reactJss.createUseStyles)(_carousel_styles.styles);
var DEFAULT_ARROW_SPRING_PROPS = Object.freeze({
  scale: 1
});

var NavigateButton = function NavigateButton(_ref) {
  var className = _ref.className,
      classes = _ref.classes,
      reverse = _ref.reverse,
      onClick = _ref.onClick,
      buttonClassName = _ref.buttonProps.className,
      currentSlide = _ref.currentSlide,
      slideCount = _ref.slideCount,
      arrowRole = _ref.arrowRole;

  var _useSpring = (0, _reactSpring.useSpring)(function () {
    return DEFAULT_ARROW_SPRING_PROPS;
  }),
      _useSpring2 = _slicedToArray(_useSpring, 2),
      springProps = _useSpring2[0],
      setSpringProps = _useSpring2[1];

  var handleMouseDown = (0, _react.useCallback)(function () {
    setSpringProps(function () {
      return {
        scale: 0.9
      };
    });
  }, [setSpringProps]);
  var handleMouseUp = (0, _react.useCallback)(function () {
    setSpringProps(function () {
      return DEFAULT_ARROW_SPRING_PROPS;
    });
  }, [setSpringProps]);

  if (arrowRole === 'prev' && currentSlide === 0) {
    return null;
  }

  if (arrowRole === 'next' && currentSlide === slideCount - 1) {
    return null;
  }

  return _react2["default"].createElement(_reactSpring.animated.button, {
    onClick: onClick,
    className: (0, _classnames2["default"])(className, buttonClassName, classes.navigateButton, reverse && classes.reverseButton),
    type: "button",
    onMouseDown: handleMouseDown,
    onMouseUp: handleMouseUp,
    onFocus: handleMouseDown,
    onBlur: handleMouseUp,
    style: {
      transform: springProps.scale.interpolate(function (value) {
        return "scale3d(".concat(value, ", ").concat(value, ", ").concat(value, ")");
      })
    }
  }, _react2["default"].createElement(ArrowIcon, null));
};

var CarouselStep = function CarouselStep(_ref2) {
  var fullScreen = _ref2.fullScreen,
      freelyStructuredSteps = _ref2.freelyStructuredSteps,
      step = _ref2.step,
      onAction = _ref2.onAction,
      onDismiss = _ref2.onDismiss,
      classes = _ref2.classes;
  return _react2["default"].createElement("div", {
    className: (0, _classnames2["default"])(classes.carouselStep, fullScreen && classes.carouselStepFullScreen)
  }, _react2["default"].createElement(StepContent, {
    fullScreen: fullScreen,
    freelyStructuredSteps: freelyStructuredSteps,
    step: step,
    onAction: onAction,
    onDismiss: onDismiss,
    classes: classes
  }));
};

var StepContent = function StepContent(_ref3) {
  var freelyStructuredSteps = _ref3.freelyStructuredSteps,
      fullScreen = _ref3.fullScreen,
      step = _ref3.step,
      onAction = _ref3.onAction,
      onDismiss = _ref3.onDismiss,
      classes = _ref3.classes;
  var isMobile = (0, _core.useMediaQuery)('(max-width: 500px)');

  if (freelyStructuredSteps) {
    return step({
      onAction: onAction,
      isMobile: isMobile,
      fullScreen: fullScreen
    });
  }

  return _react2["default"].createElement(StructuredStep, {
    onAction: onAction,
    step: step,
    isMobile: isMobile,
    onDismiss: onDismiss,
    classes: classes
  });
};

var StructuredStep = function StructuredStep(_ref4) {
  var onAction = _ref4.onAction,
      step = _ref4.step,
      isMobile = _ref4.isMobile,
      onDismiss = _ref4.onDismiss,
      classes = _ref4.classes;

  var _useIntl = useIntl(),
      formatMessage = _useIntl.formatMessage,
      formatHTMLMessage = _useIntl.formatHTMLMessage;

  var imgHandle = step.imgHandle,
      videoLink = step.videoLink,
      subtitle = step.subtitle,
      title = step.title,
      dismissButtonText = step.dismissButtonText,
      buttonText = step.buttonText,
      dismissable = step.dismissable,
      onClickPayload = step.onClickPayload;
  var helpClicked = (0, _react.useCallback)(function () {
    talkus('sendMessage', formatMessage(translations.talkusNeedHelp));
  }, [formatMessage]);
  var handleAction = (0, _react.useCallback)(function () {
    onAction(onClickPayload);
  }, [onAction, onClickPayload]);
  return _react2["default"].createElement(_react2["default"].Fragment, null, _react2["default"].createElement("div", {
    className: classes.heading
  }, _react2["default"].createElement(FilestackImage, {
    className: classes.backgroundBlur,
    handle: "PghPn9c7QeuQeZXiyrOM",
    additionalTasks: "resize=width:600,height:340,fit:clip",
    quality: 90
  }), videoLink && _react2["default"].createElement(ReactPlayer, {
    className: classes.video,
    playing: true,
    loop: true,
    url: videoLink,
    autoPlay: true,
    width: "100%",
    height: "100%"
  }), imgHandle && _react2["default"].createElement(_react2["default"].Fragment, null, _react2["default"].createElement(FilestackImage, {
    className: classes.frontImage,
    handle: imgHandle,
    additionalTasks: "resize=width:600,height:340,fit:clip",
    quality: 90
  }))), _react2["default"].createElement("div", {
    className: classes.body
  }, _react2["default"].createElement("div", {
    className: classes.bodyWrapper
  }, title && _react2["default"].createElement(_typography.Typography, {
    className: classes.title,
    variant: "h3",
    component: function component(_ref5) {
      var children = _ref5.children,
          other = _objectWithoutProperties(_ref5, ["children"]);

      return _react2["default"].createElement("span", _extends({
        dangerouslySetInnerHTML: {
          __html: typeof title === 'string' ? title : formatHTMLMessage(title)
        }
      }, other));
    }
  }), subtitle && _react2["default"].createElement(_typography.Typography, {
    className: classes.title,
    component: function component(_ref6) {
      var children = _ref6.children,
          other = _objectWithoutProperties(_ref6, ["children"]);

      return _react2["default"].createElement("span", _extends({
        dangerouslySetInnerHTML: {
          __html: typeof subtitle === 'string' ? subtitle : formatHTMLMessage(subtitle)
        }
      }, other));
    }
  }), _react2["default"].createElement("div", {
    className: classes.buttons
  }, dismissable && _react2["default"].createElement(_button.Button, {
    onClick: onDismiss,
    variant: "contained",
    style: {
      color: 'white'
    }
  }, _react2["default"].createElement(_reactEmojiRender.Twemoji, {
    svg: true,
    text: formatMessage(dismissButtonText || translations.noThanks)
  })), onClickPayload && _react2["default"].createElement(_button.Button, {
    variant: "contained",
    size: isMobile && 'small',
    color: "primary",
    onClick: handleAction
  }, _react2["default"].createElement(_reactEmojiRender.Twemoji, {
    svg: true,
    text: formatMessage(buttonText || translations.ok)
  }))))), isMobile && _react2["default"].createElement(SwipeIcon, {
    className: classes.swipeIcon
  }), _react2["default"].createElement(_typography.Typography, {
    className: classes.iNeedHelp,
    onClick: helpClicked,
    component: function component(_ref7) {
      var children = _ref7.children,
          other = _objectWithoutProperties(_ref7, ["children"]);

      return _react2["default"].createElement(_reactEmojiRender.Twemoji, _extends({
        svg: true,
        text: children
      }, other));
    }
  }, formatMessage(translations.needHelp)));
};

var CarouselComponent = function CarouselComponent(_ref8) {
  var open = _ref8.open,
      onCarouselEnd = _ref8.onCarouselEnd,
      onClick = _ref8.onClick,
      onDismiss = _ref8.onDismiss,
      onClose = _ref8.onClose,
      steps = _ref8.steps,
      fullScreen = _ref8.fullScreen,
      children = _ref8.children,
      _ref8$customClasses = _ref8.customClasses,
      customClasses = _ref8$customClasses === void 0 ? {} : _ref8$customClasses;
  var classes = useStyles(_carousel_styles.styles);
  var carouselRef = (0, _react.useRef)();
  var handleAction = (0, _react.useCallback)(function (_ref9) {
    var action = _ref9.action;

    if (action === CAROUSEL_ACTIONS.STEP_END) {
      onCarouselEnd();
    } else if (action === CAROUSEL_ACTIONS.NEXT) {
      carouselRef.current.slickNext();
    } else if (action === CAROUSEL_ACTIONS.PREV) {
      carouselRef.current.slickPrev();
    }
  }, [carouselRef.current, onCarouselEnd]);
  (0, _react.useEffect)(function () {
    if (carouselRef.current) {
      carouselRef.current.slickGoTo(0);
    }
  }, [steps]);
  return _react2["default"].createElement(_core.Dialog, _extends({
    classes: {
      paper: (0, _classnames2["default"])(classes.dialogPaper, customClasses.dialogPaper)
    }
  }, {
    open: open,
    onClose: onClose,
    fullScreen: fullScreen
  }), _react2["default"].createElement(_reactSlick2["default"], {
    ref: carouselRef,
    dots: true,
    infinite: false,
    prevArrow: _react2["default"].createElement(NavigateButton, _extends({
      classes: classes
    }, {
      arrowRole: "prev",
      buttonProps: {
        className: classes.previousButton
      }
    })),
    nextArrow: _react2["default"].createElement(NavigateButton, _extends({
      classes: classes
    }, {
      arrowRole: "next",
      buttonProps: {
        className: classes.nextButton
      },
      reverse: true
    }))
  }, steps.map(function (step, stepIndex) {
    return _react2["default"].createElement(CarouselStep, _extends({
      key: "carousel_step_".concat(stepIndex),
      onAction: handleAction
    }, {
      fullScreen: fullScreen,
      classes: classes,
      onDismiss: onDismiss,
      step: step,
      onClick: onClick
    }));
  })), children);
};

var Carousel = exports.Carousel = CarouselComponent;