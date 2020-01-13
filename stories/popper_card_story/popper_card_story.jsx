import React, { useCallback, useState } from 'react';

import injectSheet from 'react-jss';
import { select } from '@storybook/addon-knobs';

import { Button } from '../../src/components/button/button';
import { PopperCard } from '../../src/components/popper_card/popper_card';

import styles from './popper_card_story_styles';

const PopperCardComponent = () => {
    const [anchorElement, setAnchorElement] = useState(null);
    const [open, setOpen] = useState(false);
    const handleButtonClick = useCallback(
        e => {
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
            Left: 'left'
        },
        'bottom'
    );
    return (
        <>
            <PopperCard
                {...{ anchorElement, open }}
                popperProps={{
                    placement
                }}
            >
                <img src="https://cataas.com/cat/says/hello?size=50&color=red&width=300&height=300" alt="Le chat" />
            </PopperCard>
            <Button color="primary" variant="contained" onClick={handleButtonClick}>
                {!open ? 'Ouvrir' : 'Fermer'}
            </Button>
        </>
    );
};

export default injectSheet(styles)(PopperCardComponent);
