import React, {ExoticComponent, ReactChildren, useCallback, useMemo, useState} from 'react';

import cn from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { animated, useSpring } from 'react-spring';

import { Classes, styles } from './text_field_styles';
import { ClassNameMap } from '@material-ui/styles';
import merge from 'lodash/merge';
import {IconButton} from "@material-ui/core";
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';
import {Tooltip} from "../index";


const useStyles = makeStyles(styles);

const DEFAULT_SPRING_PROPS = {
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
    isPassword?: boolean
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
                                                          isPassword,
                                                          ...other
                                                      }) => {
    const mergedClasses = useMemo(() => merge({}, oldCustomClasses, receivedClasses), [
        JSON.stringify(oldCustomClasses),
        JSON.stringify(receivedClasses),
    ]);
    const classes = useStyles({ classes: mergedClasses });
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

const RaisedTextField: React.FC<TextFieldProps> = ({ onFocus, onBlur, containerProps, ...other }) => {
    const [springProps, setSpringProps] = useSpring(() => DEFAULT_SPRING_PROPS);

    const handleFocus = useCallback(
        (...parameters) => {
            if (typeof onFocus === 'function') {
                onFocus(...parameters);
            }
            setSpringProps({boxShadow: '0 10px 20px 0 #dadada'});
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

// Doesn't work with the raised variant
const PasswordTextField: React.FC<TextFieldProps> = ({ classes: receivedClasses = {}, variant= 'flat', containerProps,  ...other}) => {

    const classes = useStyles({ styles });

    const [showHidePassword, changeShowHidePassword] = useState(false);
    const togglePasswordVisiblity = () => {
        changeShowHidePassword(!showHidePassword);
    };

    return (
        <div className={classes.passwordFieldContainer}>
            <TextFieldComponent
                type={showHidePassword ? "text" : "password"}
                containerElement={animated.div}
                className={classes[variant]}
                containerProps={{
                    ...containerProps,
                    style: {
                        ...(containerProps && containerProps.style)
                    },
                }}
                {...other}
            />
            <Tooltip
                placement="right"
                title={showHidePassword ? 'Hide password' : 'Show password'}
            >
                <IconButton className={classes.icon} onClick={togglePasswordVisiblity}>{showHidePassword ? <VisibilityOffIcon /> : <VisibilityIcon />}</IconButton>
            </Tooltip>
        </div>
    )

}

const WithVariantTextField: React.FC<TextFieldProps> = ({ variant = 'raised', isPassword, ...other }) => {
    if (variant === 'raised') {
        return <RaisedTextField {...{ variant }} {...other} />;
    }
    if (isPassword) {
        return <PasswordTextField {...{ variant }} {...other} />
    }
    return <TextFieldComponent {...{ variant }} {...other} />;
};

export const TextField = WithVariantTextField;
