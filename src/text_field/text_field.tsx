import React, { ExoticComponent, forwardRef, PropsWithChildren, ReactNode, useState } from 'react';

import cn from 'classnames';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import {
    baseStyles,
    containedSizeStyles,
    inputStyles,
    sizeStyles,
    TextFieldVariants,
    variantStyles,
} from './text_field_styles';

interface CustomProps {
    containerElement?: string | ExoticComponent;
    containerProps?: any;
    className?: string;
    inputClassName?: string;
    fullWidth?: boolean;
    inputRef?: any;
    containerRef?: any;
    beforeChildren?: ReactNode;
    multiline?: boolean;
    rows?: number;
    variant?: TextFieldVariants;
    type?: HTMLInputElement['type'];
    disabled?: boolean;
    classes?: { container?: string; input?: string };
    size?: 'xs' | 'small' | 'regular';
    onFocus?: (...args: any[]) => void;
    onBlur?: (...args: any[]) => void;
    passwordLabels?: {
        show: string;
        hide: string;
    };
}

export type TextFieldProps = Omit<React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>, 'size'> &
    CustomProps;
export const TextField = forwardRef<HTMLElement, PropsWithChildren<TextFieldProps>>(
    (
        {
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
            size = 'regular',
            classes = {},
            ...other
        },
        ref
    ) => {
        const InputComponent = multiline ? 'textarea' : 'input';
        const isPassword = type === 'password';

        const [showHidePassword, changeShowHidePassword] = useState(false);
        const togglePasswordVisiblity = () => {
            changeShowHidePassword(!showHidePassword);
        };

        return (
            <ContainerElement
                ref={ref || containerRef}
                className={cn(
                    className,
                    baseStyles.container,
                    containedSizeStyles[size],
                    fullWidth && 'w-full',
                    multiline && baseStyles.multilineContainer,
                    variant && variantStyles[variant],
                    disabled && variant && variantStyles[`${variant}Disabled`],
                    classes?.container
                )}
                style={{
                    ...(containerProps && containerProps.style),
                }}
                {...containerProps}
            >
                {beforeChildren}
                <InputComponent
                    ref={inputRef}
                    className={cn(
                        inputClassName,
                        baseStyles.input,
                        multiline && baseStyles.multilineInput,
                        size && sizeStyles[size],
                        variant && inputStyles[variant],
                        disabled && inputStyles.disabled,
                        disabled && variant && inputStyles[`${variant}Disabled`],
                        classes?.input
                    )}
                    type={showHidePassword ? 'text' : type}
                    {...{ rows, disabled }}
                    {...other}
                />
                {isPassword && (
                    <IconButton
                        title="Show/Hide password"
                        className="ds-w-5 ds-h-5 ds-ml-1"
                        onClick={togglePasswordVisiblity}
                        size="large"
                    >
                        {showHidePassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                )}
                {children}
            </ContainerElement>
        );
    }
);
