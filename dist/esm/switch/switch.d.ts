import React, { DOMAttributes } from 'react';
import { PaletteColors } from '../styles';
interface Props {
    containerRef?: any;
    checked: boolean;
    disabled?: boolean;
    color?: PaletteColors;
    className?: string;
    inputClassName?: string;
    containerProps?: any;
    onChange?: (...params: any[]) => void;
    size?: 'small' | 'regular';
    classes?: {
        container?: string;
    };
}
export declare const Switch: React.FC<Props & DOMAttributes<any>>;
export {};
