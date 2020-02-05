import React from 'react';

import { createUseStyles } from 'react-jss';
import { FormattedMessage } from 'react-intl';
import { animated, useSpring } from 'react-spring';

import CloseIcon from '@material-ui/icons/Close';

import { Tooltip } from '../../tooltip/tooltip';

import { getComponentColor } from '../../../../style/js';

import { styles } from './carousel_close_icon_styles';

const useStyles = createUseStyles(styles);

const CarouselCloseIconComponent = ({ onClose, color = 'dark' }) => {
    const classes = useStyles();
    const colorSpringProps = useSpring({
        color: getComponentColor(true, color, false, 500, color || '#000')
    });
    return (
        <Tooltip title={<FormattedMessage id="Main.lang.close" defaultMessage="Fermer" />}>
            <animated.button
                className={classes.button}
                type="button"
                onClick={onClose}
                style={{
                    color: colorSpringProps.color
                }}
            >
                <CloseIcon className={classes.icon} />
            </animated.button>
        </Tooltip>
    );
};

export const CarouselCloseIcon = CarouselCloseIconComponent;
