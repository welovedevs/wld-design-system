import { Theme } from '@mui/material/styles';

import createStyles from '@mui/styles/createStyles';

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
