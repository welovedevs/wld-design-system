import React from 'react';

import cn from 'classnames';

import { makeStyles } from '@material-ui/core/styles';

import { styles } from './list_styles';

const useStyles = makeStyles(styles);

export const List = ({ className, classes: receivedClasses = {}, ...other }) => {
    const classes = useStyles();
    return <ul className={cn(classes.container, className, receivedClasses.container)} {...other} />;
};
