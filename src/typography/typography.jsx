import React from 'react';

import cn from 'classnames';
import { createUseStyles } from 'react-jss';

import { getComponentColor } from '../styles/utils/styles_utils';

import { styles } from './typography_styles';

const useStyles = createUseStyles(styles);

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
    let style = null;
    if (color) {
        const hex = getComponentColor(true, color, false, 500);
        if (['wld1', 'wld2', 'wld3', 'wld4', 'wld5', 'wld6'].some(key => variant === key)) {
            if (color === 'secondary') {
                style = {
                    backgroundColor: hex,
                    color: '#fff'
                };
            } else if (color === 'tertiary') {
                style = {
                    color: getComponentColor(true, 'primary', false, 500),
                    backgroundColor: hex
                };
            } else {
                style = {
                    color: getComponentColor(true, 'primary', false, 500)
                };
            }
        } else {
            style = {
                color: hex
            };
        }
    }
    return (
        <Component
            ref={containerRef}
            className={cn(classes.container, classes[color], classes[variant], className, customClasses.container)}
            style={{
                ...receivedStyle,
                ...style
            }}
            {...other}
        />
    );
};

export const Typography = TypographyComponent;
