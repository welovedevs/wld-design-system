import React, { ExoticComponent, ReactChildren, useCallback, useMemo, useState } from 'react';

import cn from 'classnames';
import { makeStyles } from '@material-ui/core/styles';

import { Classes, styles } from './text_field_styles';
import { ClassNameMap } from '@material-ui/styles';
import merge from 'lodash/merge';
import { IconButton } from '@material-ui/core';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { Tooltip } from '../index';

const useStyles = makeStyles(styles);

const DEFAULT_STYLE_PROPS = {
    boxShadow: '0 7.5px 15px 0 #e4e4e4',
};

// Variant should be one of the following : ['raised', 'flat', 'underlined'].
interface CustomProps {
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
    classes?: Classes;
    customClasses?: Classes;
    onFocus?: (...args: any[]) => void;
    onBlur?: (...args: any[]) => void;
    passwordLabels?: {
        show: string;
        hide: string;
    };
}

export type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> & CustomProps;
const TextFieldComponent: React.FC<TextFieldProps> = ({
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
    customClasses: oldCustomClasses = {},
    classes: receivedClasses = {},
    ...other
}) => {
    const mergedClasses = useMemo(() => merge({}, oldCustomClasses, receivedClasses), [
        JSON.stringify(oldCustomClasses),
        JSON.stringify(receivedClasses),
    ]);
    const classes = useStyles({ classes: mergedClasses });
    const InputComponent = multiline ? 'textarea' : 'input';
    const isPassword = type === 'password';

    const [showHidePassword, changeShowHidePassword] = useState(false);
    const togglePasswordVisiblity = () => {
        changeShowHidePassword(!showHidePassword);
    };

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
                type={showHidePassword ? 'text' : type}
                {...{ rows, disabled }}
                {...other}
            />
            {isPassword && (
                <IconButton title="Show/Hide password" className={classes.icon} onClick={togglePasswordVisiblity}>
                    {showHidePassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
            )}
            {children}
        </ContainerElement>
    );
};

const RaisedTextField: React.FC<TextFieldProps> = ({ onFocus, onBlur, containerProps, ...other }) => {
    const [styleProps, setStyleProps] = useState(DEFAULT_STYLE_PROPS);

    const handleFocus = useCallback(
        (...parameters) => {
            if (typeof onFocus === 'function') {
                onFocus(...parameters);
            }
            setStyleProps({ boxShadow: '0 10px 20px 0 #dadada' });
        },
        [onFocus]
    );
    const handleBlur = useCallback(
        (...parameters) => {
            if (typeof onBlur === 'function') {
                onBlur(...parameters);
            }
            setStyleProps(DEFAULT_STYLE_PROPS);
        },
        [onBlur]
    );
    return (
        <TextFieldComponent
            containerElement='div'
            containerProps={{
                ...containerProps,
                style: {
                    ...(containerProps && containerProps.style),
                    ...styleProps,
                },
            }}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...other}
        />
    );
};

const WithVariantTextField: React.FC<TextFieldProps> = ({ variant = 'raised', ...other }) => {
    if (variant === 'raised') {
        return <RaisedTextField {...{ variant }} {...other} />;
    }

    return <TextFieldComponent {...{ variant }} {...other} />;
};

export const TextField = WithVariantTextField;
