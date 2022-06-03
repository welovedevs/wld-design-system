import React from 'react';

import { create } from 'jss';
import jssDefaultPreset from 'jss-preset-default';

import { addDecorator, addParameters } from '@storybook/react';
import { DesignSystemProvider } from '../src/design_system_context/design_system_context';
import ThemeProvider from '@mui/styles/ThemeProvider';
import { DEFAULT_THEME } from '../src/styles/theme';
import { ELEVATION_PROPS } from '../src/card/card_elevation_props';
import { createTheme, adaptV4Theme } from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';
import MuiProvider from '@mui/styles/StylesProvider';

import '../src/styles/tailwind.css';
import './style.css';

const jssinstance = create(jssDefaultPreset());

export const theme = createTheme(
    adaptV4Theme({
        ...DEFAULT_THEME,
        shadows: ['none', ...new Array(40).fill(ELEVATION_PROPS[0])],
        spacing: 8,
        palette: Object.entries(DEFAULT_THEME.palette).reduce((acc, [name, values]) => {
            const accCopy = acc;
            accCopy[name].main = values[500];
            return accCopy;
        }, DEFAULT_THEME.palette),
    })
);
export const argTypes = { colors: { control: { options: Object.keys(DEFAULT_THEME.palette) } } };

addDecorator((story) => (
    <MuiProvider jss={jssinstance}>
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <DesignSystemProvider>{story()}</DesignSystemProvider>
            </ThemeProvider>
        </StyledEngineProvider>
    </MuiProvider>
));
