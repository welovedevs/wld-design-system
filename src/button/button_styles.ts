import { ButtonProps } from './button';

type StylesKeys = 'container' | 'typography';
export type ButtonVariants = 'contained' | 'outlined' | 'text' | 'raised' | 'soft';

export type Classes = {
    [key in StylesKeys]?: string;
};

export const baseStyles = {
    container:
        'ds-group ds-m-1 ds-w-fit ds-h-fit ds-rounded-md ds-relative ds-overflow-hidden ds-flex ds-items-center ds-justify-center focus:ds-outline',
    typography: 'ds-flex ds-items-center',
    disabled: 'ds-cursor-not-allowed',
};
export const sizeStyles: { [key in Exclude<ButtonProps['size'], undefined>]: string } = {
    regular: 'ds-px-1.5 ds-py-1 ds-text-sm',
    small: 'ds-px-1 ds-py-1/2 ds-text-sm',
    xs: 'ds-px-1 ds-py-1/2 ds-text-xs',
};
export const typographySizeStyles: { [key in Exclude<ButtonProps['size'], undefined>]: string } = {
    regular: 'ds-text-base',
    small: 'ds-text-sm',
    xs: 'ds-text-xs',
};
