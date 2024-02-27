import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import React, { forwardRef, useState, useMemo, useCallback, useRef, useEffect, createContext, Component, useContext } from 'react';
import Autosuggest from 'react-autosuggest';
import cn from 'classnames';
import IconButton from '@mui/material/IconButton';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Popper from '@mui/material/Popper';
import merge from 'lodash/merge';
import uniqBy from 'lodash/uniqBy';
import CheckIcon$1 from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import MuiSlider from '@mui/material/Slider';
import get from 'lodash/get';
import MuiTooltip from '@mui/material/Tooltip';
import last from 'lodash/last';
import { useSensors, useSensor, PointerSensor, KeyboardSensor, DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates, SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { Select as Select$1, InputBase, MenuItem } from '@mui/material';
import Cancel from '@mui/icons-material/Cancel';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

const baseStyles$4 = {
    container: 'ds-w-fit ds-rounded-md ds-flex ds-items-center ds-p-0 ds-overflow-hidden ds-border ds-border-solid ds-border-dark-100 focus-within:ds-border-indigo-500 focus-within:ds-ring-2',
    multilineContainer: '',
    input: 'ds-bg-transparent ds-w-full  ds-border-0 ds-font-w3d ds-text-dark-400 ds-flex ds-items-center focus-visible:ds-outline-none focus-visible:ds-ring-0 focus-visible:ds-border-0',
    multilineInput: 'ds-px-2 ds-py-1 ds-scrollbar',
    disabled: 'ds-cursor-not-allowed ',
};
const sizeStyles$2 = {
    small: 'ds-px-1 ds-py-1/2 ds-min-h-3 ds-leading-[16px] ds-text-[12px]',
    regular: 'ds-px-1.5 ds-py-1.5 ds-min-h-[40px] ds-text-[16px] ds-leading-[24px] ',
};
const variantStyles$1 = {
    flat: 'ds-border ds-border-solid ds-border-dark-100 ds-bg-[#f9f9f9]',
    raised: 'ds-bg-light-500 ds-shadow-md hover:ds-shadow-lg',
    underlined: 'ds-bg-transparent ds-border-0 ds-border-b-2 ds-border-solid ds-border-[#e8e8e8] ds-rounded-none',
    flatDisabled: `ds-bg-[#f9f9f9] ds-text-dark-200`,
    raisedDisabled: ``,
    underlinedDisabled: ``,
};
const inputStyles = {
    flat: '',
    raised: '',
    underlined: 'ds-pb-1',
    disabled: `${baseStyles$4.disabled}  ds-text-dark-300`,
    flatDisabled: `${baseStyles$4.disabled}  ds-text-dark-200`,
    raisedDisabled: ``,
    underlinedDisabled: ``,
};

const TextField = forwardRef((_a, ref) => {
    var { containerElement: ContainerElement = 'div', containerProps, className, inputClassName, fullWidth, inputRef, containerRef, beforeChildren = null, multiline, rows, children, variant = 'raised', type = 'text', disabled, size = 'regular', classes = {} } = _a, other = __rest(_a, ["containerElement", "containerProps", "className", "inputClassName", "fullWidth", "inputRef", "containerRef", "beforeChildren", "multiline", "rows", "children", "variant", "type", "disabled", "size", "classes"]);
    const InputComponent = multiline ? 'textarea' : 'input';
    const isPassword = type === 'password';
    const [showHidePassword, changeShowHidePassword] = useState(false);
    const togglePasswordVisiblity = () => {
        changeShowHidePassword(!showHidePassword);
    };
    return (jsxs(ContainerElement, Object.assign({ ref: ref || containerRef, className: cn(className, baseStyles$4.container, fullWidth && 'w-full', multiline && baseStyles$4.multilineContainer, variant && variantStyles$1[variant], disabled && variant && variantStyles$1[`${variant}Disabled`], classes === null || classes === void 0 ? void 0 : classes.container) }, (containerProps &&
        containerProps.style && {
        style: containerProps.style,
    }), containerProps, { children: [beforeChildren, jsx(InputComponent, Object.assign({ ref: inputRef, className: cn(inputClassName, baseStyles$4.input, multiline && baseStyles$4.multilineInput, size && sizeStyles$2[size], variant && inputStyles[variant], disabled && inputStyles.disabled, disabled && variant && inputStyles[`${variant}Disabled`], classes === null || classes === void 0 ? void 0 : classes.input), type: showHidePassword ? 'text' : type, rows, disabled }, other)), isPassword && (jsx(IconButton, { title: "Show/Hide password", className: "ds-w-5 ds-h-5 ds-ml-1", onClick: togglePasswordVisiblity, size: "large", children: showHidePassword ? jsx(VisibilityOffIcon, {}) : jsx(VisibilityIcon, {}) })), children] })));
});

const ELEVATION_PROPS = {
    regular: {
        0: {
            boxShadow: '0 2px 10px 0 rgba(0,0,0,0.1)',
        },
        1: {
            boxShadow: 'rgba(0, 0, 0, 0.1) 0px -1px 1px 0px, rgba(0, 0, 0, 0.1) 1px 0px 1px 0px, rgba(0, 0, 0, 0.1) -1px 0px 1px 0px, rgba(0, 0, 0, 0.1) 0px 1px 1px 0px',
        },
        drawer: {
            boxShadow: '0 20px 67px 0 rgba(0,0,0,0.3)',
        },
    },
    flat: null,
};

const variantClasses$1 = {
    variant_flat: 'ds-bg-[#f9f9f9] ds-border ds-border-solid ds-border-[#f0f0f0]',
};
const CardComponent = forwardRef((_a, ref) => {
    var { component: Component = 'div', className, containerRef, elevation = 1, style, customClasses: oldCustomClasses = {}, classes: receivedClasses = {}, variant } = _a, other = __rest(_a, ["component", "className", "containerRef", "elevation", "style", "customClasses", "classes", "variant"]);
    const mergedClasses = useMemo(() => merge({}, oldCustomClasses, receivedClasses), [
        JSON.stringify(oldCustomClasses),
        JSON.stringify(receivedClasses),
    ]);
    const stylePropsFromVariant = useMemo(() => {
        if (!variant) {
            return ELEVATION_PROPS.regular;
        }
        return ELEVATION_PROPS === null || ELEVATION_PROPS === void 0 ? void 0 : ELEVATION_PROPS[variant];
    }, [variant]);
    const styleProps = Object.assign({}, stylePropsFromVariant === null || stylePropsFromVariant === void 0 ? void 0 : stylePropsFromVariant[elevation]);
    const variantClass = variant && variantClasses$1[`variant_${variant}`];
    return React.createElement(Component || 'div', Object.assign({ ref: containerRef || ref, className: cn('ds-w-fit ds-bg-white ds-rounded ds-p-2.5 ds-font-w3d', mergedClasses.container, variantClass, className), style: Object.assign(Object.assign({}, (stylePropsFromVariant && styleProps)), style) }, other));
});
const Card = CardComponent;

const SpeechBubbleArrow = ({ className }) => (jsx("svg", { className: className, width: "34px", height: "16px", viewBox: "0 -1 34 17", version: "1.1", xmlns: "http://www.w3.org/2000/svg", children: jsx("g", { id: "Page-1", children: jsx("path", { style: { filter: 'drop-shadow(0px 0px 1px rgba(0, 0, 0, 0.3))' }, fill: "currentColor", d: "M24.9,10.8l-5.1-9.2c-0.3-0.5-0.7-0.9-1.2-1.2c-1.4-0.8-3.3-0.3-4.1,1.2l-5.1,9.2c-1.8,3.2-5.1,5.1-8.7,5.1\n\t\tv2.9h32.9v-2.9C30,15.9,26.6,13.9,24.9,10.8z" }) }) }));

const PopperCard = ({ className, anchorElement, open, onClose, popperProps, structured, onClickAway, dismissArrow = false, customClasses: oldCustomClasses = {}, classes: receivedClasses = {}, containerProps = {}, children, }) => {
    const mergedClasses = useMemo(() => merge({}, oldCustomClasses, receivedClasses), [
        JSON.stringify(oldCustomClasses),
        JSON.stringify(receivedClasses),
    ]);
    const classes = mergedClasses;
    const [arrowReference, setArrowReference] = useState(null);
    let modifiers = useMemo(() => uniqBy([
        ...((popperProps && popperProps.modifiers) || []),
        {
            name: 'flip',
            enabled: true,
        },
        {
            name: 'preventOverflow',
            enabled: true,
            options: {
                padding: 8,
            },
        },
        {
            name: 'offset',
            options: {
                offset: [0, 16], // décaler le popper de 10px vers le bas
            },
        },
        {
            name: 'arrow',
            enabled: true,
            options: {
                element: arrowReference,
            },
        },
    ], 'name'), [popperProps === null || popperProps === void 0 ? void 0 : popperProps.modifiers, arrowReference]);
    return (jsx(Popper, Object.assign({ open: open }, containerProps, popperProps, { className: cn('ds-z-[100]', !open && 'ds-pointer-events-none ds-top-0 ds-left-0', receivedClasses.popper, containerProps.className), anchorEl: anchorElement, modifiers: modifiers, children: ({ placement }) => (jsx(Content, { placement,
            className,
            setArrowReference,
            structured,
            dismissArrow,
            onClickAway,
            classes, children: children })) })));
};
const Content = ({ className, dismissArrow, setArrowReference, placement, onClickAway, structured, classes, children, }) => {
    const handleClickAway = useCallback((...parameters) => {
        if (typeof onClickAway === 'function') {
            onClickAway(...parameters);
        }
    }, [onClickAway]);
    const content = (jsxs("div", { children: [!dismissArrow && (jsx("div", { className: `ds-z-10 `, ref: setArrowReference, style: {
                    bottom: placement.includes('bottom')
                        ? 'calc(100% + 16px)'
                        : placement.includes('top')
                            ? 0
                            : undefined,
                    right: placement.includes('left')
                        ? 9
                        : placement.includes('right')
                            ? 'calc(100% + 25px)'
                            : undefined,
                }, children: jsx("div", { className: `ds-leading-none ds-text-light-500 ${classes.arrowContainer}`, style: {
                        position: 'absolute',
                        transform: placement.includes('bottom')
                            ? 'rotate(0deg)'
                            : placement.includes('top')
                                ? 'rotate(180deg)'
                                : placement.includes('right')
                                    ? 'rotate(-90deg)'
                                    : placement.includes('left')
                                        ? 'rotate(90deg)'
                                        : undefined,
                        left: placement.includes('bottom') ? -16 : undefined,
                        top: placement.includes('right') ? -10 : undefined,
                        bottom: placement.includes('left') ? -10 : undefined,
                        right: placement.includes('top') ? -19 : undefined,
                    }, children: jsx(SpeechBubbleArrow, { className: 'ds-block' }) }) })), jsx(Card, { className: cn(className, classes.container, 'ds-relative', structured && 'ds-p-0'), children: children })] }));
    if (onClickAway) {
        return jsx(ClickAwayListener, { onClickAway: handleClickAway, children: content });
    }
    return content;
};

const baseStyles$3 = {
    container: 'ds-font-w3d ds-text-dark-500',
    heading: 'ds-font-w3d ds-text-dark-500',
    wld: 'ds-width-fit ds-rounded-lg ds-text-center ds-uppercase ds-font-black ds-bg-light ds-origin-bottom-left',
};
const headingStyles = {
    h1: `${baseStyles$3.heading} ds-text-4xl ds-font-black`,
    h2: `${baseStyles$3.heading} ds-text-2xl ds-font-bold`,
    h3: `${baseStyles$3.heading} ds-text-xl ds-font-medium`,
    h4: `${baseStyles$3.heading} ds-text-lg ds-font-normal`,
    h5: `${baseStyles$3.heading} ds-font-normal`,
    h6: `${baseStyles$3.heading} ds-font-normal`,
};
const bodyStyles = {
    body1: 'ds-text-base',
    body2: 'ds-text-sm',
    body3: 'ds-text-xs',
};
const componentStyles = {
    tag: 'ds-text-[11px] ds-uppercase ds-font-bold ds-tracking-[0.8px]',
    button: 'ds-font-medium',
    helper: 'ds-text-[13px] ds-mt-2',
    label: `${bodyStyles.body2} ds-mb-1`,
};
const wldStyles = {
    wld1: `${baseStyles$3.wld} ds-text-[54px] ds-leading-[62px] ds-py-[12px] ds-px-[28px]`,
    wld2: `${baseStyles$3.wld} ds-text-[40px] ds-leading-[50px] ds-py-[12px] ds-px-[24px]`,
    wld3: `${baseStyles$3.wld} ds-text-[30px] ds-leading-[44px] ds-py-[11px] ds-px-[22px]`,
    wld4: `${baseStyles$3.wld} ds-text-[22px] ds-leading-[38px] ds-py-[10px] ds-px-[20px]`,
    wld5: `${baseStyles$3.wld} ds-text-[16px] ds-leading-[30px] ds-py-[9px] ds-px-[18px]`,
    wld6: `${baseStyles$3.wld} ds-text-[13px] ds-leading-[26px] ds-py-1 ds-px-2`,
    wld: `${baseStyles$3.wld} ds-py-1 ds-px-2`,
};
const VariantStyles = Object.assign(Object.assign(Object.assign(Object.assign({}, headingStyles), bodyStyles), componentStyles), wldStyles);

const primary = {
    50: '#e4e2f5',
    100: '#bdb6e6',
    200: '#9185d5',
    300: '#6454c4',
    400: '#4330b8',
    500: '#220bab',
    600: '#1e0aa4',
    700: '#19089a',
    800: '#140691',
    900: '#0c0380',
    A100: '#b0adff',
    A200: '#7f7aff',
    A400: '#4e47ff',
    A700: '#352eff',
    contrastDefaultColor: 'light',
};
const pink = {
    50: '#fce4ec',
    100: '#f8bbd0',
    200: '#f48fb1',
    300: '#f06292',
    400: '#ec407a',
    500: '#e91e63',
    600: '#d81b60',
    700: '#c2185b',
    800: '#ad1457',
    900: '#880e4f',
    contrastDefaultColor: 'light',
};
const secondary = pink;
const yellow = {
    50: '#FEFCE4',
    100: '#FDF8BB',
    200: '#FCF38E',
    300: '#FAEE60',
    400: '#F9EB3E',
    500: '#F8E71C',
    600: '#F7E419',
    700: '#F6E014',
    800: '#F5DD11',
    900: '#F3D709',
    1000: '#713e12',
    contrastDefaultColor: 'primary',
};
const tertiary = yellow;
const safe = {
    50: '#ecf7f0',
    100: '#d0ebda',
    200: '#b1dec1',
    300: '#91d0a8',
    400: '#7ac695',
    500: '#62bc82',
    600: '#5ab67a',
    700: '#50ad6f',
    800: '#46a565',
    900: '#349752',
    1000: '#166534',
    A100: '#e1ffea',
    A200: '#aeffc5',
    A400: '#7bffa1',
    A700: '#62ff8f',
    contrastDefaultColor: 'light',
};
const danger = {
    50: '#fdeaeb',
    100: '#fbcccc',
    200: '#f8aaaa',
    300: '#f58788',
    400: '#f26e6f',
    500: '#f05455',
    600: '#ee4d4e',
    700: '#ec4344',
    800: '#e93a3b',
    900: '#e5292a',
    A100: '#ffffff',
    A200: '#fff0f0',
    A400: '#ffbdbd',
    A700: '#ffa3a4',
    contrastDefaultColor: 'light',
};
const warn = {
    50: '#fff3e0',
    100: '#ffe0b2',
    200: '#ffcc80',
    300: '#ffb74d',
    400: '#ffa726',
    500: '#ff9800',
    600: '#fb8c00',
    700: '#f57c00',
    800: '#ef6c00',
    900: '#e65100',
    2000: '#451A03',
    A100: '#ffd180',
    A200: '#ffab40',
    A400: '#ff9100',
    A700: '#ff6d00',
    contrastDefaultColor: 'light',
};
const orange = {
    50: '#FFF0E9',
    100: '#FFD8C8',
    200: '#FFBFA3',
    300: '#FFA57E',
    400: '#FF9163',
    500: '#FF7E47',
    600: '#FF7640',
    700: '#FF6B37',
    800: '#FF612F',
    900: '#FF4E20',
    contrastDefaultColor: 'light',
};
const light = {
    50: '#fff',
    100: '#fff',
    200: '#fff',
    300: '#fff',
    400: '#fff',
    500: '#fff',
    600: '#fff',
    700: '#fff',
    800: '#fff',
    900: '#fff',
    contrastDefaultColor: 'dark',
};
const dark = {
    50: '#E6E6E6',
    100: '#C1C1C1',
    200: '#979797',
    300: '#6D6D6D',
    400: '#4E4E4E',
    500: '#2F2F2F',
    600: '#2A2A2A',
    700: '#232323',
    800: '#1D1D1D',
    900: '#121212',
    contrastDefaultColor: 'light',
};
const darkblue = {
    50: '#0c0380',
    100: '#0a0273',
    200: '#090266',
    300: '#080259',
    400: '#07014c',
    500: '#060140',
    600: '#040133',
    700: '#030026',
    800: '#020019',
    900: '#01000c',
    contrastDefaultColor: 'light',
};
const indigo = {
    50: '#eef2ff',
    100: '#e0e7ff',
    200: '#c7d2fe',
    300: '#a5b3fc',
    400: '#818df8',
    500: '#6365f1',
    600: '#4e46e5',
    700: '#4438ca',
    800: '#3830a3',
    900: '#312e81',
    contrastDefaultColor: 'light',
};
const purple = {
    50: '#faf5ff',
    100: '#f3e8ff',
    200: '#e9d5ff',
    300: '#d8b4fe',
    400: '#c084fc',
    500: '#a955f7',
    600: '#9333ea',
    700: '#7e22ce',
    800: '#6b21a8',
    900: '#591c87',
    contrastDefaultColor: 'light',
};
const red = {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
    contrastDefaultColor: 'light',
};
const codersTestsPrimary = {
    50: '#e7edee',
    100: '#cfdbdd',
    200: '#a0b8ba',
    300: '#709498',
    400: '#417175',
    500: '#114d53',
    600: '#0e3e42',
    700: '#0a2e32',
    800: '#071f21',
    900: '#020808',
    contrastDefaultColor: 'light',
};
const codersTestsSecondary = {
    50: '#feefe7',
    100: '#fcdece',
    200: '#f9bd9d',
    300: '#f69c6c',
    400: '#f37b3b',
    500: '#f05a0a',
    600: '#c04808',
    700: '#903606',
    800: '#602404',
    900: '#301202',
    contrastDefaultColor: 'light',
};
const palette = {
    primary,
    secondary,
    tertiary,
    dark,
    danger,
    safe,
    darkblue,
    warn,
    orange,
    light,
    indigo,
    purple,
    red,
    codersTestsPrimary,
    codersTestsSecondary,
};

const Typography = forwardRef((_a, ref) => {
    var { containerRef, className, color, component: Component = 'span', variant = 'body1', style: receivedStyle, customClasses: oldCustomClasses = {}, classes: receivedClasses = {} } = _a, other = __rest(_a, ["containerRef", "className", "color", "component", "variant", "style", "customClasses", "classes"]);
    const classes = useMemo(() => merge({}, oldCustomClasses, receivedClasses), [
        JSON.stringify(oldCustomClasses),
        JSON.stringify(receivedClasses),
    ]);
    let style = useMemo(() => {
        var _a, _b, _c, _d;
        if (color && palette[color]) {
            if (['wld1', 'wld2', 'wld3', 'wld4', 'wld5', 'wld6'].some((key) => variant === key)) {
                const paletteColor = palette[color];
                if (color === 'primary') {
                    return {
                        backgroundColor: '#fff',
                        color: paletteColor === null || paletteColor === void 0 ? void 0 : paletteColor[500],
                    };
                }
                if (paletteColor) {
                    const constrastColor = palette[paletteColor.contrastDefaultColor];
                    return {
                        backgroundColor: paletteColor[500],
                        color: (_a = constrastColor === null || constrastColor === void 0 ? void 0 : constrastColor[500]) !== null && _a !== void 0 ? _a : '#fff',
                    };
                }
                return {
                    color: (_c = (color && ((_b = palette === null || palette === void 0 ? void 0 : palette[color]) === null || _b === void 0 ? void 0 : _b[500]))) !== null && _c !== void 0 ? _c : palette.primary[500],
                };
            }
            return {
                color: (_d = palette === null || palette === void 0 ? void 0 : palette[color]) === null || _d === void 0 ? void 0 : _d[500],
            };
        }
        return null;
    }, [variant, color]);
    return (jsx(Component, Object.assign({ className: cn(baseStyles$3.container, variant && VariantStyles[variant], classes.container, className), style: Object.assign(Object.assign({}, style), receivedStyle) }, other, { ref: ref || containerRef })));
});

const ListItem = (_a) => {
    var { component: Component = 'li', className, typographyClassName, button, style, children, classes } = _a, other = __rest(_a, ["component", "className", "typographyClassName", "button", "style", "children", "classes"]);
    return (jsx(Component, Object.assign({ className: cn('ds-px-2 ds-py-2 ds-rounded-md ds-flex ds-items-center ds-transition-all ds-bg-transparent hover:ds-bg-dark-50', button && 'ds-cursor-pointer', button && (classes === null || classes === void 0 ? void 0 : classes.button), classes === null || classes === void 0 ? void 0 : classes.container, className) }, style, (button && {
        role: 'button',
    }), other, { children: jsx(Typography, { className: cn('ds-flex ds-items-center', classes === null || classes === void 0 ? void 0 : classes.typography, typographyClassName), color: "dark", children: children }) })));
};

const baseClasses = {
    container: 'ds-relative ds-margin-1 ds-cursor-pointer ds-overflow-hidden ds-m-1 ds-flex ds-items-center ds-justify-center ds-group',
    icon: 'ds-w-full ds-h-full ds-fill-current',
    input: 'ds-h-full ds-w-full ds-absolute ds-top-0 ds-bottom-0 ds-right-0 ds-left-0 ds-cursor-[inherit] ds-p-0 ds-m-0 ds-z-10 ds-opacity-0',
    layer: 'ds-w-full ds-w-full ds-absolute  ds-top-0 ds-bottom-0 ds-right-0 ds-left-0  ds-z-[5] ds-opacity-0 group-hover:ds-opacity-[.20] ds-transition-all',
    size: {
        regular: 'ds-w-3 ds-h-3 ds-min-w-3 ds-min-h-3 ds-p-1/2',
        small: 'ds-w-2 ds-h-2 ds-min-w-2 ds-min-h-2 ds-p-[1.5px]',
    },
};
const variantClasses = {
    raised: 'ds-shadow-slim',
    outlined: 'ds-border ds-border-solid ds-border-current',
};
const iconClasses = {
    raised: 'ds-fill-[#fff] ',
    outlined: '',
    partial: 'ds-fill-current ',
};
const layerClasses = {
    raised: 'ds-bg-[#fff]',
    outlined: 'ds-bg-current',
};

const CheckboxComponent = forwardRef((_a, ref) => {
    var _b, _c;
    var { component: Component = 'div', checked, disabled, color, defaultColor: propsDefaultColor = palette === null || palette === void 0 ? void 0 : palette.primary[400], className, inputClassName, containerProps, onChange, variant = 'outlined', isRadio, classes = {}, partialCheck, size = 'regular' } = _a, other = __rest(_a, ["component", "checked", "disabled", "color", "defaultColor", "className", "inputClassName", "containerProps", "onChange", "variant", "isRadio", "classes", "partialCheck", "size"]);
    const handleChange = useCallback((event) => {
        if (disabled) {
            return;
        }
        if (typeof onChange === 'function') {
            onChange(event);
        }
    }, [disabled, onChange]);
    return (jsxs(Component, Object.assign({ className: cn(baseClasses.size[size], baseClasses.container, isRadio ? 'ds-rounded-full' : 'ds-rounded-md', disabled && 'ds-cursor-not-allowed ds-bg-dark-50/[0.75]', checked && !disabled && variant === 'raised' && 'ds-bg-current', variant && variantClasses[variant], className), style: {
            color: disabled ? palette === null || palette === void 0 ? void 0 : palette.dark[200] : (_c = (color && ((_b = palette === null || palette === void 0 ? void 0 : palette[color]) === null || _b === void 0 ? void 0 : _b[500]))) !== null && _c !== void 0 ? _c : propsDefaultColor,
        } }, containerProps, { ref, children: [jsx(CheckIcon, { checked, partialCheck: !!partialCheck, classes: {
                    checkIcon: cn(baseClasses.icon, checked && variant && iconClasses[variant], partialCheck && iconClasses['partial']),
                } }), jsx("div", { className: cn(baseClasses.layer, variant && layerClasses[variant]) }), jsx("input", Object.assign({ className: cn(baseClasses.input, inputClassName), type: "checkbox", onChange: handleChange, checked }, other))] })));
});
const DEFAULT_ICON_PROPS = {
    scale: 0.5,
    opacity: 0,
};
const CHECKED_ICON_PROPS = {
    scale: 1,
    opacity: 1,
};
const CheckIcon = ({ checked: propsChecked, partialCheck, classes, }) => {
    const checked = propsChecked || partialCheck;
    useMemo(() => (checked ? CHECKED_ICON_PROPS : DEFAULT_ICON_PROPS), [checked]);
    return (jsx("svg", { className: classes.checkIcon, viewBox: "0 0 24 24", fill: "#fff", children: jsxs("g", { children: [propsChecked && jsx("path", { d: "M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" }), !propsChecked && partialCheck && jsx("rect", { x: "4", y: "11", width: "17", height: "2" })] }) }));
};
const Checkbox = CheckboxComponent;

const defaultGetSuggestionValue = ({ value }) => value;
const defaultFilterSuggestion = (inputValue) => ({ value }) => inputValue && value && value.toLowerCase().includes(inputValue.toLowerCase());
const DEFAULT_FUNCTION = () => { };
const SuggestionsContainer = ({ containerProps, popperProps, children, anchorElement, popperCustomClasses = {}, className, }) => {
    const lastChildrenRendered = useRef(children);
    useEffect(() => {
        if (children) {
            lastChildrenRendered.current = children;
        }
    }, [children]);
    return (jsx(PopperCard, { className: className, open: Boolean(children), popperProps: popperProps, classes: popperCustomClasses, anchorElement: anchorElement, containerProps, children: children || lastChildrenRendered.current }));
};
const DefaultSuggestionsRender = ({ value }) => (jsx(ListItem, { className: 'ds-rounded-md', button: true, children: jsx(Typography, { color: "dark", children: value }) }, `prediction_${value}`));
const DefaultMultipleSuggestionsRender = ({ value, classes, selectedValues, }) => (jsxs(ListItem, { className: 'ds-rounded-md', button: true, children: [jsx(Checkbox, { className: 'ds-mr-2', checked: selectedValues.includes(value) }), jsx(Typography, { color: "dark", classes: { container: classes.predictionListItem }, children: value })] }, `prediction_${value}`));
const AutoCompleteComponent = (_a) => {
    var { multiple, placeholder, suggestions, onChange = DEFAULT_FUNCTION, onSelect = DEFAULT_FUNCTION, getSuggestionValue = defaultGetSuggestionValue, renderSuggestion: renderSuggestionProps, renderSuggestionsContainer: renderSuggestionsContainerProps, renderInputComponent: renderInputComponentProps, filterFunction = defaultFilterSuggestion, renderNoSuggestion, maxLength = 10, value: propsValue = '', id, name, transformSuggestionValue = (props) => props && props.value, classes = {}, popperProps } = _a, other = __rest(_a, ["multiple", "placeholder", "suggestions", "onChange", "onSelect", "getSuggestionValue", "renderSuggestion", "renderSuggestionsContainer", "renderInputComponent", "filterFunction", "renderNoSuggestion", "maxLength", "value", "id", "name", "transformSuggestionValue", "classes", "popperProps"]);
    const inputReference = useRef();
    const [filteredSuggestions, setFilteredSuggetions] = useState([]);
    const [value, setValue] = useState(propsValue || '');
    const [focused, setFocused] = useState(false);
    useEffect(() => {
        setValue(propsValue);
    }, [propsValue]);
    useEffect(() => {
        const filter = suggestions.filter(filterFunction(value));
        setFilteredSuggetions(filter.slice(0, maxLength));
    }, []);
    const renderSuggestion = renderSuggestionProps ||
        ((props) => (jsx(DefaultSuggestionsRender, { classes,
            value: transformSuggestionValue(props) })));
    const renderSuggestionsContainer = renderSuggestionsContainerProps ||
        ((props) => {
            const { containerProps, children } = props;
            if (value && !filteredSuggestions.length && typeof renderNoSuggestion === 'function') {
                return renderNoSuggestion({ anchorElement: inputReference.current, open: focused });
            }
            return (jsx(SuggestionsContainer, { anchorElement: inputReference.current, popperProps: Object.assign({}, popperProps), containerProps,
                children, className: 'ds-max-w-[600px]', popperCustomClasses: {
                    popper: `${classes === null || classes === void 0 ? void 0 : classes.popper}`,
                    container: 'ds-overflow-auto ds-scrollbar ds-max-h-[400px]',
                } }));
        });
    const renderInputComponent = renderInputComponentProps ||
        ((_a) => {
            var _b;
            var { onChange, size } = _a, props = __rest(_a, ["onChange", "size"]);
            return (jsx(TextField, Object.assign({}, props, other, { inputRef: inputReference, className: (_b = classes === null || classes === void 0 ? void 0 : classes.field) !== null && _b !== void 0 ? _b : '', onChange: onChange })));
        });
    const filterSuggestions = useCallback((data) => {
        const { value: inputValue, reason } = data;
        if (multiple && reason === 'suggestion-selected') {
            return;
        }
        if (!inputValue) {
            setFilteredSuggetions(suggestions);
            return;
        }
        const filter = suggestions.filter(filterFunction(inputValue));
        setFilteredSuggetions(filter.slice(0, maxLength));
    }, [suggestions, multiple]);
    const clearSuggestions = useCallback(() => {
        setFilteredSuggetions([]);
    }, []);
    const valueChanged = useCallback((e, data) => {
        const { newValue, method } = data;
        if (!multiple || (multiple && method === 'type')) {
            setValue(newValue || '');
            onChange(newValue);
        }
    }, [onChange, multiple]);
    const [valueSelected, setValueSelected] = useState(false);
    const suggestionSelected = useCallback((_, newValue) => {
        const { suggestionValue } = newValue;
        if (!multiple) {
            setValue(suggestionValue);
            onChange && onChange(suggestionValue);
        }
        onSelect && onSelect(newValue);
        setValueSelected(true);
    }, [onChange, onSelect, multiple]);
    const setIsFocused = useCallback(() => setFocused(true), []);
    const setIsNotFocused = useCallback(() => setFocused(false), []);
    useEffect(() => {
        if (!multiple) {
            return;
        }
        if (valueSelected) {
            inputReference.current && inputReference.current.focus();
            setValueSelected(false);
            setIsFocused();
        }
    }, [multiple, valueSelected, inputReference.current, setIsFocused]);
    const inputProps = {
        id,
        name,
        placeholder,
        value,
        onChange: valueChanged,
        onFocus: setIsFocused,
    };
    return (jsx(ClickAwayListener, { onClickAway: setIsNotFocused, children: jsx(Autosuggest, { alwaysRenderSuggestions: multiple !== null && multiple !== void 0 ? multiple : false, suggestions: filteredSuggestions, focusInputOnSuggestionClick: multiple !== null && multiple !== void 0 ? multiple : false, getSuggestionValue: getSuggestionValue, onSuggestionsClearRequested: clearSuggestions, onSuggestionsFetchRequested: filterSuggestions, renderSuggestion: renderSuggestion, theme: {
                suggestionsList: 'ds-list-none ds-p-0 ds-m-0 overflow-auto',
            }, renderSuggestionsContainer: renderSuggestionsContainer, onSuggestionSelected: suggestionSelected, renderInputComponent: renderInputComponent, inputProps }) }));
};
const MultipleAutoComplete = (_a) => {
    var { renderSuggestion: renderSuggestionProps, selectedSuggestions: selectedSuggestionsProps = [], classes = {}, transformSuggestionValue = (props) => props && props.value, onSelect: onSelectProps } = _a, other = __rest(_a, ["renderSuggestion", "selectedSuggestions", "classes", "transformSuggestionValue", "onSelect"]);
    const [selectedSuggestions, setSelectedSuggestions] = useState([]);
    useEffect(() => {
        setSelectedSuggestions(selectedSuggestionsProps);
    }, [selectedSuggestionsProps]);
    const handleSelectSuggestion = useCallback((newValue) => {
        const { suggestionValue } = newValue;
        if (selectedSuggestions.includes(suggestionValue)) {
            setSelectedSuggestions((selectedSuggestions) => selectedSuggestions.filter((selectedSuggestion) => selectedSuggestion !== suggestionValue));
        }
        else {
            setSelectedSuggestions((selectedSuggestions) => [...selectedSuggestions, suggestionValue]);
        }
        onSelectProps && onSelectProps(newValue);
    }, [selectedSuggestions, onSelectProps]);
    const renderSuggestion = renderSuggestionProps ||
        ((props) => (jsx(DefaultMultipleSuggestionsRender, { classes,
            value: transformSuggestionValue(props),
            selectedValues: selectedSuggestions })));
    return jsx(AutoCompleteComponent, Object.assign({ renderSuggestion, onSelect: handleSelectSuggestion }, other));
};
const WithMultipleAutoComplete = (_a) => {
    var { multiple = false } = _a, other = __rest(_a, ["multiple"]);
    if (multiple) {
        return jsx(MultipleAutoComplete, Object.assign({ multiple }, other));
    }
    return jsx(AutoCompleteComponent, Object.assign({}, other));
};
const AutoComplete = WithMultipleAutoComplete;

const WarningIcon = ({ className }) => (jsxs("svg", { className: className, width: "30px", height: "25px", viewBox: "0 0 30 25", version: "1.1", children: [jsx("title", { children: "Warning icon" }), jsx("desc", { children: "Warning - WeLoveDevs" }), jsx("g", { id: "Page-1", stroke: "none", strokeWidth: "1", fill: "none", fillRule: "evenodd", children: jsx("g", { id: "Company-Main-Card", transform: "translate(-69.000000, -60.000000)", children: jsx("g", { id: "Group-3", transform: "translate(49.000000, 46.000000)", children: jsx("g", { id: "Group-2", transform: "translate(19.000000, 11.000000)", children: jsxs("g", { id: "warning-24px", children: [jsx("polygon", { id: "Path", points: "0 0 32 0 32 32 0 32" }), jsx("path", { d: "M2.73141008,28 L29.2685899,28 C29.8208747,28 30.2685899,27.5522847 30.2685899,27 C30.2685899,26.824572 30.2224408,26.6522307 30.1347755,26.5002775 L16.8661856,3.50138835 C16.5901965,3.02300726 15.9786586,2.85893613 15.5002775,3.13492522 C15.348042,3.22275344 15.2216426,3.34915276 15.1338144,3.50138835 L1.86522449,26.5002775 C1.5892354,26.9786586 1.75330654,27.5901965 2.23168762,27.8661856 C2.38364083,27.9538509 2.55598208,28 2.73141008,28 Z M17.3636364,23.8947368 L14.6363636,23.8947368 L14.6363636,21.1578947 L17.3636364,21.1578947 L17.3636364,23.8947368 Z M17.3636364,18.4210526 L14.6363636,18.4210526 L14.6363636,12.9473684 L17.3636364,12.9473684 L17.3636364,18.4210526 Z", id: "Shape", fill: "currentcolor", fillRule: "nonzero" })] }) }) }) }) })] }));

const BANNER_DATA = Object.freeze({
    warning: {
        color: 'warn',
        icon: WarningIcon,
    },
    error: {
        color: 'danger',
        icon: ErrorIcon,
    },
    success: {
        color: 'safe',
        icon: CheckIcon$1,
    },
    info: {
        color: 'primary',
        icon: InfoIcon,
    },
    default: {
        color: 'primary',
        icon: null,
    },
});

const commonStyles = {
    container: 'ds-w-full ds-relative ds-flex ds-items-center ds-z-[1] children:ds-z-[1] ds-bg-light-500 ds-rounded-lg',
    iconContainer: 'ds-flex ds-items-center ds-justify-center ',
};
const baseStyles$2 = {
    container: {
        regular: `${commonStyles.container} ds-px-3 ds-py-4  md:ds-p-2 `,
        small: `${commonStyles.container} ds-p-2 `,
    },
    background: {
        regular: "before:ds-w-full before:ds-h-full before:ds-absolute before:ds-bg-current before:ds-top-0 before:ds-left-0 before:ds-opacity-20 before:ds-z-0 before:ds-content-[''] before:ds-rounded-md",
        small: null,
    },
};
const iconStyles = {
    container: {
        regular: `${commonStyles.iconContainer} ds-mr-2  md:ds-absolute md:-ds-top-1.5 md:ds-p-[4px] md:ds-shadow-slim md:-ds-left-1.5 md:ds-rounded-full md:ds-bg-light-500`,
        small: `${commonStyles.iconContainer}  ds-absolute -ds-top-1.5 ds-p-[4px] ds-shadow-slim -ds-left-1.5 ds-rounded-full ds-bg-light-500 ds-p-2 ds-z-[1] children:ds-z-[1] ds-bg-light-500 ds-rounded-lg`,
    },
    icon: {
        regular: 'ds-w-6 ds-h-6 md:ds-w-2 md:ds-h-2 ',
        small: 'ds-w-2 ds-h-2 ',
    },
};

const Banner = ({ type = 'warning', className, icon: receivedIcon, classes = {}, children, size, }) => {
    var _a, _b, _c, _d;
    const { icon, color } = useMemo(() => {
        var _a;
        const typeConfig = BANNER_DATA[type];
        if (!typeConfig) {
            return Object.assign(Object.assign({}, BANNER_DATA.default), { color: palette.primary[500] });
        }
        return Object.assign(Object.assign({}, typeConfig), { color: (_a = palette[typeConfig.color]) === null || _a === void 0 ? void 0 : _a[500] });
    }, [type]);
    const Icon = receivedIcon || icon;
    return (jsxs("div", { className: cn(className !== null && className !== void 0 ? className : '', classes === null || classes === void 0 ? void 0 : classes.container, (_a = baseStyles$2.container[size || 'regular']) !== null && _a !== void 0 ? _a : baseStyles$2.container.regular, (_b = baseStyles$2.background[size || 'regular']) !== null && _b !== void 0 ? _b : baseStyles$2.background.regular), style: { color }, children: [Icon && (jsx("span", { className: (_c = iconStyles.container[size || 'regular']) !== null && _c !== void 0 ? _c : iconStyles.container.regular, children: jsx(Icon, { className: (_d = iconStyles.icon[size || 'regular']) !== null && _d !== void 0 ? _d : iconStyles.icon.regular }) })), children] }));
};

const baseStyles$1 = {
    container: 'ds-relative ds-group ds-m-1 ds-w-fit ds-h-fit ds-rounded-md ds-relative ds-overflow-hidden ds-flex ds-items-center ds-justify-center',
    brightLayer: 'ds-absolute ds-h-full ds-w-full ds-top-0 ds-bottom-0 ds-left-0 ds-right-0 ds-opacity-0 ds-transition-all group-hover:ds-opacity-[0.25] ds-z-[1]',
    typography: 'ds-flex ds-items-center ds-z-[2]',
    disabled: 'ds-cursor-not-allowed',
};
const sizeStyles$1 = {
    regular: 'ds-p-[10px] ',
    small: 'ds-p-1',
    xs: 'ds-py-1/2 ds-px-1',
};
const typographysizeStyles = {
    regular: '',
    small: 'ds-text-[14px] ds-tracking-wide',
    xs: 'ds-text-[12px] ds-tracking-wide',
};
const variantStyles = {
    contained: 'ds-bg-current',
    raised: 'ds-bg-current',
    outlined: 'ds-border-current ds-border ds-border-solid',
    text: '',
    default: 'ds-bg-current'
};
const layerVariantStyles = {
    contained: 'ds-bg-light-500 ',
    raised: 'ds-bg-light-500 ',
    outlined: 'ds-bg-current',
    text: 'ds-bg-current',
};
const textVariantStyles = {
    contained: '',
    raised: '',
    outlined: '!ds-text-current',
    text: '!ds-text-current',
};

const Button = forwardRef((_a, ref) => {
    var { component: Component = 'button', className, containerRef, disabled, size = 'regular', color, containerProps, 
    // @deprecated please use classes.typography
    typographyClassName, variant = 'text', onClick, classes = {}, children, style: propsStyle, type } = _a, other = __rest(_a, ["component", "className", "containerRef", "disabled", "size", "color", "containerProps", "typographyClassName", "variant", "onClick", "classes", "children", "style", "type"]);
    const hexColor = useMemo(() => {
        var _a, _b, _c, _d;
        if (disabled) {
            return (_b = (color && ((_a = palette === null || palette === void 0 ? void 0 : palette[color]) === null || _a === void 0 ? void 0 : _a[100]))) !== null && _b !== void 0 ? _b : (_c = palette === null || palette === void 0 ? void 0 : palette['dark']) === null || _c === void 0 ? void 0 : _c[100];
        }
        const paletteColor = color && ((_d = palette === null || palette === void 0 ? void 0 : palette[color]) === null || _d === void 0 ? void 0 : _d[500]);
        return paletteColor || (palette === null || palette === void 0 ? void 0 : palette.primary[300]);
    }, [disabled, color]);
    const shadow = useMemo(() => {
        if (variant === 'raised') {
            return hexColor ? 'ds-shadow-[0_5px_15px_0]' : 'ds-shadow-[0_10px_20px_0]';
        }
        return null;
    }, [hexColor]);
    const handleClick = useCallback((...paramaters) => {
        if (disabled) {
            return;
        }
        if (typeof onClick === 'function') {
            onClick(...paramaters);
        }
    }, [onClick, disabled]);
    const textColor = useMemo(() => {
        if (variant === 'raised' || variant === 'contained') {
            if (color === 'light') {
                return 'primary';
            }
            return 'light';
        }
        return color;
    }, [variant, color]);
    return (jsxs(Component, Object.assign({ ref: ref || containerRef }, containerProps, { type: type !== null && type !== void 0 ? type : 'button', className: cn(baseStyles$1.container, (size && sizeStyles$1[size]) || sizeStyles$1.regular, disabled && baseStyles$1.disabled, !disabled && shadow, variantStyles[variant !== null && variant !== void 0 ? variant : 'default'], className, classes === null || classes === void 0 ? void 0 : classes.container), style: Object.assign(Object.assign({ color: hexColor }, propsStyle), (containerProps && containerProps.style)), onClick: handleClick }, other, { children: [!disabled && jsx("div", { className: cn(baseStyles$1.brightLayer, variant && layerVariantStyles[variant]) }), jsx(Typography, { className: cn(baseStyles$1.typography, variant && textVariantStyles[variant], size && typographysizeStyles[size], classes === null || classes === void 0 ? void 0 : classes.typography), variant: "button", color: textColor, children: children })] })));
});

const List = (_a) => {
    var { className, classes } = _a, other = __rest(_a, ["className", "classes"]);
    return jsx("ul", Object.assign({ className: cn(classes === null || classes === void 0 ? void 0 : classes.container, 'ds-p-0 ds-m-0 ds-list-none', className) }, other));
};

const PopperCardActions = ({ children, classes = {}, }) => {
    return (jsx("div", { className: cn('ds-w-full ds-flex ds-items-center ds-justify-end ds-p-1', classes === null || classes === void 0 ? void 0 : classes.container), children: children }));
};

const PopperCardContent = ({ classes = {}, children, }) => {
    return jsx("div", { className: cn('ds-w-full ds-px-1 ds-py-3 ds-overflow-auto', classes === null || classes === void 0 ? void 0 : classes.container), children: children });
};

const PopperCardTitle = ({ classes = {}, children, }) => {
    return (jsx(Typography, { className: cn('ds-w-full ds-p-3 !ds-text-[20px] !ds-leading-[1.6] ds-font-medium ds-tracking-[unset]', classes === null || classes === void 0 ? void 0 : classes.container), variant: "body1", component: "h2", color: "dark", children: children }));
};

const ProgressBar = ({ value: progressValue = 0, color = 'primary', className, classes = {}, }) => {
    var _a, _b;
    return (jsx("div", { className: cn(className, classes === null || classes === void 0 ? void 0 : classes.container, 'ds-w-full ds-h-[6px] ds-rounded-full ds-overflow-hidden ds-bg-lightGray ds-flex ds-items-center'), children: jsx("div", { className: cn(`ds-block ds-h-full ds-rounded-full ds-bg-current ds-transition-all`, classes === null || classes === void 0 ? void 0 : classes.bar), style: { width: `${progressValue}%`, color: (_b = (_a = palette[color]) === null || _a === void 0 ? void 0 : _a[500]) !== null && _b !== void 0 ? _b : palette.dark[200] } }) }));
};

const Slider = (_a) => {
    var _b, _c;
    var { color = 'primary', value = 0, min = 0, max = 100, step = 1, classes = {}, valueLabelDisplay = 'auto', popperCardProps } = _a, other = __rest(_a, ["color", "value", "min", "max", "step", "classes", "valueLabelDisplay", "popperCardProps"]);
    return (jsx(MuiSlider, Object.assign({ min: min !== null && min !== void 0 ? min : 0, max: max !== null && max !== void 0 ? max : 100, step: step !== null && step !== void 0 ? step : 1, value: value !== null && value !== void 0 ? value : 50, classes: {
            root: `ds-h-[3px] ${(_b = classes === null || classes === void 0 ? void 0 : classes.container) !== null && _b !== void 0 ? _b : 3}`,
            thumb: 'ds-w-2 ds-h-2 !ds-shadow-none',
            valueLabel: 'ds-bg-light-500 ds-rounded-sm ds-text-dark-500 ds-font-w3d ds-shadow-lg ds-border ds-border-solid ds-border-dark-50',
        }, style: {
            color: !other.disabled ? (_c = palette === null || palette === void 0 ? void 0 : palette[color]) === null || _c === void 0 ? void 0 : _c[500] : undefined,
        }, valueLabelDisplay: valueLabelDisplay !== null && valueLabelDisplay !== void 0 ? valueLabelDisplay : 'auto' }, other)));
};

const baseStyles = {
    container: 'ds-group ds-h-fit ds-relative ds-bg-current ds-rounded-full ds-flex ds-items-center ds-justify-center',
    disabled: 'ds-cursor-not-allowed',
    thumbContainer: 'ds-w-full ds-flex ds-items-center ds-absolute ds-transition-all',
    thumb: ' ds-m-1/2 ds-bg-[#f7f7f7] ds-rounded-full',
    input: 'ds-w-full ds-h-full ds-top-0 ds-bottom-0 ds-right-0 ds-left-0 ds-m-0 ds-z-[2] ds-cursor-inherit ds-absolute ds-opacity-0',
    brightLayer: 'ds-w-full ds-h-full ds-absolute ds-z-[1] ds-bg-[#fff] ds-opacity-0 group-hover:ds-opacity-[0.30] ds-top-0 ds-bottom-0 ds-left-0 ds-right-0 ds-transition-all'
};
const sizeStyles = {
    size_regular: 'ds-min-h-[30px] ds-w-[80px]',
    thumb_size_regular: 'ds-w-3 ds-h-3 ',
    size_small: 'ds-min-h-[20px] ds-w-[50px]',
    thumb_size_small: 'ds-w-1.5 ds-h-1.5',
};
const thumbPositionStyles = {
    regular: {
        left: 'ds-left-[2px]',
        right: 'ds-left-[calc(80px-28px-6px)]',
    },
    small: {
        left: 'ds-left-[2px]',
        right: 'ds-left-[calc(100%-20px-2px)]',
    },
};

const Switch = (_a) => {
    var _b;
    var { containerRef, checked = false, disabled, color, className, inputClassName, containerProps, onChange, size = 'regular', classes = {} } = _a, other = __rest(_a, ["containerRef", "checked", "disabled", "color", "className", "inputClassName", "containerProps", "onChange", "size", "classes"]);
    const hexColor = disabled ? palette === null || palette === void 0 ? void 0 : palette.dark[50] : (color && ((_b = palette[color]) === null || _b === void 0 ? void 0 : _b[500])) || (palette === null || palette === void 0 ? void 0 : palette.dark[100]);
    const containerStyleProps = {
        color: hexColor,
    };
    const handleChange = useCallback((...parameters) => {
        if (disabled) {
            return;
        }
        if (typeof onChange === 'function') {
            onChange(...parameters);
        }
    }, [disabled, onChange]);
    return (jsxs("div", Object.assign({ ref: containerRef, className: cn(className, baseStyles.container, disabled && baseStyles.disabled, size && sizeStyles[`size_${size}`]), style: Object.assign(Object.assign({}, containerStyleProps), get(containerProps, 'style')) }, containerProps, { children: [jsx("div", { className: `${baseStyles.thumbContainer} ${checked ? thumbPositionStyles[size].right : thumbPositionStyles[size].left}`, children: jsx("div", { className: cn(baseStyles.thumb, size && sizeStyles[`thumb_size_${size}`]) }) }), jsx("div", { className: baseStyles.brightLayer }), jsx("input", Object.assign({ className: cn(baseStyles.input, inputClassName, disabled && baseStyles.disabled), type: "checkbox", onChange: handleChange, checked }, other))] })));
};

const Tag = forwardRef((_a, ref) => {
    var { component: Component = 'div', containerRef, className, color = 'primary', children, onClick, clickable, onDelete, classes, style = {}, size = 'regular' } = _a, other = __rest(_a, ["component", "containerRef", "className", "color", "children", "onClick", "clickable", "onDelete", "classes", "style", "size"]);
    const containerSize = {
        regular: 'ds-px-2 ds-py-3/4 sm:ds-px-1.5 sm:ds-py-1/2',
        small: 'ds-px-1.5 ds-py-1/2 sm:ds-px-1 sm:ds-py-1/4',
        xs: 'ds-px-1 ds-py-0.5',
    };
    const typographyVariant = {
        regular: 'body2',
        small: 'body2',
        xs: 'body3',
    };
    const textColor = useMemo(() => {
        var _a, _b, _c, _d, _e, _f, _g;
        switch (color) {
            case 'darkblue':
                return (_a = palette === null || palette === void 0 ? void 0 : palette.light) === null || _a === void 0 ? void 0 : _a[500];
            case 'tertiary':
                return (_b = palette === null || palette === void 0 ? void 0 : palette.tertiary) === null || _b === void 0 ? void 0 : _b[1000];
            case 'safe':
                return (_c = palette === null || palette === void 0 ? void 0 : palette.safe) === null || _c === void 0 ? void 0 : _c[1000];
            case 'red':
                return (_d = palette === null || palette === void 0 ? void 0 : palette.red) === null || _d === void 0 ? void 0 : _d[900];
            case 'orange':
                return (_e = palette === null || palette === void 0 ? void 0 : palette.orange) === null || _e === void 0 ? void 0 : _e[900];
            case 'warn':
                return (_f = palette === null || palette === void 0 ? void 0 : palette.warn) === null || _f === void 0 ? void 0 : _f[2000];
            default:
                return color && ((_g = palette === null || palette === void 0 ? void 0 : palette[color]) === null || _g === void 0 ? void 0 : _g[800]);
        }
    }, [color, palette]);
    const bgColor = useMemo(() => {
        var _a, _b, _c, _d;
        switch (color) {
            case 'light':
                return {
                    normal: (_a = palette === null || palette === void 0 ? void 0 : palette.dark) === null || _a === void 0 ? void 0 : _a[100],
                    hover: (_b = palette === null || palette === void 0 ? void 0 : palette.dark) === null || _b === void 0 ? void 0 : _b[200],
                };
            default:
                return {
                    normal: color && ((_c = palette === null || palette === void 0 ? void 0 : palette[color]) === null || _c === void 0 ? void 0 : _c[100]),
                    hover: color && ((_d = palette === null || palette === void 0 ? void 0 : palette[color]) === null || _d === void 0 ? void 0 : _d[200]),
                };
        }
    }, [color, palette]);
    const [hover, setHover] = useState(false);
    const isClickable = !!(onClick || clickable);
    return (jsxs(Component, Object.assign({ ref: ref || containerRef, className: cn('ds-inline-flex ds-items-center ds-rounded-md', isClickable ? 'ds-cursor-pointer' : '', className, containerSize[size] || containerSize.regular, classes === null || classes === void 0 ? void 0 : classes.container), onMouseEnter: () => {
            setHover(true);
        }, onMouseLeave: () => {
            setHover(false);
        }, onClick: onClick, style: Object.assign(Object.assign({}, style), { background: hover && isClickable ? bgColor.hover : bgColor.normal }) }, other, { children: [children && (jsx(Typography, { style: {
                    color: textColor,
                }, className: cn('ds-font-medium ds-flex ds-items-center', classes === null || classes === void 0 ? void 0 : classes.typography), variant: typographyVariant[size] || typographyVariant.regular, onMouseLeave: () => {
                    setHover(false);
                }, children: children })), onDelete && (jsx(Cancel, { className: `ds-max-h-[14px] ds-max-w-[14px] ${children ? 'ds-ml-1' : ''} ds-cursor-pointer`, style: {
                    color: textColor,
                }, onClick: onDelete }))] })));
});

const TextFieldIcon = forwardRef((_a, ref) => {
    var { className, classes } = _a, other = __rest(_a, ["className", "classes"]);
    return (jsx("div", Object.assign({ className: cn('ds-px-1 ds-py-2 ds-flex child-svg:ds-h-3 child-svg:ds-w-3', className, classes === null || classes === void 0 ? void 0 : classes.container), ref }, other)));
});

const Tooltip = forwardRef((_a, ref) => {
    var _b, _c;
    var { children, classes } = _a, other = __rest(_a, ["children", "classes"]);
    return (jsx(MuiTooltip, Object.assign({ ref: ref }, other, { classes: Object.assign(Object.assign({}, classes), { tooltip: `${(_b = classes === null || classes === void 0 ? void 0 : classes.tooltip) !== null && _b !== void 0 ? _b : ''} ds-leading-[1.5] ds-text-[13px] ds-px-[12px] ds-py-2 ds-bg-[black]/[0.85] ds-text-light-500 ds-font-medium ds-max-w-[375px]`, popper: `${(_c = classes === null || classes === void 0 ? void 0 : classes.popper) !== null && _c !== void 0 ? _c : ''} z-[10000]` }), children: children })));
});

const Tabs = ({ tabs, setActiveTab, classes }) => {
    var _a;
    return (jsxs("div", { className: `ds-max-w-fit ds-w-full ${classes === null || classes === void 0 ? void 0 : classes.container}`, children: [jsxs("div", { className: `ds-hidden xs:ds-block ds-w-full ${classes === null || classes === void 0 ? void 0 : classes.mobileContainer}`, children: [jsx("label", { htmlFor: "tabs", className: "ds-sr-only", children: "Select a tab" }), jsx("select", { id: "tabs", name: "tabs", className: "ds-block ds-w-full ds-rounded-md ds-border-gray-300 focus:ds-border-indigo-500 focus:ds-ring-indigo-500", defaultValue: (_a = tabs.find((tab) => tab.current)) === null || _a === void 0 ? void 0 : _a.name, onChange: (e) => setActiveTab(e.target.value), children: tabs.map((tab) => (jsx("option", { className: classes === null || classes === void 0 ? void 0 : classes.typography, children: tab.name }, tab.name))) })] }), jsx("div", { className: `ds-flex xs:ds-hidden ds-w-full ${classes === null || classes === void 0 ? void 0 : classes.desktopContainer}`, children: jsx("nav", { className: "ds-isolate ds-flex ds-divide-x ds-divide-gray-200 ds-rounded-lg ds-shadow ds-w-full", "aria-label": "Tabs", children: tabs.map((tab, tabIdx) => (jsxs("div", { className: `
                                    ${tab.current ? 'ds-text-gray-900' : 'ds-text-gray-500 hover:ds-text-gray-700'}
                                    ${tabIdx === 0 ? 'ds-rounded-l-lg' : ''}
                                    ${tabIdx === tabs.length - 1 ? 'ds-rounded-r-lg' : ''}
                                    ds-group ds-relative ds-min-w-0 ds-flex ds-w-full ds-overflow-hidden ds-justify-center ds-bg-white ds-py-2 ds-px-5 ds-text-center ds-text-sm ds-cursor-pointer ds-font-medium hover:ds-bg-gray-50 focus:ds-z-10
                                    ${classes === null || classes === void 0 ? void 0 : classes.tab}
                                `, "aria-current": tab.current ? 'page' : undefined, onClick: () => setActiveTab(tab.ref), children: [jsx(Typography, { className: `ds-whitespace-nowrap ${classes === null || classes === void 0 ? void 0 : classes.typography}`, children: tab.name }), jsx("span", { "aria-hidden": "true", className: `${tab.current ? 'ds-bg-indigo-500' : 'ds-bg-transparent'} ds-absolute ds-inset-x-0 ds-bottom-0 ds-h-0.5` })] }, tab.name))) }) })] }));
};

const useDebouncedValue = (value, duration = 500) => {
    const timerRef = useRef(null);
    const [returnValue, setReturnValue] = useState(value);
    useEffect(() => {
        var _a;
        if (!window || !duration) {
            setReturnValue(value);
            return;
        }
        if (timerRef.current) {
            window.clearTimeout((_a = timerRef.current) !== null && _a !== void 0 ? _a : undefined);
        }
        timerRef.current = window.setTimeout(() => {
            setReturnValue(value);
            timerRef.current = null;
        }, duration);
    }, [JSON.stringify(value)]);
    if (!duration) {
        return value;
    }
    return returnValue;
};

const TechnologiesPickerContext = createContext({ technologies: [], translations: {} });

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

/* eslint-disable no-undefined,no-param-reassign,no-shadow */

/**
 * Throttle execution of a function. Especially useful for rate limiting
 * execution of handlers on events like resize and scroll.
 *
 * @param  {Number}    delay          A zero-or-greater delay in milliseconds. For event callbacks, values around 100 or 250 (or even higher) are most useful.
 * @param  {Boolean}   [noTrailing]   Optional, defaults to false. If noTrailing is true, callback will only execute every `delay` milliseconds while the
 *                                    throttled-function is being called. If noTrailing is false or unspecified, callback will be executed one final time
 *                                    after the last throttled-function call. (After the throttled-function has not been called for `delay` milliseconds,
 *                                    the internal counter is reset)
 * @param  {Function}  callback       A function to be executed after delay milliseconds. The `this` context and all arguments are passed through, as-is,
 *                                    to `callback` when the throttled-function is executed.
 * @param  {Boolean}   [debounceMode] If `debounceMode` is true (at begin), schedule `clear` to execute after `delay` ms. If `debounceMode` is false (at end),
 *                                    schedule `callback` to execute after `delay` ms.
 *
 * @return {Function}  A new, throttled, function.
 */
function throttle (delay, noTrailing, callback, debounceMode) {
  /*
   * After wrapper has stopped being called, this timeout ensures that
   * `callback` is executed at the proper times in `throttle` and `end`
   * debounce modes.
   */
  var timeoutID;
  var cancelled = false; // Keep track of the last time `callback` was executed.

  var lastExec = 0; // Function to clear existing timeout

  function clearExistingTimeout() {
    if (timeoutID) {
      clearTimeout(timeoutID);
    }
  } // Function to cancel next exec


  function cancel() {
    clearExistingTimeout();
    cancelled = true;
  } // `noTrailing` defaults to falsy.


  if (typeof noTrailing !== 'boolean') {
    debounceMode = callback;
    callback = noTrailing;
    noTrailing = undefined;
  }
  /*
   * The `wrapper` function encapsulates all of the throttling / debouncing
   * functionality and when executed will limit the rate at which `callback`
   * is executed.
   */


  function wrapper() {
    var self = this;
    var elapsed = Date.now() - lastExec;
    var args = arguments;

    if (cancelled) {
      return;
    } // Execute `callback` and update the `lastExec` timestamp.


    function exec() {
      lastExec = Date.now();
      callback.apply(self, args);
    }
    /*
     * If `debounceMode` is true (at begin) this is used to clear the flag
     * to allow future `callback` executions.
     */


    function clear() {
      timeoutID = undefined;
    }

    if (debounceMode && !timeoutID) {
      /*
       * Since `wrapper` is being called for the first time and
       * `debounceMode` is true (at begin), execute `callback`.
       */
      exec();
    }

    clearExistingTimeout();

    if (debounceMode === undefined && elapsed > delay) {
      /*
       * In throttle mode, if `delay` time has been exceeded, execute
       * `callback`.
       */
      exec();
    } else if (noTrailing !== true) {
      /*
       * In trailing throttle mode, since `delay` time has not been
       * exceeded, schedule `callback` to execute `delay` ms after most
       * recent execution.
       *
       * If `debounceMode` is true (at begin), schedule `clear` to execute
       * after `delay` ms.
       *
       * If `debounceMode` is false (at end), schedule `callback` to
       * execute after `delay` ms.
       */
      timeoutID = setTimeout(debounceMode ? clear : exec, debounceMode === undefined ? delay - elapsed : delay);
    }
  }

  wrapper.cancel = cancel; // Return the wrapper function.

  return wrapper;
}

var ThresholdUnits = {
    Pixel: 'Pixel',
    Percent: 'Percent',
};
var defaultThreshold = {
    unit: ThresholdUnits.Percent,
    value: 0.8,
};
function parseThreshold(scrollThreshold) {
    if (typeof scrollThreshold === 'number') {
        return {
            unit: ThresholdUnits.Percent,
            value: scrollThreshold * 100,
        };
    }
    if (typeof scrollThreshold === 'string') {
        if (scrollThreshold.match(/^(\d*(\.\d+)?)px$/)) {
            return {
                unit: ThresholdUnits.Pixel,
                value: parseFloat(scrollThreshold),
            };
        }
        if (scrollThreshold.match(/^(\d*(\.\d+)?)%$/)) {
            return {
                unit: ThresholdUnits.Percent,
                value: parseFloat(scrollThreshold),
            };
        }
        console.warn('scrollThreshold format is invalid. Valid formats: "120px", "50%"...');
        return defaultThreshold;
    }
    console.warn('scrollThreshold should be string or number');
    return defaultThreshold;
}

var InfiniteScroll = /** @class */ (function (_super) {
    __extends(InfiniteScroll, _super);
    function InfiniteScroll(props) {
        var _this = _super.call(this, props) || this;
        _this.lastScrollTop = 0;
        _this.actionTriggered = false;
        // variables to keep track of pull down behaviour
        _this.startY = 0;
        _this.currentY = 0;
        _this.dragging = false;
        // will be populated in componentDidMount
        // based on the height of the pull down element
        _this.maxPullDownDistance = 0;
        _this.getScrollableTarget = function () {
            if (_this.props.scrollableTarget instanceof HTMLElement)
                return _this.props.scrollableTarget;
            if (typeof _this.props.scrollableTarget === 'string') {
                return document.getElementById(_this.props.scrollableTarget);
            }
            if (_this.props.scrollableTarget === null) {
                console.warn("You are trying to pass scrollableTarget but it is null. This might\n        happen because the element may not have been added to DOM yet.\n        See https://github.com/ankeetmaini/react-infinite-scroll-component/issues/59 for more info.\n      ");
            }
            return null;
        };
        _this.onStart = function (evt) {
            if (_this.lastScrollTop)
                return;
            _this.dragging = true;
            if (evt instanceof MouseEvent) {
                _this.startY = evt.pageY;
            }
            else if (evt instanceof TouchEvent) {
                _this.startY = evt.touches[0].pageY;
            }
            _this.currentY = _this.startY;
            if (_this._infScroll) {
                _this._infScroll.style.willChange = 'transform';
                _this._infScroll.style.transition = "transform 0.2s cubic-bezier(0,0,0.31,1)";
            }
        };
        _this.onMove = function (evt) {
            if (!_this.dragging)
                return;
            if (evt instanceof MouseEvent) {
                _this.currentY = evt.pageY;
            }
            else if (evt instanceof TouchEvent) {
                _this.currentY = evt.touches[0].pageY;
            }
            // user is scrolling down to up
            if (_this.currentY < _this.startY)
                return;
            if (_this.currentY - _this.startY >=
                Number(_this.props.pullDownToRefreshThreshold)) {
                _this.setState({
                    pullToRefreshThresholdBreached: true,
                });
            }
            // so you can drag upto 1.5 times of the maxPullDownDistance
            if (_this.currentY - _this.startY > _this.maxPullDownDistance * 1.5)
                return;
            if (_this._infScroll) {
                _this._infScroll.style.overflow = 'visible';
                _this._infScroll.style.transform = "translate3d(0px, " + (_this.currentY -
                    _this.startY) + "px, 0px)";
            }
        };
        _this.onEnd = function () {
            _this.startY = 0;
            _this.currentY = 0;
            _this.dragging = false;
            if (_this.state.pullToRefreshThresholdBreached) {
                _this.props.refreshFunction && _this.props.refreshFunction();
                _this.setState({
                    pullToRefreshThresholdBreached: false,
                });
            }
            requestAnimationFrame(function () {
                // this._infScroll
                if (_this._infScroll) {
                    _this._infScroll.style.overflow = 'auto';
                    _this._infScroll.style.transform = 'none';
                    _this._infScroll.style.willChange = 'unset';
                }
            });
        };
        _this.onScrollListener = function (event) {
            if (typeof _this.props.onScroll === 'function') {
                // Execute this callback in next tick so that it does not affect the
                // functionality of the library.
                setTimeout(function () { return _this.props.onScroll && _this.props.onScroll(event); }, 0);
            }
            var target = _this.props.height || _this._scrollableNode
                ? event.target
                : document.documentElement.scrollTop
                    ? document.documentElement
                    : document.body;
            // return immediately if the action has already been triggered,
            // prevents multiple triggers.
            if (_this.actionTriggered)
                return;
            var atBottom = _this.props.inverse
                ? _this.isElementAtTop(target, _this.props.scrollThreshold)
                : _this.isElementAtBottom(target, _this.props.scrollThreshold);
            // call the `next` function in the props to trigger the next data fetch
            if (atBottom && _this.props.hasMore) {
                _this.actionTriggered = true;
                _this.setState({ showLoader: true });
                _this.props.next && _this.props.next();
            }
            _this.lastScrollTop = target.scrollTop;
        };
        _this.state = {
            showLoader: false,
            pullToRefreshThresholdBreached: false,
            prevDataLength: props.dataLength,
        };
        _this.throttledOnScrollListener = throttle(150, _this.onScrollListener).bind(_this);
        _this.onStart = _this.onStart.bind(_this);
        _this.onMove = _this.onMove.bind(_this);
        _this.onEnd = _this.onEnd.bind(_this);
        return _this;
    }
    InfiniteScroll.prototype.componentDidMount = function () {
        if (typeof this.props.dataLength === 'undefined') {
            throw new Error("mandatory prop \"dataLength\" is missing. The prop is needed" +
                " when loading more content. Check README.md for usage");
        }
        this._scrollableNode = this.getScrollableTarget();
        this.el = this.props.height
            ? this._infScroll
            : this._scrollableNode || window;
        if (this.el) {
            this.el.addEventListener('scroll', this
                .throttledOnScrollListener);
        }
        if (typeof this.props.initialScrollY === 'number' &&
            this.el &&
            this.el instanceof HTMLElement &&
            this.el.scrollHeight > this.props.initialScrollY) {
            this.el.scrollTo(0, this.props.initialScrollY);
        }
        if (this.props.pullDownToRefresh && this.el) {
            this.el.addEventListener('touchstart', this.onStart);
            this.el.addEventListener('touchmove', this.onMove);
            this.el.addEventListener('touchend', this.onEnd);
            this.el.addEventListener('mousedown', this.onStart);
            this.el.addEventListener('mousemove', this.onMove);
            this.el.addEventListener('mouseup', this.onEnd);
            // get BCR of pullDown element to position it above
            this.maxPullDownDistance =
                (this._pullDown &&
                    this._pullDown.firstChild &&
                    this._pullDown.firstChild.getBoundingClientRect()
                        .height) ||
                    0;
            this.forceUpdate();
            if (typeof this.props.refreshFunction !== 'function') {
                throw new Error("Mandatory prop \"refreshFunction\" missing.\n          Pull Down To Refresh functionality will not work\n          as expected. Check README.md for usage'");
            }
        }
    };
    InfiniteScroll.prototype.componentWillUnmount = function () {
        if (this.el) {
            this.el.removeEventListener('scroll', this
                .throttledOnScrollListener);
            if (this.props.pullDownToRefresh) {
                this.el.removeEventListener('touchstart', this.onStart);
                this.el.removeEventListener('touchmove', this.onMove);
                this.el.removeEventListener('touchend', this.onEnd);
                this.el.removeEventListener('mousedown', this.onStart);
                this.el.removeEventListener('mousemove', this.onMove);
                this.el.removeEventListener('mouseup', this.onEnd);
            }
        }
    };
    InfiniteScroll.prototype.componentDidUpdate = function (prevProps) {
        // do nothing when dataLength is unchanged
        if (this.props.dataLength === prevProps.dataLength)
            return;
        this.actionTriggered = false;
        // update state when new data was sent in
        this.setState({
            showLoader: false,
        });
    };
    InfiniteScroll.getDerivedStateFromProps = function (nextProps, prevState) {
        var dataLengthChanged = nextProps.dataLength !== prevState.prevDataLength;
        // reset when data changes
        if (dataLengthChanged) {
            return __assign(__assign({}, prevState), { prevDataLength: nextProps.dataLength });
        }
        return null;
    };
    InfiniteScroll.prototype.isElementAtTop = function (target, scrollThreshold) {
        if (scrollThreshold === void 0) { scrollThreshold = 0.8; }
        var clientHeight = target === document.body || target === document.documentElement
            ? window.screen.availHeight
            : target.clientHeight;
        var threshold = parseThreshold(scrollThreshold);
        if (threshold.unit === ThresholdUnits.Pixel) {
            return (target.scrollTop <=
                threshold.value + clientHeight - target.scrollHeight + 1);
        }
        return (target.scrollTop <=
            threshold.value / 100 + clientHeight - target.scrollHeight + 1);
    };
    InfiniteScroll.prototype.isElementAtBottom = function (target, scrollThreshold) {
        if (scrollThreshold === void 0) { scrollThreshold = 0.8; }
        var clientHeight = target === document.body || target === document.documentElement
            ? window.screen.availHeight
            : target.clientHeight;
        var threshold = parseThreshold(scrollThreshold);
        if (threshold.unit === ThresholdUnits.Pixel) {
            return (target.scrollTop + clientHeight >= target.scrollHeight - threshold.value);
        }
        return (target.scrollTop + clientHeight >=
            (threshold.value / 100) * target.scrollHeight);
    };
    InfiniteScroll.prototype.render = function () {
        var _this = this;
        var style = __assign({ height: this.props.height || 'auto', overflow: 'auto', WebkitOverflowScrolling: 'touch' }, this.props.style);
        var hasChildren = this.props.hasChildren ||
            !!(this.props.children &&
                this.props.children instanceof Array &&
                this.props.children.length);
        // because heighted infiniteScroll visualy breaks
        // on drag down as overflow becomes visible
        var outerDivStyle = this.props.pullDownToRefresh && this.props.height
            ? { overflow: 'auto' }
            : {};
        return (React.createElement("div", { style: outerDivStyle, className: "infinite-scroll-component__outerdiv" },
            React.createElement("div", { className: "infinite-scroll-component " + (this.props.className || ''), ref: function (infScroll) { return (_this._infScroll = infScroll); }, style: style },
                this.props.pullDownToRefresh && (React.createElement("div", { style: { position: 'relative' }, ref: function (pullDown) { return (_this._pullDown = pullDown); } },
                    React.createElement("div", { style: {
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            top: -1 * this.maxPullDownDistance,
                        } }, this.state.pullToRefreshThresholdBreached
                        ? this.props.releaseToRefreshContent
                        : this.props.pullDownToRefreshContent))),
                this.props.children,
                !this.state.showLoader &&
                    !hasChildren &&
                    this.props.hasMore &&
                    this.props.loader,
                this.state.showLoader && this.props.hasMore && this.props.loader,
                !this.props.hasMore && this.props.endMessage)));
    };
    return InfiniteScroll;
}(Component));

const technoCardsSizes = {
    mobile: {
        width: 56 + 2 * 1 * 8,
        height: 80 + 2 * 1 * 8,
    },
    other: {
        width: 80 + 2 * 1.5 * 8,
        height: 120 + 2 * 1.5 * 8,
    },
};
const TechnologyItem = ({ item, selectedItems = [], onAdd, onDelete, isMobile, }) => {
    const { technologies } = useContext(TechnologiesPickerContext);
    const selectedItem = useMemo(() => selectedItems.find(({ name }) => name === item.name), [selectedItems, item]);
    const onClick = useCallback(() => {
        if (!selectedItem) {
            onAdd(item.name);
            return;
        }
        onDelete(selectedItem.name);
    }, [selectedItem, onAdd, onDelete]);
    const imgUrl = useMemo(() => {
        var _a;
        const matchingItem = technologies.find((techno) => techno.name === item.name);
        if (matchingItem === null || matchingItem === void 0 ? void 0 : matchingItem.handle) {
            return `https://process.filestackapi.com/auto_image/${(_a = matchingItem === null || matchingItem === void 0 ? void 0 : matchingItem.handle) !== null && _a !== void 0 ? _a : '4A5N89okRPW50jRcmkuM'}`;
        }
        const handle = last(matchingItem === null || matchingItem === void 0 ? void 0 : matchingItem.url.split('/'));
        return `https://process.filestackapi.com/auto_image/${handle !== null && handle !== void 0 ? handle : '4A5N89okRPW50jRcmkuM'}`;
    }, [item, technologies]);
    return (jsxs("button", { className: `${isMobile ? 'ds-w-7 ds-max-w-7 ds-m-1' : 'ds-w-10 ds-max-w-10 ds-m-1.5'} ds-flex ds-flex-col ds-items-center`, type: "button", onClick: onClick, children: [jsxs(Card, { classes: {
                    container: `${isMobile ? '  ds-h-7 ds-max-h-7 !ds-p-1 ' : 'ds-h-10 ds-max-h-10 !ds-p-2'} !ds-w-full ds-overflow-hidden ds-mb-2 ds-relative`,
                }, children: [jsx("img", { src: imgUrl, alt: item.name, className: `ds-w-full ds-h-full ds-object-contain` }), selectedItem && (jsx("div", { className: 'ds-z-[2] ds-absolute ds-top-0 ds-left-0 ds-w-full ds-h-full ds-bg-primary-500 ds-text-light-500 ds-text-center ds-flex ds-items-center ds-justify-center', children: jsx(Typography, { color: "light", variant: "h3", children: (selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.index) + 1 }) }, `selected_item_layer_${selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.name}`))] }), jsx(Typography, { variant: "body3", classes: {
                    container: 'ds-text-center ds-break-all',
                }, children: item.name })] }));
};
const DISPLAYED_ITEMS = 30;
const AllTechnologiesPicker = ({ selectedItems, onAdd, onDelete, classes = {}, isMobile, noResultsElement = null, additionalInformations = null, }) => {
    var _a, _b;
    const [onlySelected, setOnlySelected] = useState();
    const containerRef = useRef(null);
    const [query, setQuery] = useState('');
    const debouncedQuery = useDebouncedValue(query, 200);
    const { technologies, translations } = useContext(TechnologiesPickerContext);
    const [shownItems, setShownItems] = useState(DISPLAYED_ITEMS);
    const displayedItems = useMemo(() => technologies
        .filter(({ name }) => {
        if (!onlySelected) {
            return true;
        }
        return selectedItems.some(({ name: selectedName }) => selectedName === name);
    })
        .filter(({ name, tags }) => [...(tags !== null && tags !== void 0 ? tags : []), name].some((value) => value.toLowerCase().includes(debouncedQuery.toLowerCase())))
        .sort(({ name: a }, { name: b }) => a.localeCompare(b)), [technologies, debouncedQuery, onlySelected]);
    const slicedItems = useMemo(() => displayedItems.slice(0, shownItems), [displayedItems, shownItems]);
    const handleTextFieldChange = useCallback((event) => setQuery(event.target.value), []);
    useEffect(() => {
        const { clientWidth: width, clientHeight: height } = (containerRef === null || containerRef === void 0 ? void 0 : containerRef.current) || {};
        if (!width || !height) {
            return;
        }
        const sizes = isMobile ? technoCardsSizes['mobile'] : technoCardsSizes['other'];
        const itemsPerRow = Math.floor(width / sizes.width);
        const rowsCount = Math.ceil(height / sizes.height);
        let itemsCount = Math.round(itemsPerRow * rowsCount);
        setShownItems(itemsCount);
    }, [containerRef.current]);
    const toggleOtherPerk = useCallback(() => {
        setOnlySelected(!onlySelected);
    }, [onlySelected]);
    return (jsxs("div", { className: `${(_a = classes === null || classes === void 0 ? void 0 : classes.container) !== null && _a !== void 0 ? _a : ''} ds-overflow-hidden ds-flex ds-flex-col`, ref: containerRef, children: [jsxs("div", { className: 'ds-flex ds-items-center ds-flex-wrap  ds-mb-3 ', children: [jsx(TextField, { classes: {
                            container: 'ds-w-[400px] sm:ds-w-[unset] ds-min-h-[60px]',
                        }, fullWidth: isMobile, variant: "flat", value: query, onChange: handleTextFieldChange, placeholder: "Mobile, Javascript, etc..." }), jsxs("button", { className: cn('ds-m-1 ds-flex ds-items-center ds-text-left'), type: "button", onClick: toggleOtherPerk, children: [jsx(Checkbox, { variant: "outlined", color: "secondary", checked: !!onlySelected, onChange: toggleOtherPerk, className: 'ds-mr-1' }), jsx(Typography, { variant: "body2", children: translations.checkboxLabel })] })] }), isMobile && additionalInformations, !displayedItems.length && noResultsElement, jsx("div", { id: "allTechnologiesPicker", className: 'ds-w-full ds-overflow-auto ds-scrollbar', children: jsx(InfiniteScroll, { className: `ds-pr-0 ds-flex ds-justify-center ds-flex-wrap sm:ds-ml-[unset]  ${(_b = classes === null || classes === void 0 ? void 0 : classes.technologiesList) !== null && _b !== void 0 ? _b : ''}`, dataLength: slicedItems.length, next: () => {
                        setShownItems(shownItems + DISPLAYED_ITEMS);
                    }, hasMore: displayedItems.length > shownItems, loader: null, scrollableTarget: "allTechnologiesPicker", children: slicedItems.map((item, index) => (jsx(TechnologyItem, { selectedItems: selectedItems, item: item, onAdd: onAdd, onDelete: onDelete, isMobile: !!isMobile }, `technology_${item.name}_${index}`))) }) })] }));
};

const CSS = /*#__PURE__*/Object.freeze({
  Translate: {
    toString(transform) {
      if (!transform) {
        return;
      }

      const {
        x,
        y
      } = transform;
      return `translate3d(${x ? Math.round(x) : 0}px, ${y ? Math.round(y) : 0}px, 0)`;
    }

  },
  Scale: {
    toString(transform) {
      if (!transform) {
        return;
      }

      const {
        scaleX,
        scaleY
      } = transform;
      return `scaleX(${scaleX}) scaleY(${scaleY})`;
    }

  },
  Transform: {
    toString(transform) {
      if (!transform) {
        return;
      }

      return [CSS.Translate.toString(transform), CSS.Scale.toString(transform)].join(' ');
    }

  },
  Transition: {
    toString({
      property,
      duration,
      easing
    }) {
      return `${property} ${duration}ms ${easing}`;
    }

  }
});

const TrashIcon = ({ className }) => (jsx("svg", { className: className, width: "33", height: "32", viewBox: "0 0 33 32", fill: "#fff", xmlns: "http://www.w3.org/2000/svg", children: jsx("path", { d: "M8.27667 25.3335C8.27667 26.8001 9.4981 28.0001 10.991 28.0001H21.8481C23.341 28.0001 24.5624 26.8001 24.5624 25.3335V9.33346H8.27667V25.3335ZM25.9195 5.33346H21.1695L19.8124 4.00012H13.0267L11.6695 5.33346H6.91953V8.00012H25.9195V5.33346Z" }) }));

const MoveIcon = ({ className }) => (jsx("svg", { className: className, version: "1.1", viewBox: "0 0 40 40", xmlns: "http://www.w3.org/2000/svg", children: jsxs("g", { transform: "scale(1.6667)", fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", children: [jsx("path", { d: "m9 3.748 3-3 3 3" }), jsx("path", { d: "m15 20.248-3 3-3-3" }), jsx("path", { d: "m12 0.748v22.5" }), jsx("path", { d: "m3.75 14.998-3-3 3-3" }), jsx("path", { d: "m20.25 8.998 3 3-3 3" }), jsx("path", { d: "m0.75 11.998h22.5" })] }) }));

const TechnologyRow = ({ id, item, onDelete: onRemove, onChange, itemsLength, technologyIndex, hideSlider, }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };
    const { technologies, translations } = useContext(TechnologiesPickerContext);
    const sliderChange = useCallback((e) => {
        onChange(Object.assign(Object.assign({}, item), { value: Number(e.target.value) }));
    }, [item, onChange]);
    const imgUrl = useMemo(() => {
        var _a;
        const matchingItem = technologies.find((techno) => techno.name === item.name);
        if (matchingItem === null || matchingItem === void 0 ? void 0 : matchingItem.handle) {
            return `https://process.filestackapi.com/auto_image/${(_a = matchingItem === null || matchingItem === void 0 ? void 0 : matchingItem.handle) !== null && _a !== void 0 ? _a : '4A5N89okRPW50jRcmkuM'}`;
        }
        const handle = last(matchingItem === null || matchingItem === void 0 ? void 0 : matchingItem.url.split('/'));
        return `https://process.filestackapi.com/auto_image/${handle !== null && handle !== void 0 ? handle : '4A5N89okRPW50jRcmkuM'}`;
    }, [item, technologies]);
    let divider = jsx("div", { className: "ds-bg-dark-50 ds-w-[1px] ds-h-5 ds-mx-1.5" });
    return (jsxs("div", { ref: setNodeRef, className: 'ds flex ds-flex ds-items-center ds-w-full ds-p-0 ds-my-2 ds-relative ds-z-[1400]', style: Object.assign(Object.assign({}, style), { zIndex: itemsLength - technologyIndex }), children: [jsx("button", Object.assign({}, attributes, listeners, { className: "ds-flex ds-mr-1/2", type: "button", children: jsx(MoveIcon, { className: "ds-w-2.5 ds-h-2.5 ds-text-indigo-500" }) })), jsx(Typography, { color: 'indigo', variant: "h3", className: "ds-font-semibold", children: technologyIndex + 1 }), divider, jsx(Card, { className: "ds-w-5 ds-h-5 !ds-p-1 ds-mr-1", children: jsx("img", { className: 'ds-object-contain ds-w-full ds-h-full', alt: item.name, src: imgUrl }) }), jsxs("div", { className: "ds-flex-1", children: [jsx(Typography, { color: "dark", variant: "label", children: item.name }), !hideSlider && (jsxs("div", { className: "ds-flex ds-items-center", children: [jsxs(Typography, { classes: {
                                    container: 'ds-w-5 ds-mb-0',
                                }, color: "dark", variant: "body3", children: [jsx("span", { className: "ds-font-medium", children: item.value }), "%"] }), jsx(Slider, { color: "primary", name: `skill_value_${item.name}`, value: item.value, onChange: sliderChange, min: 0, max: 100, step: 5, classes: { container: 'ds-w-12 ds-mr-1' }, popperCardProps: {
                                    classes: {
                                        popper: 'ds-z-[1302]',
                                    },
                                } })] }))] }), divider, jsx(Tooltip, { title: translations.deleteLabel, children: jsx("button", { className: "ds-flex", type: "button", onClick: () => onRemove(item.name), children: jsx(TrashIcon, { className: "ds-fill-danger-500 ds-w-3 ds-h-3" }) }) })] }));
};
const SortableTechnologies = ({ items, onDelete, onItemChange, classes, className, itemsLength, onSortEnd, hideSlider, }) => {
    const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
    }));
    const itemsWithId = useMemo(() => items.map((item) => (Object.assign(Object.assign({}, item), { id: item.name }))), [items]);
    const handleDragEnd = useCallback((event) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            const oldItem = items.find(({ name }) => name === active.id);
            const newItem = items.find(({ name }) => name === over.id);
            const oldIndex = oldItem && items.indexOf(oldItem);
            const newIndex = newItem && items.indexOf(newItem);
            return onSortEnd({ oldIndex, newIndex });
        }
    }, [items]);
    return (jsx("div", { className: cn(classes === null || classes === void 0 ? void 0 : classes.container, 'ds-pr-2 ds-h-full ds-scrollbar ds-overflow-auto !ds-z-[1301]', className), children: jsx(DndContext, { sensors: sensors, collisionDetection: closestCenter, onDragEnd: handleDragEnd, children: jsx(SortableContext, { items: itemsWithId, strategy: verticalListSortingStrategy, children: itemsWithId.map((item, index) => (jsx(TechnologyRow, { onDelete: onDelete, id: item.id, onChange: onItemChange, technologyIndex: index, item: item, itemsLength: itemsLength, hideSlider: hideSlider }, `selected_technology_row_${item.name}_${index}`))) }) }) }));
};
const SelectedTechnologies = ({ items, onChange, onDelete, className, onItemChange, classes = {}, hideSlider, }) => {
    const itemsLength = useMemo(() => items.length, [items]);
    const move = useCallback(({ oldIndex, newIndex }) => {
        if (typeof onChange === 'function') {
            onChange(arrayMove(items, oldIndex, newIndex).map((data, index) => (Object.assign(Object.assign({}, data), { index }))));
        }
    }, [items, onChange]);
    return (jsx(SortableTechnologies, { className: className !== null && className !== void 0 ? className : '', items: items, onSortEnd: move, onItemChange: onItemChange, onDelete: onDelete, itemsLength: itemsLength, onChange: onChange, classes: classes, hideSlider: hideSlider }));
};

