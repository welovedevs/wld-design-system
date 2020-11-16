import React, {CSSProperties, HTMLAttributes, useMemo} from 'react';

import cn from 'classnames';
import makeStyles from '@material-ui/styles/makeStyles';

import { animated, config, useSpring } from 'react-spring';

import { ELEVATION_SPRING_PROPS } from './card_elevation_spring_props';

import { Classes, styles } from './card_styles';
import merge from 'lodash/merge';

const useStyles = makeStyles(styles);

export type CardVariant = 'flat';

interface Props {
    component?: string;
    className?: string;
    containerRef?: any;
    elevation?: 0 | 1 | 'drawer';
    style?: CSSProperties;
    classes?: Classes;
    customClasses?: Classes;
    variant?: CardVariant;
}
const CardComponent: React.FC< HTMLAttributes<any> & Props > = ({
    component: Component = animated.div,
    className,
    containerRef,
    elevation = 1,
    style,
    customClasses: oldCustomClasses = {},
    classes: receivedClasses = {},
    variant,
    ...other
}) => {
    const mergedClasses = useMemo(() => merge({}, oldCustomClasses, receivedClasses), [
        JSON.stringify(oldCustomClasses),
        JSON.stringify(receivedClasses),
    ]);
    const classes = useStyles({ classes: mergedClasses });
    const springPropsFromVariant = useMemo(() => {
        if (!variant) {
            return ELEVATION_SPRING_PROPS.regular;
        }
        return ELEVATION_SPRING_PROPS?.[variant];
    }, [variant]);
    const springProps = useSpring({
        ...springPropsFromVariant?.[elevation],
        config: config.default,
    });

    // @ts-ignore
    const variantClass = variant && classes[`variant_${variant}`];
    return (
        <Component
            ref={containerRef}
            className={cn(classes.container, variantClass, className)}
            style={
                {
                    ...(springPropsFromVariant && springProps),
                    ...style,
                } as any
            }
            {...other}
        />
    );
};

export const Card = CardComponent;
