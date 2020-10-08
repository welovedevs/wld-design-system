import { createStyles, Theme } from '@material-ui/core/styles';

type StylesKeys = 'container';

export type Classes = {
    [key in StylesKeys]?: string;
};

export const styles = ({ spacing }: Theme) =>
    createStyles({
        container: {
            listStyleType: 'none',
            padding: 0,
            margin: 0,
        },
    });
