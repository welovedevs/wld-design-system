import React, { CSSProperties, forwardRef, HTMLAttributes, useMemo } from 'react';

import cn from 'classnames';
import { ELEVATION_PROPS } from './card_elevation_props';

import merge from 'lodash/merge';

export type CardVariant = 'flat' | 'regular';

const variantClasses = {
    regular: '',
    flat: 'ds-bg-[#f9f9f9] ds-border ds-border-solid ds-border-[#f0f0f0]',
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
            variant = 'regular',
            ...other
        },
        ref
    ) => {
        const mergedClasses = useMemo(() => merge({}, oldCustomClasses, receivedClasses), [
            JSON.stringify(oldCustomClasses),
            JSON.stringify(receivedClasses),
        ]);
        return React.createElement(Component || 'div', {
            ref: containerRef || ref,
            className: cn(
                'ds-w-fit ds-bg-white ds-rounded-md ds-px-2 ds-py-1.5 ds-font-w3d',
                mergedClasses.container,
                variantClasses[variant],
                className
            ),
            style: {
                ...ELEVATION_PROPS[variant]?.[elevation],
                ...style,
            } as any,
            ...other,
        });
    }
);

export const Card = CardComponent;