const TechnologiesPicker = ({ isMobile, selectedValues = [], onAddItem, onDeleteItem, onArrayChange, onArrayItemChange, technologies, classes = {}, translations, content, hideSlider = false, }) => {
    // const classes = useStyles({ classes: receivedClasses, isMobile });
    var _a;
    const technoPickerContext = useMemo(() => ({
        technologies,
        translations,
    }), [technologies, translations]);
    return (jsx(TechnologiesPickerContext.Provider, { value: technoPickerContext, children: jsxs("div", { className: `ds-flex ds-h-full ${(_a = classes === null || classes === void 0 ? void 0 : classes.container) !== null && _a !== void 0 ? _a : ''}`, children: [jsx(AllTechnologiesPicker, { isMobile: isMobile, technologies: technologies, selectedItems: selectedValues, onAdd: onAddItem, onDelete: onDeleteItem, noResultsElement: content === null || content === void 0 ? void 0 : content.noResults, additionalInformations: content === null || content === void 0 ? void 0 : content.additionalInformations, classes: {
                        container: `ds-flex-[125%] ${isMobile ? '' : 'ds-ml-2'} sm:ds-w-full`,
                        technologiesList: 'ds-scrollbar ds-overflow-x-hidden ds-overflow-y-auto',
                    } }), !isMobile && jsx("div", { className: 'ds-bg-dark-100 ds-mr-2 ds-ml-4 ' }), !isMobile && (jsxs("div", { className: 'ds-flex-auto ds-flex ds-flex-col ds-min-w-[280px]', children: [content === null || content === void 0 ? void 0 : content.additionalInformations, jsx(SelectedTechnologies, { className: 'ds-flex-1', items: selectedValues, onDelete: onDeleteItem, onChange: onArrayChange, onItemChange: onArrayItemChange, hideSlider: hideSlider })] }))] }) }));
};

