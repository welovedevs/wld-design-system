import React, { DOMAttributes, useCallback } from 'react';

import cn from 'classnames';
import get from 'lodash/get';

import { PaletteColors } from '../styles';

import { baseStyles, sizeStyles, thumbPositionStyles } from './switch_styles';
import { palette } from '../index';

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
    classes?: { container?: string };
}
export const Switch: React.FC<Props & DOMAttributes<any>> = ({
    containerRef,
    checked = false,
    disabled,
    color,
    className,
    inputClassName,
    containerProps,
    onChange,
    size = 'regular',
    classes = {},

    ...other
}) => {
    const hexColor = disabled ? palette?.dark[50] : (color && palette[color]?.[500]) || palette?.dark[100];

    const containerStyleProps = {
        color: hexColor,
    };
    const handleChange = useCallback(
        (...parameters) => {
            if (disabled) {
                return;
            }
            if (typeof onChange === 'function') {
                onChange(...parameters);
            }
        },
        [disabled, onChange]
    );

    return (
        <div
            ref={containerRef}
            className={cn(
                className,
                baseStyles.container,
                disabled && baseStyles.disabled,
                size && sizeStyles[`size_${size}`]
            )}
            style={{
                ...containerStyleProps,
                ...get(containerProps, 'style'),
            }}
            {...containerProps}
        >
            <div
                className={`${baseStyles.thumbContainer} ${
                    checked ? thumbPositionStyles[size].right : thumbPositionStyles[size].left
                }`}
            >
                <div className={cn(baseStyles.thumb, size && sizeStyles[`thumb_size_${size}`])} />
            </div>
            <input
                className={cn(baseStyles.input, inputClassName, disabled && baseStyles.disabled)}
                type="checkbox"
                onChange={handleChange}
                {...{ checked }}
                {...other}
            />
        </div>
    );
};
