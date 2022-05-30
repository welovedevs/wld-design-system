import { Theme } from '@mui/material/styles';
import createStyles from '@mui/styles/createStyles';
import { dark } from '../styles/palette';
import { withCustomVerticalScrollbar } from '../styles';

type StylesKeys = 'container';

export type Classes = {
    [key in StylesKeys]?: string;
};

export const styles = ({ spacing }: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            height: '100%',
        },
        column: {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
        },
        allTechnologies: ({ isMobile }: any) => ({
            flex: 1.25,
            marginLeft: isMobile ? 0 : spacing(2),
            '@media screen and (max-width: 500px)': {
                width: '100%',
            },
        }),
        divider: {
            backgroundColor: dark[100],
            margin: spacing(0, 2, 0, 4),
        },
        technologiesList: {
            overflowY: 'auto',
            overflowX: 'hidden',
            ...(withCustomVerticalScrollbar() as any),
        },
        selectedTechnologies: {
            flex: 1,
        },
    });
