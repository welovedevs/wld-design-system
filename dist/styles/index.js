"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _palettes = require("./palettes");

Object.keys(_palettes).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _palettes[key];
    }
  });
});

var _color_utils = require("./utils/color_utils");

Object.keys(_color_utils).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _color_utils[key];
    }
  });
});