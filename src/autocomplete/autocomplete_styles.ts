import createStyles from '@mui/styles/createStyles';

type StylesKeys = 'popper' | 'field';

export type Classes = {
    [key in StylesKeys]?: string;
};

export const styles = createStyles({
    popper: {},
    popperCard: {
        maxWidth: 600,
        border: 'none',
        '& > ul': {
            listStyleType: 'none',
            margin: 0,
            padding: 0,
        },
    },
    listItem: {
        borderRadius: 5,
    },
    field: {},
});
