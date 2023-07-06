import React, { ButtonHTMLAttributes, forwardRef, useCallback, useMemo } from 'react';

import cn from 'classnames';
import { Typography } from '../typography/typography';

import { PaletteColors } from '../styles';

import {
    baseStyles,
    ButtonVariants,
    layerVariantStyles,
    sizeStyles,
    textVariantStyles,
    typographysizeStyles,
    variantStyles,
} from './button_styles';
import { palette } from '../index';

interface CustomProps {
    component?: string;
    className?: string;
    containerRef?: any;
    disabled?: boolean;
    size?: 'small' | 'xs' | 'regular';
    color?: PaletteColors;
    containerProps?: any;
    typographyClassName?: any;
    variant?: ButtonVariants;
    onMouseEnter?: any;
    onMouseLeave?: any;
    onFocus?: any;
    onBlur?: any;
    onClick?: any;
    classes?: { container?: string; typography?: string };
    style?: any;
}

export type ButtonProps = CustomProps & ButtonHTMLAttributes<HTMLButtonElement>;
export const Button = forwardRef<unknown, ButtonProps>(
    (
        {
            component: Component = 'button',
            className,
            containerRef,
            disabled,
            size = 'regular',
            color,
            containerProps,
            // @deprecated please use classes.typography
            typographyClassName,
            variant = 'text',
            onClick,
            classes = {},
            children,
            style: propsStyle,
            type,
            ...other
        },
        ref
    ) => {
        const hexColor = useMemo(() => {
            if (disabled) {
                return (color && palette?.[color]?.[100]) ?? palette?.['dark']?.[100];
            }
            const paletteColor = color && palette?.[color]?.[500];
            return paletteColor || palette?.primary[300];
        }, [disabled, color]);

        const shadow = useMemo(() => {
            if (variant === 'raised') {
                return hexColor ? 'ds-shadow-[0_5px_15px_0]' : 'ds-shadow-[0_10px_20px_0]';
            }
            return null;
        }, [hexColor]);

        const handleClick = useCallback(
            (...paramaters: any[]) => {
                if (disabled) {
                    return;
                }
                if (typeof onClick === 'function') {
                    onClick(...paramaters);
                }
            },
            [onClick, disabled]
        );

        const textColor: PaletteColors | undefined = useMemo(() => {
            if (variant === 'raised' || variant === 'contained') {
                if (color === 'light') {
                    return 'primary';
                }
                return 'light';
            }
            return color;
        }, [variant, color]);
        return (
            <Component
                ref={ref || containerRef}
                {...containerProps}
                type={type ?? 'button'}
                className={cn(
                    baseStyles.container,
                    (size && sizeStyles[size]) || sizeStyles.regular,
                    disabled && baseStyles.disabled,
                    !disabled && shadow,
                    variantStyles[variant ?? 'default'],
                    className,
                    classes?.container
                )}
                style={{
                    color: hexColor,
                    ...propsStyle,
                    // ...(withColor && { }),
                    ...(containerProps && containerProps.style),
                }}
                onClick={handleClick}
                {...other}
            >
                {!disabled && <div className={cn(baseStyles.brightLayer, variant && layerVariantStyles[variant])} />}
                <Typography
                    className={cn(
                        baseStyles.typography,
                        variant && textVariantStyles[variant],
                        size && typographysizeStyles[size],
                        classes?.typography
                    )}
                    variant="button"
                    color={textColor}
                >
                    {children}
                </Typography>
            </Component>
        );
    }
);
