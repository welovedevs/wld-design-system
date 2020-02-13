// Material Design's box-shadows (see: https://codepen.io/sdthornton/pen/wBZdXq)
import palettes, { dark } from '../palettes';
import { DEFAULT_THEME } from '../theme';

export const card2 = {
    boxShadow: [
        [0, 3, 6, 'rgba(0,0,0,.16)'],
        [0, 3, 6, 'rgba(0,0,0,.23)']
    ]
};

// Flex utils
export const flexUtils = {
    center: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
};

// Background utils
export const createBackground = (size = 'cover') => ({
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: size
});

export const generateGradient = (palette, deg = 'to right top') => {
    if (!palette || palette.length < 5) {
        return null;
    }
    return `linear-gradient(${deg}, ${palette[0]}, ${palette[1]}, ${palette[2]}, ${palette[3]}, ${palette[4]})`;
};

// Borders
export const getDefaultBorder = (width = 1, color = 'lightgray') => [width, 'solid', color];

// Transformations
export const pixelsToRem = pixels => `${pixels / 16}rem`;

const arrayToString = (array, transform = something => something) => {
    if (!array) {
        return null;
    }
    let str = '';
    array.forEach((value, index) => {
        str += `${index !== 0 && index !== array.length ? ' ' : ''}${transform(value)}px`;
    });
    return str;
};

export const checkAndScale = value => ({ sizeScale }) => {
    if (!sizeScale) {
        if (Array.isArray(value)) {
            return arrayToString(value);
        }
        return value;
    }
    if (Array.isArray(value)) {
        return arrayToString(value, something => something * sizeScale);
    }
    return value * sizeScale;
};

export const getColorShade = (color, percent) => {
    let R = parseInt(color.substring(1, 3), 16);
    let G = parseInt(color.substring(3, 5), 16);
    let B = parseInt(color.substring(5, 7), 16);

    R = parseInt((R * (100 + percent)) / 100);
    G = parseInt((G * (100 + percent)) / 100);
    B = parseInt((B * (100 + percent)) / 100);

    R = R < 255 ? R : 255;
    G = G < 255 ? G : 255;
    B = B < 255 ? B : 255;

    const RR = R.toString(16).length == 1 ? `0${R.toString(16)}` : R.toString(16);
    const GG = G.toString(16).length == 1 ? `0${G.toString(16)}` : G.toString(16);
    const BB = B.toString(16).length == 1 ? `0${B.toString(16)}` : B.toString(16);

    return `#${RR}${GG}${BB}`;
};

export const getHexFromTheme = (theme = DEFAULT_THEME, color = 'primary', shade = 500) => {
    return theme.palette?.[color]?.[shade];
};
export const getComponentColor = (active, color, disabled, defaultValue = '#fff') => {
    if (disabled) {
        return '#c0c0c0';
    }
    if (active && color) {
        return color;
    }
    return defaultValue;
};

export const withCustomScrollbar = (color = dark[100]) => ({
    '&::-webkit-scrollbar-track': {
        border: 0
    },
    '&::-webkit-scrollbar': {
        width: 5
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: color
    }
});
