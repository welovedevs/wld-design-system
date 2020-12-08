import React from 'react';

import { addDecorator, addParameters } from '@storybook/react';
import StoryContainer from './story_container/story_container';
import { DesignSystemProvider } from '../src/design_system_context/design_system_context';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { DEFAULT_THEME } from '../src/styles/theme';
import { ELEVATION_SPRING_PROPS } from '../src/card/card_elevation_spring_props';
import {createMuiTheme} from "@material-ui/core";

export const theme = createMuiTheme({
    ...DEFAULT_THEME,
    shadows: ['none', ...new Array(40).fill(ELEVATION_SPRING_PROPS[0])],
    spacing: 8,
    palette: Object.entries(DEFAULT_THEME.palette).reduce((acc, [name, values]) => {
        const accCopy = acc;
        accCopy[name].main = values[500];
        return accCopy;
    }, DEFAULT_THEME.palette),
});

addDecorator((story) => (
    <StoryContainer>
        <ThemeProvider theme={theme}>
            <DesignSystemProvider>{story()}</DesignSystemProvider>
        </ThemeProvider>
    </StoryContainer>
));

addParameters({
    options: {
        theme: theme,
    },
});
