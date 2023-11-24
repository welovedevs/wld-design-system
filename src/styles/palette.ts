export const primary = {
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

export const secondary = pink;

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

export const tertiary = yellow;

export const safe = {
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

export const danger = {
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
export const warn = {
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

export const orange = {
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

export const light = {
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

export const dark = {
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

export const darkblue = {
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

export const indigo = {
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

export const purple = {
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
const codersTestsRed = {
    50: '#f6eae8',
    100: '#edd4d2',
    200: '#dba9a5',
    300: '#ca7e77',
    400: '#b8534a',
    500: '#a6281d',
    600: '#852017',
    700: '#641811',
    800: '#42100c',
    900: '#210806',
    contrastDefaultColor: 'light',
};
const codersTestsOrange = {
    50: '#fcf2e9',
    100: '#fae4d3',
    200: '#f5c9a6',
    300: '#efaf7a',
    400: '#ea944d',
    500: '#e57921',
    600: '#b7611a',
    700: '#894914',
    800: '#5c300d',
    900: '#2e1807',
    contrastDefaultColor: 'light',
};

export type PaletteShade = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

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
} as const;

export type PaletteColors = keyof typeof palette;
export default palette;
