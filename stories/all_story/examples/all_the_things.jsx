import { Banner, Button, Checkbox, Slider, Switch, Tag, Typography, TextField } from '../../../src';
import React from 'react';
import { styles } from './all_the_things_styles';
import { DEFAULT_THEME } from '../../../src/styles/theme';
import makeStyles from '@material-ui/styles/makeStyles';
import ThemeProvider from '@material-ui/styles/ThemeProvider';

const useStyles = makeStyles(styles);
const theme = {
    palette: {
        primary: {
            '50': '#eeeff1',
            '100': '#dde0e2',
            '200': '#bbc0c6',
            '300': '#99a1a9',
            '400': '#77818d',
            '500': '#556270',
            '600': '#444e5a',
            '700': '#333b43',
            '800': '#22272d',
            '900': '#111416',
            contrastDefaultColor: 'light',
        },
        secondary: {
            '50': '#edfaf9',
            '100': '#dcf5f3',
            '200': '#b8ebe7',
            '300': '#95e1dc',
            '400': '#71d7d0',
            '500': '#4ecdc4',
            '600': '#3ea49d',
            '700': '#2f7b76',
            '800': '#1f524e',
            '900': '#102927',
            contrastDefaultColor: 'light',
        },
        tertiary: {
            '50': '#f9fef0',
            '100': '#f4fde0',
            '200': '#e9fbc1',
            '300': '#ddf8a2',
            '400': '#d2f683',
            '500': '#c7f464',
            '600': '#9fc350',
            '700': '#77923c',
            '800': '#506228',
            '900': '#283114',
            contrastDefaultColor: 'light',
        },
    },
};
export const AllTheThings = () => {
    const classes = useStyles();
    const colors = ['primary', 'secondary', 'tertiary'];
    const variants = ['default', 'outlined', 'contained'];
    const components = [
        { Component: Button, value: 'Button' },
        { Component: Checkbox, props: { checked: true } },
        { Component: Slider, props: { classes: { container: classes.aslider }, min: 0, max: 10, value: 4 } },
        { Component: Switch },
        { Component: Tag, value: 'Tag' },
        { Component: Typography, value: 'Tag' },
    ];

    return (
        <div>
            {components.map(({ Component, value, props }) => (
                <>
                    <div key={`${Component.name}`} className={classes.container}>
                        {Component.name}
                        {colors.map((color) =>
                            variants.map((variant) => (
                                <Component
                                    {...props}
                                    key={`${Component.name}_${variant}_${color}`}
                                    color={color}
                                    variant={variant}
                                >
                                    {value}
                                </Component>
                            ))
                        )}
                    </div>
                    <ThemeProvider theme={theme}>
                        <div key={`${Component.name}`} className={classes.container}>
                            {Component.name}
                            {colors.map((color) =>
                                variants.map((variant, index) => (
                                    <Component
                                        {...props}
                                        key={`${Component.name}_${variant}_${color}`}
                                        color={color}
                                        variant={variant}
                                    >
                                        {value}
                                    </Component>
                                ))
                            )}
                        </div>
                    </ThemeProvider>
                </>
            ))}
          {/*  <ThemeProvider theme={DEFAULT_THEME}>
                <Banner type="info">Without Theme</Banner>
                <Banner type="success">Success</Banner>
                <Banner type="warning">Warn</Banner>
            </ThemeProvider>
            <ThemeProvider theme={theme}>
                <Banner type="info">With Theme</Banner>
            </ThemeProvider>*/}
        </div>
    );
};
