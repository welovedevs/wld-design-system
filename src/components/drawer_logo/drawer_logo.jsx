import React from 'react';
import { Link } from 'react-router-dom';

import cn from 'classnames';
import injectSheet from 'react-jss';

import W3DLogo from '../../../assets/images/W3D_logo.svg';

import styles from './drawer_logo_styles';

const DrawerLogoComponent = ({ drawerAnchor, classes }) => (
    <Link to="/" className={cn(classes.container, drawerAnchor === 'right' && classes.drawerAnchoredRightContainer)}>
        <W3DLogo />
    </Link>
);

export const DrawerLogo = injectSheet(styles)(DrawerLogoComponent);
