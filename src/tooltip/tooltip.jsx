import React, { cloneElement, useCallback, useMemo, useRef } from 'react';

import cn from 'classnames';
import { createUseStyles } from 'react-jss';
import get from 'lodash/get';
import { config } from 'react-spring';

import { PopperCard } from '../popper_card/popper_card';
import { useOpenerState } from '../hooks/use_opener_state';

import { styles } from './tooltip_styles';

const useStyles = createUseStyles(styles);

const fusionFunctions = (...functions) => (...args) => {
    functions.forEach((fn) => {
        if (typeof fn === 'function') {
            fn(...args);
        }
    });
};

const TooltipComponent = ({ title, placement, children, customClasses = {} }) => {
    const classes = useStyles();
    const anchorReference = useRef();
    const [open, eventsHandlerElementProps] = useOpenerState();

    const childProps = useMemo(() => {
        if (!eventsHandlerElementProps) {
            return {};
        }
        const { props } = children;
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
            }, props || {}),
        };
    }, [children, eventsHandlerElementProps, anchorReference]);

    const childChildren = useMemo(() => {
        const propsChildren = get(children, 'props.children');
        return (
            <>
                {propsChildren}
                <TooltipPopper
                    anchorElement={anchorReference.current}
                    {...{
                        title,
                        open,
                        placement,
                        classes,
                        customClasses,
                    }}
                />
            </>
        );
    }, [open, anchorReference, title, placement, classes, customClasses]);

    return cloneElement(children, childProps, childChildren);
};

const TooltipPopper = ({ title, open, anchorElement, placement = 'top', classes, customClasses }) => (
    <PopperCard
        dismissArrow
        {...{ open, anchorElement }}
        springOptions={{
            config: config.stiff,
        }}
        customClasses={{
            popper: cn(classes.popper, customClasses.popper),
            container: cn(classes.container, customClasses.container),
        }}
        popperProps={{
            placement,
            modifiers: {
                preventOverflow: {
                    boundariesElement: 'viewport',
                },
                arrow: {
                    enabled: false,
                },
            },
        }}
    >
        {title}
    </PopperCard>
);

export const Tooltip = TooltipComponent;
