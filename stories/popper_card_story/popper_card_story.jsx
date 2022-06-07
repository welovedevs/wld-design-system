import React, { useCallback, useState, useEffect, useRef } from 'react';

import { select } from '@storybook/addon-knobs';

import { Tooltip } from '../../src/tooltip/tooltip';

import { Button } from '../../src/button/button';
import { PopperCard } from '../../src/popper_card/popper_card';

export const PopperCardStory = (props
) => {
    const anchorElement = useRef();
    const [open, setOpen] = useState(false);
    const handleButtonClick = useCallback(
        (e) => {
            if (open) {
                setOpen(false);
            } else {
                setOpen(true);
            }
        },
        [open]
    );

    useEffect(() => {
        setTimeout(() => setOpen(true), 100);
    }, []);
    return (
        <div className="ds-w-[400px] ds-h-[150px] ds-flex ds-items-center ds-justify-center">
            <PopperCard
                {...{ anchorElement: anchorElement.current, open }}
                {...props}
            >
                <img src="https://cataas.com/cat/says/hello?size=50&color=red&width=50&height=50" alt="Le chat" />
                <a href={'https://google.fr'} target="_blank">
                    Link test FF
                </a>
            </PopperCard>
            <Button ref={anchorElement} color="primary" variant="contained" onClick={handleButtonClick}>
                {!open ? 'Ouvrir' : 'Fermer'}
            </Button>
            <Tooltip title={'click meee'}>
                <span>salut</span>
            </Tooltip>
        </div>
    );
};
