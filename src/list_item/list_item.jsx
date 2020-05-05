import React, { useCallback } from 'react';

import cn from 'classnames';

import injectSheet from 'react-jss';
import { animated, useSpring } from 'react-spring';

import { Typography } from '../typography/typography';

import styles from './list_item_styles';

const DEFAULT_SPRING_PROPS = Object.freeze({
    backgroundColor: 'rgba(0, 0, 0, 0)',
});

const ListItemComponent = ({
    component: Component = animated.li,
    className,
    typographyClassName,
    button,
    style,
    onMouseEnter,
    onMouseLeave,
    classes,
    children,
    ...other
}) => {
    const [springProps, setSpringProps] = useSpring(() => DEFAULT_SPRING_PROPS);
    const handleMouseEnter = useCallback(
        (...parameters) => {
            if (typeof onMouseEnter === 'function') {
                onMouseEnter(...parameters);
            }
            setSpringProps(() => ({
                backgroundColor: 'rgba(0, 0, 0, .075)',
            }));
        },
        [onMouseEnter]
    );
    const handleMouseLeave = useCallback(
        (...parameters) => {
            if (typeof onMouseLeave === 'function') {
                onMouseLeave(...parameters);
            }
            setSpringProps(DEFAULT_SPRING_PROPS);
        },
        [onMouseLeave]
    );
    return (
        <Component
            className={cn(classes.container, button && classes.button, className)}
            style={{
                ...style,
                ...springProps,
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            {...(button && {
                role: 'button',
            })}
            {...other}
        >
            <Typography className={cn(classes.typography)} color="dark">
                {children}
            </Typography>
        </Component>
    );
};

export const ListItem = injectSheet(styles)(ListItemComponent);
