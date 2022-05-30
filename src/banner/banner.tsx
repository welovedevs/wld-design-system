import React, { useMemo } from 'react';

import cn from 'classnames';
import { useTheme } from '@mui/material/styles';

import makeStyles from '@mui/styles/makeStyles';

import { BANNER_DATA, BannerType } from './banner_data';

import { Classes, styles } from './banner_styles';
import { getComponentColor, getHexFromTheme } from '../styles';
import merge from 'lodash/merge';

const useStyles = makeStyles(styles);

interface Props {
    type?: BannerType;
    icon?: any;
    classes?: Classes;
    customClasses?: Classes;
}
const BannerComponent: React.FC<Props> = ({
    type = 'warning',
    icon: receivedIcon,
    classes: receivedClasses = {},
    customClasses: oldCustomClasses = {},
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
    const mergedClasses = useMemo(() => merge({}, oldCustomClasses, receivedClasses), [
        JSON.stringify(oldCustomClasses),
        JSON.stringify(receivedClasses),
    ]);
    const classes = useStyles({ classes: mergedClasses });
    const Icon = receivedIcon || icon;
    return (
        <div className={cn(classes.container)} style={{ color }}>
            <span className={classes.iconContainer}>{Icon && <Icon />}</span>
            {children}
        </div>
    );
};

export const Banner = BannerComponent;
