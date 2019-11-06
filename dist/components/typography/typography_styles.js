"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = undefined;

var _palettes = require("../../styles/palettes");

var styles = exports.styles = {
  container: {
    fontFamily: ['Avenir Next', 'Roboto', 'Open sans', 'Arial'],
    color: _palettes.dark[400]
  },
  heading: {
    color: _palettes.dark[500],
    margin: 0
  },
  h1: {
    extend: 'heading',
    fontSize: 54,
    lineHeight: '72px',
    fontWeight: 900
  },
  h2: {
    extend: 'heading',
    fontSize: 40,
    lineHeight: '52px',
    fontWeight: 700
  },
  h3: {
    extend: 'heading',
    fontSize: 22,
    lineHeight: '27px',
    fontWeight: 500
  },
  h4: {
    extend: 'heading',
    fontWeight: 400,
    fontSize: 18,
    lineHeight: '24px'
  },
  h5: {
    extend: 'heading',
    fontWeight: 400
  },
  h6: {
    extend: 'heading',
    fontWeight: 400
  },
  body1: {
    fontSize: 16,
    lineHeight: '20px'
  },
  body2: {
    fontSize: 14,
    lineHeight: '18px'
  },
  tag: {
    fontSize: 12,
    textTransform: 'uppercase',
    fontWeight: '700',
    letterSpacing: '1px'
  },
  button: {
    fontSize: 14,
    textTransform: 'uppercase',
    fontWeight: 500,
    letterSpacing: '.8px'
  },
  wld: {
    width: 'fit-content',
    padding: [8, 16],
    borderRadius: 5,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 900,
    backgroundColor: '#fff',
    transform: 'skewY(-5deg)',
    transformOrigin: 'bottom left'
  },
  wld1: {
    extend: 'wld',
    fontSize: 54,
    lineHeight: '62px',
    padding: [12, 28]
  },
  wld2: {
    extend: 'wld',
    fontSize: 40,
    lineHeight: '50px',
    padding: [12, 24]
  },
  wld3: {
    extend: 'wld',
    fontSize: 30,
    lineHeight: '44px',
    padding: [11, 22]
  },
  wld4: {
    extend: 'wld',
    fontSize: 22,
    lineHeight: '38x',
    padding: [10, 20]
  },
  wld5: {
    extend: 'wld',
    fontSize: 16,
    lineHeight: '30px',
    padding: [9, 18]
  },
  wld6: {
    extend: 'wld',
    fontSize: 13,
    lineHeight: '26px',
    padding: [8, 16]
  },
  helper: {
    fontSize: 13,
    marginTop: 15
  },
  label: {
    extend: 'body2',
    marginBottom: 8
  },
  primary: {}
};