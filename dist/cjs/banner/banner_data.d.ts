import { ElementType } from 'react';
import { PaletteColors } from '../styles/palette';
export declare type BannerType = 'warning' | 'error' | 'success' | 'info' | 'default';
export declare const BANNER_DATA: {
    [key in BannerType]: {
        color: PaletteColors;
        icon?: ElementType | null;
    };
};
