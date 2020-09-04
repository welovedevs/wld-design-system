import React, { DOMAttributes, useCallback, useMemo, useState } from 'react';

import cn from 'classnames';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { animated, config, useSpring } from 'react-spring';
import get from 'lodash/get';
import Measure from 'react-measure';

import { getComponentColor, getHexFromTheme } from '../styles/utils/styles_utils';
import { dark, PaletteColors } from '../styles/palette';

import { Classes, styles } from './switch_styles';

const useStyles = makeStyles(styles);

const DEFAULT_BRIGHT_LAYER_SPRING_PROPS = {
    opacity: 0,
    config: config.stiff,
};

interface Props {
    containerRef: any;
    checked: boolean;
    disabled?: boolean;
    color?: PaletteColors;
    className?: string;
    inputClassName?: string;
    containerProps: any;
    onChange?: (...params: any[]) => void;
    onFocus?: (...params: any[]) => void;
    onBlur?: (...params: any[]) => void;
    onMouseEnter?: (...params: any[]) => void;
    onMouseLeave?: (...params: any[]) => void;
    size?: 'small';
    classes?: Classes;
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
    onFocus,
    onBlur,
    onMouseEnter,
    onMouseLeave,
    size,
    classes: customClasses = {},
    ...other
}) => {
    const theme = useTheme();
    const classes = useStyles({ classes: customClasses });
    const hexColor = useMemo(() => getHexFromTheme(theme, color), [theme, color]);

    const [brightLayerSpringProps, setBrightLayerSpringProps] = useSpring(() => DEFAULT_BRIGHT_LAYER_SPRING_PROPS);
    const containerSpringProps = useSpring({
        color: getComponentColor(true, hexColor, disabled, getHexFromTheme(theme, 'dark', 50)),
    });
    const [thumbWidth, setThumbWidth] = useState(null);
    const thumbContainerSpringProps = useSpring({
        translation: checked ? 0 : -100,
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
    const showBrightLayer = useCallback(
        () =>
            setBrightLayerSpringProps({
                opacity: 0.3,
            }),
        []
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

    const handleThumbResize = useCallback(
        ({ bounds: { width } }) => {
            if (width !== thumbWidth) {
                setThumbWidth(width);
            }
        },
        [thumbWidth]
    );

    const sizeClasses: 'size_small' | undefined = size && (`size_${size}` as 'size_small');

    return (
        <animated.div
            ref={containerRef}
            className={cn(
                className,
                customClasses.container,
                classes.container,
                disabled && classes.disabled,
                sizeClasses && classes[sizeClasses]
            )}
            style={{
                ...get(containerProps, 'style'),
                ...containerSpringProps,
            }}
            {...containerProps}
        >
            <animated.div
                className={classes.thumbContainer}
                style={{
                    transform: thumbContainerSpringProps.translation.to(
                        (value) => `translate3d(calc(${value}% + ${thumbWidth}px), 0, 0)`
                    ),
                    width: `calc(100% - ${thumbWidth}px)`,
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
            <animated.div className={classes.brightLayer} style={brightLayerSpringProps as any} />
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
