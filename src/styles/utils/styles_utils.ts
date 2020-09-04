// Material Design's box-shadows (see: https://codepen.io/sdthornton/pen/wBZdXq)
import { PaletteColors, PaletteShade } from '../palette';
import { DEFAULT_THEME } from '../theme';
import { Theme } from '@material-ui/core';

// Flex utils
export const flexUtils = {
    center: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
};

export const getHexFromTheme = (inputTheme: Theme, color: PaletteColors |'default' = 'primary', shade: PaletteShade = 500) => {
    const theme = Object.keys(inputTheme || {}).length ? inputTheme : DEFAULT_THEME;
    // @ts-ignore
    return theme.palette?.[color]?.[shade];
};
export const getComponentColor = (
    active: boolean,
    color: PaletteColors,
    disabled?: boolean,
    defaultValue: string = '#fff'
) => {
    if (disabled) {
        return '#c0c0c0';
    }
    if (active && color) {
        return color;
    }
    return defaultValue;
};
