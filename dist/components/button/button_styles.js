"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _js = require("../../../style/js");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var center = _js.flexUtils.center;
exports["default"] = {
  container: _objectSpread({
    height: 'fit-content',
    width: 'fit-content',
    maxWidth: '100%',
    borderRadius: 5,
    margin: [10, 7.5],
    padding: [12, 22],
    color: '#fff',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    border: 'none',
    backgroundColor: 'unset'
  }, center),
  withColor: {},
  applyToChildrenSameColorAsMyself: {
    '&$withColor': {
      color: 'currentColor'
    },
    '&:not($withColor)': {
      color: '#4e4e4e'
    },
    '& > $typography, & > $brightLayer': {
      color: 'currentColor'
    }
  },
  lightenBrightLayerAndTypography: {
    '& > $brightLayer, & > $typography': {
      color: '#fff'
    }
  },
  contained: {
    backgroundColor: 'currentColor',
    '&$withColor ': {
      extend: 'lightenBrightLayerAndTypography'
    }
  },
  text: {
    extend: 'applyToChildrenSameColorAsMyself'
  },
  outlined: {
    extend: 'text',
    border: [1, 'solid', 'currentColor']
  },
  disabled: {
    cursor: 'not-allowed'
  },
  size_small: {
    padding: [10, 14],
    '& > $typography': {
      fontSize: 12
    }
  },
  brightLayer: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'currentColor',
    zIndex: 1
  },
  typography: {
    display: 'flex',
    alignItems: 'center'
  }
};