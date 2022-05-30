import { BANNER_DATA, BannerType } from './banner_data';

import { Theme } from '@mui/material/styles';

import createStyles from '@mui/styles/createStyles';

type StylesKeys = 'container';

export type Classes = {
    [key in StylesKeys]?: string;
};

export const styles = (theme: Theme) =>
    createStyles({
        container: ({ type }: { type?: BannerType; classes?: Classes }) => {
            const color = BANNER_DATA?.[type || 'warning']?.color ?? 'primary';
            return {
                // @ts-ignore
                color: (theme.palette?.[color] ?? theme.palette.primary)[500],
                width: '100%',
                padding: '25px 40px',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                '&::before': {
                    height: '100%',
                    width: '100%',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    backgroundColor: 'currentColor',
                    opacity: 0.15,
                    borderRadius: 5,
                    zIndex: 0,
                    content: "''",
                },
                '& > *': {
                    zIndex: 1,
                },
            };
        },
        iconContainer: {
            display: 'flex',
            marginRight: 30,
            '& > svg': {
                height: 60,
                width: 60,
                '& > g > path:last-child': {
                    fill: 'currentColor',
                },
            },
        },
        '@media screen and (max-width: 550px)': {
            iconContainer: {
                display: 'none',
            },
        },
        '@media screen and (max-width: 400px)': {
            container: {
                padding: 25,
            },
        },
    });
