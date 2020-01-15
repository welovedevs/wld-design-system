"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var styles = exports.styles = {
  container: {
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