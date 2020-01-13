"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlacePickerField = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactJss = require("react-jss");

var _reactJss2 = _interopRequireDefault(_reactJss);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _core = require("@material-ui/core");

var _text_field = require("../text_field/text_field");

var _popper_card = require("../popper_card/popper_card");

var _use_places_predictions_from_input = require("../../../utils/hooks/use_places_predictions_from_input");

var _place_picker_field_styles = require("./place_picker_field_styles");

var _place_picker_field_styles2 = _interopRequireDefault(_place_picker_field_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var PlacePickerFieldComponent = function PlacePickerFieldComponent(_ref) {
  var onChange = _ref.onChange,
      onFocus = _ref.onFocus,
      onBlur = _ref.onBlur,
      onSelect = _ref.onSelect,
      receivedValue = _ref.value,
      textFieldProps = _ref.textFieldProps,
      popperCardProps = _ref.popperCardProps,
      classes = _ref.classes;
  var geocoder = (0, _react.useRef)(null);
  var fieldRef = (0, _react.useRef)();

  var _useState = (0, _react.useState)(receivedValue || ''),
      _useState2 = _slicedToArray(_useState, 2),
      input = _useState2[0],
      setInput = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      preventBlur = _useState4[0],
      setPreventBlur = _useState4[1];

  var _useState5 = (0, _react.useState)(null),
      _useState6 = _slicedToArray(_useState5, 2),
      anchorElement = _useState6[0],
      setAnchorElement = _useState6[1];

  var _useState7 = (0, _react.useState)(false),
      _useState8 = _slicedToArray(_useState7, 2),
      openPopper = _useState8[0],
      setPopperOpenState = _useState8[1];

  var _useState9 = (0, _react.useState)(false),
      _useState10 = _slicedToArray(_useState9, 2),
      isFocused = _useState10[0],
      setIsFocused = _useState10[1];

  var predictions = (0, _use_places_predictions_from_input.usePlacesPredictionsFromInput)(input);
  (0, _react.useEffect)(function () {
    setInput(receivedValue || '');

    if (fieldRef.current) {
      fieldRef.current.blur();
    }
  }, [receivedValue, fieldRef.current]);
  (0, _react.useEffect)(function () {
    if (typeof google !== 'undefined') {
      geocoder.current = new google.maps.Geocoder();
    }
  }, []);
  (0, _react.useEffect)(function () {
    if (input && predictions && isFocused && !openPopper && fieldRef.current && receivedValue !== input) {
      setAnchorElement(fieldRef.current);
      setPopperOpenState(true);
    } else if (anchorElement && (!isFocused || !predictions || !input)) {
      setInput(receivedValue);
      setPopperOpenState(false);
    }
  }, [isFocused, predictions, anchorElement, input, openPopper, receivedValue]);
  var handleInputChange = (0, _react.useCallback)(function (event) {
    if (typeof onChange === 'function') {
      onChange(event);
    }

    setInput(event.target.value);
  }, [onChange]);
  var handleFocus = (0, _react.useCallback)(function () {
    if (typeof onFocus === 'function') {
      onFocus.apply(void 0, arguments);
    }

    setIsFocused(true);
  }, [onFocus]);
  var handleBlur = (0, _react.useCallback)(function () {
    if (typeof onBlur === 'function') {
      onBlur.apply(void 0, arguments);
    }

    if (!preventBlur) {
      setIsFocused(false);
    }
  }, [preventBlur]);
  var lastItemsRendered = (0, _react.useRef)();
  (0, _react.useEffect)(function () {
    if (predictions) {
      lastItemsRendered.current = predictions;
    }
  }, [predictions]);
  return _react2["default"].createElement(_react2["default"].Fragment, null, _react2["default"].createElement(_popper_card.PopperCard, _extends({
    className: (0, _classnames2["default"])(classes.popperCard, 'places-picker-popin'),
    open: openPopper
  }, {
    anchorElement: anchorElement
  }, popperCardProps), _react2["default"].createElement(_core.List, {
    className: classes.list
  }, (predictions || lastItemsRendered.current || []).filter(function (item) {
    return item;
  }).map(function (_ref2) {
    var description = _ref2.description,
        placeId = _ref2.place_id;
    return _react2["default"].createElement(PlaceItem, {
      placeId: placeId,
      geocoder: geocoder,
      setIsFocused: setIsFocused,
      onSelect: onSelect,
      setPreventBlur: setPreventBlur,
      fieldRef: fieldRef,
      description: description,
      setInput: setInput,
      classes: classes
    });
  }))), _react2["default"].createElement(_text_field.TextField, _extends({
    containerRef: fieldRef,
    className: classes.container,
    value: input,
    onChange: handleInputChange,
    onFocus: handleFocus,
    onBlur: handleBlur
  }, textFieldProps)));
};

var PlaceItem = function PlaceItem(_ref3) {
  var placeId = _ref3.placeId,
      geocoder = _ref3.geocoder,
      onSelect = _ref3.onSelect,
      setPreventBlur = _ref3.setPreventBlur,
      fieldRef = _ref3.fieldRef,
      setInput = _ref3.setInput,
      setIsFocused = _ref3.setIsFocused,
      description = _ref3.description,
      classes = _ref3.classes;
  var handleMouseDown = (0, _react.useCallback)(function () {
    return setPreventBlur(true);
  }, [setPreventBlur]);
  var handleMouseUp = (0, _react.useCallback)(function () {
    return setPreventBlur(false);
  }, [setPreventBlur]);
  var handleClick = (0, _react.useCallback)(function () {
    setInput('');

    if (setIsFocused) {
      setIsFocused(false);
    }

    fieldRef.current.blur();

    if (typeof onSelect !== 'function' || !geocoder.current) {
      return;
    }

    geocoder.current.geocode({
      placeId: placeId
    }, function (_ref4, status) {
      var _ref5 = _slicedToArray(_ref4, 1),
          _ref5$ = _ref5[0],
          address = _ref5$.formatted_address,
          geometry = _ref5$.geometry;

      if (status) {
        if (geometry && geometry.location) {
          var _geometry$location = geometry.location,
              lat = _geometry$location.lat,
              lng = _geometry$location.lng;
          onSelect({
            location: address,
            latLng: "".concat(lat(), ",").concat(lng()),
            placeId: placeId
          });
        }
      }
    });
  }, [onSelect, geocoder, placeId, fieldRef, setInput]);
  return _react2["default"].createElement(_core.ListItem, {
    className: classes.listItem,
    key: "prediction_".concat(placeId),
    button: true,
    onMouseDown: handleMouseDown,
    onMouseUp: handleMouseUp,
    onClick: handleClick
  }, _react2["default"].createElement(_core.ListItemText, {
    classes: {
      root: classes.predictionListItem
    },
    primary: description
  }));
};

var PlacePickerField = exports.PlacePickerField = (0, _reactJss2["default"])(_place_picker_field_styles2["default"])(PlacePickerFieldComponent);