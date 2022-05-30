import React from 'react';

import { ButtonExamples } from './button_examples';
import ThemeProvider from '@mui/styles/ThemeProvider';

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

export const ThemedButtons = () => {
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <ButtonExamples variant="contained" />
            </ThemeProvider>
        </StyledEngineProvider>
    );
};
