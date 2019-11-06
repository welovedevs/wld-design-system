import React, { useCallback, useState, forwardRef } from 'react';

import cn from 'classnames';
import injectSheet from 'react-jss';
import Measure from 'react-measure';

import { animated, useSpring } from 'react-spring';

import { getComponentColor } from '../../styles/utils/color_utils';

import styles from './slider_styles';

const SliderComponent = ({
    color,
    disabled,
    value = 0,
    min = 0,
    max = 100,
    thumbChildren,
    thumbReference,
    thumbProps,
    classes,
    ...other
}) => {
    const [containerWidth, setContainerWidth] = useState(0);
    const { translation, ...otherRailThumbSpringProps } = useSpring({
        translation: containerWidth * (((value - min) * 100) / (max - min) / 100),
        color: getComponentColor(true, color, disabled)
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
                <div ref={measureRef} className={cn(classes.container, disabled && classes.disabled)}>
                    <div className={classes.track}>
                        <animated.div
                            className={classes.rail}
                            style={{
                                transform: translation.to(
                                    translationValue => `translate3d(${-containerWidth + translationValue}px, 0, 0)`
                                ),
                                ...otherRailThumbSpringProps
                            }}
                        />
                    </div>
                    <Thumb
                        {...{ thumbChildren, classes }}
                        ref={thumbReference}
                        style={{
                            transform: translation.to(translationValue => `translate3d(${translationValue}px, 0, 0)`),
                            ...otherRailThumbSpringProps
                        }}
                        {...thumbProps}
                    />
                    <input className={classes.input} type="range" {...{ value, min, max }} {...other} />
                </div>
            )}
        </Measure>
    );
};

const Thumb = forwardRef(({ style, thumbChildren, classes, ...other }, ref) => (
    <animated.div className={classes.thumb} {...other} {...{ style }}>
        <div className={classes.thumbchildrenContainer} {...{ ref }}>
            {thumbChildren}
        </div>
    </animated.div>
));

export const Slider = injectSheet(styles)(SliderComponent);
