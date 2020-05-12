import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import cn from 'classnames';
import Autosuggest from 'react-autosuggest';

import { createUseStyles } from 'react-jss';

import { TextField } from '../text_field/text_field';
import { PopperCard } from '../popper_card/popper_card';
import { Typography } from '../typography/typography';
import { ListItem } from '../list_item/list_item';

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
    renderNoSuggestion,
    maxLength = 10,
    value: propsValue = '',
    id,
    name,
    transformSuggestionValue = (props) => props && props.value,
    classes: additionalClasses = {},
    popperPlacement,
    ...other
}) => {
    const classes = useStyles();
    const inputReference = useRef();
    const [filteredSuggestions, setFilteredSuggetions] = useState([]);
    const [value, setValue] = useState(propsValue || '');
    const [focused, setFocused] = useState(false);

    useEffect(() => {
        setValue(propsValue);
    }, [propsValue]);

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
        [onChange, onSelect]
    );

    const setIsFocused = useCallback(() => setFocused(true), []);
    const setIsNotFocused = useCallback(() => setFocused(false), []);

    const inputProps = {
        id,
        name,
        placeholder,
        value,
        onChange: valueChanged,
        onFocus: setIsFocused,
        onBlur: setIsNotFocused,
    };
    const shouldShowNoResultComponent = useMemo(() => value && !filteredSuggestions?.length && focused, [
        value,
        filteredSuggestions,
        focused,
    ]);

    return (
        <>
            <Autosuggest
                suggestions={filteredSuggestions}
                focusInputOnSuggestionClick={false}
                getSuggestionValue={getSuggestionValue}
                onSuggestionsClearRequested={clearSuggestions}
                onSuggestionsFetchRequested={filterSuggestions}
                renderSuggestion={renderSuggestion}
                renderSuggestionsContainer={({ containerProps, children }) => (
                    <SuggestionsContainer
                        {...{
                            popperPlacement,
                            containerProps,
                            children,
                        }}
                        className={cn(classes.popperCard)}
                        popperCustomClasses={{ popper: additionalClasses.popper }}
                        anchorElement={inputReference.current}
                    />
                )}
                onSuggestionSelected={suggestionSelected}
                renderInputComponent={(props) => (
                    <TextField {...props} {...other} inputRef={inputReference} className={classes.field} />
                )}
                {...{ inputProps }}
            />
            {typeof renderNoSuggestion === 'function' &&
                renderNoSuggestion({
                    anchorElement: inputReference.current,
                    open: shouldShowNoResultComponent,
                })}
        </>
    );
};

const SuggestionsContainer = ({
    containerProps,
    popperPlacement,
    anchorElement,
    children,
    popperCustomClasses = {},
    className,
}) => {
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
                ...(popperPlacement && { placement: popperPlacement }),
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
        <Typography color="dark" classes={{ container: classes.predictionListItem }} primary={value} />
    </ListItem>
);
