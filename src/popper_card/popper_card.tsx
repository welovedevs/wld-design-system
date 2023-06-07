import React, { useCallback, useMemo, useState, useRef } from 'react';

import cn from 'classnames';

import ClickAwayListener from '@mui/material/ClickAwayListener';
import Popper, { PopperProps } from '@mui/material/Popper';
import { Card } from '../card/card';

import { PopperCustomClasses } from './popper_card_styles';
import { SpeechBubbleArrow } from '../assets/icons/speech_bubble_arrow_component';
import merge from 'lodash/merge';
import { PopperPlacementType } from "@mui/material";


interface Props {
    className?: string;
    anchorElement: any;
    open?: boolean;
    onClose?: () => void;
    popperProps?: Omit<PopperProps, 'open' | 'children' | 'anchorElement'>;
    structured?: boolean;
    onClickAway?: () => void;
    dismissArrow?: boolean;
    classes?: PopperCustomClasses;
    customClasses?: PopperCustomClasses;
    containerProps?: any;
}

export const PopperCard: React.FC<Props> = ({
                                                className,
                                                anchorElement,
                                                open,
                                                onClose,
                                                popperProps,
                                                structured,
                                                onClickAway,
                                                dismissArrow = false,
                                                customClasses: oldCustomClasses = {},
                                                classes: receivedClasses = {},
                                                containerProps = {},
                                                children,
                                            }) => {
    const mergedClasses = useMemo(() => merge({}, oldCustomClasses, receivedClasses), [
        JSON.stringify(oldCustomClasses),
        JSON.stringify(receivedClasses),
    ]);
    const classes = mergedClasses;
    const [arrowReference, setArrowReference] = useState(null);
    return (
        <Popper
            open={open}
            {...containerProps}
            {...popperProps}
            className={cn(
                'ds-z-[100]',
                !open && 'ds-pointer-events-none ds-top-0 ds-left-0',
                receivedClasses.popper,
                containerProps.className
            )}
            anchorEl={anchorElement}
            modifiers={[
                {
                    name: 'flip',
                    enabled: true,
                },
                {
                    name: 'preventOverflow',
                    enabled: true,
                    options: {
                        padding: 8,
                    },
                },
                {
                    name: 'offset',
                    options: {
                        offset: [0, 16], // décaler le popper de 10px vers le bas
                    },
                },
                {
                    name: 'arrow',
                    enabled: true,
                    options: {
                        element: arrowReference,
                    },
                },
                ...((popperProps && popperProps.modifiers) || []),
            ]}
        >
            {({placement}) => (
                <Content
                    {...{
                        placement,
                        className,
                        setArrowReference,
                        structured,
                        dismissArrow,
                        onClickAway,
                        classes,
                    }}
                >
                    {children}
                </Content>
            )}

        </Popper>
    );
};

interface PopperContentProps {
    className?: string;
    dismissArrow?: boolean;
    setArrowReference: (...parameters: any[]) => void;
    onClickAway?: (...parameters: any[]) => void;
    structured?: boolean;
    classes: any;
    placement: PopperPlacementType;
}

const Content: React.FC<PopperContentProps> = ({
                                                   className,
                                                   dismissArrow,
                                                   setArrowReference,
                                                   placement,
                                                   onClickAway,
                                                   structured,
                                                   classes,
                                                   children,
                                               }) => {
    const handleClickAway = useCallback(
        (...parameters) => {
            if (typeof onClickAway === 'function') {
                onClickAway(...parameters);
            }
        },
        [onClickAway]
    );

    const content = (
        <div>
            {!dismissArrow && (

                <div className={'ds-z-10'} ref={setArrowReference} style={{
                    bottom: placement.includes("bottom") ? "calc(100% + 16px)" : placement.includes("top") ? 0 : undefined,
                    right: placement.includes("left") ? 9 : placement.includes("right") ? "calc(100% + 25px)" : undefined
                }}>
                    <div className={"ds-leading-none"} style={{
                        position: 'absolute',
                        transform: placement.includes("bottom") ? "rotate(0deg)" :
                            placement.includes("top") ? "rotate(180deg)" :
                                placement.includes("right") ? "rotate(-90deg)" :
                                    placement.includes("left") ? "rotate(90deg)" : undefined,
                        left: placement.includes("bottom") ? -16 : undefined,
                        top: placement.includes("right") ? -10 : undefined,
                        bottom: placement.includes("left") ? -10 : undefined,
                        right: placement.includes("top") ? -19 : undefined,
                    }}>
                        <SpeechBubbleArrow className={"ds-block"}/>
                    </div>
                </div>
            )}
            <Card className={cn(className, 'ds-relative', structured && 'ds-p-0')}>{children}</Card>
        </div>
    );
    if (onClickAway) {
        return <ClickAwayListener onClickAway={handleClickAway}>{content}</ClickAwayListener>;
    }
    return content;
};
