import React, { forwardRef } from 'react';

import cn from 'classnames';
import { makeStyles } from "@material-ui/core/styles";

import { styles } from './text_field_icon_styles';

const useStyles = makeStyles(styles);

export const TextFieldIcon = forwardRef(({ className, classes: receivedClasses = {}, ...other }, ref) => {
    const classes = useStyles();
    return (
        <div className={cn(classes.container, className, receivedClasses.container)} {...{ ref }} {...other} />
    )
});
