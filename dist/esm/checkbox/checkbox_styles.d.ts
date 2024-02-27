import { CheckboxProps } from './checkbox';
export declare const baseClasses: {
    container: string;
    icon: string;
    input: string;
    layer: string;
    size: {
        regular: string;
        small: string;
    };
};
export declare const variantClasses: {
    [key in Exclude<CheckboxProps['variant'], undefined>]: string;
};
export declare const iconClasses: {
    [key in Exclude<CheckboxProps['variant'], undefined> | 'partial']: string;
};
export declare const layerClasses: {
    [key in Exclude<CheckboxProps['variant'], undefined>]: string;
};
