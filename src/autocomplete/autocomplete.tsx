import React, {ReactElement, useCallback, useEffect, useMemo, useRef, useState} from 'react';

import cn from 'classnames';
import Autosuggest from 'react-autosuggest';

import { makeStyles } from '@material-ui/core/styles';

import { TextField } from '../text_field/text_field';
import { PopperCard } from '../popper_card/popper_card';
import { Typography } from '../typography/typography';
import { ListItem } from '../list_item/list_item';

import { Classes, styles } from './autocomplete_styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Popper, { PopperProps } from '@material-ui/core/Popper';
import { ExoticComponent } from 'react';
import { PopperCustomClasses } from '../popper_card/popper_card_styles';

const defaultGetSuggestionValue = ({ value }: { value: any }) => value;
const defaultFilterSuggestion = (inputValue: string) => ({ value }: { value: any }) =>
    inputValue && value && value.toLowerCase().includes(inputValue.toLowerCase());

const useStyles = makeStyles(styles);

const DEFAULT_FUNCTION = () => {};

interface Props {
    placeholder?: string;
    suggestions: any[];
    onChange: (value: any) => void;
    onSelect: (value: any) => void;
    getSuggestionValue: (value: any) => any;
    renderSuggestion: (value: any) => "string" | ReactElement | JSX.Element;
    filterFunction?: (input: string) => (value: any) => boolean;
    renderNoSuggestion?: (...attibutes: any[]) => "string" | ReactElement | JSX.Element;
    maxLength?: number;
    value: string;
    id?: string;
    name?: string;
    transformSuggestionValue?: (value: any) => any;
    classes?: Classes;
    popperPlacement?: PopperProps['placement'];
}
export function AutoComplete({
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
}: Props) {
    const classes = useStyles({ classes: additionalClasses });
    const inputReference = useRef();
    const [filteredSuggestions, setFilteredSuggetions] = useState<any[]>([]);
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
    };

    return (
        <ClickAwayListener onClickAway={setIsNotFocused}>
            <Autosuggest
                suggestions={filteredSuggestions}
                focusInputOnSuggestionClick={false}
                getSuggestionValue={getSuggestionValue}
                onSuggestionsClearRequested={clearSuggestions}
                onSuggestionsFetchRequested={filterSuggestions}
                renderSuggestion={renderSuggestion}
                renderSuggestionsContainer={(props) => {
                    const { containerProps, children } = props;
                    if (value && !filteredSuggestions.length && typeof renderNoSuggestion === 'function') {
                        return renderNoSuggestion({ anchorElement: inputReference.current, open: focused });
                    }
                    return (
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
                    );
                }}
                onSuggestionSelected={suggestionSelected}
                renderInputComponent={(props) => (
                    <TextField {...props} {...other} inputRef={inputReference} className={classes.field} />
                )}
                {...{ inputProps }}
            />
        </ClickAwayListener>
    );
}

interface SuggestionContainerProps {
    containerProps?: any;
    popperPlacement?: PopperProps['placement'];
    anchorElement?: PopperProps['anchorEl'];
    popperCustomClasses?: PopperCustomClasses;
    className: string;
}
const SuggestionsContainer: React.FC<SuggestionContainerProps> = ({
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
            classes={popperCustomClasses}
            {...{ anchorElement, containerProps }}
        >
            {children || lastChildrenRendered.current}
        </PopperCard>
    );
};

const DefaultSuggestionsRender: React.FC<{ value: string; classes: any }> = ({ value, classes }) => (
    <ListItem className={classes.listItem} key={`prediction_${value}`} button>
        <Typography color="dark" classes={{ container: classes.predictionListItem }}>
            {value}
        </Typography>
    </ListItem>
);
