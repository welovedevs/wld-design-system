import { ButtonProps } from './button';

type StylesKeys = 'container' | 'typography';
export type ButtonVariants = 'contained' | 'outlined' | 'text' | 'raised';

export type Classes = {
    [key in StylesKeys]?: string;
};

export const baseStyles = {
    container:
        'ds-relative ds-group ds-m-1 ds-w-fit ds-h-fit ds-rounded-md ds-relative ds-overflow-hidden ds-flex ds-items-center ds-justify-center',
    brightLayer:
        'ds-absolute ds-h-full ds-w-full ds-top-0 ds-bottom-0 ds-left-0 ds-right-0 ds-opacity-0 ds-transition-all group-hover:ds-opacity-[0.25] ds-z-[1]',
    typography: 'ds-flex ds-items-center ds-z-[2]',
    disabled: 'ds-cursor-not-allowed',
};
export const sizeStyles: { [key in Exclude<ButtonProps['size'], undefined>]: string } = {
    regular: 'ds-p-[10px] ',
    small: 'ds-p-1',
    xs: 'ds-py-1/2 ds-px-1',
};
export const typographysizeStyles: { [key in Exclude<ButtonProps['size'], undefined>]: string } = {
    regular: '',
    small: 'ds-text-[14px] ds-tracking-wider',
    xs: 'ds-text-[12px] ds-tracking-wider',
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
