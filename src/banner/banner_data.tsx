import CheckIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';

import React, { ElementType, ExoticComponent, ReactElement } from 'react';
import { PaletteColors } from '../styles/palette';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { SvgIconTypeMap } from '@material-ui/core/SvgIcon/SvgIcon';
import { WarningIcon } from '../assets/icons/warning_component';

export type BannerType = 'warning' | 'error' | 'success' | 'info' | 'default';

export const BANNER_DATA: {
    [key in BannerType]: {
        color: PaletteColors;
        icon?: ElementType | null;
    };
} = Object.freeze({
    warning: {
        color: 'warn',
        icon: WarningIcon,
    },
    error: {
        color: 'danger',
        icon: ErrorIcon,
    },
    success: {
        color: 'safe',
        icon: CheckIcon,
    },
    info: {
        color: 'primary',
        icon: InfoIcon,
    },
    default: {
        color: 'primary',
        icon: null,
    },
});
