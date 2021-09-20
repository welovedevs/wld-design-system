import { flexUtils } from '../styles/utils/styles_utils';

const { center } = flexUtils;

import { createStyles } from '@material-ui/core/styles';

type StylesKeys  = 'container' | 'typography';
export type ButtonVariants = 'contained' | 'outlined' | 'text' | 'raised'

export type Classes = {
    [key in StylesKeys]?: string;
};

export const styles = createStyles({
    container: {
        height: 'fit-content',
        width: 'fit-content',
        maxWidth: '100%',
        borderRadius: 5,
        margin: "10px 7.5px",
        padding: "12px 22px",
        color: '#fff',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        border: 'none',
        backgroundColor: 'unset',
        ...center,
    },
    withColor: {},
    applyToChildrenSameColorAsMyself: {
        '&$withColor': {
            color: 'currentColor',
        },
        '&:not($withColor)': {
            color: '#4e4e4e',
        },
        '& > $typography, & > $brightLayer': {
            color: 'currentColor',
        },
    },
    lightenBrightLayerAndTypography: {
        '& > $brightLayer, & > $typography': {
            color: '#fff',
        },
    },
    contained: {
        backgroundColor: 'currentColor',
        '&$withColor ': {
            extend: 'lightenBrightLayerAndTypography',
        },
    },
    raised: {
        backgroundColor: 'currentColor',
        '&$withColor ': {
            extend: 'lightenBrightLayerAndTypography',
        },
    },
    text: {
        extend: 'applyToChildrenSameColorAsMyself',
    },
    outlined: {
        extend: 'text',
        border: "1px solid currentColor",
    },
    disabled: {
        cursor: 'not-allowed',
    },
    size_small: {
        padding:"10px 14px",
        '& > $typography': {
            fontSize: 12,
        },
    },  size_xs: {
        padding:"6px 8px",
        '& > $typography': {
            fontSize: 11,
        },
    },
    brightLayer: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'currentColor',
        zIndex: 1,
    },
    typography: {
        display: 'flex',
        alignItems: 'center',
    },
});
