import React, { CSSProperties, ExoticComponent } from 'react';

import cn from 'classnames';
import { motion } from 'framer-motion';

import { getComponentColor, PaletteColors } from '../styles';

import { Typography, TypographyProps } from '../typography/typography';
import { palette } from '../index';

interface Props {
    component?: string | ExoticComponent;
    containerRef?: any;
    className?: string;
    color?: PaletteColors | 'default';
    typographyProps?: TypographyProps;
    style?: CSSProperties;
    classes?: { container?: string; typography?: string };
}
export const Tag: React.FC<Props> = ({
    component: Component = "div",
    containerRef,
    className,
    color = 'default',
    children,
    typographyProps,
    style: receivedStyle,
    classes = {},
    ...other
}) => {
    // const theme = useTheme();
    const hexColor = palette?.[color]?.[500];
    // const animationProps = {
    //     scale: 1,
    //     boxShadow: `0 ${color ? 5 : 10}px ${color ? 15 : 20}px 0 ${getComponentColor(
    //         Boolean(hexColor),
    //         hexColor,
    //         false,
    //         '#d6d6d6'
    //     )}`,
    // };
    const styleProps = { color: hexColor, ...receivedStyle, boxShadow: `0 10px 20px 0 ${hexColor ?? '#d6d6d6'}` };
    const withColor = color && color !== 'default';
    return (
        <Component
            ref={containerRef}
            className={cn(
                className,
                'ds-w-fit ds-h-fit ds-rounded-full ds-m-1 ds-py-1 ds-px-1.5 ds ds-text-light-500 ds-bg-current ds-flex ds-items-center ds-justify-center ds-shadow-sm '
            )}
            initial={{ scale: 0.8 }}
            style={styleProps}
            {...other}
        >
            <Typography
                className={cn(`ds-flex ds-items-center `, classes?.typography)}
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
