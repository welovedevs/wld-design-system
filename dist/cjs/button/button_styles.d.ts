import { ButtonProps } from './button';
declare type StylesKeys = 'container' | 'typography';
export declare type ButtonVariants = 'contained' | 'outlined' | 'text' | 'raised';
export declare type Classes = {
    [key in StylesKeys]?: string;
};
export declare const baseStyles: {
    container: string;
    brightLayer: string;
    typography: string;
    disabled: string;
};
export declare const sizeStyles: {
    [key in Exclude<ButtonProps['size'], undefined>]: string;
};
export declare const typographysizeStyles: {
    [key in Exclude<ButtonProps['size'], undefined>]: string;
};
export declare const variantStyles: {
    [key in Exclude<ButtonProps['variant'], undefined> | 'default']: string;
};
export declare const layerVariantStyles: {
    [key in Exclude<ButtonProps['variant'], undefined>]: string;
};
export declare const textVariantStyles: {
    [key in Exclude<ButtonProps['variant'], undefined>]: string;
};
export {};
