"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = undefined;

var _palettes = require("../../app/palettes");

var _js = require("../../../style/js");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var styles = exports.styles = {
  heading: _objectSpread({
    height: 340,
    maxHeight: '40vh',
    position: 'relative'
  }, _js.flexUtils.center),
  video: {
    zIndex: 2,
    width: '100%',
    height: '100%'
  },
  frontImage: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    zIndex: 2,
    padding: 10
  },
  backgroundBlur: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: 0,
    left: 0,
    objectFit: 'cover'
  },
  body: {
    maxHeight: '40vh',
    minHeight: 180,
    flex: 1,
    overflowY: 'auto',
    backgroundColor: 'white',
    margin: [20, 20, 30, 20]
  },
  bodyWrapper: _objectSpread({}, _js.flexUtils.center, {
    justifyContent: 'space-around',
    flexDirection: 'column'
  }),
  buttons: {
    display: 'flex',
    alignItems: 'center'
  },
  dialogPaper: {
    width: '100%',
    maxWidth: 600,
    overflow: 'visible',
    '& .slick-dots': {
      bottom: -50
    }
  },
  swipeIcon: {
    position: 'absolute',
    bottom: 5,
    left: 5,
    animation: 'swipe-icon-movement 1s ease-in-out infinite alternate',
    transformOrigin: 'bottom center'
  },
  iNeedHelp: {
    cursor: 'pointer',
    position: 'absolute',
    bottom: 5,
    right: 5,
    fontStyle: 'italic',
    fontSize: 12
  },
  carousel: {
    flex: 1
  },
  title: {
    padding: [0, 20],
    marginBottom: 20
  },
  reverseButton: {
    '& > svg': {
      transform: 'scale(-1)'
    }
  },
  nextButton: {
    right: -80
  },
  previousButton: {
    left: -80
  },
  navigateButton: _objectSpread({
    top: 'calc(50% - 25px)',
    position: 'absolute',
    backgroundColor: _palettes.secondary[500],
    height: 50,
    width: 50,
    boxShadow: '0 20px 67px 0 rgba(0,0,0,.3)',
    cursor: 'pointer',
    borderRadius: '50%'
  }, _js.flexUtils.center, {
    '& > svg': {
      height: 20,
      width: 'auto'
    }
  }),
  carouselStep: {
    position: 'relative',
    minWidth: 300,
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 4,
    overflow: 'hidden'
  },
  carouselStepFullScreen: {
    borderRadius: 0,
    height: '100vh'
  }
};