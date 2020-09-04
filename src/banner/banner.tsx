import React, { useMemo } from 'react';

import cn from 'classnames';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { BANNER_DATA, BannerType } from './banner_data';

import { Classes, styles } from './banner_styles';
import { getComponentColor, getHexFromTheme } from '../styles';

const useStyles = makeStyles(styles);

interface Props {
    type?: BannerType;
    icon?: any;
    classes: Classes;
}
const BannerComponent: React.FC<Props> = ({
    type = 'warning',
    icon: receivedIcon,
    classes: customClasses = {},
    children,
}) => {
    const theme = useTheme();

    const { icon, color } = useMemo(() => {
        const typeConfig = BANNER_DATA[type];
        if (!typeConfig) {
            return BANNER_DATA.default;
        }
        return {
            ...typeConfig,
            color: getComponentColor(true, getHexFromTheme(theme, typeConfig.color), false),
        };
    }, [type, theme]);
    const classes = useStyles({ type, classes: customClasses });
    const Icon = receivedIcon || icon;
    return (
        <div className={cn(classes.container, customClasses.container)} style={{ color }}>
            <span className={classes.iconContainer}>{Icon && <Icon />}</span>
            {children}
        </div>
    );
};

export const Banner = BannerComponent;
