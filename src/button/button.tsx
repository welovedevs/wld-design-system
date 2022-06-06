import React, { ButtonHTMLAttributes, useCallback, useMemo } from 'react';

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
    color?: PaletteColors | 'default';
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
const ButtonComponent: React.FC<ButtonProps> = ({
    component: Component = motion.button,
    className,
    containerRef,
    disabled,
    size = 'regular',
    color = 'default',
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
}) => {
    const hexColor = (color && color !== 'default' && palette?.[color]?.[500]) ?? palette?.dark[100];
    const withColor = useMemo(() => disabled || (color && color !== 'default' && hexColor), [disabled, hexColor]);
    const styles = { color: hexColor };

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
    return (
        <Component
            ref={containerRef}
            className={cn(
                className,
                baseStyles.container,
                (size && sizeStyles[size]) || sizeStyles.regular,
                disabled && baseStyles.disabled,
                variant && variantStyles[variant]
            )}
            {...containerProps}
            style={{
                ...propsStyle,
                ...(withColor && styles),
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
                    size && typographysizeStyles[size]
                )}
                variant="button"
            >
                {children}
            </Typography>
        </Component>
    );
};

const RaisedButton: React.FC<ButtonProps> = (props) => {
    const { disabled, color: paletteColor } = props;
    const color = disabled ? palette['dark'][100] : paletteColor && paletteColor !=='default' && palette?.[paletteColor]?.[500];
    const motionProps = {
        boxShadow: `0 ${color ? 5 : 10}px ${color ? 15 : 20}px 0 ${color}`,
    };
    return <ButtonComponent {...props} {...(!disabled && { animate: motionProps })} />;
};

export const Button: React.FC<ButtonProps> = (props, containerRef) => {
    const { variant = 'text', ...other } = props;
    if (variant === 'raised') {
        return <RaisedButton {...{ variant, containerRef }} {...other} />;
    }
    return <ButtonComponent {...{ variant, containerRef }} {...other} />;
};
