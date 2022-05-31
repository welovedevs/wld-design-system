import React, {useCallback, useState} from 'react';

import {select} from '@storybook/addon-knobs';

import {Tooltip} from '../../src/tooltip/tooltip';

import {Button} from '../../src/button/button';
import {PopperCard} from '../../src/popper_card/popper_card';

export const PopperCardStory = () => {
    const [anchorElement, setAnchorElement] = useState(null);
    const [open, setOpen] = useState(false);
    const handleButtonClick = useCallback(
        (e) => {
            if (open) {
                setOpen(false);
            } else {
                setAnchorElement(e.currentTarget);
                setOpen(true);
            }
        },
        [open]
    );
    const placement = select(
        'Placement',
        {
            Bottom: 'bottom',
            Top: 'top',
            Right: 'right',
            Left: 'left',
        },
        'bottom'
    );
    return (
        <>
            <PopperCard
                {...{anchorElement, open}}
                popperProps={{
                    placement,
                }}
            >
                <img src="https://cataas.com/cat/says/hello?size=50&color=red&width=300&height=300" alt="Le chat"/>
                <a href={'https://google.fr'} target="_blank">
                    Link test FF
                </a>
            </PopperCard>
                <Button color="primary" variant="contained" onClick={handleButtonClick}>
                    {!open ? 'Ouvrir' : 'Fermer'}
                </Button>
            <Tooltip title={'click meee'}>
                <span>salut</span>

            </Tooltip>
        </>
    );
};
