import React, { CSSProperties, ExoticComponent, HTMLAttributes, ReactElement, useMemo } from 'react';

import cn from 'classnames';

import { baseStyles, TypographyVariants, VariantStyles } from './typography_styles';
import palette, { PaletteColors } from '../styles/palette';
import merge from 'lodash/merge';

interface ComponentProps {
    containerRef?: any;
    className?: string;
    color?: PaletteColors;
    component?: string | ExoticComponent | ((...params: any[]) => ReactElement);
    variant?: TypographyVariants;
    style?: CSSProperties;
    classes?: { container?: string };
    customClasses?: { container?: string };
}
export type TypographyProps = ComponentProps & HTMLAttributes<any>;

export const Typography: React.FC<ComponentProps & HTMLAttributes<any>> = ({
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
                const paletteColor = palette[color];
                if (color === 'primary') {
                    return {
                        backgroundColor: '#fff',
                        color: paletteColor?.[500],
                    };
                }
                if (paletteColor) {
                    const constrastColor = palette[paletteColor.contrastDefaultColor as PaletteColors];
                    return {
                        backgroundColor: paletteColor[500],
                        color: constrastColor?.[500] ?? '#fff',
                    };
                }
                return {
                    color: (color && palette?.[color]?.[500]) ?? palette.primary[500],
                };
            }
            return {
                color: palette?.[color]?.[500],
            };
        }
        return null;
    }, [variant, color]);

    const componentClassName = useMemo(() => {
        const classText = cn(baseStyles.container, variant && VariantStyles[variant], classes.container, className);
        if (!classText.includes('ds-text')) {
            return classText + ' ds-text-dark-500';
        }
        return classText;
    }, [variant, className]);

    return (
        <Component
            className={componentClassName}
            style={{
                ...style,
                ...receivedStyle,
            }}
            {...other}
            {...({ ref: containerRef } as any)}
        />
    );
};
