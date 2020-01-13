"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BANNER_DATA = undefined;

var _icons = require("@material-ui/icons");

var _palettes = require("../../styles/palettes");

var _warning = require("../../assets/icons/warning.svg");

var BANNER_DATA = exports.BANNER_DATA = Object.freeze({
  warning: {
    color: _palettes.orange[600],
    icon: _warning.ReactComponent
  },
  error: {
    color: _palettes.danger[500],
    icon: _icons.Error
  },
  success: {
    color: _palettes.safe[500],
    icon: _icons.CheckCircle
  },
  info: {
    color: _palettes.primary[500],
    icon: _icons.Info
  }
});