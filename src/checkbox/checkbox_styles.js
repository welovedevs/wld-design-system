import { flexUtils } from '../styles/utils/styles_utils';

const { center } = flexUtils;

export default {
    container: {
        height: 24,
        width: 24,
        position: 'relative',
        borderRadius: 5,
        margin: 10,
        padding: 3,
        cursor: 'pointer',
        overflow: 'hidden',
        ...center,
    },
    raised: {
        backgroundColor: 'currentColor',
        '& $checkIcon': {
            fill: '#fff',
        },
    },
    outlined: {
        border: [1, 'solid', 'currentColor'],
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
};
