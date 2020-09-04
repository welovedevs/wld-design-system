import { dark } from '../styles/palette';
import createStyles from '@material-ui/styles/createStyles';
import { Theme } from '@material-ui/core';

type StylesKeys = "container"


export type Classes = {
    [key in StylesKeys]?: string;
};

export type TypographyVariants =
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'body1'
    | 'body2'
    | 'body3'
    | 'tag'
    | 'button'
    | 'wld'
    | 'wld1'
    | 'wld2'
    | 'wld3'
    | 'wld4'
    | 'wld5'
    | 'wld6'
    | 'helper'
    | 'label';
export const styles = (theme: Theme) =>
    createStyles({
        container: {
            fontFamily: 'Avenir Next, Roboto, Open sans, Arial',
            color: dark[400],
        },
        heading: {
            color: dark[500],
            margin: 0,
        },
        h1: {
            extend: 'heading',
            fontSize: 54,
            lineHeight: '72px',
            fontWeight: 900 as any,
        },
        h2: {
            extend: 'heading',
            fontSize: 40,
            lineHeight: '52px',
            fontWeight: 700 as any,
        },
        h3: {
            extend: 'heading',
            fontSize: 22,
            lineHeight: '27px',
            fontWeight: 500 as any,
        },
        h4: {
            extend: 'heading',
            fontWeight: 400 as any,
            fontSize: 18,
            lineHeight: '24px',
        },
        h5: {
            extend: 'heading',
            fontWeight: 400 as any,
        },
        h6: {
            extend: 'heading',
            fontWeight: 400 as any,
        },
        body1: {
            fontSize: 16,
            lineHeight: '20px',
        },
        body2: {
            fontSize: 14,
            lineHeight: '18px',
        },
        body3: {
            fontSize: 12,
            lineHeight: '16px',
        },
        tag: {
            fontSize: 12,
            textTransform: 'uppercase',
            fontWeight: 700 as any,
            letterSpacing: '1px',
        },
        button: {
            fontSize: 14,
            textTransform: 'uppercase',
            fontWeight: 500,
            letterSpacing: '.8px',
        },
        wld: {
            width: 'fit-content',
            padding: '8px 16px',
            borderRadius: 5,
            textAlign: 'center',
            textTransform: 'uppercase',
            fontWeight: 900,
            backgroundColor: '#fff',
            transform: 'skewY(-5deg)',
            transformOrigin: 'bottom left',
        },
        wld1: {
            extend: 'wld',
            fontSize: 54,
            lineHeight: '62px',
            padding: '12px 28px',
        },
        wld2: {
            extend: 'wld',
            fontSize: 40,
            lineHeight: '50px',
            padding: '12px 24px',
        },
        wld3: {
            extend: 'wld',
            fontSize: 30,
            lineHeight: '44px',
            padding: '11px 22px',
        },
        wld4: {
            extend: 'wld',
            fontSize: 22,
            lineHeight: '38x',
            padding: '10px 20px',
        },
        wld5: {
            extend: 'wld',
            fontSize: 16,
            lineHeight: '30px',
            padding: '9px 18px',
        },
        wld6: {
            extend: 'wld',
            fontSize: 13,
            lineHeight: '26px',
            padding: theme.spacing(1, 2),
        },
        helper: {
            fontSize: 13,
            marginTop: 15,
        },
        label: {
            extend: 'body2',
            marginBottom: 8,
        }
    });
