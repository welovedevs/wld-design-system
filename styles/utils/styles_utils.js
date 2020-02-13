"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withCustomScrollbar = exports.getComponentColor = exports.getHexFromTheme = exports.getColorShade = exports.checkAndScale = exports.pixelsToRem = exports.getDefaultBorder = exports.generateGradient = exports.createBackground = exports.flexUtils = exports.card2 = undefined;

var _palettes = require("../palettes");

var _palettes2 = _interopRequireDefault(_palettes);

var _theme = require("../theme");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Material Design's box-shadows (see: https://codepen.io/sdthornton/pen/wBZdXq)
var card2 = exports.card2 = {
  boxShadow: [[0, 3, 6, 'rgba(0,0,0,.16)'], [0, 3, 6, 'rgba(0,0,0,.23)']]
}; // Flex utils

var flexUtils = exports.flexUtils = {
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}; // Background utils

var createBackground = exports.createBackground = function createBackground() {
  var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'cover';
  return {
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: size
  };
};

var generateGradient = exports.generateGradient = function generateGradient(palette) {
  var deg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'to right top';

  if (!palette || palette.length < 5) {
    return null;
  }

  return "linear-gradient(".concat(deg, ", ").concat(palette[0], ", ").concat(palette[1], ", ").concat(palette[2], ", ").concat(palette[3], ", ").concat(palette[4], ")");
}; // Borders


var getDefaultBorder = exports.getDefaultBorder = function getDefaultBorder() {
  var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'lightgray';
  return [width, 'solid', color];
}; // Transformations


var pixelsToRem = exports.pixelsToRem = function pixelsToRem(pixels) {
  return "".concat(pixels / 16, "rem");
};

var arrayToString = function arrayToString(array) {
  var transform = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (something) {
    return something;
  };

  if (!array) {
    return null;
  }

  var str = '';
  array.forEach(function (value, index) {
    str += "".concat(index !== 0 && index !== array.length ? ' ' : '').concat(transform(value), "px");
  });
  return str;
};

var checkAndScale = exports.checkAndScale = function checkAndScale(value) {
  return function (_ref) {
    var sizeScale = _ref.sizeScale;

    if (!sizeScale) {
      if (Array.isArray(value)) {
        return arrayToString(value);
      }

      return value;
    }

    if (Array.isArray(value)) {
      return arrayToString(value, function (something) {
        return something * sizeScale;
      });
    }

    return value * sizeScale;
  };
};

var getColorShade = exports.getColorShade = function getColorShade(color, percent) {
  var R = parseInt(color.substring(1, 3), 16);
  var G = parseInt(color.substring(3, 5), 16);
  var B = parseInt(color.substring(5, 7), 16);
  R = parseInt(R * (100 + percent) / 100);
  G = parseInt(G * (100 + percent) / 100);
  B = parseInt(B * (100 + percent) / 100);
  R = R < 255 ? R : 255;
  G = G < 255 ? G : 255;
  B = B < 255 ? B : 255;
  var RR = R.toString(16).length == 1 ? "0".concat(R.toString(16)) : R.toString(16);
  var GG = G.toString(16).length == 1 ? "0".concat(G.toString(16)) : G.toString(16);
  var BB = B.toString(16).length == 1 ? "0".concat(B.toString(16)) : B.toString(16);
  return "#".concat(RR).concat(GG).concat(BB);
};

var getHexFromTheme = exports.getHexFromTheme = function getHexFromTheme() {
  var _theme$palette, _theme$palette$color;

  var theme = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _theme.DEFAULT_THEME;
  var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'primary';
  var shade = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 500;
  return (_theme$palette = theme.palette) === null || _theme$palette === void 0 ? void 0 : (_theme$palette$color = _theme$palette[color]) === null || _theme$palette$color === void 0 ? void 0 : _theme$palette$color[shade];
};

var getComponentColor = exports.getComponentColor = function getComponentColor(active, color, disabled) {
  var defaultValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '#fff';

  if (disabled) {
    return '#c0c0c0';
  }

  if (active && color) {
    return color;
  }

  return defaultValue;
};

var withCustomScrollbar = exports.withCustomScrollbar = function withCustomScrollbar() {
  var color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _palettes.dark[100];
  return {
    '&::-webkit-scrollbar-track': {
      border: 0
    },
    '&::-webkit-scrollbar': {
      width: 5
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: color
    }
  };
};