import React, { forwardRef, useCallback, useMemo, useState } from 'react';

import cn from 'classnames';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Measure from 'react-measure';

import { animated, useSpring } from 'react-spring';

import { getComponentColor, getHexFromTheme } from '../styles/utils/styles_utils';

import { styles } from './slider_styles';

const useStyles = makeStyles(styles);

export const Slider = ({
    color = 'primary',
    disabled,
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
    const { translation, ...otherRailThumbSpringProps } = useSpring({
        translation: containerWidth * (((value - min) * 100) / (max - min) / 100),
        color: getComponentColor(true, hexColor, disabled),
    });

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
                        <animated.div
                            className={classes.rail}
                            style={{
                                transform: translation.to(
                                    (translationValue) => `translate3d(${-containerWidth + translationValue}px, 0, 0)`
                                ),
                                ...otherRailThumbSpringProps,
                            }}
                        />
                    </div>
                    <Thumb
                        {...{ thumbChildren, classes }}
                        ref={thumbReference}
                        style={{
                            transform: translation.to((translationValue) => `translate3d(${translationValue}px, 0, 0)`),
                            ...otherRailThumbSpringProps,
                        }}
                        {...thumbProps}
                    />
                    <input className={classes.input} type="range" {...{ value, min, max, step }} {...other} />
                </div>
            )}
        </Measure>
    );
};

const Thumb = forwardRef(({ style, thumbChildren, classes, ...other }, ref) => (
    <animated.div className={classes.thumb} {...other} {...{ style }}>
        <div className={classes.thumbChildrenContainer} {...{ ref }}>
            {thumbChildren}
        </div>
    </animated.div>
));
