import React, {useCallback, useState} from 'react';

import {createUseStyles} from 'react-jss';

import {Typography} from '../../../src/typography/typography';
import {AutoComplete} from '../../../src/autocomplete/autocomplete';

import styles from './autocomplete_story_styles';

const useStyles = createUseStyles(styles);

export const DefaultStory = ({  }) => {
    const classes= useStyles();
    const defaultSuggestions = [{ value: 'Autocomplete' }, { value: 'Butocomplete' }, { value: 'Cutocomplete' }];
    const [value, setValue] = useState('');
    const handleInputChange = useCallback(autocompleteValue => {
        setValue(autocompleteValue);
    }, []);
    return (
        <div className={classes.default}>
        <Typography component="h1" variant="h1">
        Default behaviour
    </Typography>
    <Typography component="h4" variant="h4">
        {`Autocomplete value: ${value}`}
    </Typography>
    <AutoComplete {...{ value }} onChange={handleInputChange} suggestions={defaultSuggestions} />
</div>
    );
};

export const CustomDataStory = ({  }) => {
    const classes= useStyles();
    const defaultSuggestions = [{ name: 'Autocomplete' }, { name: 'Butocomplete' }, { name: 'Cutocomplete' }];
    const [value, setValue] = useState('');
    const handleInputChange = useCallback(autocompleteValue => {
        setValue(autocompleteValue);
    }, []);
    return (
        <>
            <Typography component="h1" variant="h1">
                Custom data behaviour
            </Typography>
            <Typography component="h4" variant="h4">
                {`Autocomplete value: ${value}`}
            </Typography>
            <AutoComplete
                value={value}
                onChange={handleInputChange}
                suggestions={defaultSuggestions}
                getSuggestionValue={({ name }) => name}
                renderSuggestion={({ name }) => <div className={classes.suggestionEntry}>{name}</div>}
                filterFunction={needle => ({ name }) =>
                    needle && name && name.toLowerCase().includes(needle.toLowerCase())}
            />
        </>
    );
};


