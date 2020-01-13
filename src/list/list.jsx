import React from 'react';

import cn from 'classnames';

import injectSheet from 'react-jss';

import styles from './list_styles';

const ListComponent = ({ className, classes, ...other }) => (
    <ul className={cn(classes.container, className)} {...other} />
);

export const List = injectSheet(styles)(ListComponent);
