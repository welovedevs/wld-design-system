import React, { cloneElement, ReactChildren, ReactNode, useCallback, useMemo, useRef } from 'react';

import cn from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import get from 'lodash/get';
import { config } from 'react-spring';

import { PopperCard } from '../popper_card/popper_card';
import { useOpenerState } from '../hooks/use_opener_state';

import { Classes, styles } from './tooltip_styles';
import { PopperProps } from '@material-ui/core';

const useStyles = makeStyles(styles);

const fusionFunctions = (...functions: any[]) => (...args: any[]) => {
    functions.forEach((fn) => {
        if (typeof fn === 'function') {
            fn(...args);
        }
    });
};

interface TooltipProps {
    title: PopperProps['children'];
    placement: PopperProps['placement'];
    classes: Classes;
}
const TooltipComponent: React.FC<TooltipProps> = ({ title, placement, children, classes: customClasses = {} }) => {
    const classes = useStyles({ classes: customClasses });
    const anchorReference = useRef();
    const [open, eventsHandlerElementProps] = useOpenerState();

    const childProps = useMemo(() => {
        if (!eventsHandlerElementProps) {
            return {};
        }
        // @ts-ignore/
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

    // @ts-ignore
    return cloneElement(children, childProps, childChildren);
};

interface TooltipPopperProps {
    title: PopperProps['children'];
    open: boolean;
    anchorElement: PopperProps['anchorEl'];
    placement: PopperProps['placement'];
    classes: Classes;
}
const TooltipPopper: React.FC<TooltipPopperProps> = ({ title, open, anchorElement, placement = 'top', classes }) => (
    <PopperCard
        dismissArrow
        {...{ open, anchorElement }}
        springOptions={{
            config: config.stiff,
        }}
        customClasses={{
            popper: cn(classes.popper),
            container: cn(classes.container),
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
