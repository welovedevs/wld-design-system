import React, { forwardRef, useCallback, useMemo, useState } from 'react';

import cn from 'classnames';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Measure from 'react-measure';

import {motion} from 'framer-motion';

import { getComponentColor, getHexFromTheme } from '../styles';

import { styles } from './slider_styles';

const useStyles = makeStyles(styles);

export const Slider = ({
    color = 'primary',
    disabled = false,
    value = 0,
    min = 0,
    max = 100,
    step = 1,
    thumbChildren = null,
    thumbReference = null,
    thumbProps = {},
    classes: propsClasses = {},
    ...other
}) => {
    const theme = useTheme();
    const classes = useStyles();
    const hexColor = useMemo(() => getHexFromTheme(theme, color), [theme, color]);

    const [containerWidth, setContainerWidth] = useState(0);

    const handleMeasureChange = useCallback(
        ({ bounds: { width } }) => {
            if (width !== containerWidth) {
                setContainerWidth(width);
            }
        },
        [containerWidth]
    );

    return (
        <Measure bounds onResize={handleMeasureChange}>
            {({ measureRef }) => (
                <div
                    ref={measureRef}
                    className={cn(classes.container, disabled && classes.disabled, propsClasses.container)}
                >
                    <div className={classes.track}>
                        <motion.div
                            className={classes.rail}
                            animate={{
                                x: containerWidth * (((value - min) * 100) / (max - min) / 100),
                                color: getComponentColor(true, hexColor, disabled),
                            }}
                        />
                    </div>
                    <Thumb
                        {...{ thumbChildren, classes }}
                        ref={thumbReference}
                        animate={{
                            x: containerWidth * (((value - min) * 100) / (max - min) / 100),
                            color: getComponentColor(true, hexColor, disabled),
                        }}
                        {...thumbProps}
                    />
                    <input className={classes.input} type="range" {...{ value, min, max, step }} {...other} />
                </div>
            )}
        </Measure>
    );
};

const Thumb = forwardRef(({ animate, thumbChildren, classes, ...other }, ref) => (
    <motion.div className={classes.thumb} {...other} {...{ animate }}>
        <div className={classes.thumbChildrenContainer} {...{ ref }}>
            {thumbChildren}
        </div>
    </motion.div>
));
