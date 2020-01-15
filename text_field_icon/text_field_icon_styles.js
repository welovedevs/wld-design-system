"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _palettes = require("../styles/palettes");

exports["default"] = {
  container: {
    padding: [5, 20],
    display: 'flex',
    '& > svg': {
      maxHeight: 22,
      maxWidth: 22,
      fill: _palettes.dark[400]
    }
  }
};