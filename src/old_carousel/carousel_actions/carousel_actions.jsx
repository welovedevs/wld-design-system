import React from 'react';

import cn from 'classnames';
import { makeStyles } from "@material-ui/core/styles";

import { styles } from './carousel_actions_styles';

const useStyles = makeStyles(styles);

const CarouselActionsComponent = ({ children, customClasses = {} }) => {
    const classes = useStyles();
    return <div className={cn(classes.container, customClasses.container)}>{children}</div>;
};

export const CarouselActions = CarouselActionsComponent;
