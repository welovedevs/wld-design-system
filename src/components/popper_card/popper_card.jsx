import React, { useCallback, useState } from 'react';

import cn from 'classnames';
import injectSheet from 'react-jss';
import { animated, config, useSpring } from 'react-spring';

import { Popper, ClickAwayListener } from '@material-ui/core';
import { Card } from '../card/card';

import SpeechBubbleArrow from '../../../assets/images/assets/icons/speech_bubble_arrow.svg';

import styles from './popper_card_styles';

const PopperCardComponent = ({
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
    classes,
    containerProps = {},
    ...other
}) => {
    const [arrowReference, setArrowReference] = useState(null);
    const { opacity, pointerEvents, translation } = useSpring({
        opacity: open ? 1 : 0,
        pointerEvents: open ? 'all' : 'none',
        translation: open ? 0 : 20,
        config: config.default,
        ...springOptions
    });
    const getTranslationInterpolationFromPlacement = useCallback(value => {
        const placement = (popperProps && popperProps.placement) || 'bottom';
        if (['top', 'bottom'].some(key => placement === key)) {
            return `translate3d(0, ${value}px, 0)`;
        }
        return `translate3d(-${value}px, 0, 0)`;
    });

    return (
        <Popper
            open
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
                    enabled: true
                },
                preventOverflow: {
                    enabled: true,
                    boundariesElement: 'scrollParent'
                },
                arrow: {
                    enabled: !dismissArrow,
                    element: arrowReference
                },
                ...(popperProps && popperProps.modifiers)
            }}
        >
            <Content
                {...{
                    className,
                    opacity,
                    pointerEvents,
                    getTranslationInterpolationFromPlacement,
                    translation,
                    setArrowReference,
                    structured,
                    dismissArrow,
                    onClickAway,
                    classes,
                    customClasses,
                    ...other
                }}
            />
        </Popper>
    );
};

const Content = ({
    className,
    opacity,
    pointerEvents,
    getTranslationInterpolationFromPlacement,
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
        <animated.div
            className={classes.wrapper}
            style={{
                opacity,
                pointerEvents,
                transform: translation.interpolate(getTranslationInterpolationFromPlacement)
            }}
        >
            {!dismissArrow && (
                <div className={classes.arrowContainer} ref={setArrowReference}>
                    <SpeechBubbleArrow />
                </div>
            )}
            <Card
                className={cn(className, classes.container, customClasses.container, structured && classes.structured)}
                {...other}
            />
        </animated.div>
    );
    if (onClickAway) {
        return <ClickAwayListener onClickAway={handleClickAway}>{content}</ClickAwayListener>;
    }
    return content;
};

export const PopperCard = injectSheet(styles)(PopperCardComponent);
