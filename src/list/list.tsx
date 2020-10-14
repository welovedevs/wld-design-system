import React from 'react';

import cn from 'classnames';

import { makeStyles } from '@material-ui/core/styles';

import { Classes, styles } from './list_styles';

const useStyles = makeStyles(styles);

export const List: React.FC<{ className?: string; classes?: Classes }> = ({
    className,
    classes: receivedClasses = {},
    ...other
}) => {
    const classes = useStyles({ classes: receivedClasses });
    return <ul className={cn(classes.container, className)} {...other} />;
};
