import React from 'react';

import { addDecorator, addParameters } from '@storybook/react';
import { DesignSystemProvider } from '../src/design_system_context/design_system_context';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { DEFAULT_THEME } from '../src/styles/theme';
import { ELEVATION_PROPS } from '../src/card/card_elevation_props';
import { createMuiTheme } from '@material-ui/core';

import '../src/styles/main.css';

export const theme = createMuiTheme({
    ...DEFAULT_THEME,
    shadows: ['none', ...new Array(40).fill(ELEVATION_PROPS[0])],
    spacing: 8,
    palette: Object.entries(DEFAULT_THEME.palette).reduce((acc, [name, values]) => {
        const accCopy = acc;
        accCopy[name].main = values[500];
        return accCopy;
    }, DEFAULT_THEME.palette),
});

addDecorator((story) => (
    <ThemeProvider theme={theme}>
        <DesignSystemProvider>{story()}</DesignSystemProvider>
    </ThemeProvider>
));

addParameters({
    options: {
        theme: theme,
    },
});
