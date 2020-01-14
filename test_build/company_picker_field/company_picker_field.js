"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CompanyPickerField = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactJss = require("react-jss");

var _reactJss2 = _interopRequireDefault(_reactJss);

var _reactIntl = require("react-intl");

var _reactInstantsearchDom = require("react-instantsearch-dom");

var _text_field = require("../text_field/text_field");

var _company_picker_popper = require("./company_picker_popper/company_picker_popper");

var _company_picker_field_styles = require("./company_picker_field_styles");

var _company_picker_field_styles2 = _interopRequireDefault(_company_picker_field_styles);

var _company_picker_field_translations = require("./company_picker_field_translations");

var _company_picker_field_translations2 = _interopRequireDefault(_company_picker_field_translations);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var CompanyPickerFieldComponent = function CompanyPickerFieldComponent(_ref) {
  var formatMessage = _ref.intl.formatMessage,
      onSelect = _ref.onSelect,
      textFieldProps = _ref.textFieldProps,
      companiesToHide = _ref.companiesToHide;
  var inputReference = (0, _react.useRef)();
  var inputElement = (0, _react.useRef)();

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      open = _useState2[0],
      setOpen = _useState2[1];

  var _useState3 = (0, _react.useState)(''),
      _useState4 = _slicedToArray(_useState3, 2),
      query = _useState4[0],
      setQuery = _useState4[1];

  var handleInputChange = (0, _react.useCallback)(function (event) {
    if (!event) {
      return;
    }

    var value = event.target.value;
    setQuery(value);

    if (value.length > 2) {
      setOpen(true);
    } else if (open) {
      setOpen(false);
    }
  }, [open]);
  (0, _react.useEffect)(function () {
    inputElement.current = (0, _reactDom.findDOMNode)(inputReference.current);
  }, []);
  return _react2["default"].createElement(_react2["default"].Fragment, null, _react2["default"].createElement(_text_field.TextField, _extends({
    containerRef: inputReference,
    placeholder: formatMessage(_company_picker_field_translations2["default"].textFieldPlaceHolder),
    value: query,
    onChange: handleInputChange
  }, textFieldProps)), _react2["default"].createElement(_reactInstantsearchDom.InstantSearch, {
    appId: process.env.ALGOLIA_ID,
    apiKey: process.env.ALGOLIA_PUBLIC_KEY,
    indexName: "public_companies_preview"
  }, _react2["default"].createElement(_reactInstantsearchDom.Configure, {
    query: query
  }), _react2["default"].createElement(_company_picker_popper.CompanyPickerPopper, _extends({
    open: open,
    onSelect: onSelect,
    companiesToHide: companiesToHide
  }, {
    onClose: function onClose() {
      return setOpen(false);
    },
    anchorElement: inputElement.current
  }))));
};

var CompanyPickerField = exports.CompanyPickerField = (0, _reactIntl.injectIntl)((0, _reactJss2["default"])(_company_picker_field_styles2["default"])(CompanyPickerFieldComponent));