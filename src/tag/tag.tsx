import React, { CSSProperties, ExoticComponent, useMemo } from 'react';

import cn from 'classnames';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { animated, config, useSpring } from 'react-spring';

import { getComponentColor, getHexFromTheme } from '../styles/utils/styles_utils';

import { Typography, TypographyProps } from '../typography/typography';

import { Classes, styles } from './tag_styles';
import { PaletteColors } from '../styles/palette';

const useStyles = makeStyles(styles);
interface Props {
    component?: string | ExoticComponent;
    containerRef?: any;
    className?: string;
    color?: PaletteColors | 'default';
    typographyProps?: TypographyProps;
    style?: CSSProperties;
    customClasses?: Classes;
}
export const Tag: React.FC<Props> = ({
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
            '#d6d6d6'
        )}`,
        config: config.stiff,
    });
    const withColor = color && color !== 'default';
    return (
        <Component
            ref={containerRef}
            className={cn(className, classes.container, customClasses.container)}
            style={
                {
                    ...receivedStyle,
                    ...springProps,
                } as any
            }
            {...other}
        >
            <Typography
                className={cn(classes.typography, customClasses.typography)}
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
