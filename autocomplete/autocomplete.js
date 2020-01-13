"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AutoComplete = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactAutosuggest = require("react-autosuggest");

var _reactAutosuggest2 = _interopRequireDefault(_reactAutosuggest);

var _reactJss = require("react-jss");

var _reactJss2 = _interopRequireDefault(_reactJss);

var _core = require("@material-ui/core");

var _text_field = require("../text_field/text_field");

var _popper_card = require("../popper_card/popper_card");

var _autocomplete_styles = require("./autocomplete_styles");

var _autocomplete_styles2 = _interopRequireDefault(_autocomplete_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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

var AutocompleteComponent = function AutocompleteComponent(_ref3) {
  var placeholder = _ref3.placeholder,
      suggestions = _ref3.suggestions,
      onChange = _ref3.onChange,
      _ref3$getSuggestionVa = _ref3.getSuggestionValue,
      getSuggestionValue = _ref3$getSuggestionVa === void 0 ? defaultGetSuggestionValue : _ref3$getSuggestionVa,
      renderSuggestionProps = _ref3.renderSuggestion,
      _ref3$filterFunction = _ref3.filterFunction,
      filterFunction = _ref3$filterFunction === void 0 ? defaultFilterSuggestion : _ref3$filterFunction,
      _ref3$maxLength = _ref3.maxLength,
      maxLength = _ref3$maxLength === void 0 ? 10 : _ref3$maxLength,
      propsValue = _ref3.value,
      id = _ref3.id,
      name = _ref3.name,
      _ref3$transformSugges = _ref3.transformSuggestionValue,
      transformSuggestionValue = _ref3$transformSugges === void 0 ? function (props) {
    return props && props.value;
  } : _ref3$transformSugges,
      classes = _ref3.classes;
  var inputReference = (0, _react.useRef)();

  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      filteredSuggestions = _useState2[0],
      setFilteredSuggetions = _useState2[1];

  var _useState3 = (0, _react.useState)(propsValue || ''),
      _useState4 = _slicedToArray(_useState3, 2),
      value = _useState4[0],
      setValue = _useState4[1];

  var renderSuggestion = renderSuggestionProps || function (props) {
    return _react2["default"].createElement(DefaultSuggestionsRender, {
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
  var suggestionSelected = (0, _react.useCallback)(function (e, _ref6) {
    var suggestionValue = _ref6.suggestionValue;
    setValue(suggestionValue);
    onChange(suggestionValue);
  }, [onChange]);
  var inputProps = {
    id: id,
    name: name,
    placeholder: placeholder,
    value: value,
    onChange: valueChanged
  };
  return _react2["default"].createElement(_reactAutosuggest2["default"], {
    suggestions: filteredSuggestions,
    focusInputOnSuggestionClick: false,
    getSuggestionValue: getSuggestionValue,
    onSuggestionsFetchRequested: filterSuggestions,
    onSuggestionsClearRequested: clearSuggestions,
    renderSuggestion: renderSuggestion,
    renderSuggestionsContainer: function renderSuggestionsContainer(_ref7) {
      var containerProps = _ref7.containerProps,
          children = _ref7.children;
      return _react2["default"].createElement(SuggestionsContainer, _extends({
        containerProps: containerProps,
        children: children,
        classes: classes
      }, {
        anchorElement: inputReference.current
      }));
    },
    onSuggestionSelected: suggestionSelected,
    inputProps: inputProps,
    renderInputComponent: function renderInputComponent(props) {
      return _react2["default"].createElement(_text_field.TextField, _extends({}, props, {
        inputRef: inputReference,
        className: classes.field
      }));
    }
  });
};

var SuggestionsContainer = function SuggestionsContainer(_ref8) {
  var containerProps = _ref8.containerProps,
      anchorElement = _ref8.anchorElement,
      children = _ref8.children,
      classes = _ref8.classes;
  var lastChildrenRendered = (0, _react.useRef)(children);
  (0, _react.useEffect)(function () {
    if (children) {
      lastChildrenRendered.current = children;
    }
  }, [children]);
  return _react2["default"].createElement(_popper_card.PopperCard, _extends({
    className: classes.popperCard,
    open: Boolean(children),
    popperProps: {
      modifiers: {
        preventOverflow: {
          boundariesElement: 'viewport'
        }
      }
    }
  }, {
    anchorElement: anchorElement,
    containerProps: containerProps
  }), children || lastChildrenRendered.current);
};

var DefaultSuggestionsRender = function DefaultSuggestionsRender(_ref9) {
  var value = _ref9.value,
      classes = _ref9.classes;
  return _react2["default"].createElement(_core.ListItem, {
    className: classes.listItem,
    key: "prediction_".concat(value),
    button: true
  }, _react2["default"].createElement(_core.ListItemText, {
    classes: {
      root: classes.predictionListItem
    },
    primary: value
  }));
};

var AutoComplete = exports.AutoComplete = (0, _reactJss2["default"])(_autocomplete_styles2["default"])(AutocompleteComponent);