"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = undefined;

var _banner_data = require("./banner_data");

var _theme = require("../styles/theme");

var styles = exports.styles = function styles(inputTheme) {
  var theme = Object.keys(inputTheme).length ? inputTheme : _theme.DEFAULT_THEME;
  return {
    container: function container(_ref) {
      var _ref2, _BANNER_DATA$type, _ref3, _theme$palette;

      var type = _ref.type;
      var color = (_ref2 = _banner_data.BANNER_DATA === null || _banner_data.BANNER_DATA === void 0 ? void 0 : (_BANNER_DATA$type = _banner_data.BANNER_DATA[type]) === null || _BANNER_DATA$type === void 0 ? void 0 : _BANNER_DATA$type.color) !== null && _ref2 !== void 0 ? _ref2 : 'primary';
      return {
        color: ((_ref3 = (_theme$palette = theme.palette) === null || _theme$palette === void 0 ? void 0 : _theme$palette[color]) !== null && _ref3 !== void 0 ? _ref3 : theme.palette.primary)[500],
        width: '100%',
        padding: [25, 40],
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        '&::before': {
          height: '100%',
          width: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          backgroundColor: 'currentColor',
          opacity: 0.15,
          borderRadius: 5,
          zIndex: 0,
          content: "''"
        },
        '& > *': {
          zIndex: 1
        }
      };
    },
    iconContainer: {
      display: 'flex',
      marginRight: 30,
      '& > svg': {
        height: 60,
        width: 60,
        '& > g > path:last-child': {
          fill: 'currentColor'
        }
      }
    },
    '@media screen and (max-width: 550px)': {
      iconContainer: {
        display: 'none'
      }
    },
    '@media screen and (max-width: 400px)': {
      container: {
        padding: 25
      }
    }
  };
};