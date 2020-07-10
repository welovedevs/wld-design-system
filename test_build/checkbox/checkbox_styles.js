"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = undefined;

var _styles_utils = require("../styles/utils/styles_utils");

var _core = require("@material-ui/core");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var center = _styles_utils.flexUtils.center;
var styles = exports.styles = (0, _core.createStyles)({
  container: _objectSpread({
    height: 24,
    width: 24,
    position: 'relative',
    borderRadius: 5,
    margin: 10,
    padding: 3,
    cursor: 'pointer',
    overflow: 'hidden'
  }, center),
  raised: {
    backgroundColor: 'currentColor',
    '& $checkIcon': {
      fill: '#fff'
    }
  },
  outlined: {
    border: [1, 'solid', 'currentColor']
  },
  disabled: {
    cursor: 'not-allowed'
  },
  isRadio: {
    '&, & > $brightLayer': {
      borderRadius: '50%'
    }
  },
  brightLayer: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#fff',
    zIndex: 1
  },
  checkIcon: {
    height: '100%',
    width: 'auto',
    fill: 'currentColor'
  },
  input: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0,
    cursor: 'inherit',
    padding: 0,
    margin: 0,
    zIndex: 2
  }
});