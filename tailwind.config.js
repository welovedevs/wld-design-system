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
    contrastDefaultColor: 'dark',
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
    500: '#fff',
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

let palette = {
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
};

let sizes = {
    0: '0px',
    '1/2': '4px',
    '3/4': '6px',
    1: '8px',
    1.5: '12px',
    2: '16px',
    2.5: '20px',
    3: '24px',
    3.5: '28px',
    4: '32px',
    5: '40px',
    6: '48px',
    7: '56px',
    8: '64px',
    9: '72px',
    10: '80px',
    11: '88px',
    12: '104px',
    13: '112px',
    14: '120px',
    15: '128px',
    16: '136px',
    17: '144px',
    18: '152px',
    19: '160px',
    20: '168px',
    21: '176px',
    22: '184px',
    23: '192px',
    24: '200px',
};
module.exports = {
    mode: 'jit',
    content: ['./src/**/*.{js,jsx,ts,tsx}', './stories/**/*.{mdx,js,jsx,ts,tsx}'],
    prefix: 'ds-',
    theme: {
        screens: {
            '2xl': { max: '1535px' },
            xl: { max: '1279px' },
            lg: { max: '1023px' },
            md: { max: '768px' },
            profileMobile: { max: '700px' },
            sm: { max: '500px' },
            xs: { max: '400px' },
        },
        fontFamily: {
            w3d: ['Plus Jakarta Sans', 'Avenir Next', 'open sans', 'Arial'],
        },
        extend: {
            spacing: sizes,
            margin: {
                0: '0px',
            },
            minWidth: {
                '1/4': '25%',
                '1/2': '50%',
                '3/4': '75%',
                '4/5': '80%',
                '9/10': '90%',
                ...sizes,
            },
            maxWidth: {
                '1/4': '25%',
                '1/2': '50%',
                '3/4': '75%',
                '4/5': '80%',
                '9/10': '90%',
                ...sizes,
            },
            width: {
                '1/4': '25%',
                '1/2': '50%',
                '3/4': '75%',
                '4/5': '80%',
                '9/10': '90%',
                reset: 'unset',
                ...sizes,
            },
            colors: {
                ...palette,
                white: '#FFF',
                black: '#000',
                lightGray: '#efefef',
            },
            boxShadow: {
                md: '0 7.5px 15px 0 #e4e4e4',
                lg: '0 10px 20px 0 #dadada',
                w3d: 'rgb(228, 228, 228) 0px 7.5px 15px 0px',
                slim:
                    'rgba(0, 0, 0, 0.1) 0px -1px 1px 0px, rgba(0, 0, 0, 0.1) 1px 0px 1px 0px, rgba(0, 0, 0, 0.1) -1px 0px 1px 0px, rgba(0, 0, 0, 0.1) 0px 1px 1px 0px',
            },
        },
    },
    variants: {
        extend: {},
    },
    corePlugins: {
        preflight: false,
    },
    plugins: [
        function ({ addVariant, e }) {
            addVariant('children', ({ modifySelectors, separator }) => {
                modifySelectors(({ className }) => {
                    return `.${e(`children${separator}${className}`)} > *`;
                });
            });

            addVariant('child-svg', ({ modifySelectors, separator }) => {
                modifySelectors(({ className }) => {
                    return `.${e(`child-svg${separator}${className}`)} > svg`;
                });
            });
        },
    ],
};
