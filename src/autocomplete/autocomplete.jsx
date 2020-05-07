import React, { useCallback, useEffect, useRef, useState } from 'react';

import Autosuggest from 'react-autosuggest';
import { createUseStyles } from 'react-jss';
import cn from 'classnames';

import { ListItem, ListItemText } from '@material-ui/core';
import { TextField } from '../text_field/text_field';
import { PopperCard } from '../popper_card/popper_card';

import styles from './autocomplete_styles';

const defaultGetSuggestionValue = ({ value }) => value;
const defaultFilterSuggestion = (inputValue) => ({ value }) =>
    inputValue && value && value.toLowerCase().includes(inputValue.toLowerCase());

const useStyles = createUseStyles(styles);

const DEFAULT_FUNCTION = () => {};
export const AutoComplete = ({
    placeholder,
    suggestions,
    onChange = DEFAULT_FUNCTION,
    onSelect = DEFAULT_FUNCTION,
    getSuggestionValue = defaultGetSuggestionValue,
    renderSuggestion: renderSuggestionProps,
    filterFunction = defaultFilterSuggestion,
    noResultsComponent,
    maxLength = 10,
    value: propsValue,
    id,
    name,
    transformSuggestionValue = (props) => props && props.value,
    classes: additionalClasses = {},
}) => {
    const classes = useStyles();
    const inputReference = useRef();
    const [filteredSuggestions, setFilteredSuggetions] = useState([]);
    const [value, setValue] = useState(propsValue || '');
    const [selected, setSelected] = useState(false);

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

    const valueChanged = useCallback(
        (e, { newValue }) => {
            setSelected(false);
            setValue(newValue || '');
            onChange(newValue);
        },
        [onChange]
    );
    const suggestionSelected = useCallback(
        (e, newValue) => {
            const { suggestionValue } = newValue;
            setValue(suggestionValue);
            setSelected(true);
            onChange && onChange(suggestionValue);
            onSelect && onSelect(newValue);
        },
        [onChange, onSelect]
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
            alwaysRenderSuggestions
            getSuggestionValue={getSuggestionValue}
            onSuggestionsFetchRequested={filterSuggestions}
            renderSuggestion={renderSuggestion}
            renderSuggestionsContainer={({ containerProps, children, query }) => {
                if (query && !children && noResultsComponent) {
                    return React.cloneElement(noResultsComponent, { anchorElement: inputReference.current });
                }
                if(selected){
                    return null;
                }
                return (
                    <SuggestionsContainer
                        {...{
                            containerProps,
                            children,
                        }}
                        className={cn(classes.popperCard)}
                        popperCustomClasses={{ popper: additionalClasses.popper }}
                        anchorElement={inputReference.current}
                    />
                );
            }}
            onSuggestionSelected={suggestionSelected}
            inputProps={inputProps}
            renderInputComponent={(props) => (
                <TextField {...props} inputRef={inputReference} className={classes.field} />
            )}
        />
    );
};

const SuggestionsContainer = ({ containerProps, anchorElement, children, popperCustomClasses = {}, className }) => {
    const lastChildrenRendered = useRef(children);
    useEffect(() => {
        if (children) {
            lastChildrenRendered.current = children;
        }
    }, [children]);
    return (
        <PopperCard
            className={className}
            open={Boolean(children)}
            popperProps={{
                modifiers: {
                    preventOverflow: {
                        boundariesElement: 'viewport',
                    },
                },
            }}
            customClasses={popperCustomClasses}
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
