import { flexUtils } from '../../styles/utils/styles_utils.js';

const { center } = flexUtils;

export default {
    container: {
        height: 'fit-content',
        width: 'fit-content',
        maxWidth: '100%',
        borderRadius: 5,
        margin: [10, 7.5],
        padding: [12, 22],
        color: '#fff',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        border: 'none',
        backgroundColor: 'unset',
        ...center
    },
    withColor: {},
    applyToChildrenSameColorAsMyself: {
        '&$withColor': {
            color: 'currentColor'
        },
        '&:not($withColor)': {
            color: '#4e4e4e'
        },
        '& > $typography, & > $brightLayer': {
            color: 'currentColor'
        }
    },
    lightenBrightLayerAndTypography: {
        '& > $brightLayer, & > $typography': {
            color: '#fff'
        }
    },
    contained: {
        backgroundColor: 'currentColor',
        '&$withColor ': {
            extend: 'lightenBrightLayerAndTypography'
        }
    },
    text: {
        extend: 'applyToChildrenSameColorAsMyself'
    },
    outlined: {
        extend: 'text',
        border: [1, 'solid', 'currentColor']
    },
    disabled: {
        cursor: 'not-allowed'
    },
    size_small: {
        padding: [10, 14],
        '& > $typography': {
            fontSize: 12
        }
    },
    brightLayer: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'currentColor',
        zIndex: 1
    },
    typography: {
        display: 'flex',
        alignItems: 'center'
    }
};
