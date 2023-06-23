import React from 'react';

import { InputBase, MenuItem, Select as MuiSelect, SelectProps } from '@mui/material';

const variants = {
    flat: {
        root: 'ds-font-w3d ds-w-auto ds-inline-block ds-bg-[#f9f9f9] ds-rounded ds-border ds-border-solid ds-border-[#f0f0f0]',
        input: 'ds-font-w3d ds-w-full !ds-pr-4 ds-text-dark-500',
        icon: ''
    },
    raised: {
        root: 'ds-font-w3d ds-w-auto ds-inline-block ds-bg-light-500 ds-shadow-w3d ds-rounded ds-border ds-border-solid ds-border-[#f0f0f0]',
        input: 'ds-font-w3d ds-w-full !ds-pr-4 ds-text-dark-500',
        icon: ''
    },
    outlined: {
        root: 'ds-font-w3d ds-w-auto ds-inline-block ds-bg-transparent ds-border ds-border-solid ds-border-current',
        input: 'ds-font-w3d ds-w-full !ds-pr-4 ds-text-current',
        icon: 'ds-text-current'
    }
};
const sizes = {
    regular: {
        input: 'ds-p-1'
    },
    small: {
        input: ''
    }
} as const;
export const Select: React.FC<
    React.PropsWithChildren<
        Partial<
            Omit<
                SelectProps<any>,
                'size' | 'value' | 'onChange' | 'className' | 'variant' | 'classes' | 'textFieldProps' | 'placeholder'
            >
        > & {
            value: any;
            onChange: (newValue: any) => any;
            className?: string;
            variant?: 'flat' | 'raised' | 'outlined';
            size?: 'regular' | 'small';
            classes?: {
                icon?: string;
                root?: string;
                input?: string;
            };
            textFieldProps?: any;
            placeholder?: string;
            avoidNative?: boolean;
        }
    >
> = ({
    value,
    onChange,
    children,
    className = null,
    variant = 'raised',
    size = 'regular',
    classes = {},
    textFieldProps = null,
    placeholder = null,
    avoidNative = false,
    ...others
}) => {
    return (
        <MuiSelect
            MenuProps={{
                classes: {
                    paper: 'ds-max-h-[300px] ds-border ds-border-1 ds-border-gray-100'
                }
            }}
            className={`ds-min-w-[150px] ds-max-h-[300px] ds-rounded ds-flex ${className}`}
            classes={{
                icon: `${classes.icon ?? ''} ${(variants[variant] ?? variants?.raised).icon}`
            }}
            native={!avoidNative}
            value={value ?? null}
            inputProps={textFieldProps}
            input={
                <InputBase
                    classes={{
                        root: `${(variants[variant] ?? variants?.raised).root} ${classes?.root ?? ''}`,
                        input: `${(variants[variant] ?? variants?.raised).input} ${
                            (sizes[size] ?? sizes?.regular).input
                        } ${classes?.input ?? ''}`
                    }}
                />
            }
            onChange={(e) => onChange?.(e.target.value)}
            {...others}
        >
            {avoidNative && placeholder && (
                <MenuItem disabled value="">
                    {placeholder}
                </MenuItem>
            )}
            {!avoidNative && (
                <>
                    {placeholder && (
                        <option disabled value="">
                            {placeholder}
                        </option>
                    )}
                    {React.Children.toArray(children)
                        .filter(Boolean)
                        .map((child: any, index) => {
                            if (!child) {
                                return null;
                            }
                            return (
                                <option
                                    key={child?.key || child.props.value || `select_child_${index}`}
                                    value={child.props.value ?? null}
                                >
                                    {child.props.label || child.props.children}
                                </option>
                            );
                        })}
                </>
            )}
            {avoidNative && children}
        </MuiSelect>
    );
};
