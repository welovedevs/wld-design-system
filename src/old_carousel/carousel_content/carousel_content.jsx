import React from 'react';

import cn from 'classnames';
import { makeStyles } from "@material-ui/core/styles";

import { styles } from './carousel_content_styles';

const useStyles = makeStyles(styles);

const CarouselContentComponent = ({ color, children, customClasses = {} }) => {
    const classes = useStyles({ color });
    return <div className={cn(classes.container, customClasses.container)}>{children}</div>;
};

export const CarouselContent = CarouselContentComponent;
