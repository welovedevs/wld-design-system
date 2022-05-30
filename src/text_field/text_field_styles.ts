import { primary } from '../styles';
import createStyles from '@mui/styles/createStyles';

type StylesKeys = 'container' | 'input';

export type Classes = {
    [key in StylesKeys]?: string;
};

export const styles = createStyles({
    container: {
        width: 'fit-content',
        backgroundColor: '#fff',
        borderRadius: 5,
        display: 'flex',
        alignItems: 'center',
        padding: 0,
        overflow: 'hidden',
        border: '1px solid #f0f0f0',
    },
    multilineContainer: {
        padding: '17.5px 20px',
    },
    input: {
        backgroundColor: 'transparent',
        width: '100%',
        minHeight: 40,
        padding: '17.5px 20px',
        border: 'none',
        fontSize: 16,
        lineHeight: '24px',
        fontFamily: 'Avenir Next, Open sans , Arial',
        color: '#2f2f2f',
        display: 'flex',
        alignItems: 'center',
        borderRadius: 5,
        '&::placeholder': {
            color: '#afafaf',
        },
    },
    small: {
        padding: '8px 10px',
        minHeight: 24,
        lineHeight: '16px',
        fontSize: '16px',
    },
    multiline: {
        padding: '0 20px 0 0 ',
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
        border: '1px solid #c0c0c0',
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
        borderBottom: '1px solid #e8e8e8',
        borderRadius: 0,
        '& > $input': {
            paddingBottom: 10,
        },
    },
    underlinedDisabled: {},
    disabled: {
        cursor: 'not-allowed',
    },
    passwordFieldContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    icon: {
        width: 50,
        height: 50,
        marginLeft: 8,
    },
});
