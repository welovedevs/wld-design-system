import React, { ButtonHTMLAttributes } from 'react';
import { PaletteColors } from '../styles';
import { ButtonVariants } from './button_styles';
interface CustomProps {
    component?: string;
    className?: string;
    containerRef?: any;
    disabled?: boolean;
    size?: 'small' | 'xs' | 'regular';
    color?: PaletteColors;
    containerProps?: any;
    typographyClassName?: any;
    variant?: ButtonVariants;
    onMouseEnter?: any;
    onMouseLeave?: any;
    onFocus?: any;
    onBlur?: any;
    onClick?: any;
    classes?: {
        container?: string;
        typography?: string;
    };
    style?: any;
}
export type ButtonProps = CustomProps & ButtonHTMLAttributes<HTMLButtonElement>;
export declare const Button: React.ForwardRefExoticComponent<CustomProps & React.ButtonHTMLAttributes<HTMLButtonElement> & React.RefAttributes<unknown>>;
export {};
