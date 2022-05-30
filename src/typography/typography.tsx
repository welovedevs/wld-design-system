import React, { CSSProperties, ExoticComponent, HTMLAttributes, ReactElement, useMemo } from 'react';

import cn from 'classnames';
import { useTheme } from '@mui/material/styles';

import makeStyles from '@mui/styles/makeStyles';

import { getComponentColor, getHexFromTheme } from '../styles/utils/styles_utils';

import { Classes, styles, TypographyVariants } from './typography_styles';
import { PaletteColors } from '../styles/palette';
import merge from 'lodash/merge';

const useStyles = makeStyles(styles);

export interface TypographyProps {
    containerRef?: any;
    className?: string;
    color?: PaletteColors;
    component?: string | ExoticComponent | ((...params: any[]) => ReactElement);
    variant?: TypographyVariants;
    style?: CSSProperties;
    classes?: Classes;
    customClasses?: Classes;
}

const TypographyComponent: React.FC<TypographyProps & HTMLAttributes<any>> = ({
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
    const mergedClasses = useMemo(() => merge({}, oldCustomClasses, receivedClasses), [
        JSON.stringify(oldCustomClasses),
        JSON.stringify(receivedClasses),
    ]);
    const classes = useStyles({ classes: mergedClasses });const theme = useTheme();

    let style = useMemo<{ backgroundColor?: string; color: string } | null>(() => {
        if (color) {
            const hex = getComponentColor(true, getHexFromTheme(theme, color), false);
            if (['wld1', 'wld2', 'wld3', 'wld4', 'wld5', 'wld6'].some((key) => variant === key)) {
                if (color === 'secondary') {
                    return {
                        backgroundColor: hex,
                        color: '#fff',
                    };
                }
                if (color === 'tertiary') {
                    return {
                        color: getComponentColor(true, getHexFromTheme(theme, 'primary'), false),
                        backgroundColor: hex,
                    };
                }
                return {
                    color: getComponentColor(true, getHexFromTheme(theme, 'primary'), false),
                };
            }
            return {
                color: hex,
            };
        }
        return null;
    }, [variant, theme, color]);

    return (
        <Component
            className={cn(classes.container, classes[variant], className)}
            style={{
                ...style,
                ...receivedStyle,
            }}
            {...other}
            {...({ ref: containerRef } as any)}
        />
    );
};

export const Typography = TypographyComponent;
