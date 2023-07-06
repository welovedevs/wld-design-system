import React, { PropsWithChildren, useMemo } from 'react';

import cn from 'classnames';

import { BANNER_DATA, BannerType } from './banner_data';

import { baseStyles, iconStyles } from './banner_styles';
import { palette } from '../index';

interface Props {
    type?: BannerType;
    icon?: any;
    className?: string;
    classes?: { container?: string };
    size?: 'small';
}

export const Banner: React.FC<PropsWithChildren<Props>> = ({
    type = 'warning',
    className,
    icon: receivedIcon,
    classes = {},
    children,
    size,
}) => {
    const { icon, color } = useMemo(() => {
        const typeConfig = BANNER_DATA[type];
        if (!typeConfig) {
            return { ...BANNER_DATA.default, color: palette.primary[500] };
        }
        return {
            ...typeConfig,
            color: palette[typeConfig.color]?.[500],
        };
    }, [type]);
    const Icon = receivedIcon || icon;

    return (
        <div
            className={cn(
                className ?? '',
                classes?.container,
                baseStyles.container[size || 'regular'] ?? baseStyles.container.regular,
                baseStyles.background[size || 'regular'] ?? baseStyles.background.regular
            )}
            style={{ color }}
        >
            {Icon && (
                <span className={iconStyles.container[size || 'regular'] ?? iconStyles.container.regular}>
                    <Icon className={iconStyles.icon[size || 'regular'] ?? iconStyles.icon.regular} />
                </span>
            )}
            {children}
        </div>
    );
};
