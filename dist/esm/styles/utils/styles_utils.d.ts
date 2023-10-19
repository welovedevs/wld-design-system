import { PaletteColors, PaletteShade } from '../palette';
import { Theme } from '@mui/material/styles';
export declare const flexUtils: {
    center: {
        display: string;
        justifyContent: string;
        alignItems: string;
    };
};
export declare const withCustomVerticalScrollbar: (color?: string) => {
    '&::-webkit-scrollbar-track': {
        border: number;
    };
    '&::-webkit-scrollbar': {
        width: string;
    };
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: string;
    };
    scrollbarWidth: string;
    scrollbarColor: string;
};
export declare const getHexFromTheme: (inputTheme: Theme, color?: PaletteColors | 'default', shade?: PaletteShade) => any;
export declare const getComponentColor: (active: boolean, color: string | null, disabled?: boolean, defaultValue?: string) => string;
