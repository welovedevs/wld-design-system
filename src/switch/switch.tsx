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

interface Props {
    containerRef?: any;
    checked: boolean;
    disabled?: boolean;
    color?: PaletteColors;
    className?: string;
    inputClassName?: string;
    containerProps?: any;
    onChange?: (...params: any[]) => void;
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
    const classes = useStyles({ classes: mergedClasses });
    const hexColor = useMemo(() => getHexFromTheme(theme, color), [theme, color]);

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
            }}
            animate={{ ...containerStyleProps }}
            {...containerProps}
            initial="initial"
            whileHover="hover"
        >
            <motion.div
                className={classes.thumbContainer}
                animate={{
                    x: `calc(${checked ? 0 : -100}% + ${thumbWidth}px)`,
                    width: `calc(100% - ${thumbWidth}px)`,
                }}
                transition={{ type: 'tween' }}
            >
                <Measure bounds onResize={handleThumbResize}>
                    {({ measureRef }) => (
                        <span ref={measureRef}>
                            <div className={classes.thumb} />
                        </span>
                    )}
                </Measure>
            </motion.div>
            <motion.div
                className={classes.brightLayer}
                variants={{ initial: { opacity: 0 }, hover: { opacity: 0.3 } }}
            />
            <input
                className={cn(classes.input, inputClassName)}
                type="checkbox"
                onChange={handleChange}
                {...{ checked }}
                {...other}
            />
        </motion.div>
    );
};
