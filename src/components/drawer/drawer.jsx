import React, { cloneElement, useCallback, useEffect, useRef } from 'react';
import { withRouter } from 'react-router-dom';

import cn from 'classnames';
import injectSheet from 'react-jss';
import { animated, config, useSpring } from 'react-spring';

import { Portal, ClickAwayListener } from '@material-ui/core';
import { Card } from '../card/card';

import styles from './drawer_styles';

const ANIMATED_INDEX_ATTRIBUTE = 'data-drawer-animated-index';

const getDirectAnimatableChildrenFromDrawer = drawerNode => {
    if (!drawerNode) {
        return null;
    }
    return Array.from(drawerNode.querySelectorAll(`*[${ANIMATED_INDEX_ATTRIBUTE}]`)).sort(
        (a, b) => (a.getAttribute(ANIMATED_INDEX_ATTRIBUTE) || 0) - (b.getAttribute(ANIMATED_INDEX_ATTRIBUTE) || 0)
    );
};

const DrawerComponent = ({ anchor = 'left', open, onClose, classes, location, children, listenToClickAway, customClasses = {} }) => {
    const drawerReference = useRef();
    const overflowTimeout = useRef();
    useEffect(() => {
        document.body.style.overflow = 'auto';
    }, []);

    useEffect(() => {
        if (overflowTimeout.current) {
            clearTimeout(overflowTimeout.current);
        }
        overflowTimeout.current = setTimeout(() => {
            document.body.style.overflow = open ? 'hidden' : 'auto';
        }, 500);
    }, [open]);

    const oldPathname = useRef();
    useEffect(() => {
        if (!location || !location.pathname) {
            return;
        }
        const { pathname } = location;
        if (pathname !== oldPathname.current) {
            if (onClose) {
                onClose();
            }
            oldPathname.current = pathname;
        }
    }, [location]);
    useEffect(() => {
        if (drawerReference && drawerReference.current) {
            const animatableChildren = getDirectAnimatableChildrenFromDrawer(drawerReference.current);
            if (!animatableChildren) {
                return;
            }
            animatableChildren.forEach((element, index) => {
                if (open) {
                    Object.entries({
                        opacity: 0,
                        animation: `fade-in-translate-${anchor}-50 1s`,
                        animationFillMode: 'forwards',
                        animationDelay: `${index * 60}ms`
                    }).forEach(([key, value]) => {
                        element.style[key] = value;
                    });
                } else {
                    Object.keys(element.style).forEach(key => {
                        element.style.removeProperty(key);
                    });
                }
            });
        }
    }, [open, drawerReference && drawerReference.current]);
    const closedMenuStyles = {
        translation: anchor === 'right' ? 0 : -100,
        pointerEvents: 'none'
    };
    const openedMenuStyles = {
        translation: anchor === 'right' ? -100 : 0,
        pointerEvents: 'all'
    };
    const menuStyles = useSpring({
        ...(!open && closedMenuStyles),
        ...(open && openedMenuStyles),
        config: config.default
    });
    const parentContainerStyles = useSpring({
        opacity: open ? 1 : 0,
        pointerEvents: open ? 'all' : 'none'
    });
    const { opacity, translation, pointerEvents } = menuStyles;
    const handleClickAway = useCallback(() => {
        if (!open) {
            return;
        }
        if (typeof onClose === 'function') {
            onClose();
        }
    }, [open, onClose]);
    const card = (
        <Card
            containerRef={drawerReference}
            className={cn(classes.drawer, anchor === 'right' && classes.rightAnchoredDrawer, customClasses.drawer)}
            style={{
                opacity,
                pointerEvents,
                transform: translation.interpolate(value => `translate3d(${value}%, 0, 0)`)
            }}
            elevation="drawer"
        >
            {React.Children.map(children, child =>
                cloneElement(child, {
                    drawerAnchor: anchor
                }))}
        </Card>
    );
    let content = null;
    if (open && listenToClickAway) {
        content = (
            <ClickAwayListener onClickAway={handleClickAway}>
                <div>{card}</div>
            </ClickAwayListener>
        );
    } else {
        content = card;
    }
    return (
        <Portal>
            <animated.div className={classes.container} style={parentContainerStyles}>
                {content}
            </animated.div>
        </Portal>
    );
};

export const Drawer = withRouter(injectSheet(styles)(DrawerComponent));
