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
        fontFamily: 'Avenir Next, open sans, Roboto, Arial',
    },
});
