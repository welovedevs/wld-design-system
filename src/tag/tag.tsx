import React, { CSSProperties } from 'react';

import cn from 'classnames';

import { PaletteColors } from '../styles';

import { Typography, TypographyProps } from '../typography/typography';
import { palette } from '../index';

interface Props {
    component?: string | React.ElementType;
    containerRef?: any;
    className?: string;
    color?: PaletteColors;
    typographyProps?: Omit<TypographyProps, 'children'>;
    style?: CSSProperties;
    classes?: { container?: string; typography?: string };
}
export const Tag: React.FC<Props> = ({
    component: Component = 'div',
    containerRef,
    className,
    color,
    children,
    typographyProps,
    style: receivedStyle,
    classes = {},
    ...other
}) => {
    const hexColor = color && palette?.[color]?.[500];
    const styleProps = { color: hexColor, ...receivedStyle, boxShadow: `0 10px 20px 0 ${hexColor ?? '#d6d6d6'}` };
    const withColor = !!color;
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
                {...((typographyProps as any) ?? {})}
                variant="tag"
            >
                {children}
            </Typography>
        </Component>
    );
};
