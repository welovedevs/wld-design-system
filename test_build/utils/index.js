"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _design_system_context = require("./design_system_context/design_system_context");

Object.keys(_design_system_context).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _design_system_context[key];
    }
  });
});