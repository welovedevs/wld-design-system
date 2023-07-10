import React, { ChangeEvent, ReactElement, useCallback, useEffect, useRef, useState } from 'react';

// @ts-ignore
import Autosuggest from 'react-autosuggest';

import { TextField, TextFieldProps } from '../text_field/text_field';
import { PopperCard } from '../popper_card/popper_card';
import { Typography } from '../typography/typography';
import { ListItem } from '../list_item/list_item';

import ClickAwayListener from '@mui/material/ClickAwayListener';
import { PopperProps } from '@mui/material/Popper';
import { PopperCustomClasses } from '../popper_card/popper_card_styles';
import { Checkbox } from '../checkbox/checkbox';

export interface SuggestionSelectedEventData<TSuggestion> {
    suggestion: TSuggestion;
    suggestionValue: string;
    suggestionIndex: number;
    sectionIndex: number | null;
    method: 'click' | 'enter';
}

interface Props<T> {
    multiple?: boolean;
    selectedSuggestions?: string[];
    placeholder?: string;
    suggestions: T[];
    onChange: (value: any) => void;
    onSelect: (data: SuggestionSelectedEventData<T>) => void;
    getSuggestionValue: (value: any) => any;
    renderSuggestion?: (value: any) => 'string' | ReactElement | JSX.Element;
    renderSuggestionsContainer?: (value: any) => 'string' | ReactElement | JSX.Element;
    renderInputComponent?: (value: any) => 'string' | ReactElement | JSX.Element;
    filterFunction?: (input: string) => (value: any) => boolean;
    renderNoSuggestion?: (...attibutes: any[]) => 'string' | ReactElement | JSX.Element;
    maxLength?: number;
    value: string;
    id?: string;
    name?: string;
    transformSuggestionValue?: (value: any) => any;
    classes?: { popper?: string; field?: string };
    popperProps?: Partial<PopperProps>;
}

const defaultGetSuggestionValue = ({ value }: { value: any }) => value;
const defaultFilterSuggestion = (inputValue: string) => ({ value }: { value: any }) =>
    inputValue && value && value.toLowerCase().includes(inputValue.toLowerCase());

const DEFAULT_FUNCTION = () => {};

interface SuggestionContainerProps {
    containerProps?: any;
    popperProps?: Partial<PopperProps>;
    anchorElement: PopperProps['anchorEl'];
    popperCustomClasses?: PopperCustomClasses;
    className: string;
}

const SuggestionsContainer: React.FC<React.PropsWithChildren<SuggestionContainerProps>> = ({
    containerProps,
    popperProps,
    children,
    anchorElement,
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
            popperProps={popperProps}
            classes={popperCustomClasses}
            anchorElement={anchorElement}
            {...{ containerProps }}
        >
            {children || lastChildrenRendered.current}
        </PopperCard>
    );
};

const DefaultSuggestionsRender: React.FC<{ value: string }> = ({ value }) => (
    <ListItem className={'ds-rounded-md'} key={`prediction_${value}`} button>
        <Typography color="dark">{value}</Typography>
    </ListItem>
);

const DefaultMultipleSuggestionsRender: React.FC<{ value: string; classes: any; selectedValues: string[] }> = ({
    value,
    classes,
    selectedValues,
}) => (
    <ListItem className={'ds-rounded-md'} key={`prediction_${value}`} button>
        <Checkbox className={'ds-mr-2'} checked={selectedValues.includes(value)} />
        <Typography color="dark" classes={{ container: classes.predictionListItem }}>
            {value}
        </Typography>
    </ListItem>
);

