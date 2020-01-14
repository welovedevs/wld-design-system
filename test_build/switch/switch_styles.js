"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = {
  container: {
    minHeight: 30,
    height: 'fit-content',
    width: 80,
    position: 'relative',
    backgroundColor: 'currentColor',
    borderRadius: 150,
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer'
  },
  disabled: {
    cursor: 'not-allowed'
  },
  thumbContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  thumb: {
    height: 25,
    width: 25,
    margin: 6,
    backgroundColor: '#f7f7f7',
    boxShadow: '0 2px 8px rgba(0, 0, 0,.15)',
    borderRadius: '50%'
  },
  brightLayer: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#fff',
    zIndex: 1
  },
  input: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0,
    padding: 0,
    margin: 0,
    cursor: 'inherit',
    zIndex: 2
  },
  size_small: {
    width: 60,
    '& $thumb': {
      height: 16,
      width: 16
    }
  }
};