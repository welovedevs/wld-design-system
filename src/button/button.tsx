import React, { ButtonHTMLAttributes, forwardRef, ReactHTML, useCallback, useMemo } from 'react';

import cn from 'classnames';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { animated, config, useSpring } from 'react-spring';

import { Typography } from '../typography/typography';

import { getComponentColor } from '../styles/utils/styles_utils';

import { getHexFromTheme } from '../styles';
import { ButtonVariants, Classes, styles } from './button_styles';
import { PaletteColors } from '../styles/palette';
import merge from 'lodash/merge';

const useStyles = makeStyles(styles);

const DEFAULT_BRIGHT_LAYER_SPRING_PROPS = {
    opacity: 0,
    config: config.stiff,
};

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

type SpringType = { opacity?: number; config?: typeof config.stiff };
export type ButtonProps = CustomProps & ButtonHTMLAttributes<HTMLButtonElement>;
const ButtonComponent: React.FC<ButtonProps> = ({
    component: Component = animated.button,
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
    const [brightLayerSpringProps, setBrightLayerSpringProps] = useSpring(() => DEFAULT_BRIGHT_LAYER_SPRING_PROPS);
    const colorSpring = useSpring({
        color: getComponentColor(true, hexColor, disabled),
        config: config.stiff,
    });
    const showBrightLayer = useCallback(
        () =>
            setBrightLayerSpringProps({
                opacity: variant !== 'contained' ? 0.1 : 0.2,
            }),
        [variant]
    );

    const dismissBrightLayer = useCallback(() => setBrightLayerSpringProps(DEFAULT_BRIGHT_LAYER_SPRING_PROPS), []);

    const handleMouseEnter = useCallback(
        (...parameters) => {
            if (typeof onMouseEnter === 'function') {
                onMouseEnter(...parameters);
            }
            showBrightLayer();
        },
        [onMouseEnter]
    );

    const handleMouseLeave = useCallback(
        (...parameters) => {
            if (typeof onMouseLeave === 'function') {
                onMouseLeave(...parameters);
            }
            dismissBrightLayer();
        },
        [onMouseLeave]
    );

    const handleFocus = useCallback(
        (...parameters) => {
            if (typeof onFocus === 'function') {
                onFocus(...parameters);
            }
            showBrightLayer();
        },
        [onFocus]
    );

    const handleBlur = useCallback(
        (...parameters) => {
            if (typeof onBlur === 'function') {
                onBlur(...parameters);
            }
            dismissBrightLayer();
        },
        [onBlur]
    );

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
                ...(withColor && colorSpring),
                ...(containerProps && containerProps.style),
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onClick={handleClick}
            {...other}
        >
            <animated.div className={classes.brightLayer} style={brightLayerSpringProps as any} />
            <Typography className={cn(classes.typography, oldCustomClasses.typography)} variant="button">
                {children}
            </Typography>
        </Component>
    );
};

const ContainedButton: React.FC<ButtonProps> = (props) => {
    const theme = useTheme();
    const { color, disabled } = props;
    const springProps = useSpring({
        boxShadow: `0 ${color ? 5 : 10}px ${color ? 15 : 20}px 0 ${getComponentColor(
            Boolean(color),
            getHexFromTheme(theme, color, 200),
            disabled
        )}`,
        config: config.stiff,
    });
    return <ButtonComponent {...props} {...(!disabled && { style: springProps })} />;
};

export const Button: React.FC<ButtonProps> = forwardRef((props, containerRef) => {
    const { variant = 'text', ...other } = props;
    if (variant === 'contained') {
        return <ContainedButton {...{ variant, containerRef }} {...other} />;
    }
    return <ButtonComponent {...{ variant, containerRef }} {...other} />;
});
