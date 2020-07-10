"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = undefined;

var _core = require("@material-ui/core");

var styles = exports.styles = (0, _core.createStyles)({
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    border: [1, 'solid', 'currentColor'],
    padding: 8 * 1,
    position: 'absolute',
    top: 8 * 2,
    right: 8 * 2,
    zIndex: 100
  },
  icon: {
    height: 16,
    width: 'auto',
    color: 'currentColor'
  }
});