import React, { ButtonHTMLAttributes, forwardRef, useCallback, useMemo, useState } from 'react';

import cn from 'classnames';
import { Typography } from '../typography/typography';

import { PaletteColors } from '../styles';

import { baseStyles, ButtonVariants, sizeStyles, typographySizeStyles } from './button_styles';
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
            classes = {
                container: '',
                typography: '',
            },
            children,
            style: propsStyle,
            type,
            ...other
        },
        ref
    ) => {
        const [isHovered, setIsHovered] = useState<boolean>(false);

        const handleMouseEnter = () => {
            setIsHovered(true);
        };

        const handleMouseLeave = () => {
            setIsHovered(false);
        };
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
            (...parameters) => {
                if (disabled) {
                    return;
                }
                if (typeof onClick === 'function') {
                    onClick(...parameters);
                }
            },
            [onClick, disabled]
        );

        const buttonStyle = useMemo(() => {
            const disabledColor = disabled && ((color && palette?.[color]?.[100]) ?? palette?.['dark']?.[100]);
            const paletteColor = color ? palette?.[color] : palette?.indigo;
            switch (variant) {
                case 'text':
                    return {
                        color: disabledColor ?? isHovered ? paletteColor[800] : paletteColor[600],
                        outlineColor: disabledColor ?? paletteColor[300],
                    };
                case 'outlined':
                    return {
                        color: disabledColor ?? isHovered ? paletteColor[800] : paletteColor[600],
                        outlineColor: disabledColor ?? paletteColor[300],
                        backgroundColor:
                            isHovered && !disabledColor ? paletteColor[100] ?? palette?.indigo[100] : 'transparent',
                    };
                case 'raised':
                case 'contained':
                    return {
                        color: disabledColor ?? paletteColor[500],
                        backgroundColor: disabledColor ?? isHovered ? paletteColor[400] : paletteColor[500],
                        outlineColor:
                            color && ['primary', 'secondary', 'tertiary', 'danger', 'safe'].includes(color)
                                ? paletteColor[200]
                                : paletteColor[300],
                    };
                case 'soft':
                    return {
                        color: disabledColor ?? paletteColor[50],
                        backgroundColor: disabledColor ?? isHovered ? paletteColor[100] : paletteColor[50],
                        outlineColor: paletteColor[300],
                    };
            }
        }, [color, variant, disabled, isHovered]);
        const textStyle = useMemo(() => {
            const disabledColor = disabled && ((color && palette?.[color]?.[100]) ?? palette?.['dark']?.[100]);
            const paletteColor = color ? palette?.[color] : palette?.indigo;
            switch (variant) {
                case 'soft': {
                    return color === 'light'
                        ? {
                              color: disabledColor ?? palette?.['primary'][600],
                          }
                        : {
                              color: disabledColor ?? isHovered ? paletteColor[800] : paletteColor[600],
                          };
                }
                case 'text':
                case 'outlined': {
                    return {
                        color: disabledColor ?? isHovered ? paletteColor[800] : paletteColor[600],
                    };
                }
                case 'raised':
                case 'contained':
                default: {
                    return color === 'light'
                        ? {
                              color:
                                  disabledColor ?? isHovered
                                      ? palette?.['primary']?.[600]
                                      : palette?.['primary']?.[500],
                          }
                        : {
                              color: disabledColor ?? palette?.['light']?.[500],
                          };
                }
            }
        }, [variant, color, disabled, isHovered]);
        const variantStaticClasses = `${variant === 'outlined' && 'ds-border-current ds-border ds-border-solid'} ${
            variant === 'soft' && 'ds-shadow-sm'
        } ${variant === 'contained' || variant === 'raised' ? 'ds-outline-4' : 'ds-outline-2'}`;

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
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={cn(
                    baseStyles.container,
                    (size && sizeStyles[size]) || sizeStyles.regular,
                    disabled && baseStyles.disabled,
                    !disabled && shadow,
                    variantStaticClasses,
                    className,
                    classes?.container
                )}
                style={{
                    ...buttonStyle,
                    ...propsStyle,
                    // ...(withColor && { }),
                    ...(containerProps && containerProps.style),
                }}
                onClick={handleClick}
                {...other}
            >
                <Typography
                    className={cn(baseStyles.typography, size && typographySizeStyles[size], classes?.typography)}
                    variant="button"
                    style={{ ...textStyle }}
                    ref={ref}
                    color={textColor}
                >
                    {children}
                </Typography>
            </Component>
        );
    }
);
