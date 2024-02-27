import CheckIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';

import { ElementType } from 'react';
import { PaletteColors } from '../styles/palette';

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
        color: 'indigo',
        icon: InfoIcon,
    },
    default: {
        color: 'primary',
        icon: null,
    },
});
