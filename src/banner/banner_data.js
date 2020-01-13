import { CheckCircle as CheckIcon, Error as ErrorIcon, Info as InfoIcon } from '@material-ui/icons';

import { orange, danger, safe, primary } from '../styles/palettes';

import { ReactComponent as WarningIcon } from '../assets/icons/warning.svg';

export const BANNER_DATA = Object.freeze({
    warning: {
        color: orange[600],
        icon: WarningIcon
    },
    error: {
        color: danger[500],
        icon: ErrorIcon
    },
    success: {
        color: safe[500],
        icon: CheckIcon
    },
    info: {
        color: primary[500],
        icon: InfoIcon
    }
});
