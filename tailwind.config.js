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
};

module.exports = {
    mode: 'jit',
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    prefix: 'ds-',
    theme: {
        fontFamily: {
            avenir: ['Avenir Next', 'open sans', 'Arial'],
        },
        extend: {
            spacing: {
                0: '0px',
                '1/2': '4px',
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
            },
            margin: {
                0: '0px',
            },
            maxWidth: {
                '1/4': '25%',
                '1/2': '50%',
                '3/4': '75%',
                '4/5': '80%',
                '9/10': '90%',
            },
            width: {
                '1/4': '25%',
                '1/2': '50%',
                '3/4': '75%',
                '4/5': '80%',
                '9/10': '90%',
                reset: 'unset',
            },
            colors: {
                ...palette,
                white: '#FFF',
                black: '#000',
                lightGray: '#efefef',
            },
        },
    },
    variants: {
        extend: {},
    },
    corePlugins: {
        preflight: false,
    },
    plugins: [],
};
