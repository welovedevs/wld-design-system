import React, { useCallback, useState } from 'react';

import cn from 'classnames';
import { makeStyles } from "@material-ui/core/styles";
import { animated, config, useSpring } from 'react-spring';

import { Popper, ClickAwayListener } from '@material-ui/core';
import { Card } from '../card/card';

import { ReactComponent as SpeechBubbleArrow } from '../assets/icons/speech_bubble_arrow.svg';

import { styles }  from './popper_card_styles';

const useStyles = makeStyles(styles);

export const PopperCard = ({
    className,
    anchorElement,
    open,
    onClose,
    popperProps,
    structured,
    onClickAway,
    dismissArrow = false,
    springOptions = {},
    customClasses = {},
    containerProps = {},
    ...other
}) => {
    const classes = useStyles();
    const [arrowReference, setArrowReference] = useState(null);
    return (
        <Popper
            {...{ open }}
            {...containerProps}
            className={cn(
                classes.popper,
                !open && classes.closedPopper,
                customClasses.popper,
                containerProps.className
            )}
            anchorEl={anchorElement}
            {...popperProps}
            modifiers={{
                flip: {
                    enabled: true,
                },
                preventOverflow: {
                    enabled: true,
                    boundariesElement: 'scrollParent',
                },
                arrow: {
                    enabled: !dismissArrow,
                    element: arrowReference,
                },
                ...(popperProps && popperProps.modifiers),
            }}
            transition
        >
            {({ TransitionProps }) => (
                <Fade {...TransitionProps} {...{ springOptions, popperProps }}>
                    <Content
                        {...{
                            className,
                            setArrowReference,
                            structured,
                            dismissArrow,
                            onClickAway,
                            classes,
                            customClasses,
                            ...other,
                        }}
                    />
                </Fade>
            )}
        </Popper>
    );
};

const Fade = React.forwardRef((props, ref) => {
    const { in: open, children, onEnter, onExited, springOptions, popperProps, ...other } = props;
    const getTranslationFromPlacement = useCallback((value) => {
        const placement = (popperProps && popperProps.placement) || 'bottom';
        if (['top', 'bottom'].some((key) => placement === key)) {
            return `translate3d(0, ${value}px, 0)`;
        }
        return `translate3d(-${value}px, 0, 0)`;
    }, []);
    const style = useSpring({
        from: {
            opacity: 0,
            pointerEvents: 'none',
            transform: getTranslationFromPlacement(20),
        },
        to: {
            opacity: open ? 1 : 0,
            pointerEvents: open ? 'all' : 'none',
            transform: getTranslationFromPlacement(open ? 0 : 20),
        },
        config: config.default,
        ...springOptions,
        onStart: () => {
            // This cause the following error: Cannot update a component from inside the function body of a different component.
            // It is a pattern documented in the Transition section of Material-UI docs, waiting for a possible update.
            if (open && onEnter) {
                onEnter();
            }
        },
        onRest: () => {
            if (!open && onExited) {
                onExited();
            }
        },
    });

    return (
        <animated.div {...{ ref, style }} {...other}>
            {children}
        </animated.div>
    );
});

const Content = ({
    className,
    dismissArrow,
    translation,
    setArrowReference,
    onClickAway,
    structured,
    classes,
    customClasses,
    ...other
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
                <div className={cn(classes.arrowContainer, customClasses.arrowContainer)} ref={setArrowReference}>
                    <SpeechBubbleArrow />
                </div>
            )}
            <Card
                className={cn(className, classes.container, customClasses.container, structured && classes.structured)}
                {...other}
            />
        </div>
    );
    if (onClickAway) {
        return <ClickAwayListener onClickAway={handleClickAway}>{content}</ClickAwayListener>;
    }
    return content;
};
