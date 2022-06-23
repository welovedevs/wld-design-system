import React, { forwardRef, useMemo, useState } from 'react';

import { PaletteColors } from '../styles';

import { Typography } from '../typography/typography';
import { palette } from '../index';
import { Cancel, Close } from '@mui/icons-material';
import cn from 'classnames';

interface Props {
    component?: string | React.ElementType;
    containerRef?: any;
    className?: string;
    color?: PaletteColors;
    classes?: { container?: string; typography?: string };
    onClick?: (e: any) => void;
    onDelete?: (e: any) => void;
    size?: 'small' | 'xs' | 'regular';
}
export const Tag: React.FC<Props> = forwardRef(
    (
        {
            component: Component = 'div',
            containerRef,
            className,
            color = 'primary',
            children,
            onClick,
            onDelete,
            classes,
            size = 'regular',
            ...other
        },
        ref
    ) => {
        const containerSize = {
            regular: 'ds-px-2 ds-py-3/4 ',
            small: 'ds-px-1.5 ds-py-1/2',
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
        return (
            <Component
                ref={ref || containerRef}
                className={cn(
                    'ds-inline-flex ds-items-center ds-rounded-md',
                    onClick ? 'ds-cursor-pointer' : '',
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
                    background: hover && onClick ? bgColor.hover : bgColor.normal,
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
