import React, { useCallback, useState } from 'react';

import cn from 'classnames';
import injectSheet from 'react-jss';
import { animated, config, useSpring } from 'react-spring';
import get from 'lodash/get';
import Measure from 'react-measure';

import { getComponentColor } from '../styles/utils/styles_utils';
import { dark } from '../styles/palettes';

import styles from './switch_styles';

const DEFAULT_BRIGHT_LAYER_SPRING_PROPS = {
    opacity: 0,
    config: config.stiff
};

const SwitchComponent = ({
                             classes,
                             containerRef,
                             checked = false,
                             disabled,
                             color,
                             className,
                             inputClassName,
                             containerProps,
                             onChange,
                             onFocus,
                             onBlur,
                             onMouseEnter,
                             onMouseLeave,
                             size,
                             customClasses = {},
                             ...other
                         }) => {
    const [brightLayerSpringProps, setBrightLayerSpringProps] = useSpring(() => DEFAULT_BRIGHT_LAYER_SPRING_PROPS);
    const containerSpringProps = useSpring({
        color: getComponentColor(true, color, disabled, 500, dark[50])
    });
    const [thumbWidth, setThumbWidth] = useState(null);
    const thumbContainerSpringProps = useSpring({
        translation: checked ? 0 : -100
    });

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
    const showBrightLayer = useCallback(() =>
        setBrightLayerSpringProps(() => ({
            opacity: 0.3
        })), []);

    const dismissBrightLayer = useCallback(() => setBrightLayerSpringProps(() => DEFAULT_BRIGHT_LAYER_SPRING_PROPS), []);

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

    const handleThumbResize = useCallback(
        ({ bounds: { width } }) => {
            if (width !== thumbWidth) {
                setThumbWidth(width);
            }
        },
        [thumbWidth]
    );

    return (
        <animated.div
            ref={containerRef}
            className={cn(
                className,
                customClasses.container,
                classes.container,
                disabled && classes.disabled,
                classes[`size_${size}`]
            )}
            style={{
                ...get(containerProps, 'style'),
                ...containerSpringProps
            }}
            {...containerProps}
        >
            <animated.div
                className={classes.thumbContainer}
                style={{
                    transform: thumbContainerSpringProps.translation.interpolate(
                        value => `translate3d(calc(${value}% + ${thumbWidth}px), 0, 0)`
                    ),
                    width: `calc(100% - ${thumbWidth}px)`
                }}
            >
                <Measure bounds onResize={handleThumbResize}>
                    {({ measureRef }) => (
                        <span ref={measureRef}>
                            <div className={classes.thumb} />
                        </span>
                    )}
                </Measure>
            </animated.div>
            <animated.div className={classes.brightLayer} style={brightLayerSpringProps} />
            <input
                className={cn(classes.input, inputClassName)}
                type="checkbox"
                onChange={handleChange}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onFocus={handleFocus}
                onBlur={handleBlur}
                {...{ checked }}
                {...other}
            />
        </animated.div>
    );
};

export const Switch = injectSheet(styles)(SwitchComponent);
