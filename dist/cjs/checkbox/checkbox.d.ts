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
    size?: 'regular' | 'small';
    classes?: {
        container?: string;
        input?: string;
    };
}
export type CheckboxProps = PropsWithChildren<Omit<React.InputHTMLAttributes<any>, 'color' | 'size'> & Props>;
export declare const Checkbox: React.ForwardRefExoticComponent<Omit<React.InputHTMLAttributes<any>, "color" | "size"> & Props & {
    children?: React.ReactNode;
} & React.RefAttributes<any>>;
export {};
