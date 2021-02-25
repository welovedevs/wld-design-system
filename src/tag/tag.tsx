import React, { CSSProperties, ExoticComponent, useMemo, useRef } from 'react';

import cn from 'classnames';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { motion } from 'framer-motion';

import { getComponentColor, getHexFromTheme } from '../styles';

import { Typography, TypographyProps } from '../typography/typography';

import { Classes, styles } from './tag_styles';
import { PaletteColors } from '../styles';
import merge from 'lodash/merge';

const useStyles = makeStyles(styles);
interface Props {
    component?: string | ExoticComponent;
    containerRef?: any;
    className?: string;
    color?: PaletteColors | 'default';
    typographyProps?: TypographyProps;
    style?: CSSProperties;
    classes?: Classes;
    customClasses?: Classes;
}
export const Tag: React.FC<Props> = ({
    component: Component = motion.div,
    containerRef,
    className,
    color = 'default',
    children,
    typographyProps,
    style: receivedStyle,
    customClasses: oldCustomClasses = {},
    classes: receivedClasses = {},
    ...other
}) => {
    const theme = useTheme();
    const mergedClasses = useMemo(() => merge({}, oldCustomClasses, receivedClasses), [
        JSON.stringify(oldCustomClasses),
        JSON.stringify(receivedClasses),
    ]);
    const classes = useStyles({ classes: mergedClasses });
    const hexColor = useMemo(() => getHexFromTheme(theme, color), [theme, color]);
    const animationProps = {
        scale: 1,
        boxShadow: `0 ${color ? 5 : 10}px ${color ? 15 : 20}px 0 ${getComponentColor(
            Boolean(hexColor),
            hexColor,
            false,
            '#d6d6d6'
        )}`,
    };
    const styleProps = { color: getComponentColor(true, hexColor), ...receivedStyle };
    const withColor = color && color !== 'default';
    return (
        <Component
            ref={containerRef}
            className={cn(className, classes.container)}
            initial={{ scale: 0.8 }}
            animate={animationProps}
            style={styleProps}
            {...other}
        >
            <Typography
                className={classes.typography}
                {...(withColor && {
                    color: 'light',
                })}
                {...typographyProps}
                variant="tag"
            >
                {children}
            </Typography>
        </Component>
    );
};
