import createStyles from "@material-ui/styles/createStyles";

export const styles = createStyles({
    container: {
        height: 25,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
    },
    disabled: {
        '&, & $input': {
            cursor: 'not-allowed',
        },
    },
    track: {
        height: 1,
        width: '100%',
        backgroundColor: '#e2e2e2',
        overflow: 'hidden',
    },
    rail: {
        height: 1,
        width: '100%',
        backgroundColor: 'currentColor',
    },
    thumb: {
        height: 12,
        width: 12,
        borderRadius: '50%',
        backgroundColor: 'currentColor',
        boxShadow: '0 2px 10px 0 rgba(0, 0, 0, .3)',
        position: 'absolute',
        left: 0,
        top: 'calc(100% / 2 - (12px / 2))',
    },
    thumbChildrenContainer: {
        height: '100%',
        width: '100%',
        paddingTop: 10,
    },
    input: {
        opacity: 0,
        cursor: 'pointer',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        '&::-webkit-slider-thumb': {
            '-webkit-appearance': 'none',
        },
        '&:focus': {
            outline: 'none',
        },
        '&::-ms-track': {
            width: '100%',
            cursor: 'pointer',
            background: 'transparent',
            borderColor: 'transparent',
            color: 'transparent',
        },
    },
});
