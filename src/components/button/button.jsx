import React, { useCallback } from 'react';

import cn from 'classnames';
import injectSheet from 'react-jss';
import { animated, config, useSpring } from 'react-spring';

import { Typography } from '../typography/typography';

import { getComponentColor } from '../../styles/utils/styles_utils';
import palette from '../../styles/palettes';

import styles from './button_styles';

const DEFAULT_BRIGHT_LAYER_SPRING_PROPS = {
    opacity: 0,
    config: config.stiff
};

const ButtonComponent = ({
    className,
    containerRef,
    disabled,
    size,
    color = 'default',
    containerProps,
    typographyClassName,
    variant,
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur,
    onClick,
    children,
    customClasses = {},
    classes,
    ...other
}) => {
    const withColor = disabled || (color && color !== 'default' && palette[color]);
    const [brightLayerSpringProps, setBrightLayerSpringProps] = useSpring(() => DEFAULT_BRIGHT_LAYER_SPRING_PROPS);
    const colorSpring = useSpring({
        color: getComponentColor(true, color, disabled),
        config: config.stiff
    });
    const showBrightLayer = useCallback(() =>
        setBrightLayerSpringProps(() => ({
            opacity: variant !== 'contained' ? 0.1 : 0.2
        })));

    const dismissBrightLayer = useCallback(() => setBrightLayerSpringProps(() => DEFAULT_BRIGHT_LAYER_SPRING_PROPS));

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
    return (
        <animated.button
            ref={containerRef}
            className={cn(
                className,
                classes.container,
                disabled && classes.disabled,
                withColor && classes.withColor,
                classes[variant],
                classes[`size_${size}`],
                customClasses.container
            )}
            {...containerProps}
            style={{
                ...(withColor && colorSpring),
                ...(containerProps && containerProps.style)
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onClick={handleClick}
            {...other}
        >
            <animated.div className={classes.brightLayer} style={brightLayerSpringProps} />
            <Typography
                className={cn(classes.typography, typographyClassName, customClasses.typography)}
                variant="button"
            >
                {children}
            </Typography>
        </animated.button>
    );
};

const ContainedButton = props => {
    const { color, disabled, style } = props;
    const springProps = useSpring({
        boxShadow: `0 ${color ? 5 : 10}px ${color ? 15 : 20}px 0 ${getComponentColor(
            Boolean(color),
            color,
            disabled,
            200,
            '#d6d6d6'
        )}`,
        config: config.stiff
    });
    return (
        <ButtonComponent
            {...props}
            {...(!disabled && {
                containerProps: {
                    style: springProps,
                    ...style
                }
            })}
        />
    );
};

const WithVariantButton = ({ variant = 'text', ...props }) => {
    if (variant === 'contained') {
        return <ContainedButton {...{ variant }} {...props} />;
    }
    return <ButtonComponent {...{ variant }} {...props} />;
};

export const Button = injectSheet(styles)(WithVariantButton);
