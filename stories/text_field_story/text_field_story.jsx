import React, { useCallback, useState } from 'react';

import injectSheet from 'react-jss';
import { select } from '@storybook/addon-knobs';

import { TextField } from '../../src/text_field/text_field';

import styles from './text_field_story_styles';

const POSSIBLE_VARIANTS = {
    Raised: 'raised',
    Flat: 'flat',
    Underlined: 'underlined'
};

const TextFieldStory = () => {
    const [value, setValue] = useState('');
    const handleInputChange = useCallback(event => {
        setValue(event.target.value);
    }, []);
    const variant = select('Variant', POSSIBLE_VARIANTS, 'raised');
    return <TextField {...{ value, variant }} onChange={handleInputChange} />;
};

export default injectSheet(styles)(TextFieldStory);
