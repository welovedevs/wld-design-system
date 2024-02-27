import React, { useCallback, useState } from 'react';

import { Typography } from '../../../src/typography/typography';

import { AutoComplete } from '../../../src/autocomplete/autocomplete';

export const DefaultStory = ({}) => {
    const defaultSuggestions = [
        { value: 'Autocomplete' },
        { value: 'Butocomplete' },
        { value: 'Batocomplete' },
        { value: 'Cutocomplete' },
    ];
    const [value, setValue] = useState('');
    const handleInputChange = useCallback((_, option) => {
        setValue(option.value);
    }, []);

    return (
        <div className={''}>
            <Typography component="h1" variant="h1">
                Default behaviour
            </Typography>
            <Typography component="h4" variant="h4">
                {`Autocomplete value: ${value}`}
            </Typography>
            <AutoComplete
                className="ds-w-[500px]"
                options={defaultSuggestions}
                getOptionLabel={(option) => option?.value || ''}
                onChange={handleInputChange}
            />
        </div>
    );
};

export const MultipleStory = ({}) => {
    const defaultSuggestions = [
        { value: 'Autocomplete' },
        { value: 'Butocomplete' },
        { value: 'Batocomplete' },
        { value: 'Cutocomplete' },
    ];
    const [value, setValue] = useState('');
    const [selectedSuggestions, setSelectedSuggestions] = useState([]);
    const handleInputChange = useCallback((_, inputValue) => {
        setValue(inputValue);
    }, []);

    const handleSelect = useCallback(
        (_, options) => {
            setSelectedSuggestions(options);
        },
        [selectedSuggestions]
    );

    return (
        <div>
            <Typography component="h1" variant="h1">
                Multiple behaviour
            </Typography>
            <Typography component="h4" variant="h4">
                {`Autocomplete value: ${value}`}
            </Typography>
            <Typography component="h4" variant="h4">
                {`Selected values: ${JSON.stringify(selectedSuggestions)}`}
            </Typography>
            <AutoComplete
                multiple
                options={defaultSuggestions}
                getOptionLabel={(option) => option?.value || ''}
                onChange={handleSelect}
                onInputChange={handleInputChange}
            />
        </div>
    );
};

export const CustomDataStory = ({}) => {
    const defaultSuggestions = [
        { name: 'Autocomplete' },
        { name: 'Butocomplete' },
        { name: 'Batocomplete' },
        { name: 'Cutocomplete' },
    ];
    const [value, setValue] = useState('');
    const handleInputChange = useCallback((_, option) => {
        setValue(option.name);
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
                options={defaultSuggestions}
                getOptionLabel={(option) => option?.name || ''}
                onChange={handleInputChange}
            />
        </>
    );
};
export const NoResultsStory = ({}) => {
    const defaultSuggestions = [];
    const [value, setValue] = useState('');
    const handleInputChange = useCallback((_, option) => {
        setValue(option);
    }, []);
    return (
        <>
            <Typography component="h1" variant="h1">
                Custom data behaviour
            </Typography>
            <Typography component="h4" variant="h4">
                {`Autocomplete value: ${value}`}
            </Typography>
            <AutoComplete options={defaultSuggestions} onChange={handleInputChange} />
        </>
    );
};
