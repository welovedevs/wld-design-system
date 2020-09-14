import React, { CSSProperties, useMemo } from 'react';

import cn from 'classnames';
import makeStyles from '@material-ui/styles/makeStyles';

import { animated, config, useSpring } from 'react-spring';

import { ELEVATION_SPRING_PROPS } from './card_elevation_spring_props';

import { Classes, styles } from './card_styles';
import merge from 'lodash/merge';

const useStyles = makeStyles(styles);

interface Props {
    component?: string;
    className?: string;
    containerRef?: any;
    elevation?: 0 | 1 | 'drawer';
    style?: CSSProperties;
    classes?: Classes;
    customClasses?: Classes;
}
const CardComponent: React.FC<Props> = ({
    component: Component = animated.div,
    className,
    containerRef,
    elevation = 1,
    style,
    customClasses: oldCustomClasses = {},
    classes: receivedClasses = {},
    ...other
}) => {
    const mergedClasses = useMemo(() => merge({}, oldCustomClasses, receivedClasses), [
        JSON.stringify(oldCustomClasses),
        JSON.stringify(receivedClasses),
    ]);
    const classes = useStyles({ classes: mergedClasses });
    const springProps = useSpring({
        ...ELEVATION_SPRING_PROPS[elevation],
        config: config.default,
    });
    return (
        <Component
            ref={containerRef}
            className={cn(classes.container, className)}
            style={
                {
                    ...springProps,
                    ...style,
                } as any
            }
            {...other}
        />
    );
};

export const Card = CardComponent;
