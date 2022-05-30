import React, {useCallback, useMemo, useState, useRef} from 'react';

import cn from 'classnames';
import {ClassNameMap} from '@mui/styles';
import makeStyles from '@mui/styles/makeStyles';
import {motion} from 'framer-motion';

import {ClickAwayListener, Popper, PopperProps} from '@mui/material';
import {Card} from '../card/card';

import {PopperCustomClasses, styles} from './popper_card_styles';
import {SpeechBubbleArrow} from '../assets/icons/speech_bubble_arrow_component';
import merge from 'lodash/merge';

const useStyles = makeStyles(styles);

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

type ClassesRecord = ClassNameMap<'container' | 'popper' | 'closedPopper' | 'arrowContainer' | 'structured' | 'wrapper'>;
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
    const classes = useStyles({classes: mergedClasses});
    const [arrowReference, setArrowReference] = useState(null);
    console.log({arrowReference})
    return (
        <Popper
            open={open}
            {...containerProps}
            {...popperProps}
            className={cn(
                classes.popper,
                !open && classes.closedPopper,
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
                        altBoundary: true, // false by default
                    },
                },
                {
                    name: 'arrow',
                    enabled: true,
                    options: {
                        element: arrowReference
                    }
                },
                ...(popperProps && popperProps.modifiers || []),
            ]}
        >
                <Content
                        {...{
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
        </Popper>
    );
};


interface PopperContentProps {
    className?: string;
    dismissArrow?: boolean;
    setArrowReference: (...parameters: any[]) => void;
    onClickAway?: (...parameters: any[]) => void;
    structured?: boolean;
    classes: ClassesRecord;
}

const Content: React.FC<PopperContentProps> = ({
    className,
    dismissArrow,
    setArrowReference,
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
        <div className={classes.wrapper}>
            {!dismissArrow && (
                <div className={cn(classes.arrowContainer)} ref={setArrowReference}>
                    <SpeechBubbleArrow />
                </div>
            )}
            <Card className={cn(className, classes.container, structured && classes.structured)}>{children}</Card>
        </div>
    );
    if (onClickAway) {
        return <ClickAwayListener onClickAway={handleClickAway}>{content}</ClickAwayListener>;
    }
    return content;
};
