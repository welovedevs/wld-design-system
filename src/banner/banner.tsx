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
export const Banner: React.FC<Props> = ({ type = 'warning', icon: receivedIcon, classes = {}, children }) => {
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
        <div className={cn(classes?.container, baseStyles.container, baseStyles.background)} style={{ color }}>
            <span className={'ds-flex ds-mr-2 md:ds-absolute md:-ds-top-1.5 md:-ds-left-1.5'}>
                {Icon && <Icon className="ds-w-6 ds-h-6 md:ds-w-3 md:ds-h-3" />}
            </span>
            {children}
        </div>
    );
};
