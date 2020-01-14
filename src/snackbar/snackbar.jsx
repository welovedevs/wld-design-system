import React, { useCallback, useContext, useEffect, useRef } from 'react';

import cn from 'classnames';
import injectSheet from 'react-jss';
import { animated, config, useSpring, interpolate } from 'react-spring';
import { get, isEqual } from 'lodash';

import { Portal } from '@material-ui/core';
import {
    SnackbarsContext,
    SnackbarsProvider
} from '../utils/design_system_context/components_contexts/snackbars_context';

import styles from './snackbar_styles';


const VIEWPORT_SPACING = 30;
const SNACKBARS_SPACING = 20;

const DEFAULT_ANCHOR_ORIGIN = {
    vertical: 'bottom',
    horizontal: 'left'
};

const getDefaultSpringProps = isBottomPositionned => ({
    translateX: 0,
    translateY: isBottomPositionned === 'bottom' ? 50 : -50,
    pointerEvents: 'none',
    opacity: 0,
    config: config.slow
});

const ENTER_SPRING_PROPS = {
    translateY: 0,
    opacity: 1,
    pointerEvents: 'all'
};

const getLeavingTranslateX = isLeftPositionned => {
    if (isLeftPositionned) {
        return -VIEWPORT_SPACING;
    }
    return VIEWPORT_SPACING;
};

const getLeavingTranslateY = isBottomPositionned => {
    if (isBottomPositionned) {
        return VIEWPORT_SPACING;
    }
    return -VIEWPORT_SPACING;
};

const getLeavingSpringProps = ({ isBottomPositionned, isLeftPositionned, isSingle }) => ({
    opacity: 0,
    pointerEvents: 'none',
    ...(!isSingle && {
        translateX: getLeavingTranslateX(isLeftPositionned)
    }),
    ...(isSingle && {
        translateY: getLeavingTranslateY(isBottomPositionned)
    })
});

const getStackedSpringProps = snackbarsBeforeEntries => ({
    translateY: snackbarsBeforeEntries.reduce((total, [, value]) => {
        const { height = 0 } = value.dimensions || {};
        return total + height + SNACKBARS_SPACING;
    }, 0)
});

const SnackbarComponent = ({
    className,
    open = false,
    anchorOrigin = DEFAULT_ANCHOR_ORIGIN,
    onClose,
    autoHideDuration,
    children,
    classes
}) => {
    const { snackbars, setSnackbars } = useContext(SnackbarsContext);
    const snackbarId = useRef(new Date().getTime());
    const containerReference = useRef();
    const autoHideTimeout = useRef();

    const [{ translateX, translateY, ...otherSpringProps }, setSpringProps] = useSpring(() =>
        getDefaultSpringProps(anchorOrigin.vertical));

    const handleClose = useCallback(() => {
        if (typeof onClose === 'function') {
            onClose();
        }
    }, [onClose]);

    const registerSnackbar = useCallback(() => {
        if (!containerReference.current) {
            return;
        }
        const { height, width } = containerReference.current.getBoundingClientRect();
        const dimensions = { height, width };
        setSnackbars({
            ...snackbars,
            [snackbarId.current]: {
                open,
                anchorOrigin,
                dimensions
            }
        });
    }, [snackbars, setSnackbars, containerReference.current]);

    const unregisterSnackbar = useCallback(() => {
        const newSnackbars = { ...snackbars };
        delete newSnackbars[snackbarId];
        setSnackbars(newSnackbars);
    });

    const calculateSpringProps = useCallback(() => {
        if (!snackbars) {
            return;
        }
        const implicatedSnackbarsEntries = Object.entries(snackbars).filter(([id, value]) => {
            if (!value || id === snackbarId.current) {
                return false;
            }
            return value.open && isEqual(value.anchorOrigin, anchorOrigin);
        });
        const isSingle = !implicatedSnackbarsEntries || !implicatedSnackbarsEntries.length;
        if (!open && get(snackbars, `${snackbarId.current}.open`)) {
            setSpringProps(() =>
                getLeavingSpringProps({
                    isBottomPositionned: anchorOrigin.vertical === 'bottom',
                    isLeftPositionned: anchorOrigin.horizontal === 'left',
                    isSingle
                }));
        }
        if (!open) {
            return;
        }
        const isFirst = isSingle || !implicatedSnackbarsEntries.some(([id]) => id > snackbarId.current);
        if (isFirst) {
            setSpringProps(() => ENTER_SPRING_PROPS);
            return;
        }
        const snackbarsBeforeEntries = implicatedSnackbarsEntries.filter(([id]) => id < snackbarId.current);
        setSpringProps(() => getStackedSpringProps(snackbarsBeforeEntries));
    }, [snackbars, open]);

    const handleSnackbarChange = useCallback(() => {
        setSnackbars({
            ...snackbars,
            [snackbarId.current]: {
                ...snackbars[snackbarId.current],
                open,
                anchorOrigin
            }
        });
    }, [snackbars, open, anchorOrigin]);

    useEffect(() => {
        calculateSpringProps();
    }, [snackbars, open]);

    useEffect(() => {
        registerSnackbar();
        return () => unregisterSnackbar();
    }, []);

    useEffect(() => {
        handleSnackbarChange();
    }, [open, anchorOrigin]);

    useEffect(() => {
        if (autoHideDuration) {
            autoHideTimeout.current = setTimeout(handleClose, autoHideDuration);
            return () => {
                clearTimeout(autoHideTimeout.current);
                autoHideTimeout.current = null;
            };
        }
    }, [autoHideDuration]);

    return (
        <Portal>
            <span ref={containerReference}>
                <animated.div
                    className={cn(
                        classes.container,
                        open && classes.opened,
                        isEqual(anchorOrigin, { vertical: 'bottom', horizontal: 'left' }) && classes.bottomLeft,
                        isEqual(anchorOrigin, { vertical: 'bottom', horizontal: 'right' }) && classes.bottomRight,
                        isEqual(anchorOrigin, { vertical: 'top', horizontal: 'left' }) && classes.topLeft,
                        isEqual(anchorOrigin, { vertical: 'top', horizontal: 'right' }) && classes.topRight,
                        className
                    )}
                    style={{
                        transform: interpolate([translateX, translateY], (x, y) => `translate3d(${x}px, ${y}px, 0)`),
                        ...otherSpringProps
                    }}
                >
                    {children}
                </animated.div>
            </span>
        </Portal>
    );
};

const WithStylesSnackbar = injectSheet(styles)(SnackbarComponent);

const WithProviderParentSnackbar = props => (
    <SnackbarsProvider>
        <WithStylesSnackbar {...props} />
    </SnackbarsProvider>
);

export const Snackbar = WithProviderParentSnackbar;
