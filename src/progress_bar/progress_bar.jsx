import React, {useMemo} from 'react';

import cn from 'classnames';
import {createUseStyles, useTheme} from 'react-jss';
import {animated, useSpring} from 'react-spring';

import {getComponentColor, getHexFromTheme} from '../styles';

import styles from './progress_bar_styles';

const useStyles = createUseStyles(styles);

export const ProgressBar = ({
    value: progressValue = 0,
    color = 'primary',
    className,
    barClassName,
    customClasses = {}
}) => {
    const classes = useStyles();
    const theme = useTheme();
    const hexColor = useMemo(() => getHexFromTheme(theme, color), [theme, color]);

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
                    color: getComponentColor(true, hexColor, false),
                    transform: translation.interpolate(value => `translate3d(${value}%, 0, 0)`)
                }}
            />
        </div>
    );
};
