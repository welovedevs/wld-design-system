import React, { useMemo } from 'react';

import cn from 'classnames';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { animated, config, useSpring } from 'react-spring';

import { getComponentColor, getHexFromTheme } from '../styles/utils/styles_utils';

import { Typography } from '../typography/typography';

import { styles } from './tag_styles';

const useStyles = makeStyles(styles);

export const Tag = ({
    component: Component = animated.div,
    containerRef,
    className,
    color = 'default',
    children,
    typographyProps,
    style: receivedStyle,
    customClasses = {},
    ...other
}) => {
    const theme = useTheme();
    const classes = useStyles();
    const hexColor = useMemo(() => getHexFromTheme(theme, color), [theme, color]);

    const springProps = useSpring({
        color: getComponentColor(true, hexColor),
        boxShadow: `0 ${color ? 5 : 10}px ${color ? 15 : 20}px 0 ${getComponentColor(
            Boolean(hexColor),
            hexColor,
            false,
            200,
            '#d6d6d6'
        )}`,
        config: config.stiff,
    });
    const withColor = color && color !== 'default';
    return (
        <Component
            ref={containerRef}
            className={cn(className, classes.container, customClasses.container)}
            style={{
                ...receivedStyle,
                ...springProps,
            }}
            {...other}
        >
            <Typography
                className={cn(classes.typography, customClasses.typography)}
                variant="tag"
                {...(withColor && {
                    color: '#fff',
                })}
                {...typographyProps}
            >
                {children}
            </Typography>
        </Component>
    );
};
