import { flexUtils } from '../styles/utils/styles_utils';

const { center } = flexUtils;
import { createStyles } from '@material-ui/core/styles';

type StylesKeys = 'container' | 'input';

export type Classes = {
    [key in StylesKeys]?: string;
};

export const styles = createStyles({
    container: {
        height: 24,
        width: 24,
        position: 'relative',
        borderRadius: 5,
        margin: 10,
        padding: 3,
        cursor: 'pointer',
        overflow: 'hidden',
        boxShadow:
            'rgba(0, 0, 0, 0.1) 0px -1px 1px 0px, rgba(0, 0, 0, 0.1) 1px 0px 1px 0px, rgba(0, 0, 0, 0.1) -1px 0px 1px 0px, rgba(0, 0, 0, 0.1) 0px 1px 1px 0px',
        ...center,
    },
    raised: {
        backgroundColor: 'currentColor',
        '& $checkIcon': {
            fill: '#fff',
        },
    },
    outlined: {
        border: '1px solid currentColor',
    },
    disabled: {
        cursor: 'not-allowed',
    },
    isRadio: {
        '&, & > $brightLayer': {
            borderRadius: '50%',
        },
    },
    brightLayer: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: '#fff',
        zIndex: 1,
    },
    checkIcon: {
        height: '100%',
        width: 'auto',
        fill: 'currentColor',
    },
    input: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        opacity: 0,
        cursor: 'inherit',
        padding: 0,
        margin: 0,
        zIndex: 2,
    },
});