const variants = {
    flat: {
        root: 'ds-font-w3d ds-w-auto ds-inline-block ds-bg-[#f9f9f9] ds-rounded ds-border ds-border-solid ds-border-dark-100',
        input: 'ds-font-w3d ds-w-full !ds-pr-4 ds-text-dark-500',
        icon: ''
    },
    raised: {
        root: 'ds-font-w3d ds-w-auto ds-inline-block ds-bg-light-500 ds-shadow-w3d ds-rounded ds-border ds-border-solid ds-border-[#f0f0f0]',
        input: 'ds-font-w3d ds-w-full !ds-pr-4 ds-text-dark-500',
        icon: ''
    },
    outlined: {
        root: 'ds-font-w3d ds-w-auto ds-inline-block ds-bg-transparent ds-border ds-border-solid ds-border-current',
        input: 'ds-font-w3d ds-w-full !ds-pr-4 ds-text-current',
        icon: 'ds-text-current'
    }
};
const sizes = {
    regular: {
        input: 'ds-p-1'
    },
    small: {
        input: ''
    }
};
const Select = (_a) => {
    var _b, _c, _d, _e, _f, _g, _h;
    var { value, onChange, children, className = null, variant = 'raised', size = 'regular', classes = {}, textFieldProps = null, placeholder = null, avoidNative = true } = _a, others = __rest(_a, ["value", "onChange", "children", "className", "variant", "size", "classes", "textFieldProps", "placeholder", "avoidNative"]);
    return (jsxs(Select$1, Object.assign({ MenuProps: {
            classes: {
                paper: 'ds-max-h-[300px] ds-border ds-border-1 ds-border-gray-100'
            }
        }, className: `ds-min-w-[150px] ds-max-h-[300px] ds-rounded ds-flex ${className}`, classes: {
            icon: `${(_b = classes.icon) !== null && _b !== void 0 ? _b : ''} ${((_c = variants[variant]) !== null && _c !== void 0 ? _c : variants === null || variants === void 0 ? void 0 : variants.raised).icon}`
        }, native: !avoidNative, value: value !== null && value !== void 0 ? value : null, inputProps: textFieldProps, input: jsx(InputBase, { classes: {
                root: `${((_d = variants[variant]) !== null && _d !== void 0 ? _d : variants === null || variants === void 0 ? void 0 : variants.raised).root} ${(_e = classes === null || classes === void 0 ? void 0 : classes.root) !== null && _e !== void 0 ? _e : ''}`,
                input: `${((_f = variants[variant]) !== null && _f !== void 0 ? _f : variants === null || variants === void 0 ? void 0 : variants.raised).input} ${((_g = sizes[size]) !== null && _g !== void 0 ? _g : sizes === null || sizes === void 0 ? void 0 : sizes.regular).input} ${(_h = classes === null || classes === void 0 ? void 0 : classes.input) !== null && _h !== void 0 ? _h : ''}`
            } }), onChange: (e) => onChange === null || onChange === void 0 ? void 0 : onChange(e.target.value) }, others, { children: [avoidNative && placeholder && (jsx(MenuItem, { disabled: true, value: "", children: placeholder })), !avoidNative && (jsxs(Fragment, { children: [placeholder && (jsx("option", { disabled: true, value: "", children: placeholder })), React.Children.toArray(children)
                        .filter(Boolean)
                        .map((child, index) => {
                        var _a;
                        if (!child) {
                            return null;
                        }
                        return (jsx("option", { value: (_a = child.props.value) !== null && _a !== void 0 ? _a : null, children: child.props.label || child.props.children }, (child === null || child === void 0 ? void 0 : child.key) || child.props.value || `select_child_${index}`));
                    })] })), avoidNative && children] })));
};

