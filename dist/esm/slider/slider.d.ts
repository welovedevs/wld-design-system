import React from 'react';
import { SliderProps } from '@mui/material/Slider';
import { PaletteColors } from '../styles';
export declare const Slider: React.FC<{
    color: PaletteColors;
    classes?: {
        container?: string;
    };
    popperCardProps?: any;
} & Omit<SliderProps, 'color'>>;
