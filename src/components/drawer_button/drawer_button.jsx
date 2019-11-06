import React from 'react';

import cn from 'classnames';
import injectSheet from 'react-jss';

import RoundedButton from '../../smallviews/rounded_button/rounded_button';

import styles from './drawer_button_styles';

const DrawerButtonComponent = ({ classes, active, ...other }) => (
    <RoundedButton className={cn(classes.container, active && classes.active)} {...other} />
);

export const DrawerButton = injectSheet(styles)(DrawerButtonComponent);
