import React, {createRef, CSSProperties, HTMLAttributes, useMemo} from 'react';

import cn from 'classnames';
import makeStyles from '@material-ui/styles/makeStyles';
import { ELEVATION_PROPS } from './card_elevation_props';
import { motion } from 'framer-motion';

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
                                                                    component: Component = motion.div,
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
    const stylePropsFromVariant = useMemo(() => {
        if (!variant) {
            return ELEVATION_PROPS.regular;
        }
        return ELEVATION_PROPS?.[variant];
    }, [variant]);
    const styleProps = {...stylePropsFromVariant?.[elevation]};
    const variantClass = variant && classes[`variant_${variant}`];
    return (
        <Component
            ref={containerRef}
            className={cn(classes.container, variantClass, className)}
            style={{
                ...(stylePropsFromVariant && styleProps),
                ...style,
            } as any}
            {...other}
        />
    );
};

export const Card = CardComponent;
