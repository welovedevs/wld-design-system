import { ButtonProps } from './button';

type StylesKeys = 'container' | 'typography';
export type ButtonVariants = 'contained' | 'outlined' | 'text' | 'raised';

export type Classes = {
    [key in StylesKeys]?: string;
};

export const baseStyles = {
    container:
        'ds-relative ds-group ds-m-1/2 ds-w-fit ds-h-fit ds-relative ds-overflow-hidden ds-flex ds-items-center ds-justify-center',
    brightLayer:
        'ds-absolute ds-h-full ds-w-full ds-top-0 ds-bottom-0 ds-left-0 ds-right-0 ds-opacity-0 ds-transition-all group-hover:ds-opacity-[0.25] ds-z-10',
    typography: 'ds-flex ds-items-center ds-z-20',
    disabled: 'ds-cursor-not-allowed',
};
export const sizeStyles: { [key in Exclude<ButtonProps['size'], undefined>]: string } = {
    regular: 'ds-px-1.5 ds-py-1/2 ds-rounded-md',
    small: 'ds-px-1 ds-py-1/2 ds-rounded',
    xs: 'ds-px-1/2 ds-py-1/2 ds-rounded',
};
export const typographysizeStyles: { [key in Exclude<ButtonProps['size'], undefined>]: string } = {
    regular: 'ds-text-base ds-tracking-wide',
    small: 'ds-text-sm ds-tracking-wide',
    xs: 'ds-text-xs',
};

export const variantStyles: { [key in Exclude<ButtonProps['variant'], undefined> | 'default']: string } = {
    contained: 'ds-bg-current',
    raised: 'ds-bg-current',
    outlined: 'ds-border-current ds-border ds-border-solid',
    text: '',
    default: 'ds-bg-current'
};
export const layerVariantStyles: { [key in Exclude<ButtonProps['variant'], undefined>]: string } = {
    contained: 'ds-bg-light-500 ',
    raised: 'ds-bg-light-500 ',
    outlined: 'ds-bg-current',
    text: 'ds-bg-current',
};
export const textVariantStyles: { [key in Exclude<ButtonProps['variant'], undefined>]: string } = {
    contained: '',
    raised: '',
    outlined: '!ds-text-current',
    text: '!ds-text-current',
};
