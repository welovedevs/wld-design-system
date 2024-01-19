import React from 'react';
import { SelectProps } from '@mui/material';
export declare const Select: React.FC<React.PropsWithChildren<Partial<Omit<SelectProps<any>, 'size' | 'value' | 'onChange' | 'className' | 'variant' | 'classes' | 'textFieldProps' | 'placeholder'>> & {
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
}>>;
