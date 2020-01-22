import React from 'react';

import cn from 'classnames';
import { createUseStyles } from 'react-jss';

import { styles } from './structured_carousel_step_styles';

const useStyles = createUseStyles(styles);

const StructuredCarouselStepComponent = ({ fullScreen, children, customClasses = {} }) => {
    const classes = useStyles();
    return (
        <div className={cn(classes.container, fullScreen && classes.fullScreen, customClasses.container)}>
            {children}
        </div>
    );
};

export const StructuredCarouselStep = StructuredCarouselStepComponent;
