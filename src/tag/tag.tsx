import React, { useMemo, useState } from 'react';

import { PaletteColors } from '../styles';

import { Typography, TypographyProps } from '../typography/typography';
import { baseStyles, ButtonProps, palette, sizeStyles, variantStyles } from '../index';
import { Close } from '@mui/icons-material';
import cn from 'classnames';

interface Props {
    component?: string | React.ElementType;
    containerRef?: any;
    className?: string;
    color?: PaletteColors;
    classes?: { container?: string; typography?: string };
    onClick?: () => void;
    onDelete?: () => void;
    size?: 'small' | 'xs' | 'regular';
}
export const Tag: React.FC<Props> = ({
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
}) => {
    const textColor = color && palette?.[color]?.[800];
    const bgColor = color && palette?.[color]?.[100];
    const bgColorHover = (onClick || onDelete || true) && bgColor && palette?.[color]?.[200];
    const sizeClasses = {
        container: {
            regular: 'ds-px-2.5 ds-py-3/4 ',
            small: 'ds-px-1.5 ds-py-3/4',
            xs: 'ds-px-1 ds-py-0.5',
        },
    };
    const [hover, setHover] = useState(false);
    return (
        <Component
            ref={containerRef}
            className={cn(
                'ds-inline-flex ds-items-center ds-rounded-md',
                onClick || onDelete ? 'ds-cursor-pointer' : '',
                className,
                sizeClasses.container[size] || sizeClasses.container.regular,
                classes?.container
            )}
            onMouseEnter={() => {
                setHover(true);
            }}
            onMouseLeave={() => {
                setHover(false);
            }}
            onClick={onDelete || onClick}
            style={{
                background: hover && (onClick || onDelete) ? bgColorHover : bgColor,
            }}
            {...other}
        >
            <Typography
                style={{
                    color: textColor,
                }}
                className={cn('ds-font-medium ds-text-xs', classes?.typography)}
            >
                {children}
            </Typography>
            {onDelete && (
                <Close
                    className="ds-max-h-[14px] ds-max-w-[14px] ds-ml-1"
                    style={{
                        color: textColor,
                    }}
                />
            )}
        </Component>
    );
};
