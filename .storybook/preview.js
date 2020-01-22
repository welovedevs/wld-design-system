import React from 'react';

import { addDecorator, addParameters } from "@storybook/react";
import StoryContainer from "./story_container/story_container";
import { DesignSystemProvider } from "../src/design_system_context/design_system_context";
import {theme} from "./wld-theme";

addDecorator(story => (
    <StoryContainer>
        <DesignSystemProvider>{story()}</DesignSystemProvider>
    </StoryContainer>
));

addParameters({
    options: {
        theme: theme
    }
});