const DEFAULT_THEME = {
    palette: Object.assign({}, palette),
};

// Flex utils
const flexUtils = {
    center: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
};
const withCustomVerticalScrollbar = (color = '#c1c1c1') => ({
    '&::-webkit-scrollbar-track': {
        border: 0,
    },
    '&::-webkit-scrollbar': {
        width: '6px',
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: color,
    },
    scrollbarWidth: 'thin',
    scrollbarColor: `${color} transparent`,
});
const getHexFromTheme = (inputTheme, color = 'primary', shade = 500) => {
    var _a, _b, _c;
    // @ts-ignore
    const themeShadedColor = (_b = (_a = inputTheme === null || inputTheme === void 0 ? void 0 : inputTheme.palette) === null || _a === void 0 ? void 0 : _a[color]) === null || _b === void 0 ? void 0 : _b[shade];
    if (!themeShadedColor) {
        // @ts-ignore
        return (_c = DEFAULT_THEME.palette[color]) === null || _c === void 0 ? void 0 : _c[shade];
    }
    return themeShadedColor;
};
const getComponentColor = (active, color, disabled, defaultValue = '#fff') => {
    if (disabled) {
        return '#c0c0c0';
    }
    if (active && color) {
        return color;
    }
    return defaultValue;
};

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = "@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap');\n\n.ds-scrollbar: : -webkit-scrollbar-track {\n    border: 0;\n}\n.ds-scrollbar::-webkit-scrollbar {\n    width: 4px;\n}\n.ds-scrollbar::-webkit-scrollbar-thumb {\n    border-radius: 100px;\n    background-color: #6454c4;\n}\n";
styleInject(css_248z);

export { AllTechnologiesPicker, AutoComplete, Banner, Button, Card, Checkbox, DEFAULT_THEME, ELEVATION_PROPS, List, ListItem, PopperCard, PopperCardActions, PopperCardContent, PopperCardTitle, ProgressBar, Select, SelectedTechnologies, Slider, Switch, Tabs, Tag, TechnologiesPicker, TextField, TextFieldIcon, Tooltip, Typography, codersTestsPrimary, codersTestsSecondary, danger, dark, darkblue, flexUtils, getComponentColor, getHexFromTheme, indigo, light, orange, palette, primary, purple, safe, secondary, tertiary, warn, withCustomVerticalScrollbar };
//# sourceMappingURL=index.js.map
