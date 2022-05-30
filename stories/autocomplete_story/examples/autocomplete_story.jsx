import React, { useCallback, useState } from 'react';
import makeStyles from '@mui/styles/makeStyles';

import { Typography } from '../../../src/typography/typography';

import { AutoComplete } from '../../../src/autocomplete/autocomplete';
import styles from './autocomplete_story_styles';
import { Button, PopperCard } from '../../../src';

const useStyles = makeStyles(styles);

export const DefaultStory = ({}) => {
    const classes = useStyles();
    const defaultSuggestions = [
        { value: 'Autocomplete' },
        { value: 'Butocomplete' },
        { name: 'Batocomplete' },
        { value: 'Cutocomplete' },
    ];
    const [value, setValue] = useState('');
    const handleInputChange = useCallback((autocompleteValue) => {
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

export const CustomDataStory = ({}) => {
    const classes = useStyles();
    const defaultSuggestions = [
        { name: 'Autocomplete' },
        { name: 'Butocomplete' },
        { name: 'Batocomplete' },
        { name: 'Cutocomplete' },
    ];
    const [value, setValue] = useState('');
    const handleInputChange = useCallback((autocompleteValue) => {
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
                filterFunction={(needle) => ({ name }) =>
                    needle && name && name.toLowerCase().includes(needle.toLowerCase())}
            />
        </>
    );
};
export const NoResultsStory = ({}) => {
    const classes = useStyles();
    const defaultSuggestions = [
        { name: 'Autocomplete' },
        { name: 'Butocomplete' },
        { name: 'Batocomplete' },
        { name: 'Cutocomplete' },
    ];
    const [value, setValue] = useState('');
    const handleInputChange = useCallback((autocompleteValue) => {
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
                renderNoSuggestion={({ open, anchorElement }) => (
                    <PopperCard
                        open={open}
                        {...{ anchorElement }}
                    >
                        <Button
                            color="primary"
                            onClick={() => {
                                alert('ok');
                            }}
                        >
                            No Results
                        </Button>
                    </PopperCard>
                )}
                renderSuggestion={({ name }) => <div className={classes.suggestionEntry}>{name}</div>}
                filterFunction={(needle) => ({ name }) => {
                    let matches = needle && name && name.toLowerCase().includes(needle.toLowerCase());
                    console.log({ needle, name, matches });
                    return matches;
                }}
            />
        </>
    );
};
