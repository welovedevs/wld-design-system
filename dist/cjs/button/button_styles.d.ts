import { ButtonProps } from './button';
declare type StylesKeys = 'container' | 'typography';
export declare type ButtonVariants = 'contained' | 'outlined' | 'text' | 'raised' | 'soft';
export declare type Classes = {
    [key in StylesKeys]?: string;
};
export declare const baseStyles: {
    container: string;
    typography: string;
    disabled: string;
};
export declare const sizeStyles: {
    [key in Exclude<ButtonProps['size'], undefined>]: string;
};
export declare const typographySizeStyles: {
    [key in Exclude<ButtonProps['size'], undefined>]: string;
};
export {};
