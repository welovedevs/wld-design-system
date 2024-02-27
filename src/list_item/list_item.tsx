import React, { ExoticComponent, HTMLAttributes } from 'react';

import cn from 'classnames';

import { Typography } from '../typography/typography';

interface Props {
    component?: string | ExoticComponent;
    className?: string;
    typographyClassName?: string;
    button?: boolean;
    classes?: {
        button?: string;
        container?: string;
        typography?: string;
    };
    style?: any;
}

export const ListItem: React.FC<Props & HTMLAttributes<HTMLLIElement>> = ({
    component: Component = 'li',
    className,
    typographyClassName,
    button,
    style,
    children,
    classes,
    ...other
}) => {
    return (
        <Component
            className={cn(
                'ds-px-2 ds-py-1 ds-rounded-md ds-flex ds-items-center ds-transition-all ds-bg-transparent hover:ds-bg-dark-50',
                button && 'ds-cursor-pointer',
                button && classes?.button,
                classes?.container,
                className
            )}
            {...style}
            {...(button && {
                role: 'button',
            })}
            {...other}
        >
            <Typography
                className={cn('ds-flex ds-items-center', classes?.typography, typographyClassName)}
                color="dark"
            >
                {children}
            </Typography>
        </Component>
    );
};
