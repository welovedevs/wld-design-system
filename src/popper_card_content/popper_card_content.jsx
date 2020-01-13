import React from 'react';

import cn from 'classnames';
import { createUseStyles } from 'react-jss';

import { styles } from './popper_card_content_styles';

const useStyles = createUseStyles(styles);

const PopperCardContentComponent = ({ customClasses = {}, children }) => {
    const classes = useStyles();
    return <div className={cn(classes.container, customClasses.container)}>{children}</div>;
};

export const PopperCardContent = PopperCardContentComponent;
