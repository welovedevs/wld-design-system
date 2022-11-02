import React, { ExoticComponent, ReactNode } from 'react';
import { TextFieldVariants } from './text_field_styles';
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
    classes?: {
        container?: string;
        input?: string;
    };
    size?: 'small';
    onFocus?: (...args: any[]) => void;
    onBlur?: (...args: any[]) => void;
    passwordLabels?: {
        show: string;
        hide: string;
    };
}
export declare type TextFieldProps = Omit<React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>, 'size'> & CustomProps;
export declare const TextField: React.ForwardRefExoticComponent<Omit<React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>, "size"> & CustomProps & {
    children?: React.ReactNode;
} & React.RefAttributes<HTMLElement>>;
export {};
