import { flexUtils } from '../styles/utils/styles_utils';
import createStyles from "@material-ui/styles/createStyles";

const { center } = flexUtils;

export const styles = createStyles({
    container: {
        height: 'fit-content',
        width: 'fit-content',
        whiteSpace: 'nowrap',
        borderRadius: 100,
        margin: [10, 7.5],
        padding: [12, 22],
        color: '#fff',
        backgroundColor: 'currentColor',
        ...center,
    },
    typography: {
        display: 'flex',
        alignItems: 'center',
    },
});
