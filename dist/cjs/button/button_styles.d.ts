import { ButtonProps } from './button';
type StylesKeys = 'container' | 'typography';
export type ButtonVariants = 'contained' | 'outlined' | 'text' | 'raised';
export type Classes = {
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
