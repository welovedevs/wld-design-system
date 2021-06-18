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

export const getHexFromTheme = (
    inputTheme: Theme,
    color: PaletteColors | 'default' = 'primary',
    shade: PaletteShade = 500
) => {
    // @ts-ignore
    const themeShadedColor = inputTheme?.palette?.[color]?.[shade];
    if (!themeShadedColor) {
        // @ts-ignore
        return DEFAULT_THEME.palette[color]?.[shade];
    }
    return themeShadedColor;
};
export const getComponentColor = (
    active: boolean,
    color: string | null,
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
