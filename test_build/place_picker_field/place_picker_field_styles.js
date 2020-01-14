"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _palettes = require("../styles/palettes");

exports["default"] = {
  popperCard: {
    maxWidth: 350,
    border: 'none'
  },
  list: {},
  listItem: {
    borderRadius: 5
  },
  '@media screen and (max-width: 650px)': {
    list: {
      maxHeight: 200,
      overflow: 'auto',
      '&::-webkit-scrollbar-track': {
        border: 0
      },
      '&::-webkit-scrollbar': {
        width: 4
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: _palettes.primary[300],
        borderRadius: 100
      }
    }
  }
};