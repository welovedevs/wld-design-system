import React, { ReactElement } from 'react';
import { PaletteColors } from '../styles/palette';
export declare const Typography: React.ForwardRefExoticComponent<{
    containerRef?: any;
    className?: string | undefined;
    color?: PaletteColors | undefined;
    component?: string | React.ExoticComponent<{}> | ((...params: any[]) => ReactElement) | undefined;
    variant?: "wld1" | "wld2" | "wld3" | "wld4" | "wld5" | "wld6" | "wld" | "tag" | "button" | "helper" | "label" | "body1" | "body2" | "body3" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | undefined;
    style?: React.CSSProperties | undefined;
    classes?: {
        container?: string | undefined;
    } | undefined;
    customClasses?: {
        container?: string | undefined;
    } | undefined;
} & Omit<React.HTMLAttributes<any>, "color"> & React.RefAttributes<unknown>>;
export type TypographyProps = React.ComponentProps<typeof Typography>;
