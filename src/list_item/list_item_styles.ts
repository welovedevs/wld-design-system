import createStyles from '@mui/styles/createStyles';

type StylesKeys = 'button' | 'container' | 'typography';

export type Classes = {
    [key in StylesKeys]?: string;
};

export const styles = createStyles({
    container: {
        padding: '15px 20px',
        borderRadius: 5,
        display: 'flex',
        alignItems: 'center',
    },
    button: {
        cursor: 'pointer',
    },
    typography: {
        display: 'flex',
        alignItems: 'center',
    },
});
