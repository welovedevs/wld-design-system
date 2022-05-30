import {flexUtils} from '../styles/utils/styles_utils';

import createStyles from '@mui/styles/createStyles';

type StylesKeys = 'container' | 'typography'

export type Classes = {
    [key in StylesKeys]?: string;
};

const { center } = flexUtils;

export const styles = createStyles({
    container: {
        height: 'fit-content',
        width: 'fit-content',
        whiteSpace: 'nowrap',
        borderRadius: 100,
        margin: '10px 7.5px',
        padding: '12px 12px',
        color: '#fff',
        backgroundColor: 'currentColor',
        ...center,
    },
    typography: {
        display: 'flex',
        alignItems: 'center',
    },
});
