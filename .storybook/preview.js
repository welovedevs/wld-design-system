import React from 'react';


import {addDecorator, addParameters} from '@storybook/react';
import {DesignSystemProvider} from '../src/design_system_context/design_system_context';
import {DEFAULT_THEME} from '../src/styles/theme';
import {ELEVATION_PROPS} from '../src/card/card_elevation_props';
import {createTheme, adaptV4Theme} from '@mui/material';

import '../src/styles/tailwind.css';
import './style.css';


export const theme = createTheme(adaptV4Theme({
    ...DEFAULT_THEME,
    shadows: ['none', ...new Array(40).fill(ELEVATION_PROPS[0])],
    spacing: 8,
    palette: Object.entries(DEFAULT_THEME.palette).reduce((acc, [name, values]) => {
        const accCopy = acc;
        accCopy[name].main = values[500];
        return accCopy;
    }, DEFAULT_THEME.palette),
}));
export const argTypes = {colors: {control: {options: Object.keys(DEFAULT_THEME.palette)}}};

addDecorator((story) => (<DesignSystemProvider>{story()}</DesignSystemProvider>));
