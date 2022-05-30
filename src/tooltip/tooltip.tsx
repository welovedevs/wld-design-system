import React, { cloneElement, useMemo, useRef } from 'react';

import cn from 'classnames';
import makeStyles from '@mui/styles/makeStyles';
import get from 'lodash/get';

import { PopperCard } from '../popper_card/popper_card';
import { useOpenerState } from '../hooks/use_opener_state';

import { Classes, styles } from './tooltip_styles';
import { PopperProps } from '@mui/material';
import merge from 'lodash/merge';

const useStyles = makeStyles(styles);

const fusionFunctions = (...functions: any[]) => (...args: any[]) => {
    functions.forEach((fn) => {
        if (typeof fn === 'function') {
            fn(...args);
        }
    });
};

interface TooltipProps {
    title?: PopperProps['children'];
    placement?: PopperProps['placement'];
    classes?: Classes;
    customClasses?: Classes;
}
const TooltipComponent: React.FC<TooltipProps> = ({
                                                      title,
                                                      placement,
                                                      children,
                                                      customClasses: oldCustomClasses = {},
                                                      classes: receivedClasses = {},
                                                  }) => {
    const mergedClasses = useMemo(() => merge({}, oldCustomClasses, receivedClasses), [
        JSON.stringify(oldCustomClasses),
        JSON.stringify(receivedClasses),
    ]);
    const classes = useStyles({ classes: mergedClasses });
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
                    }}
                />
            </>
        );
    }, [open, anchorReference, title, placement, classes]);

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
        classes={{
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