const AutoCompleteComponent = <T extends any>({
    multiple,
    placeholder,
    suggestions,
    onChange = DEFAULT_FUNCTION,
    onSelect = DEFAULT_FUNCTION,
    getSuggestionValue = defaultGetSuggestionValue,
    renderSuggestion: renderSuggestionProps,
    renderSuggestionsContainer: renderSuggestionsContainerProps,
    renderInputComponent: renderInputComponentProps,
    filterFunction = defaultFilterSuggestion,
    renderNoSuggestion,
    maxLength = 10,
    value: propsValue = '',
    id,
    name,
    transformSuggestionValue = (props: any) => props && props.value,
    classes = {},
    popperProps,
    ...other
}: Omit<TextFieldProps, 'onSelect' | 'onChange' | 'multiple'> & Props<T>) => {
    const inputReference = useRef<any>();

    const [filteredSuggestions, setFilteredSuggetions] = useState<any[]>([]);
    const [value, setValue] = useState(propsValue || '');
    const [focused, setFocused] = useState(false);

    useEffect(() => {
        setValue(propsValue);
    }, [propsValue]);

    useEffect(() => {
        const filter = suggestions.filter(filterFunction(value));
        setFilteredSuggetions(filter.slice(0, maxLength));
    }, []);

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
    const renderSuggestionsContainer =
        renderSuggestionsContainerProps ||
        ((props) => {
            const { containerProps, children } = props;
            if (value && !filteredSuggestions.length && typeof renderNoSuggestion === 'function') {
                return renderNoSuggestion({ anchorElement: inputReference.current, open: focused });
            }
            return (
                <SuggestionsContainer
                    anchorElement={inputReference.current}
                    popperProps={{ ...popperProps }}
                    {...{
                        containerProps,
                        children,
                    }}
                    className={'ds-max-w-[600px]'}
                    popperCustomClasses={{
                        popper: `${classes?.popper}`,
                        container: 'ds-overflow-auto ds-scrollbar ds-max-h-[400px]',
                    }}
                />
            );
        });
    const renderInputComponent =
        renderInputComponentProps ||
        (({ onChange, size, ...props }) => (
            <TextField
                {...props}
                {...other}
                inputRef={inputReference}
                className={classes?.field ?? ''}
                onChange={onChange as any}
            />
        ));

    const filterSuggestions = useCallback(
        (data: any) => {
            const { value: inputValue, reason } = data;
            if (multiple && reason === 'suggestion-selected') {
                return;
            }
            if (!inputValue) {
                setFilteredSuggetions(suggestions);
                return;
            }
            const filter = suggestions.filter(filterFunction(inputValue));
            setFilteredSuggetions(filter.slice(0, maxLength));
        },
        [suggestions, multiple]
    );

    const clearSuggestions = useCallback(() => {
        setFilteredSuggetions([]);
    }, []);

    const valueChanged = useCallback(
        (e: ChangeEvent, data: any) => {
            const { newValue, method } = data;
            if (!multiple || (multiple && method === 'type')) {
                setValue(newValue || '');
                onChange(newValue);
            }
        },
        [onChange, multiple]
    );

    const [valueSelected, setValueSelected] = useState(false);
    const suggestionSelected = useCallback(
        (_: any, newValue: SuggestionSelectedEventData<any>) => {
            const { suggestionValue } = newValue;
            if (!multiple) {
                setValue(suggestionValue);
                onChange && onChange(suggestionValue);
            }
            onSelect && onSelect(newValue);
            setValueSelected(true);
        },
        [onChange, onSelect, multiple]
    );

    const setIsFocused = useCallback(() => setFocused(true), []);
    const setIsNotFocused = useCallback(() => setFocused(false), []);

    useEffect(() => {
        if (!multiple) {
            return;
        }
        if (valueSelected) {
            inputReference.current && inputReference.current.focus();
            setValueSelected(false);
            setIsFocused();
        }
    }, [multiple, valueSelected, inputReference.current, setIsFocused]);

    const inputProps = {
        id,
        name,
        placeholder,
        value,
        onChange: valueChanged,
        onFocus: setIsFocused,
    };

    return (
        <ClickAwayListener onClickAway={setIsNotFocused}>
            <Autosuggest
                alwaysRenderSuggestions={multiple ?? false}
                suggestions={filteredSuggestions}
                focusInputOnSuggestionClick={multiple ?? false}
                getSuggestionValue={getSuggestionValue}
                onSuggestionsClearRequested={clearSuggestions}
                onSuggestionsFetchRequested={filterSuggestions}
                renderSuggestion={renderSuggestion}
                theme={{
                    suggestionsList: 'ds-list-none ds-p-0 ds-m-0 overflow-auto',
                }}
                renderSuggestionsContainer={renderSuggestionsContainer}
                onSuggestionSelected={suggestionSelected}
                renderInputComponent={renderInputComponent}
                {...{ inputProps }}
            />
        </ClickAwayListener>
    );
};

const MultipleAutoComplete = <T extends any>({
    renderSuggestion: renderSuggestionProps,
    selectedSuggestions: selectedSuggestionsProps = [],
    classes = {},
    transformSuggestionValue = (props: any) => props && props.value,
    onSelect: onSelectProps,
    ...other
}: Omit<TextFieldProps, 'onSelect' | 'onChange' | 'multiple'> & Props<T>) => {
    const [selectedSuggestions, setSelectedSuggestions] = useState<string[]>([]);
    useEffect(() => {
        setSelectedSuggestions(selectedSuggestionsProps);
    }, [selectedSuggestionsProps]);

    const handleSelectSuggestion = useCallback(
        (newValue: SuggestionSelectedEventData<any>) => {
            const { suggestionValue } = newValue;
            if (selectedSuggestions.includes(suggestionValue)) {
                setSelectedSuggestions((selectedSuggestions) =>
                    selectedSuggestions.filter((selectedSuggestion) => selectedSuggestion !== suggestionValue)
                );
            } else {
                setSelectedSuggestions((selectedSuggestions) => [...selectedSuggestions, suggestionValue]);
            }
            onSelectProps && onSelectProps(newValue);
        },
        [selectedSuggestions, onSelectProps]
    );

    const renderSuggestion =
        renderSuggestionProps ||
        ((props: any) => (
            <DefaultMultipleSuggestionsRender
                {...{
                    classes,
                    value: transformSuggestionValue(props),
                    selectedValues: selectedSuggestions,
                }}
            />
        ));

    return <AutoCompleteComponent {...{ renderSuggestion, onSelect: handleSelectSuggestion }} {...other} />;
};

const WithMultipleAutoComplete = <T extends any>({
    multiple = false,
    ...other
}: Omit<TextFieldProps, 'onSelect' | 'onChange' | 'multiple'> & Props<T>) => {
    if (multiple) {
        return <MultipleAutoComplete {...{ multiple }} {...other} />;
    }
    return <AutoCompleteComponent {...other} />;
};

export const AutoComplete = WithMultipleAutoComplete;
