import React from 'react';

import { makeStyles } from "@material-ui/core/styles";

import { styles } from './spacing_styles';

const useStyles = makeStyles(styles);

export const Spacing = ({ value = 1, spacing = 8 }) => {
    const classes = useStyles({ value, spacing });
    return <div className={classes.container} />
};
