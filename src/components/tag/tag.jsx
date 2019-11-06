import React from 'react';

import cn from 'classnames';
import injectSheet from 'react-jss';
import { animated, config, useSpring } from 'react-spring';

import { getComponentColor } from '../../styles/utils/color_utils';

import { Typography } from '../typography/typography';

import styles from './tag_styles';

const TagComponent = ({
    component: Component = animated.div,
    containerRef,
    className,
    color = 'default',
    children,
    typographyProps,
    customClasses = {},
    classes,
    ...other
}) => {
    const springProps = useSpring({
        color: getComponentColor(true, color),
        boxShadow: `0 ${color ? 5 : 10}px ${color ? 15 : 20}px 0 ${getComponentColor(
            Boolean(color),
            color,
            false,
            200,
            '#d6d6d6'
        )}`,
        config: config.stiff
    });
    const withColor = color && color !== 'default';
    return (
        <Component
            ref={containerRef}
            className={cn(className, classes.container, customClasses.container)}
            style={springProps}
            {...other}
        >
            <Typography
                className={cn(classes.typography, customClasses.typography)}
                variant="tag"
                {...(withColor && {
                    color: '#fff'
                })}
                {...typographyProps}
            >
                {children}
            </Typography>
        </Component>
    );
};

export const Tag = injectSheet(styles)(TagComponent);
