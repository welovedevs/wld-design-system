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
    regular: 'ds-p-1.5 ',
    small: 'ds-p-1 ds-text-[12px]',
    xs: 'ds-py-1/2 ds-px-1 ds-text-[11px]',
};
export const typographySizeStyles: { [key in Exclude<ButtonProps['size'], undefined>]: string } = {
    regular: '',
    small: 'ds-text-[12px]',
    xs: 'ds-text-[11px]',
};
