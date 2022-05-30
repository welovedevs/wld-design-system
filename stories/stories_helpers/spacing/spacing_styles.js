import createStyles from '@mui/styles/createStyles';

export const styles = createStyles({
    container: ({ value, spacing }) => ({
        height: spacing * value
    })
});
