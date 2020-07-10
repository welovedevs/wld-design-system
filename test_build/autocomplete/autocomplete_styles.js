"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = undefined;

var _core = require("@material-ui/core");

var styles = exports.styles = (0, _core.createStyles)({
  popperCard: {
    maxWidth: 600,
    border: 'none',
    '& > ul': {
      listStyleType: 'none',
      margin: 0,
      padding: 0
    }
  },
  listItem: {
    borderRadius: 5
  }
});