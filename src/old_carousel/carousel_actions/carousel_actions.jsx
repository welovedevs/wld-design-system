import React from 'react';

import cn from 'classnames';
import { createUseStyles } from 'react-jss';

import { styles } from './carousel_actions_styles';

const useStyles = createUseStyles(styles);

const CarouselActionsComponent = ({ children, customClasses = {} }) => {
    const classes = useStyles();
    return <div className={cn(classes.container, customClasses.container)}>{children}</div>;
};

export const CarouselActions = CarouselActionsComponent;
