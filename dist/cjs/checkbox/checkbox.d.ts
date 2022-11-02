import React, { ElementType, PropsWithChildren } from 'react';
import { PaletteColors } from '../styles';
interface Props {
    component?: string | ElementType;
    checked: boolean;
    partialCheck?: boolean;
    disabled?: boolean;
    color?: PaletteColors;
    defaultColor?: string;
    className?: string;
    inputClassName?: string;
    containerProps?: any;
    variant?: 'raised' | 'outlined';
    isRadio?: Boolean;
    classes?: {
        container?: string;
        input?: string;
    };
}
export declare type CheckboxProps = PropsWithChildren<Omit<React.InputHTMLAttributes<any>, 'color'> & Props>;
export declare const Checkbox: React.ForwardRefExoticComponent<Omit<React.InputHTMLAttributes<any>, "color"> & Props & {
    children?: React.ReactNode;
} & React.RefAttributes<any>>;
export {};
