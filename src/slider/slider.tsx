import React from 'react';
import MuiSlider, { SliderProps } from '@mui/material/Slider';

import { PaletteColors } from '../styles';

import { palette } from '../index';

export const Slider: React.FC<
    { color: PaletteColors; classes?: { container?: string }; popperCardProps?: any } & Omit<SliderProps, 'color'>
> = ({
    color = 'primary',
    value = 0,
    min = 0,
    max = 100,
    step = 1,
    classes = {},
    valueLabelDisplay = 'auto',
    popperCardProps,
    ...other
}) => {
    return (
        <MuiSlider
            min={min ?? 0}
            max={max ?? 100}
            step={step ?? 1}
            value={value ?? 50}
            classes={{
                root: `ds-h-[3px] ${classes?.container ?? 3}`,
                thumb: 'ds-w-2 ds-h-2 !ds-shadow-none',
                valueLabel:
                    'ds-bg-light-500 ds-rounded-sm ds-text-dark-500 ds-font-w3d ds-shadow-lg ds-border ds-border-solid ds-border-dark-50',
            }}
            style={{
                color: !other.disabled && palette?.[color]?.[500],
            }}
            valueLabelDisplay={valueLabelDisplay ?? 'auto'}
            {...other}
        />
    );
};
