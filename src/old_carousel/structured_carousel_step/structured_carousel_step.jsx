import React from 'react';

import cn from 'classnames';
import { makeStyles } from "@material-ui/core/styles";

import { styles } from './structured_carousel_step_styles';

const useStyles = makeStyles(styles);

const StructuredCarouselStepComponent = ({ fullScreen, children, customClasses = {} }) => {
    const classes = useStyles();
    return (
        <div className={cn(classes.container, fullScreen && classes.fullScreen, customClasses.container)}>
            {children}
        </div>
    );
};

export const StructuredCarouselStep = StructuredCarouselStepComponent;
