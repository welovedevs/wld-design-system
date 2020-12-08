import createStyles from '@material-ui/styles/createStyles';

type StylesKeys = 'container' | 'bar';

export type Classes = {
    [key in StylesKeys]?: string;
};

export const styles = createStyles({
    container: {
        height: 6,
        width: '100%',
        borderRadius: 100,
        backgroundColor: '#f0f0f0',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
    },
    bar: {
        backgroundColor: 'currentColor',
        height: '100%',
        width: '100%',
        borderRadius: 100,
    },
});
