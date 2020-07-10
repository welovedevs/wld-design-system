"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AutoComplete = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _reactAutosuggest = require("react-autosuggest");

var _reactAutosuggest2 = _interopRequireDefault(_reactAutosuggest);

var _styles = require("@material-ui/core/styles");

var _text_field = require("../text_field/text_field");

var _popper_card = require("../popper_card/popper_card");

var _typography = require("../typography/typography");

var _list_item = require("../list_item/list_item");

var _autocomplete_styles = require("./autocomplete_styles");

var _ClickAwayListener = require("@material-ui/core/ClickAwayListener");

var _ClickAwayListener2 = _interopRequireDefault(_ClickAwayListener);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var defaultGetSuggestionValue = function defaultGetSuggestionValue(_ref) {
  var value = _ref.value;
  return value;
};

var defaultFilterSuggestion = function defaultFilterSuggestion(inputValue) {
  return function (_ref2) {
    var value = _ref2.value;
    return inputValue && value && value.toLowerCase().includes(inputValue.toLowerCase());
  };
};

var useStyles = (0, _styles.makeStyles)(_autocomplete_styles.styles);

var DEFAULT_FUNCTION = function DEFAULT_FUNCTION() {};

var AutoComplete = exports.AutoComplete = function AutoComplete(_ref3) {
  var placeholder = _ref3.placeholder,
      suggestions = _ref3.suggestions,
      _ref3$onChange = _ref3.onChange,
      onChange = _ref3$onChange === void 0 ? DEFAULT_FUNCTION : _ref3$onChange,
      _ref3$onSelect = _ref3.onSelect,
      onSelect = _ref3$onSelect === void 0 ? DEFAULT_FUNCTION : _ref3$onSelect,
      _ref3$getSuggestionVa = _ref3.getSuggestionValue,
      getSuggestionValue = _ref3$getSuggestionVa === void 0 ? defaultGetSuggestionValue : _ref3$getSuggestionVa,
      renderSuggestionProps = _ref3.renderSuggestion,
      _ref3$filterFunction = _ref3.filterFunction,
      filterFunction = _ref3$filterFunction === void 0 ? defaultFilterSuggestion : _ref3$filterFunction,
      renderNoSuggestion = _ref3.renderNoSuggestion,
      _ref3$maxLength = _ref3.maxLength,
      maxLength = _ref3$maxLength === void 0 ? 10 : _ref3$maxLength,
      _ref3$value = _ref3.value,
      propsValue = _ref3$value === void 0 ? '' : _ref3$value,
      id = _ref3.id,
      name = _ref3.name,
      _ref3$transformSugges = _ref3.transformSuggestionValue,
      transformSuggestionValue = _ref3$transformSugges === void 0 ? function (props) {
    return props && props.value;
  } : _ref3$transformSugges,
      _ref3$classes = _ref3.classes,
      additionalClasses = _ref3$classes === void 0 ? {} : _ref3$classes,
      popperPlacement = _ref3.popperPlacement,
      other = _objectWithoutProperties(_ref3, ["placeholder", "suggestions", "onChange", "onSelect", "getSuggestionValue", "renderSuggestion", "filterFunction", "renderNoSuggestion", "maxLength", "value", "id", "name", "transformSuggestionValue", "classes", "popperPlacement"]);

  var classes = useStyles();
  var inputReference = (0, _react.useRef)();

  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      filteredSuggestions = _useState2[0],
      setFilteredSuggetions = _useState2[1];

  var _useState3 = (0, _react.useState)(propsValue || ''),
      _useState4 = _slicedToArray(_useState3, 2),
      value = _useState4[0],
      setValue = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      focused = _useState6[0],
      setFocused = _useState6[1];

  (0, _react.useEffect)(function () {
    setValue(propsValue);
  }, [propsValue]);

  var renderSuggestion = renderSuggestionProps || function (props) {
    return /*#__PURE__*/_react2["default"].createElement(DefaultSuggestionsRender, {
      classes: classes,
      value: transformSuggestionValue(props)
    });
  };

  var filterSuggestions = (0, _react.useCallback)(function (_ref4) {
    var inputValue = _ref4.value;
    var filter = suggestions.filter(filterFunction(inputValue));
    setFilteredSuggetions(filter.slice(0, maxLength));
  }, [suggestions]);
  var clearSuggestions = (0, _react.useCallback)(function () {
    setFilteredSuggetions([]);
  }, []);
  var valueChanged = (0, _react.useCallback)(function (e, _ref5) {
    var newValue = _ref5.newValue;
    setValue(newValue || '');
    onChange(newValue);
  }, [onChange]);
  var suggestionSelected = (0, _react.useCallback)(function (e, newValue) {
    var suggestionValue = newValue.suggestionValue;
    setValue(suggestionValue);
    onChange && onChange(suggestionValue);
    onSelect && onSelect(newValue);
  }, [onChange, onSelect]);
  var setIsFocused = (0, _react.useCallback)(function () {
    return setFocused(true);
  }, []);
  var setIsNotFocused = (0, _react.useCallback)(function () {
    return setFocused(false);
  }, []);
  var inputProps = {
    id: id,
    name: name,
    placeholder: placeholder,
    value: value,
    onChange: valueChanged,
    onFocus: setIsFocused
  };
  return /*#__PURE__*/_react2["default"].createElement(_ClickAwayListener2["default"], {
    onClickAway: setIsNotFocused
  }, /*#__PURE__*/_react2["default"].createElement(_reactAutosuggest2["default"], _extends({
    suggestions: filteredSuggestions,
    focusInputOnSuggestionClick: false,
    getSuggestionValue: getSuggestionValue,
    onSuggestionsClearRequested: clearSuggestions,
    onSuggestionsFetchRequested: filterSuggestions,
    renderSuggestion: renderSuggestion,
    renderSuggestionsContainer: function renderSuggestionsContainer(props) {
      var containerProps = props.containerProps,
          children = props.children;

      if (value && !filteredSuggestions.length && typeof renderNoSuggestion === 'function') {
        return renderNoSuggestion({
          anchorElement: inputReference.current,
          open: focused
        });
      }

      return /*#__PURE__*/_react2["default"].createElement(SuggestionsContainer, _extends({
        popperPlacement: popperPlacement,
        containerProps: containerProps,
        children: children
      }, {
        className: (0, _classnames2["default"])(classes.popperCard),
        popperCustomClasses: {
          popper: additionalClasses.popper
        },
        anchorElement: inputReference.current
      }));
    },
    onSuggestionSelected: suggestionSelected,
    renderInputComponent: function renderInputComponent(props) {
      return /*#__PURE__*/_react2["default"].createElement(_text_field.TextField, _extends({}, props, other, {
        inputRef: inputReference,
        className: classes.field
      }));
    }
  }, {
    inputProps: inputProps
  })));
};

