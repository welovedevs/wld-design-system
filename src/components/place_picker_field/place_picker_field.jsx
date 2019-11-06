import React, { useCallback, useEffect, useRef, useState } from 'react';

import injectSheet from 'react-jss';

import cn from 'classnames';

import { List, ListItem, ListItemText } from '@material-ui/core';
import { TextField } from '../text_field/text_field';
import { PopperCard } from '../popper_card/popper_card';

import { usePlacesPredictionsFromInput } from '../../../utils/hooks/use_places_predictions_from_input';

import styles from './place_picker_field_styles';


const PlacePickerFieldComponent = ({
    onChange,
    onFocus,
    onBlur,
    onSelect,
    value: receivedValue,
    textFieldProps,
    popperCardProps,
    classes
}) => {
    const geocoder = useRef(null);
    const fieldRef = useRef();
    const [input, setInput] = useState(receivedValue || '');
    const [preventBlur, setPreventBlur] = useState(false);
    const [anchorElement, setAnchorElement] = useState(null);
    const [openPopper, setPopperOpenState] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const predictions = usePlacesPredictionsFromInput(input);
    useEffect(() => {
        setInput(receivedValue || '');
        if (fieldRef.current) {
            fieldRef.current.blur();
        }
    }, [receivedValue, fieldRef.current]);

    useEffect(() => {
        if (typeof google !== 'undefined') {
            geocoder.current = new google.maps.Geocoder();
        }
    }, []);

    useEffect(() => {
        if (input && predictions && isFocused && !openPopper && fieldRef.current && receivedValue !== input) {
            setAnchorElement(fieldRef.current);
            setPopperOpenState(true);
        } else if (anchorElement && (!isFocused || !predictions || !input)) {
            setInput(receivedValue);
            setPopperOpenState(false);
        }
    }, [isFocused, predictions, anchorElement, input, openPopper, receivedValue]);

    const handleInputChange = useCallback(
        event => {
            if (typeof onChange === 'function') {
                onChange(event);
            }
            setInput(event.target.value);
        },
        [onChange]
    );

    const handleFocus = useCallback(
        (...parameters) => {
            if (typeof onFocus === 'function') {
                onFocus(...parameters);
            }
            setIsFocused(true);
        },
        [onFocus]
    );

    const handleBlur = useCallback(
        (...parameters) => {
            if (typeof onBlur === 'function') {
                onBlur(...parameters);
            }
            if (!preventBlur) {
                setIsFocused(false);
            }
        },
        [preventBlur]
    );

    const lastItemsRendered = useRef();
    useEffect(() => {
        if (predictions) {
            lastItemsRendered.current = predictions;
        }
    }, [predictions]);
    return (
        <>
            <PopperCard
                className={cn(classes.popperCard, 'places-picker-popin')}
                open={openPopper}
                {...{ anchorElement }}
                {...popperCardProps}
            >
                <List className={classes.list}>
                    {(predictions || lastItemsRendered.current || [])
                        .filter(item => item)
                        .map(({ description, place_id: placeId }) => (
                            <PlaceItem
                                {...{
                                    placeId,
                                    geocoder,
                                    setIsFocused,
                                    onSelect,
                                    setPreventBlur,
                                    fieldRef,
                                    description,
                                    setInput,
                                    classes
                                }}
                            />
                        ))}
                </List>
            </PopperCard>
            <TextField
                containerRef={fieldRef}
                className={classes.container}
                value={input}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                {...textFieldProps}
            />
        </>
    );
};

const PlaceItem = ({
    placeId,
    geocoder,
    onSelect,
    setPreventBlur,
    fieldRef,
    setInput,
    setIsFocused,
    description,
    classes
}) => {
    const handleMouseDown = useCallback(() => setPreventBlur(true), [setPreventBlur]);
    const handleMouseUp = useCallback(() => setPreventBlur(false), [setPreventBlur]);
    const handleClick = useCallback(() => {
        setInput('');
        if (setIsFocused) {
            setIsFocused(false);
        }
        fieldRef.current.blur();
        if (typeof onSelect !== 'function' || !geocoder.current) {
            return;
        }
        geocoder.current.geocode({ placeId }, ([{ formatted_address: address, geometry }], status) => {
            if (status) {
                if (geometry && geometry.location) {
                    const { lat, lng } = geometry.location;
                    onSelect({
                        location: address,
                        latLng: `${lat()},${lng()}`,
                        placeId
                    });
                }
            }
        });
    }, [onSelect, geocoder, placeId, fieldRef, setInput]);
    return (
        <ListItem
            className={classes.listItem}
            key={`prediction_${placeId}`}
            button
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onClick={handleClick}
        >
            <ListItemText
                classes={{
                    root: classes.predictionListItem
                }}
                primary={description}
            />
        </ListItem>
    );
};

export const PlacePickerField = injectSheet(styles)(PlacePickerFieldComponent);
