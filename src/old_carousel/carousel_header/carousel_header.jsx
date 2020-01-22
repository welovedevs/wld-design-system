import React from 'react';

import cn from 'classnames';
import { createUseStyles } from 'react-jss';

import { styles } from './carousel_header_styles';

const useStyles = createUseStyles(styles);

const CarouselHeaderComponent = ({ color, children, customClasses = {} }) => {
    const classes = useStyles({ color });
    return <div className={cn(classes.container, customClasses.container)}>{children}</div>;
};

export const CarouselHeader = CarouselHeaderComponent;
