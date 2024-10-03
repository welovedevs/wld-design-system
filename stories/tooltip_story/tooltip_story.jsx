import React, { useCallback } from 'react';

import { select, text } from '@storybook/addon-knobs';

import { Tooltip } from '../../src/tooltip/tooltip';

const POSSIBLE_PLACEMENT = Object.freeze({
    Top: 'top',
    Right: 'right',
    Bottom: 'bottom',
    Left: 'left',
});

const DEFAULT_TITLE = 'Hello there!';

export const TooltipStory = () => {
    const placement = select('Placement', POSSIBLE_PLACEMENT, POSSIBLE_PLACEMENT.Top);
    const title = text('Title', DEFAULT_TITLE);
    const handleInteraction = useCallback(() => {
        console.log('Logging interaction without interfering with tooltip!');
    }, []);
    return (
        <Tooltip
            open
            {...{
                placement,
                title,
            }}
        >
            <button
                type="button"
                onMouseEnter={handleInteraction}
                onMouseLeave={handleInteraction}
                onFocus={handleInteraction}
                onBlur={handleInteraction}
                onClick={handleInteraction}
            >
                Tooltip
            </button>
        </Tooltip>
    );
};

