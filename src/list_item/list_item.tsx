import React, { ExoticComponent, HTMLAttributes, useCallback } from 'react';

import cn from 'classnames';
import makeStyles from '@mui/styles/makeStyles';
import { motion } from 'framer-motion'

import { Typography } from '../typography/typography';

import { Classes, styles } from './list_item_styles';

const useStyles = makeStyles(styles);

interface Props {
    component?: string | ExoticComponent;
    className?: string;
    typographyClassName?: string;
    button?: boolean;
    classes?: Classes;
    style?: any;
}
export const ListItem: React.FC<Props & HTMLAttributes<any>> = ({
    component: Component = motion.li,
    className,
    typographyClassName,
    button,
    style,
    children,
    classes: additionalClasses,
    ...other
}) => {
    const classes = useStyles({ classes: additionalClasses });

    return (
        <Component
            className={cn(classes.container, button && classes.button, className)}
            {...style}
            initial={{backgroundColor: 'rgba(0, 0, 0, 0)'}}
            whileHover={{backgroundColor: 'rgba(0, 0, 0, .075)'}}
            {...(button && {
                role: 'button',
            })}
            {...other}
        >
            <Typography className={cn(classes.typography, typographyClassName)} color="dark">
                {children}
            </Typography>
        </Component>
    );
};
