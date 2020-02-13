import React, { useCallback } from 'react';

import cn from 'classnames';
import injectSheet, { createUseStyles } from 'react-jss';
import { animated, useSpring } from 'react-spring';

import styles from './text_field_styles';
const useStyles = createUseStyles(styles);
const DEFAULT_SPRING_PROPS = {
    boxShadow: '0 7.5px 15px 0 #e4e4e4'
};

// Variant should be one of the following : ['raised', 'flat', 'underlined'].
const TextFieldComponent = ({
    containerElement: ContainerElement = 'div',
    containerProps,
    className,
    inputClassName,
    fullWidth,
    inputRef,
    containerRef,
    beforeChildren = null,
    multiline,
    rows,
    children,
    variant = 'raised',
    type = 'text',
    disabled,
    customClasses = {},
    classes,
    ...other
}) => {
    const InputComponent = multiline ? 'textarea' : 'input';
    return (
        <ContainerElement
            ref={containerRef}
            className={cn(
                className,
                customClasses.container,
                classes.container,
                fullWidth && classes.fullWidth,
                multiline && classes.multilineContainer,
                classes[variant],
                disabled && classes[`${variant}Disabled`]
            )}
            {...(containerProps &&
                containerProps.style && {
                    style: containerProps.style
                })}
            {...containerProps}
        >
            {beforeChildren}
            <InputComponent
                ref={inputRef}
                className={cn(inputClassName, classes.input, multiline && classes.multiline)}
                {...{ rows, type, disabled }}
                {...other}
            />
            {children}
        </ContainerElement>
    );
};

const RaisedTextField = ({ onFocus, onBlur, containerProps, ...other }) => {
    const [springProps, setSpringProps] = useSpring(() => DEFAULT_SPRING_PROPS);
    const handleFocus = useCallback(
        (...parameters) => {
            if (typeof onFocus === 'function') {
                onFocus(...parameters);
            }
            setSpringProps(() => ({
                boxShadow: '0 10px 20px 0 #dadada'
            }));
        },
        [onFocus]
    );
    const handleBlur = useCallback(
        (...parameters) => {
            if (typeof onBlur === 'function') {
                onBlur(...parameters);
            }
            setSpringProps(() => DEFAULT_SPRING_PROPS);
        },
        [onBlur]
    );
    return (
        <TextFieldComponent
            containerElement={animated.div}
            containerProps={{
                ...containerProps,
                style: {
                    ...(containerProps && containerProps.style),
                    ...springProps
                }
            }}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...other}
        />
    );
};

const WithVariantTextField = ({ variant = 'raised', ...other }) => {
    const classes = useStyles();
    if (variant === 'raised') {
        return <RaisedTextField {...{ variant }} {...other} classes={classes} />;
    }
    return <TextFieldComponent {...{ variant }} {...other} classes={classes} />;
};

export const TextField = WithVariantTextField;
