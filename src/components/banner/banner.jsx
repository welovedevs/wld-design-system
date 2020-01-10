import React, { useMemo } from 'react';

import cn from 'classnames';
import { createUseStyles } from 'react-jss';

import { BANNER_DATA } from './banner_data';

import { styles } from './banner_styles';

const useStyles = createUseStyles(styles);

const BannerComponent = ({ type = 'warning', icon: receivedIcon, customClasses = {}, children }) => {
    const classes = useStyles();
    const { icon, color } = useMemo(() => BANNER_DATA[type] || {}, [type]);
    const Icon = receivedIcon || icon;
    return (
        <div className={cn(classes.container, customClasses.container)} style={{ color }}>
            <span className={classes.iconContainer}>
                <Icon />
            </span>
            {children}
        </div>
    );
};

export const Banner = BannerComponent;
