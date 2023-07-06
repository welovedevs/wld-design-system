import React, { forwardRef, PropsWithChildren, useMemo, useState } from 'react';

import { PaletteColors } from '../styles';

import { Typography } from '../typography/typography';
import { palette } from '../index';
import Cancel from '@mui/icons-material/Cancel';
import cn from 'classnames';

interface Props {
    component?: string | React.ElementType;
    containerRef?: any;
    className?: string;
    color?: PaletteColors;
    style?: any;
    classes?: { container?: string; typography?: string };
    onClick?: (e: any) => void;
    clickable?: boolean;
    onDelete?: (e: any) => void;
    size?: 'small' | 'xs' | 'regular';
}

export const Tag: React.FC<PropsWithChildren<Props>> = forwardRef(
    (
        {
            component: Component = 'div',
            containerRef,
            className,
            color = 'primary',
            children,
            onClick,
            clickable,
            onDelete,
            classes,
            style = {},
            size = 'regular',
            ...other
        },
        ref
    ) => {
        const containerSize = {
            regular: 'ds-px-2 ds-py-3/4 sm:ds-px-1.5 sm:ds-py-1/2',
            small: 'ds-px-1.5 ds-py-1/2 sm:ds-px-1 sm:ds-py-1/4',
            xs: 'ds-px-1 ds-py-0.5',
        };
        const typographyVariant = {
            regular: 'body2',
            small: 'body2',
            xs: 'body3',
        } as const;
        const textColor = useMemo(() => {
            switch (color) {
                case 'darkblue':
                    return palette?.light?.[500];
                case 'tertiary':
                    return palette?.tertiary?.[1000];
                case 'safe':
                    return palette?.safe?.[1000];
                case 'red':
                    return palette?.red?.[900];
                case 'orange':
                    return palette?.orange?.[900];
                case 'warn':
                    return palette?.warn?.[2000];
                default:
                    return color && palette?.[color]?.[800];
            }
        }, [color, palette]);
        const bgColor = useMemo(() => {
            switch (color) {
                case 'light':
                    return {
                        normal: palette?.dark?.[100],
                        hover: palette?.dark?.[200],
                    };
                default:
                    return {
                        normal: color && palette?.[color]?.[100],
                        hover: color && palette?.[color]?.[200],
                    };
            }
        }, [color, palette]);
        const [hover, setHover] = useState(false);
        const isClickable = !!(onClick || clickable);
        return (
            <Component
                ref={ref || containerRef}
                className={cn(
                    'ds-inline-flex ds-items-center ds-rounded-md',
                    isClickable ? 'ds-cursor-pointer' : '',
                    className,
                    containerSize[size] || containerSize.regular,
                    classes?.container
                )}
                onMouseEnter={() => {
                    setHover(true);
                }}
                onMouseLeave={() => {
                    setHover(false);
                }}
                onClick={onClick}
                style={{
                    ...style,
                    background: hover && isClickable ? bgColor.hover : bgColor.normal,
                }}
                {...other}
            >
                <Typography
                    style={{
                        color: textColor,
                    }}
                    className={cn('ds-font-medium ds-flex ds-items-center', classes?.typography)}
                    variant={typographyVariant[size] || typographyVariant.regular}
                    onMouseLeave={() => {
                        setHover(false);
                    }}
                >
                    {children}
                </Typography>
                {onDelete && (
                    <Cancel
                        className={`ds-max-h-[14px] ds-max-w-[14px] ds-ml-1 ds-cursor-pointer`}
                        style={{
                            color: textColor,
                        }}
                        onClick={onDelete}
                    />
                )}
            </Component>
        );
    }
);
