import React, { CSSProperties, ExoticComponent, useMemo } from 'react';

import cn from 'classnames';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { getComponentColor, getHexFromTheme } from '../styles/utils/styles_utils';

import { Classes, styles, TypographyVariants } from './typography_styles';
import { PaletteColors } from '../styles/palette';

const useStyles = makeStyles(styles);

interface TypographyProps {
    containerRef?: any;
    className?: string;
    color?: PaletteColors;
    component?: string | ExoticComponent;
    variant?: TypographyVariants;
    style?: CSSProperties;
    classes?: Classes;
}

const TypographyComponent: React.FC<TypographyProps> = ({
    containerRef,
    className,
    color,
    component: Component = 'span',
    variant = 'body1',
    style: receivedStyle,
    classes: receivedClasses = {},

    ...other
}) => {
    const classes = useStyles({ classes: receivedClasses });
    const theme = useTheme();

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
