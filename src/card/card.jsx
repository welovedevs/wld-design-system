import React from 'react';

import cn from 'classnames';
import { createUseStyles } from 'react-jss';
import { animated, config, useSpring } from 'react-spring';

import { ELEVATION_SPRING_PROPS } from './card_elevation_spring_props';

import { styles } from './card_styles';

const useStyles = createUseStyles(styles);

const CardComponent = ({ component: Component = animated.div, className, containerRef, elevation = 1, style, customClasses = {}, ...other }) => {
    const classes = useStyles();
        const springProps = useSpring({
        ...ELEVATION_SPRING_PROPS[elevation],
        config: config.default
    });
    return (
        <Component
            ref={containerRef}
            className={cn(classes.container, className, customClasses.container)}
            style={{
                ...springProps,
                ...style
            }}
            {...other}
        />
    );
};

export const Card = CardComponent;
