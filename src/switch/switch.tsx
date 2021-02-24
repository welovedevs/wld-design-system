import React, { DOMAttributes, useCallback, useMemo, useState } from 'react';

import cn from 'classnames';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { motion } from 'framer-motion';
import get from 'lodash/get';
import Measure from 'react-measure';

import { getComponentColor, getHexFromTheme, PaletteColors } from '../styles';

import { Classes, styles } from './switch_styles';
import merge from 'lodash/merge';

const useStyles = makeStyles(styles);

const DEFAULT_BRIGHT_LAYER_PROPS = {
    opacity: 0,
};

interface Props {
    containerRef?: any;
    checked: boolean;
    disabled?: boolean;
    color?: PaletteColors;
    className?: string;
    inputClassName?: string;
    containerProps?: any;
    onChange?: (...params: any[]) => void;
    onFocus?: (...params: any[]) => void;
    onBlur?: (...params: any[]) => void;
    onMouseEnter?: (...params: any[]) => void;
    onMouseLeave?: (...params: any[]) => void;
    size?: 'small';
    classes?: Classes;
    customClasses?: Classes;
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
    customClasses: oldCustomClasses = {},
    classes: receivedClasses = {},

    ...other
}) => {
    const theme = useTheme();
    const mergedClasses = useMemo(() => merge({}, oldCustomClasses, receivedClasses), [
        JSON.stringify(oldCustomClasses),
        JSON.stringify(receivedClasses),
    ]);
    const classes = useStyles({ classes: mergedClasses });const hexColor = useMemo(() => getHexFromTheme(theme, color), [theme, color]);

    const [brightLayerProps, setBrightLayergProps] = useState(DEFAULT_BRIGHT_LAYER_PROPS);
    const containerStyleProps = {
        color: getComponentColor(true, hexColor, disabled, getHexFromTheme(theme, 'dark', 50)),
    };
    const [thumbWidth, setThumbWidth] = useState(null);

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
            setBrightLayergProps({
                opacity: 0.3,
            }),
        []
    );

    const dismissBrightLayer = useCallback(() => setBrightLayergProps(DEFAULT_BRIGHT_LAYER_PROPS), []);

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
    const isChecked = checked ? 0 : -100

    return (
        <motion.div
            ref={containerRef}
            className={cn(
                className,
                classes.container,
                disabled && classes.disabled,
                sizeClasses && classes[sizeClasses]
            )}
            style={{
                ...get(containerProps, 'style'),
                ...containerStyleProps,
            }}
            {...containerProps}
        >
            <motion.div
                className={classes.thumbContainer}
                animate={{
                    x: `calc(${isChecked}% + ${thumbWidth}px)`,
                    width: `calc(100% - ${thumbWidth}px)`,
                }}
                transition={{type: "tween"}}
            >
                <Measure bounds onResize={handleThumbResize}>
                    {({ measureRef }) => (
                        <span ref={measureRef}>
                            <div className={classes.thumb} />
                        </span>
                    )}
                </Measure>
            </motion.div>
            <motion.div className={classes.brightLayer} animate={brightLayerProps}/>
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
        </motion.div>
    );
};
