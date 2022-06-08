import React, { ButtonHTMLAttributes, forwardRef, useCallback, useMemo } from 'react';

import cn from 'classnames';
import { motion } from 'framer-motion';
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
            component: Component = motion.button,
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
            ...other
        },
        ref
    ) => {
        const hexColor = useMemo(() => {
            if (disabled) {
                return (color && palette?.[color]?.[100]) ?? palette?.['dark']?.[100];
            }
            const paletteColor = color && palette?.[color]?.[500];
            return paletteColor || palette?.dark[200];
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

        console.log({ variant, variantStyles: variantStyles[variant ?? 'default'] });
        return (
            <Component
                ref={ref || containerRef}
                {...containerProps}
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
                    color={variant === 'raised' || variant === 'contained' ? 'light' : (color as any)}
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

    const motionProps = {
        boxShadow: `0 ${color ? 5 : 10}px ${color ? 15 : 20}px 0 ${color}`,
    };

    return <ButtonComponent {...props} {...{ ref }} {...(!disabled && { animate: motionProps })} />;
});

export const Button: React.FC<ButtonProps> = forwardRef((props, ref) => {
    const { variant = 'text', ...other } = props;
    if (variant === 'raised') {
        return <RaisedButton {...{ variant, ref }} {...other} />;
    }
    return <ButtonComponent {...{ variant, ref }} {...other} />;
});
