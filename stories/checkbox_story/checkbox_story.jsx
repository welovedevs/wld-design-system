import React, { useCallback, useState } from 'react';

import injectSheet from 'react-jss';
import { select } from '@storybook/addon-knobs';

import { Checkbox } from '../../src/components/checkbox/checkbox';

import styles from './checkbox_story_styles';

const CHECK_BOXES = Object.freeze({
    primary: {
        checked: true,
        color: 'primary'
    },
    secondary: {
        checked: true,
        color: 'secondary'
    },
    disabled: {
        checked: true,
        disabled: true
    }
});

const CheckBoxStory = ({ classes }) => {
    const [checkboxes, setCheckboxes] = useState(CHECK_BOXES);
    const variant = select(
        'Variant',
        {
            raised: 'raised',
            outlined: 'outlined'
        },
        'raised'
    );
    return (
        <div className={classes.container}>
            {Object.entries(checkboxes).map(([id, props]) => (
                <CheckboxComponent
                    key={`checkbox_${id}`}
                    {...{
                        id,
                        checkboxes,
                        setCheckboxes
                    }}
                    {...{ variant }}
                    {...props}
                />
            ))}
        </div>
    );
};

const CheckboxComponent = ({ id, checkboxes, setCheckboxes, ...other }) => {
    const handleChange = useCallback(event =>
        setCheckboxes({
            ...checkboxes,
            [id]: {
                ...checkboxes[id],
                checked: event.target.checked
            }
        }));
    return <Checkbox onChange={handleChange} {...other} />;
};

export default injectSheet(styles)(CheckBoxStory);
