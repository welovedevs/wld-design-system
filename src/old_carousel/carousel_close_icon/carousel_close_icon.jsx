import React from 'react';

import { makeStyles } from "@material-ui/core/styles";
import { FormattedMessage } from 'react-intl';
import { motion } from 'framer-motion';

import CloseIcon from '@material-ui/icons/Close';

import { Tooltip } from '../../tooltip/tooltip';

import { getComponentColor } from '../../styles';

import { styles } from './carousel_close_icon_styles';

const useStyles = makeStyles(styles);

const CarouselCloseIconComponent = ({ onClose, color = 'dark' }) => {
    const classes = useStyles();
    const colorMotionProps = {color: getComponentColor(true, color, false, color || '#000')};
    return (
        <Tooltip title={<FormattedMessage id="Main.lang.close" defaultMessage="Fermer" />}>
            <motion.button
                className={classes.button}
                type="button"
                onClick={onClose}
                animate={{
                    color: colorMotionProps.color
                }}
            >
                <CloseIcon className={classes.icon} />
            </motion.button>
        </Tooltip>
    );
};

export const CarouselCloseIcon = CarouselCloseIconComponent;
