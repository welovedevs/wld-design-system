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

var _styles_utils = require("./utils/styles_utils");

Object.keys(_styles_utils).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _styles_utils[key];
    }
  });
});