import React from 'react';

import cn from 'classnames';
import makeStyles from '@mui/styles/makeStyles';

import { Typography } from '../typography/typography';

import { styles } from './popper_card_title_styles';

const useStyles = makeStyles(styles);

const PopperCardTitleComponent = ({ customClasses = {}, children }) => {
    const classes = useStyles();
    return (
        <Typography
            className={cn(classes.container, customClasses.container)}
            variant="body1"
            component="h2"
            color="dark"
        >
            {children}
        </Typography>
    );
};

export const PopperCardTitle = PopperCardTitleComponent;
