import CheckIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';

import React, { ElementType } from 'react';
import { PaletteColors } from '../styles/palette';
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
