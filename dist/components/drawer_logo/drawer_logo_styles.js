"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _js = require("../../../style/js");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var center = _js.flexUtils.center;
exports["default"] = {
  container: _objectSpread({
    position: 'absolute',
    bottom: 30,
    right: 30,
    '& > svg': {
      height: 25,
      width: 'auto',
      stroke: '#fff',
      filter: 'drop-shadow(0 0px 4px #a0a0a0)',
      '& > g': {
        stroke: 'inherit',
        boxShadow: '0 20px 67px 0 rgba(0,0,0,.3)'
      }
    }
  }, center),
  drawerAnchoredRightContainer: {
    left: 30,
    right: 'unset'
  }
};