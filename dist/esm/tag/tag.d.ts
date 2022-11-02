import React from 'react';
import { PaletteColors } from '../styles';
interface Props {
    component?: string | React.ElementType;
    containerRef?: any;
    className?: string;
    color?: PaletteColors;
    style?: any;
    classes?: {
        container?: string;
        typography?: string;
    };
    onClick?: (e: any) => void;
    onDelete?: (e: any) => void;
    size?: 'small' | 'xs' | 'regular';
}
export declare const Tag: React.FC<Props>;
export {};
