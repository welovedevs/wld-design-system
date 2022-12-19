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
const ButtonComponent: React.FC<ButtonProps> = forwardRef(
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
            variant,
            onMouseEnter,
            onMouseLeave,
            onFocus,
            onBlur,
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

        const handleClick = useCallback(
            (...paramaters) => {
                if (disabled) {
                    return;
                }
                if (typeof onClick === 'function') {
                    onClick(...paramaters);
                }
            },
            [onClick, disabled]
        );

        let textColor = useMemo(() => {
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

const RaisedButton: React.FC<ButtonProps> = forwardRef((props, ref) => {
    const { disabled, color: propsColor } = props;

    const color = useMemo(() => {
        if (disabled) {
            return (propsColor && palette?.[propsColor]?.[100]) ?? palette?.['dark']?.[100];
        }
        const paletteColor = propsColor && palette?.[propsColor]?.[500];
        return paletteColor || palette?.dark[200];
    }, [disabled, propsColor]);

    const shadow = useMemo(() => {
        return color ? 'ds-shadow-[0_5px_15px_0]' : 'ds-shadow-[0_10px_20px_0]';
    }, [color]);
    return <ButtonComponent {...props} {...{ ref }} className={`${!disabled && shadow}`} />;
});

export const Button: React.FC<ButtonProps> = forwardRef((props, ref) => {
    const { variant = 'text', ...other } = props;
    if (variant === 'raised') {
        return <RaisedButton {...{ variant, ref }} {...other} />;
    }
    return <ButtonComponent {...{ variant, ref }} {...other} />;
});
