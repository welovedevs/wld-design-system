import { createStyles } from '@material-ui/core';

export const styles = createStyles({
    container: {
        padding: [5, 20],
        display: 'flex',
        '& > svg': {
            maxHeight: 22,
            maxWidth: 22,
        },
    },
});