var SuggestionsContainer = function SuggestionsContainer(_ref6) {
  var containerProps = _ref6.containerProps,
      popperPlacement = _ref6.popperPlacement,
      anchorElement = _ref6.anchorElement,
      children = _ref6.children,
      _ref6$popperCustomCla = _ref6.popperCustomClasses,
      popperCustomClasses = _ref6$popperCustomCla === void 0 ? {} : _ref6$popperCustomCla,
      className = _ref6.className;
  var lastChildrenRendered = (0, _react.useRef)(children);
  (0, _react.useEffect)(function () {
    if (children) {
      lastChildrenRendered.current = children;
    }
  }, [children]);
  return /*#__PURE__*/_react2["default"].createElement(_popper_card.PopperCard, _extends({
    className: className,
    open: Boolean(children),
    popperProps: _objectSpread({}, popperPlacement && {
      placement: popperPlacement
    }, {
      modifiers: {
        preventOverflow: {
          boundariesElement: 'viewport'
        }
      }
    }),
    customClasses: popperCustomClasses
  }, {
    anchorElement: anchorElement,
    containerProps: containerProps
  }), children || lastChildrenRendered.current);
};

var DefaultSuggestionsRender = function DefaultSuggestionsRender(_ref7) {
  var value = _ref7.value,
      classes = _ref7.classes;
  return /*#__PURE__*/_react2["default"].createElement(_list_item.ListItem, {
    className: classes.listItem,
    key: "prediction_".concat(value),
    button: true
  }, /*#__PURE__*/_react2["default"].createElement(_typography.Typography, {
    color: "dark",
    classes: {
      container: classes.predictionListItem
    }
  }, value));
};