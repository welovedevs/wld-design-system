import React, { forwardRef } from 'react';

import cn from 'classnames';
import injectSheet from 'react-jss';

import styles from './text_field_icon_styles';

const TextFieldIconComponent = forwardRef(({ className, classes, ...other }, ref) => (
    <div className={cn(className, classes.container)} {...{ ref }} {...other} />
));

export const TextFieldIcon = injectSheet(styles)(TextFieldIconComponent);
