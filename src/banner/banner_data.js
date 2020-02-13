import CheckIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';

import {ReactComponent as WarningIcon} from '../assets/icons/warning.svg';

export const BANNER_DATA = Object.freeze({
    warning: {
        color: 'orange',
        icon: WarningIcon
    },
    error: {
        color: 'danger',
        icon: ErrorIcon
    },
    success: {
        color: 'safe',
        icon: CheckIcon
    },
    info: {
        color: 'primary',
        icon: InfoIcon
    },
    default: {
        color: 'primary'
    }
});
