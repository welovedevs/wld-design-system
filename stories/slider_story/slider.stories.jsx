import React, { useCallback, useEffect, useRef, useState } from 'react';

import { Slider } from '../../src';
import { PopperCard } from '../../src';

import styles from './slider_story_styles';
import makeStyles from '@mui/styles/makeStyles';

const DEFAULT_COLOR = 'primary';
const DEFAULT_MIN = 0;
const DEFAULT_MAX = 100;
const DEFAULT_STEP = 0.5;

const POSSIBLE_COLORS = {
    Primary: 'primary',
    Secondary: 'secondary',
    Tertiary: 'tertiary',
    Danger: 'danger',
    Safe: 'safe',
};

export default { title: 'Sliders' };

const useStyles = makeStyles(styles);

const SliderWithPopper = ({
    color,
    name,
    value,
    onChange,
    step = DEFAULT_STEP,
    min = DEFAULT_MIN,
    max = DEFAULT_MAX,
    debounce = 500,
    classes: receivedClasses = {},
}) => {
    const classes = useStyles();

    const [isFocused, setIsFocused] = useState(false);
    const [localValue, setLocalValue] = useState(value);

    const handleFocus = useCallback(() => setIsFocused(true), []);
    const handleBlur = useCallback(() => setIsFocused(false), []);

    const timer = useRef();
    const thumbReference = useRef();

    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    const handleChange = useCallback(
        (e) => {
            e.persist();
            const newValue = e.target.value;
            if (timer.current) {
                clearTimeout(timer.current);
            }
            setLocalValue(newValue);
            if (debounce) {
                timer.current = setTimeout(() => onChange(e), debounce);
            } else {
                onChange(e);
            }
        },
        [onChange]
    );

    return (
        <Slider
            classes={{
                container: classes.container,
            }}
            step={step}
            color={color}
            name={name}
            value={localValue}
            onChange={handleChange}
            min={min}
            max={max}
            onMouseDown={handleFocus}
            onMouseUp={handleBlur}
            thumbReference={thumbReference}
            thumbChildren={
                <PopperCard
                    open={isFocused}
                    anchorElement={thumbReference.current}
                    popperProps={{
                        disablePortal: true,
                        modifiers: {
                            preventOverflow: {
                                boundariesElement: 'viewport',
                            },
                            hide: {
                                enabled: false,
                            },
                        },
                    }}
                    customClasses={{
                        container: classes.sliderPopperCard,
                        arrowContainer: classes.sliderPopperCardArrowContainer,
                    }}
                >
                    {localValue}
                </PopperCard>
            }
        />
    );
};

export const DemoSlider = SliderWithPopper;
