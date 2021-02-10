import React, { useCallback, useState } from 'react';

import { select } from '@storybook/addon-knobs';

import makeStyles from '@material-ui/styles/makeStyles';
import { TextField } from '../../src/text_field/text_field';

import styles from './text_field_story_styles';

const POSSIBLE_VARIANTS = {
    Raised: 'raised',
    Flat: 'flat',
    Underlined: 'underlined',
};

export default { title: 'Textfield' };

const useStyles = makeStyles(styles);

export const TextFieldStory = () => {
    const classes = useStyles();

    const [value, setValue] = useState('');
    const handleInputChange = useCallback((event) => {
        setValue(event.target.value);
    }, []);
    const variant = select('Variant', POSSIBLE_VARIANTS, 'raised');

    return <TextField {...{ value, variant }} onChange={handleInputChange} />;
};

export const PasswordTextFieldStory = () => {
    const [value, setValue] = useState('');
    const handleInputChange = useCallback((event) => {
        setValue(event.target.value);
    }, []);
    const variant = select('Variant', POSSIBLE_VARIANTS, 'raised');

    return <TextField {...{ value, variant, type: 'password' }} onChange={handleInputChange} />;
};
