import { createStyles } from '@material-ui/core/styles';

type StylesKeys = 'container';

export type Classes = {
    [key in StylesKeys]?: string;
};

export const styles = createStyles({
    container: {
        width: 'fit-content',
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 20,
        fontFamily: 'Avenir Next, open sans, Arial',
    },
    variant_flat: {
        backgroundColor: '#f9f9f9',
        border: `1px solid #f0f0f0`,
    },
});
