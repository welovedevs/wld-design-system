import React from 'react';

import cn from 'classnames';
import injectSheet from 'react-jss';
import { animated, useSpring } from 'react-spring';

import { getComponentColor } from '../../styles/utils/color_utils';

import styles from './progress_bar_styles';

const ProgressBarComponent = ({
    value: progressValue = 0,
    color = 'primary',
    className,
    barClassName,
    customClasses = {},
    classes
}) => {
    const { translation } = useSpring({
        from: {
            translation: -100
        },
        to: {
            translation: -100 + progressValue
        }
    });
    return (
        <div className={cn(className, classes.container, customClasses.container)}>
            <animated.div
                className={cn(classes.bar, barClassName, customClasses.bar)}
                style={{
                    color: getComponentColor(true, color, false, 300),
                    transform: translation.interpolate(value => `translate3d(${value}%, 0, 0)`)
                }}
            />
        </div>
    );
};

export const ProgressBar = injectSheet(styles)(ProgressBarComponent);
