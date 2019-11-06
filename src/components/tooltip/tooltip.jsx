import React, { cloneElement, useCallback, useRef } from 'react';

import { createUseStyles } from 'react-jss';
import { get } from 'lodash';
import { config } from 'react-spring';

import { PopperCard } from '../popper_card/popper_card';
import { useOpenerState } from '../../../utils/hooks/use_opener_state';

import { styles } from './tooltip_styles';

const useStyles = createUseStyles(styles);

const fusionFunctions = (...functions) => (...args) => {
    functions.forEach(fn => {
        if (typeof fn === 'function') {
            fn(...args);
        }
    });
};

const TooltipComponent = ({ title, placement, children }) => {
    const classes = useStyles();
    const anchorReference = useRef();
    const [open, eventsHandlerElementProps] = useOpenerState();

    const generateChildProps = useCallback(
        child => {
            if (!eventsHandlerElementProps) {
                return {};
            }
            const { props } = child;
            return {
                ref: anchorReference,
                ...Object.entries(eventsHandlerElementProps).reduce((acc, [eventKey, eventFn]) => {
                    const newAcc = { ...acc };
                    const inPropsFunction = props[eventKey];
                    if (inPropsFunction) {
                        newAcc[eventKey] = fusionFunctions(inPropsFunction, eventFn);
                    } else {
                        newAcc[eventKey] = eventFn;
                    }
                    return newAcc;
                }, props || {})
            };
        },
        [eventsHandlerElementProps, anchorReference]
    );

    const generateChildChildren = useCallback(
        child => {
            const childChildren = get(child, 'props.children');
            return (
                <>
                    {childChildren}
                    <TooltipPopper
                        anchorElement={anchorReference.current}
                        {...{
                            title,
                            open,
                            placement,
                            classes
                        }}
                    />
                </>
            );
        },
        [open, anchorReference, title, placement, classes]
    );

    return cloneElement(children, generateChildProps(children), generateChildChildren(children));
};

const TooltipPopper = ({ title, open, anchorElement, classes }) => (
    <PopperCard
        dismissArrow
        {...{ open, anchorElement }}
        springOptions={{
            config: config.stiff
        }}
        customClasses={{
            popper: classes.popper,
            container: classes.container
        }}
        popperProps={{
            placement: 'top',
            modifiers: {
                preventOverflow: {
                    boundariesElement: 'viewport'
                },
                arrow: {
                    enabled: false
                }
            }
        }}
    >
        {title}
    </PopperCard>
);

export const Tooltip = TooltipComponent;
