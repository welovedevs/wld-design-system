import React from 'react';
import { PaletteColors } from '../styles';
interface Props {
    classes?: {
        container?: string;
        bar?: string;
    };
    className?: string;
    value?: number;
    color?: PaletteColors;
}
export declare const ProgressBar: React.FC<Props>;
export {};
