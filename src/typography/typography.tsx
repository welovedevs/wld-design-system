import React, { CSSProperties, ExoticComponent, HTMLAttributes, ReactElement, useMemo } from 'react';

import cn from 'classnames';

import {baseStyles, TypographyVariants, VariantStyles} from './typography_styles';
import palette, { PaletteColors } from '../styles/palette';
import merge from 'lodash/merge';

export interface TypographyProps {
    containerRef?: any;
    className?: string;
    color?: PaletteColors;
    component?: string | ExoticComponent | ((...params: any[]) => ReactElement);
    variant?: TypographyVariants;
    style?: CSSProperties;
    classes?: { container?: string };
    customClasses?: { container?: string };
}

export const Typography: React.FC<TypographyProps & HTMLAttributes<any>> = ({
    containerRef,
    className,
    color,
    component: Component = 'span',
    variant = 'body1',
    style: receivedStyle,
    customClasses: oldCustomClasses = {},
    classes: receivedClasses = {},

    ...other
}) => {
    const classes = useMemo(() => merge({}, oldCustomClasses, receivedClasses), [
        JSON.stringify(oldCustomClasses),
        JSON.stringify(receivedClasses),
    ]);
    let style = useMemo<{ backgroundColor?: string; color: string } | null>(() => {
        if (color) {
            if (['wld1', 'wld2', 'wld3', 'wld4', 'wld5', 'wld6'].some((key) => variant === key)) {
                if (color === 'secondary') {
                    return {
                        backgroundColor: palette[color]?.[500],
                        color: '#fff',
                    };
                }
                if (color === 'tertiary') {
                    return {
                        color: palette.primary[500],
                        backgroundColor: palette[color]?.[500],
                    };
                }
                return {
                    color: palette.primary[500],
                };
            }
            return {
                color: palette[color]?.[500],
            };
        }
        return null;
    }, [variant, color]);

    return (
        <Component
            className={cn(baseStyles.container, variant && VariantStyles[variant],classes.container, className)}
            style={{
                ...style,
                ...receivedStyle,
            }}
            {...other}
            {...({ ref: containerRef } as any)}
        />
    );
};

