"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CompanyPickerPopper = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactJss = require("react-jss");

var _reactJss2 = _interopRequireDefault(_reactJss);

var _reactInstantsearchDom = require("react-instantsearch-dom");

var _core = require("@material-ui/core");

var _list = require("../../list/list");

var _list_item = require("../../list_item/list_item");

var _typography = require("../../typography/typography");

var _popper_card = require("../../popper_card/popper_card");

var _FilestackImage = require("../../../../utils/images/FilestackImage");

var _company_picker_popper_styles = require("./company_picker_popper_styles");

var _company_picker_popper_styles2 = _interopRequireDefault(_company_picker_popper_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var CompanyPickerPopperComponent = (0, _reactInstantsearchDom.connectStateResults)(function (_ref) {
  var searchResults = _ref.searchResults,
      onSelect = _ref.onSelect,
      companiesToHide = _ref.companiesToHide,
      onClose = _ref.onClose,
      classes = _ref.classes,
      isMobile = _ref.isMobile,
      props = _objectWithoutProperties(_ref, ["searchResults", "onSelect", "companiesToHide", "onClose", "classes", "isMobile"]);

  if (!searchResults || !searchResults.hits || !searchResults.hits.length) {
    return null;
  }

  return _react2["default"].createElement(_popper_card.PopperCard, _extends({
    customClasses: {
      popper: classes.popper,
      container: classes.container
    },
    popperProps: {
      placement: isMobile ? 'top' : 'right',
      modifiers: {
        preventOverflow: {
          boundariesElement: 'viewport'
        }
      }
    }
  }, props), _react2["default"].createElement(_list.List, {
    className: classes.list
  }, searchResults.hits.filter(function (hit) {
    return hit.description && !(companiesToHide && companiesToHide.includes(hit.id));
  }).map(function (_ref2) {
    var id = _ref2.id,
        description = _ref2.description;
    return _react2["default"].createElement(_list_item.ListItem, {
      key: "blacklist_search_item_".concat(id),
      className: classes.listItem,
      onClick: function onClick() {
        if (typeof onSelect === 'function') {
          onSelect(id);
        }

        if (typeof onClose === 'function') {
          onClose();
        }
      },
      button: true
    }, description.profilePic && description.profilePic.handle && _react2["default"].createElement("div", {
      className: classes.avatar
    }, _react2["default"].createElement(_FilestackImage.FilestackImageComponent, {
      className: classes.image,
      additionalTasks: "resize=width:150",
      quality: 90,
      handle: description.profilePic.handle,
      alt: description.companyName
    })), _react2["default"].createElement(_typography.Typography, {
      color: "dark"
    }, description.companyName));
  })));
}, function (prevProps, nextProps) {
  if (prevProps.searchResults && nextProps.searchResults) {
    var prevIDs = prevProps.searchResults.hits.map(function (hit) {
      return hit.id;
    });
    var nextIDS = nextProps.searchResults.hits.map(function (hit) {
      return hit.id;
    });
    return prevIDs.join() === nextIDS.join() && prevProps.searchResults.nbHits === nextProps.searchResults.nbHits;
  }

  return false;
});

var WithIsMobileCompanyPickerPopperComponent = function WithIsMobileCompanyPickerPopperComponent(props) {
  var isMobile = (0, _core.useMediaQuery)('(max-width: 650px)');
  return _react2["default"].createElement(CompanyPickerPopperComponent, _extends({}, props, {
    isMobile: isMobile
  }));
};

var CompanyPickerPopper = exports.CompanyPickerPopper = (0, _reactJss2["default"])(_company_picker_popper_styles2["default"])(WithIsMobileCompanyPickerPopperComponent);