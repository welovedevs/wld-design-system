import React from 'react';

import { IntlProvider } from 'react-intl';
import {configure, addDecorator, addParameters} from '@storybook/react';
import StoryContainer from "./story_container/story_container";

import { DesignSystemProvider } from '../src/design_system_context/design_system_context';

import wldTheme from './wld-theme';

import './styles/global.css';

addParameters({
    options: {
        theme: wldTheme
    }
});

addDecorator(story => <StoryContainer>{story()}</StoryContainer>);
addDecorator(story => <DesignSystemProvider>{story()}</DesignSystemProvider>);

// Automatically import all files ending in *.stories.js
configure(require.context('../stories', true, /\.stories\.jsx$/), module);
