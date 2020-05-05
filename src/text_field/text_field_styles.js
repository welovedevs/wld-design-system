import { primary } from '../styles/palettes';

export default {
    container: {
        width: 'fit-content',
        backgroundColor: '#fff',
        borderRadius: 5,
        display: 'flex',
        alignItems: 'center',
        padding: 0,
        overflow: 'hidden',
        border: [1, 'solid', '#f0f0f0'],
    },
    multilineContainer: {
        padding: [17.5, 20],
    },
    input: {
        backgroundColor: 'transparent',
        width: '100%',
        minHeight: 40,
        padding: [17.5, 20],
        border: 'none',
        fontSize: 16,
        lineHeight: '24px',
        fontFamily: ['Roboto', 'Open sans', 'Arial'],
        color: '#2f2f2f',
        display: 'flex',
        alignItems: 'center',
        borderRadius: 5,
        '&::placeholder': {
            color: '#afafaf',
        },
    },
    multiline: {
        padding: [0, 20, 0, 0],
        '&::-webkit-scrollbar-track': {
            border: 0,
        },
        '&::-webkit-scrollbar': {
            width: 4,
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: primary[300],
            borderRadius: 100,
        },
    },
    fullWidth: {
        width: '100%',
    },
    flat: {
        backgroundColor: '#f9f9f9',
    },
    flatDisabled: {
        backgroundColor: '#ededed',
        border: [1, 'solid', '#c0c0c0'],
        extend: 'disabled',
        '&>input': {
            color: '#959595',
            cursor: 'inherit',
        },
    },
    raised: {},
    raisedDisabled: {},
    underlined: {
        backgroundColor: 'transparent',
        border: 'none',
        borderBottom: [1, 'solid', '#e8e8e8'],
        borderRadius: 0,
        '& > $input': {
            paddingBottom: 10,
        },
    },
    underlinedDisabled: {},
    disabled: {
        cursor: 'not-allowed',
    },
};
