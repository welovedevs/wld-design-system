import React, { useCallback, useState } from 'react';

import { select } from '@storybook/addon-knobs';

import { Switch } from '../../src/switch/switch';

const EXAMPLE_COLORS = Object.freeze({
    Primary: 'primary',
    Secondary: 'secondary',
    Tertiary: 'tertiary',
    Safe: 'safe',
    Danger: 'danger',
    None: null
});

export const SwitchStory = () => {
    const [checked, setChecked] = useState(false);
    const handleChange = useCallback(event => {
        setChecked(event.target.checked);
    });
    const baseColor = select('Base color', EXAMPLE_COLORS, null);
    const checkedColor = select('Checked color', EXAMPLE_COLORS, 'safe');
    return <Switch {...{ checked }} color={checked ? checkedColor : baseColor} onChange={handleChange} />;
};

