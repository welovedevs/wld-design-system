import React, { useMemo } from 'react';

import cn from 'classnames';

import { BANNER_DATA, BannerType } from './banner_data';

import { baseStyles } from './banner_styles';
import { palette } from '../index';

interface Props {
    type?: BannerType;
    icon?: any;
    classes?: { container?: string };
}
export const Banner: React.FC<Props> = ({
    type = 'warning',
    icon: receivedIcon,
    classes: receivedClasses = {},
    children,
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
        <div className={cn(baseStyles.container, baseStyles.background)} style={{ color }}>
            <span className={'ds-flex ds-mr-2 sm:ds-display-none'}>{Icon && <Icon className="ds-w-6 ds-h-6" />}</span>
            {children}
        </div>
    );
};
