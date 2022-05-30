import createStyles from "@mui/styles/createStyles";

export const styles = createStyles({
    button: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        border: [1, 'solid', 'currentColor'],
        padding: 8,
        position: 'absolute',
        top: 8 * 2,
        right: 8 * 2,
        zIndex: 100,
    },
    icon: {
        height: 16,
        width: 'auto',
        color: 'currentColor',
    },
});
