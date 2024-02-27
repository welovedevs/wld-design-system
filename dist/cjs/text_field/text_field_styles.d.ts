export type TextFieldVariants = 'flat' | 'raised' | 'underlined';
type TextFieldDisabledVariants = `${TextFieldVariants}Disabled`;
export declare const baseStyles: {
    container: string;
    multilineContainer: string;
    input: string;
    multilineInput: string;
    disabled: string;
};
export declare const sizeStyles: {
    small: string;
    regular: string;
};
export declare const variantStyles: {
    [key in TextFieldVariants | TextFieldDisabledVariants]: string;
};
export declare const inputStyles: {
    [key in TextFieldVariants | TextFieldDisabledVariants | 'disabled']: string;
};
export {};
