import React from 'react';

import { createUseStyles } from "react-jss";

import { styles } from './spacing_styles';

const useStyles = createUseStyles(styles);

const SpacingComponent = ({ value = 1, spacing = 8 }) => {
    const classes = useStyles({ value, spacing });
    return <div className={classes.container} />
};

export const Spacing = SpacingComponent;
