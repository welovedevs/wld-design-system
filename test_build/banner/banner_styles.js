"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = undefined;

var _banner_data = require("./banner_data");

var _theme = require("../styles/theme");

var _core = require("@material-ui/core");

var styles = exports.styles = function styles(theme) {
  return (0, _core.createStyles)({
    container: function container(_ref) {
      var _BANNER_DATA$type$col, _BANNER_DATA$type, _theme$palette$color, _theme$palette;

      var type = _ref.type;
      var color = (_BANNER_DATA$type$col = _banner_data.BANNER_DATA === null || _banner_data.BANNER_DATA === void 0 ? void 0 : (_BANNER_DATA$type = _banner_data.BANNER_DATA[type]) === null || _BANNER_DATA$type === void 0 ? void 0 : _BANNER_DATA$type.color) !== null && _BANNER_DATA$type$col !== void 0 ? _BANNER_DATA$type$col : 'primary';
      return {
        color: ((_theme$palette$color = (_theme$palette = theme.palette) === null || _theme$palette === void 0 ? void 0 : _theme$palette[color]) !== null && _theme$palette$color !== void 0 ? _theme$palette$color : theme.palette.primary)[500],
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
  });
};