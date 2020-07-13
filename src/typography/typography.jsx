import React, { useMemo } from 'react';

import cn from 'classnames';
import { makeStyles, useTheme } from "@material-ui/core/styles";

import { getComponentColor, getHexFromTheme } from '../styles/utils/styles_utils';

import { styles } from './typography_styles';

const useStyles = makeStyles(styles);

const TypographyComponent = ({
    containerRef,
    className,
    color,
    component: Component = 'span',
    variant = 'body1',
    style: receivedStyle,
    customClasses = {},
    ...other
}) => {
    const classes = useStyles();
    const theme = useTheme();

    let style = useMemo(() => {
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
    }, [variant, theme, color]);

    return (
        <Component
            ref={containerRef}
            className={cn(classes.container, classes[color], classes[variant], className, customClasses.container)}
            style={{
                ...style,
                ...receivedStyle,
            }}
            {...other}
        />
    );
};

export const Typography = TypographyComponent;
