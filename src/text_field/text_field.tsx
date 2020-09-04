import React, { ExoticComponent, ReactChildren, useCallback } from 'react';

import cn from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { animated, useSpring } from 'react-spring';

import { Classes, styles } from './text_field_styles';
import { ClassNameMap } from '@material-ui/styles';

const useStyles = makeStyles(styles);

const DEFAULT_SPRING_PROPS = {
    boxShadow: '0 7.5px 15px 0 #e4e4e4',
};

// Variant should be one of the following : ['raised', 'flat', 'underlined'].
interface Props {
    containerElement?: string | ExoticComponent;
    containerProps?: any;
    className?: string;
    inputClassName?: string;
    fullWidth?: boolean;
    inputRef?: any;
    containerRef?: any;
    beforeChildren?: ReactChildren;
    multiline?: boolean;
    rows?: number;
    variant?: 'raised' | 'flat' | 'underlined';
    type?: HTMLInputElement['type'];
    disabled?: boolean;
    classes?: StyleTypes;
    onFocus?: (...args: any[]) => void;
    onBlur?: (...args: any[]) => void;
}
const TextFieldComponent: React.FC<Props> = ({
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
    classes: otherClasses = {},
    ...other
}) => {
    const classes: StyleTypes = useStyles({ classes: otherClasses });

    const InputComponent = multiline ? 'textarea' : 'input';
    return (
        <ContainerElement
            ref={containerRef}
            className={cn(
                className,
                classes.container,
                fullWidth && classes.fullWidth,
                multiline && classes.multilineContainer,
                classes[variant],
                // @ts-ignore
                disabled && classes[`${variant}Disabled` as any]
            )}
            {...(containerProps &&
                containerProps.style && {
                    style: containerProps.style,
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

const RaisedTextField: React.FC<Props> = ({ onFocus, onBlur, containerProps, ...other }) => {
    const [springProps, setSpringProps] = useSpring(() => DEFAULT_SPRING_PROPS);
    const handleFocus = useCallback(
        (...parameters) => {
            if (typeof onFocus === 'function') {
                onFocus(...parameters);
            }
            setSpringProps({
                boxShadow: '0 10px 20px 0 #dadada',
            });
        },
        [onFocus]
    );
    const handleBlur = useCallback(
        (...parameters) => {
            if (typeof onBlur === 'function') {
                onBlur(...parameters);
            }
            setSpringProps(DEFAULT_SPRING_PROPS);
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
                    ...springProps,
                },
            }}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...other}
        />
    );
};

type StyleTypes = ClassNameMap<
    | 'container'
    | 'input'
    | 'fullWidth'
    | 'raisedDisabled'
    | 'underlinedDisabled'
    | 'multilineContainer'
    | 'flat'
    | 'multiline'
    | 'underlined'
    | 'raised'
    | 'disabled'
    | 'flatDisabled'
>;
const WithVariantTextField: React.FC<Props> = ({ variant = 'raised', ...other }) => {
    if (variant === 'raised') {
        return <RaisedTextField {...{ variant }} {...other} />;
    }
    return <TextFieldComponent {...{ variant }} {...other} />;
};

export const TextField = WithVariantTextField;
