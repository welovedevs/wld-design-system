import React from 'react';

import cn from 'classnames';
import { makeStyles } from "@material-ui/core/styles";

import { styles } from './popper_card_actions_styles';

const useStyles = makeStyles(styles);

const PopperCardActionsComponent = ({ children, customClasses = {} }) => {
    const classes = useStyles();
    return <div className={cn(classes.container, customClasses.container)}>{children}</div>;
};

export const PopperCardActions = PopperCardActionsComponent;
