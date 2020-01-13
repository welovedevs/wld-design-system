import React, { useCallback, useRef, useState } from 'react';

import injectSheet from 'react-jss';
import { select, number } from '@storybook/addon-knobs';

import { Slider } from '../../src/components/slider/slider';
import { PopperCard } from '../../src/components/popper_card/popper_card';

import styles from './slider_story_styles';

const DEFAULT_COLOR = 'primary';
const DEFAULT_MIN = 0;
const DEFAULT_MAX = 100;
const DEFAULT_STEP = 1;

const POSSIBLE_COLORS = {
    Primary: 'primary',
    Secondary: 'secondary',
    Tertiary: 'tertiary',
    Danger: 'danger',
    Safe: 'safe'
};

const SliderStory = ({ classes }) => {
    const color = select('Color', POSSIBLE_COLORS, DEFAULT_COLOR);
    const min = number('Min', DEFAULT_MIN);
    const max = number('Max', DEFAULT_MAX);
    const step = number('Step', DEFAULT_STEP);
    const [value, setValue] = useState(0);
    const [isFocused, setIsFocused] = useState(false);
    const handleFocus = useCallback(() => setIsFocused(true), []);
    const handleBlur = useCallback(() => setIsFocused(false), []);
    const thumbReference = useRef();

    const handleChange = useCallback(e => setValue(e.target.value), []);
    return (
        <div className={classes.container}>
            <Slider
                {...{
                    color,
                    value,
                    min,
                    max,
                    step,
                    thumbReference
                }}
                onChange={handleChange}
                onMouseDown={handleFocus}
                onMouseUp={handleBlur}
                thumbChildren={(
                    <PopperCard
                        className={classes.popperCard}
                        open={isFocused}
                        anchorElement={thumbReference.current}
                        popperProps={{
                            disablePortal: true,
                            modifiers: {
                                preventOverflow: {
                                    boundariesElement: 'viewport'
                                }
                            }
                        }}
                    >
                        {value}
                    </PopperCard>
                  )}
            />
        </div>
    );
};

export default injectSheet(styles)(SliderStory);
