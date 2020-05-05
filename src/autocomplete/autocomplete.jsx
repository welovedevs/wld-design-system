import React, { useCallback, useEffect, useRef, useState } from 'react';

import Autosuggest from 'react-autosuggest';
import injectSheet from 'react-jss';

import { ListItem, ListItemText } from '@material-ui/core';
import { TextField } from '../text_field/text_field';
import { PopperCard } from '../popper_card/popper_card';

import styles from './autocomplete_styles';

const defaultGetSuggestionValue = ({ value }) => value;
const defaultFilterSuggestion = (inputValue) => ({ value }) =>
    inputValue && value && value.toLowerCase().includes(inputValue.toLowerCase());

const AutocompleteComponent = ({
    placeholder,
    suggestions,
    onChange,
    onSelect,
    getSuggestionValue = defaultGetSuggestionValue,
    renderSuggestion: renderSuggestionProps,
    filterFunction = defaultFilterSuggestion,
    maxLength = 10,
    value: propsValue,
    id,
    name,
    transformSuggestionValue = (props) => props && props.value,
    classes,
}) => {
    const inputReference = useRef();
    const [filteredSuggestions, setFilteredSuggetions] = useState([]);
    const [value, setValue] = useState(propsValue || '');
    const renderSuggestion =
        renderSuggestionProps ||
        ((props) => (
            <DefaultSuggestionsRender
                {...{
                    classes,
                    value: transformSuggestionValue(props),
                }}
            />
        ));

    const filterSuggestions = useCallback(
        ({ value: inputValue }) => {
            const filter = suggestions.filter(filterFunction(inputValue));
            setFilteredSuggetions(filter.slice(0, maxLength));
        },
        [suggestions]
    );

    const clearSuggestions = useCallback(() => {
        setFilteredSuggetions([]);
    }, []);

    const valueChanged = useCallback(
        (e, { newValue }) => {
            setValue(newValue || '');
            onChange(newValue);
        },
        [onChange]
    );
    const suggestionSelected = useCallback(
        (e, newValue) => {
            const { suggestionValue } = newValue;
            setValue(suggestionValue);
            onChange && onChange(suggestionValue);
            onSelect && onSelect(newValue);
        },
        [onChange,onSelect]
    );

    const inputProps = {
        id,
        name,
        placeholder,
        value,
        onChange: valueChanged,
    };
    return (
        <Autosuggest
            suggestions={filteredSuggestions}
            focusInputOnSuggestionClick={false}
            getSuggestionValue={getSuggestionValue}
            onSuggestionsFetchRequested={filterSuggestions}
            onSuggestionsClearRequested={clearSuggestions}
            renderSuggestion={renderSuggestion}
            renderSuggestionsContainer={({ containerProps, children }) => (
                <SuggestionsContainer
                    {...{
                        containerProps,
                        children,
                        classes,
                    }}
                    anchorElement={inputReference.current}
                />
            )}
            onSuggestionSelected={suggestionSelected}
            inputProps={inputProps}
            renderInputComponent={(props) => (
                <TextField {...props} inputRef={inputReference} className={classes.field} />
            )}
        />
    );
};

const SuggestionsContainer = ({ containerProps, anchorElement, children, classes }) => {
    const lastChildrenRendered = useRef(children);
    useEffect(() => {
        if (children) {
            lastChildrenRendered.current = children;
        }
    }, [children]);
    return (
        <PopperCard
            className={classes.popperCard}
            open={Boolean(children)}
            popperProps={{
                modifiers: {
                    preventOverflow: {
                        boundariesElement: 'viewport',
                    },
                },
            }}
            {...{ anchorElement, containerProps }}
        >
            {children || lastChildrenRendered.current}
        </PopperCard>
    );
};

const DefaultSuggestionsRender = ({ value, classes }) => (
    <ListItem className={classes.listItem} key={`prediction_${value}`} button>
        <ListItemText classes={{ root: classes.predictionListItem }} primary={value} />
    </ListItem>
);

export const AutoComplete = injectSheet(styles)(AutocompleteComponent);
