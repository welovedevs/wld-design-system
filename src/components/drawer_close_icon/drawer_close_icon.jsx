import React from 'react';

import cn from 'classnames';
import injectSheet from 'react-jss';

import CloseIcon from '../../../assets/images/assets/icons/close.svg';

import styles from './drawer_close_icon_styles';

const DrawerCloseIconComponent = ({ onClick, drawerAnchor, classes }) => (
    <div
        className={cn(classes.container, drawerAnchor === 'right' && classes.drawerAnchoredRightContainer)}
        {...{ onClick }}
    >
        <CloseIcon />
    </div>
);

export const DrawerCloseIcon = injectSheet(styles)(DrawerCloseIconComponent);
