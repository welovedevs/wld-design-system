import { useCallback, useMemo, useState } from 'react';

import { useMediaQuery } from '@mui/material';

type Handlers = {
    onClick?: (...parameters: any) => void;
    onMouseEnter?: (...parameters: any) => void;
    onMouseLeave?: (...parameters: any) => void;
    onFocus?: (...parameters: any) => void;
    onBlur?: (...parameters: any) => void;
};
export const useOpenerState = ({
    mobileWidth = 560,
    useClickOnMobile,
    defaultHandlers,
}: { mobileWidth?: number; useClickOnMobile?: boolean; defaultHandlers?: { onClick?: () => void } } = {}): [
    boolean,
    Handlers,
    { setOpened: () => void; setClosed: () => void; toggle: (value: boolean) => void }
] => {
    const [open, setOpen] = useState(false);
    const setOpened = useCallback(() => setOpen(true), []);
    const setClosed = useCallback(() => setOpen(false), []);
    const toggle = useCallback(() => setOpen(!open), [open]);
    const handleClick = useCallback(() => {
        if (typeof defaultHandlers?.onClick === 'function') {
            defaultHandlers?.onClick();
        }
        toggle();
    }, [defaultHandlers, toggle]);
    const isMobile = useMediaQuery(`(max-width: ${mobileWidth}px)`, { defaultMatches: true });
    const eventsHandlerElementProps = useMemo<Handlers>(
        () => ({
            ...(isMobile &&
                useClickOnMobile && {
                    onClick: handleClick,
                }),
            ...((!isMobile || !useClickOnMobile) && {
                onMouseEnter: setOpened,
                onMouseLeave: setClosed,
                onFocus: setOpened,
                onBlur: setClosed,
            }),
        }),
        [isMobile, setOpened, setClosed, toggle]
    );

    return [open, eventsHandlerElementProps, { setOpened, setClosed, toggle }];
};
