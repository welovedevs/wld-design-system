import React, {ButtonHTMLAttributes, forwardRef, ReactHTML, useCallback, useMemo, useState} from 'react';

import cn from 'classnames';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { motion } from 'framer-motion'
import { Typography } from '../typography/typography';

import { getComponentColor, getHexFromTheme, PaletteColors } from '../styles';

import { ButtonVariants, Classes, styles } from './button_styles';
import merge from 'lodash/merge';

const useStyles = makeStyles(styles);

interface CustomProps {
    component?: string;
    className?: string;
    containerRef?: any;
    disabled?: boolean;
    size?: 'small';
    color?: PaletteColors | 'default';
    containerProps?: any;
    typographyClassName?: any;
    variant?: ButtonVariants;
    onMouseEnter?: any;
    onMouseLeave?: any;
    onFocus?: any;
    onBlur?: any;
    onClick?: any;
    customClasses?: Classes;
    classes?: Classes;
    style?: any;
}

export type ButtonProps = CustomProps & ButtonHTMLAttributes<HTMLButtonElement>;
const ButtonComponent: React.FC<ButtonProps> = ({
                                                    component: Component = motion.button,
                                                    className,
                                                    containerRef,
                                                    disabled,
                                                    size,
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
                                                    children,
                                                    customClasses: oldCustomClasses = {},
                                                    classes: receivedClasses = {},
                                                    style: propsStyle,
                                                    ...other
                                                }) => {
    const theme = useTheme();
    const mergedClasses = useMemo(() => merge({}, oldCustomClasses, receivedClasses), [
        JSON.stringify(oldCustomClasses),
        JSON.stringify(receivedClasses),
    ]);
    const classes = useStyles({ classes: mergedClasses });const hexColor = useMemo(() => getHexFromTheme(theme, color), [theme, color]);
    const withColor = useMemo(() => disabled || (color && color !== 'default' && hexColor), [disabled, hexColor]);
    const colorMotion = {color: getComponentColor(true, hexColor, disabled)};

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
    const classesSizes: any = size && `size_${size}`;
    return (
        <Component
            ref={containerRef}
            className={cn(
                className,
                classes.container,
                disabled && classes.disabled,
                withColor && classes.withColor,
                variant && classes[variant],
                // @ts-ignore
                classesSizes && classes[classesSizes],
                oldCustomClasses.container
            )}
            {...containerProps}
            style={{
                ...propsStyle,
                ...(withColor && colorMotion),
                ...(containerProps && containerProps.style),
            }}
            onClick={handleClick}
            {...other}
        >
            <motion.div className={classes.brightLayer}   initial={{opacity: 0}} whileHover={{opacity: variant !== 'contained' ? 0.1 : 0.2}}/>
            <Typography className={cn(classes.typography, oldCustomClasses.typography)} variant="button">
                {children}
            </Typography>
        </Component>
    );
};

const RaisedButton: React.FC<ButtonProps> = (props) => {
    const theme = useTheme();
    const { disabled ,color} = props;
    const motionProps = {
        boxShadow: `0 ${color ? 5 : 10}px ${color ? 15 : 20}px 0 ${getComponentColor(
            Boolean(color),
            getHexFromTheme(theme, color, 200),
            disabled
        )}`,
    };
    return <ButtonComponent {...props} {...(!disabled && { style: motionProps })} />;
};

export const Button: React.FC<ButtonProps> = (props, containerRef) => {
    const { variant = 'text', ...other } = props;
    if (variant === 'raised') {
        return <RaisedButton {...{ variant, containerRef }} {...other} />;
    }
    return <ButtonComponent {...{ variant, containerRef }} {...other} />;
};
