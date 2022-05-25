import React, {CSSProperties, forwardRef, HTMLAttributes, useMemo} from 'react';

import cn from 'classnames';
import { ELEVATION_PROPS } from './card_elevation_props';

import merge from 'lodash/merge';
import {Classes} from "./card_styles";


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
const CardComponent = forwardRef< any, HTMLAttributes<any> & Props >(({
                                                                    component: Component = 'div',
                                                                    className,
                                                                    containerRef,
                                                                    elevation = 1,
                                                                    style,
                                                                    customClasses: oldCustomClasses = {},
                                                                    classes: receivedClasses = {},
                                                                    variant,
                                                                    ...other
                                                                }, ref) => {
    const mergedClasses = useMemo(() => merge({}, oldCustomClasses, receivedClasses), [
        JSON.stringify(oldCustomClasses),
        JSON.stringify(receivedClasses),
    ]);
    const stylePropsFromVariant = useMemo(() => {
        if (!variant) {
            return ELEVATION_PROPS.regular;
        }
        return ELEVATION_PROPS?.[variant];
    }, [variant]);
    const styleProps = {
        ...stylePropsFromVariant?.[elevation],
    };
    // @ts-ignore
    const variantClass = variant && classes[`variant_${variant}`];
    return React.createElement( Component || 'div',
        {ref: containerRef || ref,
            className: cn('w-fit bg-white rounded p-2.5 avenir', mergedClasses, variantClass, className),
            style: {
            ...(stylePropsFromVariant && styleProps),
            ...style,
        } as any,
            ...other }
    );
});

export const Card = (CardComponent);
