import React, { CSSProperties, forwardRef, HTMLAttributes, useMemo } from 'react';

import cn from 'classnames';
import { ELEVATION_PROPS } from './card_elevation_props';

import merge from 'lodash/merge';

export type CardVariant = 'flat';

const variantClasses = {
    variant_flat: 'bg-[#f9f9f9] border border-solid border-[#f0f0f0]',
};
interface Props {
    component?: string;
    className?: string;
    containerRef?: any;
    elevation?: 0 | 1 | 'drawer';
    style?: CSSProperties;
    classes?: { container?: string };
    customClasses?: { container?: string };
    variant?: CardVariant;
}
const CardComponent = forwardRef<any, HTMLAttributes<any> & Props>(
    (
        {
            component: Component = 'div',
            className,
            containerRef,
            elevation = 1,
            style,
            customClasses: oldCustomClasses = {},
            classes: receivedClasses = {},
            variant,
            ...other
        },
        ref
    ) => {
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
        const variantClass = variant && variantClasses[`variant_${variant}` as const];
        return React.createElement(Component || 'div', {
            ref: containerRef || ref,
            className: cn(
                'ds-w-fit ds-bg-white ds-rounded ds-p-2.5 ds-avenir',
                mergedClasses.container,
                variantClass,
                className
            ),
            style: {
                ...(stylePropsFromVariant && styleProps),
                ...style,
            } as any,
            ...other,
        });
    }
);

export const Card = CardComponent;
