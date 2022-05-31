import createStyles from '@mui/styles/createStyles';

type StylesKeys = 'tooltip' | 'popper'
export type Classes = {
    [key in StylesKeys]?: string;
};

export const styles = createStyles({
    tooltip: {
        lineHeight: 1.5,
        fontSize: 13,
        padding: '12.5px 15px',
        backgroundColor: 'rgba(0, 0, 0, .85)',
        color: '#fff',
        fontWeight: '500' as any,
        maxWidth: 375,
    },
    popper: {
        zIndex: 20000,
    },
});
