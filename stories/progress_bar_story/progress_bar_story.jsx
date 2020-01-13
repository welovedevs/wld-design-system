import React from 'react';

import { number } from '@storybook/addon-knobs';

import { ProgressBar } from '../../src/progress_bar/progress_bar';

const ProgressBarStory = () => {
    const options = {
        range: true,
        min: 0,
        max: 100,
        step: 1
    };
    const value = number('Value', 20, options);
    return <ProgressBar {...{ value }} />;
};

export default ProgressBarStory;
