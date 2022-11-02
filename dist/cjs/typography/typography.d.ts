import React, { CSSProperties, ExoticComponent, HTMLAttributes, ReactElement } from 'react';
import { TypographyVariants } from './typography_styles';
import { PaletteColors } from '../styles/palette';
interface ComponentProps {
    containerRef?: any;
    className?: string;
    color?: PaletteColors;
    component?: string | ExoticComponent | ((...params: any[]) => ReactElement);
    variant?: TypographyVariants;
    style?: CSSProperties;
    classes?: {
        container?: string;
    };
    customClasses?: {
        container?: string;
    };
}
export declare type TypographyProps = ComponentProps & HTMLAttributes<any>;
export declare const Typography: React.FC<ComponentProps & HTMLAttributes<any>>;
export {};
