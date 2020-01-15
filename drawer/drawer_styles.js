"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = {
  container: {
    zIndex: 201,
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, .75)',
    position: 'fixed',
    top: 0,
    left: 0,
    '&, & *': {
      fontFamily: ['Avenir Next', 'Roboto', 'open sans', 'Arial']
    }
  },
  drawer: {
    borderRadius: 0,
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    maxWidth: 300,
    backgroundColor: '#220bab',
    transform: 'translate3d(0, 0, 0)',
    backfaceVisibility: 'hidden',
    willChange: 'transform, opacity',
    padding: [30, 20, 30, 35],
    overflowY: 'auto',
    overflowX: 'hidden'
  },
  rightAnchoredDrawer: {
    left: '100vw'
  }
};